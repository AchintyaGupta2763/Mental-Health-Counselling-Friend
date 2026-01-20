import whisper
import tempfile
import os


class SpeechToText:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.model = whisper.load_model("base")
        return cls._instance

    def transcribe(self, audio_bytes: bytes) -> str:
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
            tmp.write(audio_bytes)
            tmp_path = tmp.name

        try:
            result = self.model.transcribe(
                tmp_path,
                language="en",
                task="transcribe"
            )
            return result["text"].strip()
        finally:
            os.remove(tmp_path)
