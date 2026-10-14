import io
import json
import logging
import os
import re
import sqlite3
import urllib.error
import urllib.request
from datetime import datetime
from pathlib import Path
from urllib.parse import urlsplit

from flask import Flask, Request, g, jsonify, render_template, request
from pypdf import PdfReader
from werkzeug.exceptions import RequestEntityTooLarge
from werkzeug.utils import secure_filename


BASE_DIR = Path(__file__).resolve().parent
DATABASE_PATH = Path(os.environ.get("HEALTHMATE_DATABASE", BASE_DIR / "instance" / "healthmate.db"))
MAX_REPORT_BYTES = 5 * 1024 * 1024
MAX_REPORT_CHARACTERS = 100_000
ALLOWED_REPORT_EXTENSIONS = {".txt", ".pdf"}
EMERGENCY_TERMS = re.compile(
    r"\b(chest pain|can't breathe|cannot breathe|difficulty breathing|"
    r"trouble breathing|stroke|unconscious|severe bleeding|suicid(?:e|al))\b",
    re.IGNORECASE,
)


class MemoryOnlyRequest(Request):
    def _get_file_stream(
        self, total_content_length, content_type, filename=None, content_length=None
    ):
        return io.BytesIO()


def create_app(test_config=None):
    app = Flask(__name__)
    app.request_class = MemoryOnlyRequest
    app.config.update(
        DATABASE=str(DATABASE_PATH),
        MAX_CONTENT_LENGTH=MAX_REPORT_BYTES + 128 * 1024,
    )
    if test_config:
        app.config.update(test_config)

    logging.basicConfig(level=logging.INFO)

    def get_db():
        if "db" not in g:
            database = Path(app.config["DATABASE"])
            database.parent.mkdir(parents=True, exist_ok=True)
            g.db = sqlite3.connect(database, timeout=10)
            g.db.row_factory = sqlite3.Row
            g.db.execute("PRAGMA busy_timeout = 10000")
            g.db.execute("PRAGMA journal_mode = WAL")
            g.db.executescript(
                """
                CREATE TABLE IF NOT EXISTS appointments (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    provider TEXT NOT NULL DEFAULT '',
                    scheduled_at TEXT NOT NULL,
                    created_at TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS medicines (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    scheduled_at TEXT NOT NULL,
                    instructions TEXT NOT NULL DEFAULT '',
                    created_at TEXT NOT NULL
                );
                """
            )
            g.db.commit()
        return g.db

    @app.teardown_appcontext
    def close_db(_error=None):
        database = g.pop("db", None)
        if database is not None:
            database.close()

    def error(message, status=400):
        return jsonify({"error": message}), status

    def read_json():
        data = request.get_json(silent=True)
        if not isinstance(data, dict):
            return None
        return data

    def parse_local_datetime(value):
        if not isinstance(value, str) or not value.strip():
            return None
        try:
            parsed = datetime.fromisoformat(value.strip())
        except ValueError:
            return None
        if parsed.tzinfo is not None:
            return None
        return parsed.strftime("%Y-%m-%dT%H:%M")

    def ai_configuration():
        api_key = os.environ.get("HEALTHMATE_AI_API_KEY", "").strip()
        endpoint = os.environ.get(
            "HEALTHMATE_AI_URL", "https://api.openai.com/v1/chat/completions"
        ).strip()
        model = os.environ.get("HEALTHMATE_AI_MODEL", "gpt-4o-mini").strip()
        return api_key, endpoint, model

    def ai_is_configured():
        api_key, endpoint, model = ai_configuration()
        try:
            parsed_endpoint = urlsplit(endpoint)
            hostname = parsed_endpoint.hostname
        except ValueError:
            return False
        secure_remote_endpoint = parsed_endpoint.scheme == "https" and hostname
        local_development_endpoint = (
            parsed_endpoint.scheme == "http"
            and hostname in {"localhost", "127.0.0.1", "::1"}
        )
        has_no_embedded_credentials = (
            parsed_endpoint.username is None and parsed_endpoint.password is None
        )
        return bool(
            api_key
            and model
            and (secure_remote_endpoint or local_development_endpoint)
            and has_no_embedded_credentials
            and not parsed_endpoint.fragment
        )

    def ask_configured_ai(prompt):
        api_key, endpoint, model = ai_configuration()
        if not ai_is_configured():
            return None
        payload = {
            "model": model,
            "messages": [
                {
                    "role": "system",
                    "content": (
                        "You are a cautious general health information assistant, not a clinician. "
                        "Give plain-language educational information only. Never diagnose, prescribe, "
                        "recommend changing a medicine or dose, or claim certainty. Encourage the user "
                        "to ask a qualified healthcare professional about personal concerns. For possible "
                        "emergencies, tell them to contact local emergency services now. Keep the answer "
                        "brief and include that it is not a substitute for medical care."
                    ),
                },
                {"role": "user", "content": prompt},
            ],
            "temperature": 0.2,
            "max_tokens": 350,
        }
        outbound = urllib.request.Request(
            endpoint,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        try:
            with urllib.request.urlopen(outbound, timeout=15) as response:
                result = json.loads(response.read(256 * 1024).decode("utf-8"))
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError, OSError, ValueError):
            app.logger.exception("Configured AI provider request failed")
            raise RuntimeError("The configured AI service could not answer right now.")
        try:
            answer = result["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError):
            app.logger.error("Configured AI provider returned an unexpected response")
            raise RuntimeError("The configured AI service returned an unexpected response.")
        if not isinstance(answer, str) or not answer.strip():
            raise RuntimeError("The configured AI service returned an empty response.")
        return answer.strip()[:4000]

    def safe_report_text(upload):
        filename = secure_filename(upload.filename or "")
        extension = Path(filename).suffix.lower()
        if extension not in ALLOWED_REPORT_EXTENSIONS:
            raise ValueError("Choose a .txt or .pdf report file.")
        content = upload.stream.read(MAX_REPORT_BYTES + 1)
        if not content:
            raise ValueError("The selected file is empty.")
        if len(content) > MAX_REPORT_BYTES:
            raise ValueError("Report files must be 5 MB or smaller.")

        if extension == ".txt":
            if b"\x00" in content:
                raise ValueError("This text file could not be read. Choose a UTF-8 .txt file.")
            try:
                text = content.decode("utf-8-sig")
            except UnicodeDecodeError:
                raise ValueError("This text file could not be read. Choose a UTF-8 .txt file.")
        else:
            if not content.startswith(b"%PDF-"):
                raise ValueError("This file does not look like a valid PDF.")
            try:
                reader = PdfReader(io.BytesIO(content), strict=True)
                if reader.is_encrypted:
                    raise ValueError("Password-protected PDFs are not supported.")
                if len(reader.pages) > 20:
                    raise ValueError("PDF reports must contain 20 pages or fewer.")
                text = "\n".join(page.extract_text() or "" for page in reader.pages)
            except ValueError:
                raise
            except Exception as exc:
                app.logger.info("Report PDF could not be read: %s", type(exc).__name__)
                raise ValueError("This PDF could not be read. Try a text-based PDF or .txt file.")

        text = text.replace("\x00", "").strip()
        if not text:
            raise ValueError("No readable text was found in the report.")
        if len(text) > MAX_REPORT_CHARACTERS:
            raise ValueError("The report contains too much text to process (maximum 100,000 characters).")
        return text

    @app.errorhandler(RequestEntityTooLarge)
    def file_too_large(_error):
        return error("The upload is too large. Report files must be 5 MB or smaller.", 413)

    @app.get("/")
    def index():
        return render_template("index.html")

    @app.get("/api/status")
    def status():
        return jsonify({"ai_configured": ai_is_configured()})

    @app.get("/api/appointments")
    def list_appointments():
        rows = get_db().execute(
            "SELECT id, title, provider, scheduled_at FROM appointments ORDER BY scheduled_at, id"
        ).fetchall()
        return jsonify([dict(row) for row in rows])

    @app.post("/api/appointments")
    def add_appointment():
        data = read_json()
        if data is None:
            return error("Send appointment details as JSON.")
        title = data.get("title")
        provider = data.get("provider", "")
        scheduled_at = parse_local_datetime(data.get("scheduled_at"))
        if not isinstance(title, str) or not title.strip() or len(title.strip()) > 100:
            return error("Enter an appointment name (up to 100 characters).")
        if not isinstance(provider, str) or len(provider.strip()) > 100:
            return error("Provider name must be 100 characters or fewer.")
        if not scheduled_at:
            return error("Choose a valid appointment date and time.")
        database = get_db()
        cursor = database.execute(
            "INSERT INTO appointments (title, provider, scheduled_at, created_at) VALUES (?, ?, ?, ?)",
            (title.strip(), provider.strip(), scheduled_at, datetime.now().isoformat(timespec="seconds")),
        )
        database.commit()
        row = database.execute(
            "SELECT id, title, provider, scheduled_at FROM appointments WHERE id = ?",
            (cursor.lastrowid,),
        ).fetchone()
        return jsonify(dict(row)), 201

    @app.delete("/api/appointments/<int:appointment_id>")
    def delete_appointment(appointment_id):
        database = get_db()
        cursor = database.execute("DELETE FROM appointments WHERE id = ?", (appointment_id,))
        database.commit()
        if cursor.rowcount == 0:
            return error("Appointment not found.", 404)
        return jsonify({"deleted": True})

    @app.get("/api/medicines")
    def list_medicines():
        rows = get_db().execute(
            "SELECT id, name, scheduled_at, instructions FROM medicines ORDER BY scheduled_at, id"
        ).fetchall()
        return jsonify([dict(row) for row in rows])

    @app.post("/api/medicines")
    def add_medicine():
        data = read_json()
        if data is None:
            return error("Send medicine schedule details as JSON.")
        name = data.get("name")
        instructions = data.get("instructions", "")
        scheduled_at = parse_local_datetime(data.get("scheduled_at"))
        if not isinstance(name, str) or not name.strip() or len(name.strip()) > 100:
            return error("Enter the medicine name (up to 100 characters).")
        if not isinstance(instructions, str) or len(instructions.strip()) > 250:
            return error("Notes must be 250 characters or fewer.")
        if not scheduled_at:
            return error("Choose a valid reminder date and time.")
        database = get_db()
        cursor = database.execute(
            "INSERT INTO medicines (name, scheduled_at, instructions, created_at) VALUES (?, ?, ?, ?)",
            (
                name.strip(),
                scheduled_at,
                instructions.strip(),
                datetime.now().isoformat(timespec="seconds"),
            ),
        )
        database.commit()
        row = database.execute(
            "SELECT id, name, scheduled_at, instructions FROM medicines WHERE id = ?",
            (cursor.lastrowid,),
        ).fetchone()
        return jsonify(dict(row)), 201

    @app.delete("/api/medicines/<int:medicine_id>")
    def delete_medicine(medicine_id):
        database = get_db()
        cursor = database.execute("DELETE FROM medicines WHERE id = ?", (medicine_id,))
        database.commit()
        if cursor.rowcount == 0:
            return error("Medicine reminder not found.", 404)
        return jsonify({"deleted": True})

    @app.post("/api/reports/summarize")
    def summarize_report():
        upload = request.files.get("report")
        if upload is None:
            return error("Choose a report file to summarize.")
        try:
            text = safe_report_text(upload)
        except ValueError as exc:
            return error(str(exc))
        sentences = [
            part.strip()
            for part in re.split(r"(?<=[.!?])\s+|\n+", text)
            if part.strip()
        ]
        summary = " ".join(sentences[:5])[:1200]
        return jsonify(
            {
                "summary": summary or "Readable text was found, but no short summary could be prepared.",
                "report_text": text,
                "ai_configured": ai_is_configured(),
            }
        )

    @app.post("/api/reports/explain")
    def explain_report():
        data = read_json()
        if data is None:
            return error("Send report text as JSON.")
        if data.get("consent") is not True:
            return error("Please agree before sending report text to the configured AI service.")
        text = data.get("report_text")
        if not isinstance(text, str) or not text.strip():
            return error("Summarize a report before asking AI to explain it.")
        if len(text) > MAX_REPORT_CHARACTERS:
            return error("The report contains too much text to process.")
        if not ai_is_configured():
            return error("AI is not configured on this server. No report text was sent.")
        try:
            answer = ask_configured_ai(
                "Explain the following medical report wording in simple, non-diagnostic language. "
                "Do not recommend treatments or dosage changes. Say when a term is unclear. "
                "Report text:\n" + text
            )
        except RuntimeError as exc:
            return error(str(exc), 502)
        return jsonify({"answer": answer})

    @app.post("/api/assistant")
    def assistant():
        data = read_json()
        if data is None:
            return error("Send your question as JSON.")
        question = data.get("question")
        if not isinstance(question, str) or not question.strip() or len(question.strip()) > 1000:
            return error("Enter a question (up to 1,000 characters).")
        question = question.strip()
        if EMERGENCY_TERMS.search(question):
            return jsonify(
                {
                    "answer": (
                        "This may be an emergency. Please contact your local emergency services now "
                        "or ask someone nearby to help. Do not wait for an online reply."
                    ),
                    "ai_used": False,
                }
            )
        if data.get("consent") is True:
            if not ai_is_configured():
                return error("AI is not configured on this server. Your question was not sent.")
            try:
                answer = ask_configured_ai(question)
            except RuntimeError as exc:
                return error(str(exc), 502)
            return jsonify({"answer": answer, "ai_used": True})
        return jsonify(
            {
                "answer": (
                    "AI is not connected to this answer. For general health questions, use information "
                    "from a trusted public health service and ask a qualified healthcare professional "
                    "about personal symptoms or treatment. I cannot diagnose or recommend medicines or doses."
                ),
                "ai_used": False,
            }
        )

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.environ.get("PORT", "5000")), debug=False)
