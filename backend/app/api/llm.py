import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel

from app.config import BASE_MODEL_ID, ADAPTER_MODEL_ID, MAX_OUTPUT_TOKENS
from app.utils.prompts import build_prompt


class MentalHealthLLM:
    _instance = None  # singleton to avoid reloading

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._load_model()
        return cls._instance

    def _load_model(self):
        self.tokenizer = AutoTokenizer.from_pretrained(ADAPTER_MODEL_ID)

        self.model = AutoModelForCausalLM.from_pretrained(
            BASE_MODEL_ID,
            dtype=torch.float16,
            device_map="auto"
        )

        self.model = PeftModel.from_pretrained(
            self.model,
            ADAPTER_MODEL_ID
        )

        self.model.eval()

    def generate(self, user_text: str) -> str:
        prompt = build_prompt(user_text)

        inputs = self.tokenizer(prompt, return_tensors="pt").to(self.model.device)

        with torch.no_grad():
            output = self.model.generate(
                **inputs,
                max_new_tokens=MAX_OUTPUT_TOKENS,
                temperature=0.7,
                top_p=0.9,
                repetition_penalty=1.1
            )

        decoded = self.tokenizer.decode(output[0], skip_special_tokens=True)

        # Return only assistant part
        return decoded.split("### Assistant:")[-1].strip()
