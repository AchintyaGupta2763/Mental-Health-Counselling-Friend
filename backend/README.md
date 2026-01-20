# Mental Health Counseling Friend – Backend

FastAPI backend for a conversational mental health support application.

## Features (planned)
- Speech-to-text (Whisper)
- Custom fine-tuned LLM (DeepSeek + QLoRA)
- Text-to-speech (XTTS)
- Safety-aware response orchestration

## Run locally

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
