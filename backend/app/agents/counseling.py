from app.api.llm import MentalHealthLLM
from app.utils.safety import assess_severity


class CounselingAgent:
    def __init__(self):
        self.llm = MentalHealthLLM()

    def respond(self, user_text: str) -> dict:
        severity = assess_severity(user_text)
        reply = self.llm.generate(user_text)

        return {
            "reply": reply,
            "severity": severity,
            "emotion": None
        }
