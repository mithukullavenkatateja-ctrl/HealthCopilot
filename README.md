# HealthMate AI — AI-Powered Personal Health Copilot

HealthMate AI is a beginner-friendly Flask website for organizing appointments, medicine reminders, readable medical report text, and general health questions. It uses HTML, CSS, JavaScript, Python, Flask, and SQLite.

> **Important:** This is an educational organizer, not a medical device or a substitute for a qualified healthcare professional. It does not diagnose, prescribe, or choose medicine doses. In an emergency, contact your local emergency services.

## What it does

- Presents large, simple navigation and works on phone and desktop screens.
- Lets you switch the interface between English and Telugu.
- Saves appointments and medicine reminders to a local SQLite database.
- Makes reminders only for medicines already prescribed to you; it does not recommend a medicine, dose, or schedule.
- Shows saved reminder times in the app; it does not send phone, email, or desktop notifications.
- Reads `.txt` and text-based `.pdf` reports up to 5 MB (PDFs up to 20 pages) and shows a short local text preview. Reports are processed in memory, not saved.
- Provides safe, clearly labelled general health responses when AI is not configured. It never claims that an AI model answered when one did not.
- Offers an optional AI connection for general questions and report explanations. The AI service is contacted only when a user checks the consent box and submits. Do not submit names or other identifying details.
- Starts with no sample patient records. Do not use real patient information for a class demo.

Appointments and reminders are private to this local app instance, but there is no login or multi-user access control. Use it only on your own computer at `127.0.0.1`; do not expose it to a network or deploy it as-is. Protect your Windows account and back up or delete the local database deliberately.

## Project files

```text
app.py
templates/
  index.html
static/
  style.css
  script.js
requirements.txt
README.md
.gitignore
```

The SQLite database is created automatically at `instance/healthmate.db` when the app first needs it. That folder is ignored by Git. No report file is written to disk by the app.

## Run on Windows in VS Code

1. Open this project folder in VS Code using **File → Open Folder**.
2. Open the integrated terminal using **Terminal → New Terminal**. In PowerShell, go to the folder if needed:

   ```powershell
   cd "$HOME\OneDrive\Desktop\healthmateAI.py"
   ```

3. Create and activate a virtual environment:

   ```powershell
   py -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

   If PowerShell blocks activation, open a **Command Prompt** terminal instead and run:

   ```bat
   .venv\Scripts\activate.bat
   ```

4. Install the packages:

   ```powershell
   python -m pip install -r requirements.txt
   ```

5. Start the app:

   ```powershell
   python app.py
   ```

6. Open <http://127.0.0.1:5000> in your browser. Keep the terminal open while using the app. Press **Ctrl+C** in that terminal to stop it.

Expected startup output includes a line similar to:

```text
 * Running on http://127.0.0.1:5000
```

The app binds to `127.0.0.1` (your own computer) and runs with Flask debug mode off.

## Optional AI configuration

AI is **not connected by default**. Without configuration, the assistant clearly says it is not connected and gives a safe general response; report previews are made locally.

To connect an OpenAI-compatible Chat Completions service, set its API key as an environment variable in the same PowerShell terminal **before** starting the app:

```powershell
$env:HEALTHMATE_AI_API_KEY = "your-provider-key"
python app.py
```

Never add a real key to `app.py`, `README.md`, source control, screenshots, or a shared computer. The default endpoint is `https://api.openai.com/v1/chat/completions` and the default model name is `gpt-4o-mini`. To choose another compatible service/model, set `HEALTHMATE_AI_URL` and `HEALTHMATE_AI_MODEL` in that terminal too. Use only a provider you trust and review its privacy and data-retention terms. AI requests may send the submitted question or report text to that provider, and answers can be wrong. The user must separately check the consent box for each assistant question or report explanation.

Configured remote providers must use HTTPS. Plain HTTP is accepted only for the exact loopback hosts `localhost`, `127.0.0.1`, or `::1` for local development.

## Checks and troubleshooting

- Run the automated checks from the VS Code terminal after installing the requirements:

  ```powershell
  python -m unittest discover -s tests -v
  ```

  The tests use a temporary database and fictional sample content; they do not alter the app's normal database.
- If `py` is unavailable, install Python 3 from python.org and enable the option to add Python to PATH; reopen VS Code after installation.
- If the page does not open, check that the terminal still shows Flask running at `127.0.0.1:5000`.
- If port 5000 is already in use, choose another port in the same terminal and restart:

  ```powershell
  $env:PORT = "5001"
  python app.py
  ```

  Then open <http://127.0.0.1:5001>.
- For an upload error, use a UTF-8 `.txt` file or a text-based `.pdf` smaller than 5 MB. Image-only/scanned PDFs may have no extractable text.
- To reset this demo's saved appointments and reminders, first stop the server, then remove the specific file `instance\healthmate.db`. The database contains private records; do this only if you intend to erase them.

## Privacy and safety

- Appointment and reminder input is stored locally in SQLite using parameterized SQL.
- There is no login, encryption-at-rest layer, cloud backup, analytics, or automatic AI connection.
- Report files are validated, read in memory, and not stored. The temporary extracted text is returned to your browser for display and is only sent to a configured AI provider after explicit consent.
- The built-in emergency response is not a substitute for local emergency services. Do not rely on this project for urgent care.
- This development server and privacy model are not suitable for public hosting or multiple users.
