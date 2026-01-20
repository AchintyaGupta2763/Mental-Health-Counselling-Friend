import tempfile
import os
from TTS.api import TTS

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
VOICE_PATH = os.path.join(BASE_DIR, "assets", "voice.wav")


class TextToSpeech:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._load_model()
        return cls._instance

    def _load_model(self):
        self.tts = TTS(
            model_name="tts_models/multilingual/multi-dataset/xtts_v2",
            progress_bar=False,
            gpu=False
        )

    def synthesize(self, text: str) -> bytes:
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
            output_path = tmp.name

        try:
            self.tts.tts_to_file(
                text=text,
                speaker_wav=VOICE_PATH,   # ✅ REQUIRED
                language="en",
                file_path=output_path
            )

            with open(output_path, "rb") as f:
                return f.read()
        finally:
            os.remove(output_path)
