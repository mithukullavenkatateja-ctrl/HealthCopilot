import io
import os
import tempfile
import unittest
from unittest.mock import patch

from app import create_app


class HealthMateAppTests(unittest.TestCase):
    def setUp(self):
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.database_path = os.path.join(
            self.temporary_directory.name, "healthmate-test.sqlite3"
        )
        self.app = create_app(
            {
                "TESTING": True,
                "DATABASE": self.database_path,
            }
        )
        self.client = self.app.test_client()

    def tearDown(self):
        self.temporary_directory.cleanup()

    def test_dashboard_and_ai_status_are_available_without_ai(self):
        with patch.dict(
            os.environ,
            {
                "HEALTHMATE_AI_API_KEY": "",
                "HEALTHMATE_AI_URL": "",
                "HEALTHMATE_AI_MODEL": "",
            },
        ):
            page = self.client.get("/")
            status = self.client.get("/api/status")

        self.assertEqual(page.status_code, 200)
        self.assertIn(b"HealthMate", page.data)
        self.assertEqual(status.status_code, 200)
        self.assertFalse(status.get_json()["ai_configured"])

    def test_appointment_and_medicine_records_can_be_saved_and_deleted(self):
        appointment = self.client.post(
            "/api/appointments",
            json={
                "title": "Fictional check-up",
                "provider": "Demo clinic",
                "scheduled_at": "2030-03-04T10:30",
            },
        )
        medicine = self.client.post(
            "/api/medicines",
            json={
                "name": "Fictional sample medicine",
                "scheduled_at": "2030-03-04T08:00",
                "instructions": "Use only the fictional demo schedule",
            },
        )

        self.assertEqual(appointment.status_code, 201)
        self.assertEqual(medicine.status_code, 201)
        self.assertEqual(len(self.client.get("/api/appointments").get_json()), 1)
        self.assertEqual(len(self.client.get("/api/medicines").get_json()), 1)
        self.assertEqual(
            self.client.delete(
                f"/api/appointments/{appointment.get_json()['id']}"
            ).status_code,
            200,
        )
        self.assertEqual(
            self.client.delete(f"/api/medicines/{medicine.get_json()['id']}").status_code,
            200,
        )
        self.assertEqual(self.client.get("/api/appointments").get_json(), [])
        self.assertEqual(self.client.get("/api/medicines").get_json(), [])

    def test_invalid_form_values_are_rejected(self):
        appointment = self.client.post(
            "/api/appointments",
            json={
                "title": "Demo visit",
                "provider": "",
                "scheduled_at": "not-a-date",
            },
        )
        medicine = self.client.post(
            "/api/medicines",
            json={
                "name": "Demo medicine",
                "scheduled_at": "2030-03-04T08:00",
                "instructions": "x" * 251,
            },
        )

        self.assertEqual(appointment.status_code, 400)
        self.assertEqual(medicine.status_code, 400)
        self.assertIn("error", appointment.get_json())
        self.assertIn("error", medicine.get_json())

    def test_text_report_is_summarized_in_memory(self):
        response = self.client.post(
            "/api/reports/summarize",
            data={
                "report": (
                    io.BytesIO(
                        b"Fictional report. This is sample text for a classroom demo."
                    ),
                    "sample.txt",
                )
            },
            content_type="multipart/form-data",
        )

        self.assertEqual(response.status_code, 200)
        result = response.get_json()
        self.assertIn("Fictional report.", result["summary"])
        self.assertFalse(result["ai_configured"])
        self.assertFalse(os.path.exists(os.path.join(self.temporary_directory.name, "sample.txt")))

    def test_unsupported_or_invalid_report_is_rejected(self):
        response = self.client.post(
            "/api/reports/summarize",
            data={
                "report": (io.BytesIO(b"not a pdf"), "sample.pdf"),
            },
            content_type="multipart/form-data",
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.get_json())

    def test_assistant_uses_safe_offline_response_when_ai_is_not_configured(self):
        with patch.dict(
            os.environ,
            {
                "HEALTHMATE_AI_API_KEY": "",
                "HEALTHMATE_AI_URL": "",
                "HEALTHMATE_AI_MODEL": "",
            },
        ):
            response = self.client.post(
                "/api/assistant",
                json={"question": "What should I know about a common cold?"},
            )

        self.assertEqual(response.status_code, 200)
        self.assertFalse(response.get_json()["ai_used"])
        self.assertIn("AI is not connected", response.get_json()["answer"])

    def test_emergency_question_does_not_attempt_ai(self):
        with patch.dict(
            os.environ,
            {
                "HEALTHMATE_AI_API_KEY": "test-key",
                "HEALTHMATE_AI_URL": "https://example.test/v1/chat/completions",
                "HEALTHMATE_AI_MODEL": "test-model",
            },
        ):
            with patch(
                "app.urllib.request.urlopen",
                side_effect=AssertionError("Emergency questions must not be sent to AI."),
            ):
                response = self.client.post(
                    "/api/assistant",
                    json={"question": "I have severe chest pain", "consent": True},
                )

        self.assertEqual(response.status_code, 200)
        self.assertFalse(response.get_json()["ai_used"])
        self.assertIn("emergency", response.get_json()["answer"].lower())

    def test_ai_endpoint_status_rejects_lookalike_localhost_hostnames(self):
        with patch.dict(
            os.environ,
            {
                "HEALTHMATE_AI_API_KEY": "test-key",
                "HEALTHMATE_AI_URL": "http://localhost.attacker.example/api",
                "HEALTHMATE_AI_MODEL": "test-model",
            },
        ):
            response = self.client.get("/api/status")

        self.assertFalse(response.get_json()["ai_configured"])


if __name__ == "__main__":
    unittest.main()
