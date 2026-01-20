# 🧠 Mental Health Counselling Friend

A calm, voice-based AI companion designed to listen, understand, and gently support users during moments of stress or emotional overwhelm.

## link = https://mental-health-counselling-friend.vercel.app/
---

## 🌟 Overview

**Mental Health Counselling Friend** is a full-stack generative AI application that enables natural, voice-based conversations with an empathetic AI agent. The system listens to users, understands emotional context, and responds with supportive speech synchronized with an expressive avatar.

This project is intended as a **supportive companion**, not a replacement for professional mental health care.

---

## 🎯 Key Features

- 🎙 Voice-based interaction
- 🧠 Fine-tuned mental health language model
- 🔊 Natural text-to-speech responses
- 🎥 Expressive avatar with video synchronization
- 🛡 Safety & severity classification
- 🌐 Live deployed frontend & backend

---

## 🧩 System Architecture
User → Microphone → Whisper STT → Safety Checks → Fine-tuned LLM → XTTS → Avatar Video + Audio


---

## 🔄 Application Flow

1. Website loads with looping intro video
2. User clicks microphone and speaks
3. Audio is converted to text (Whisper)
4. Severity & safety analysis is performed
5. AI generates an empathetic response
6. Response is converted to speech
7. Avatar speaks while audio plays
8. System returns to idle state

---

## 🛠 Tech Stack

### AI / ML
- DeepSeek-R1-Distill-Qwen-1.5B (fine-tuned)
- Whisper (Speech-to-Text)
- Coqui XTTS (Text-to-Speech)
- Hugging Face Hub

### Backend
- Python 3.12
- FastAPI
- Pydantic
- Uvicorn

### Frontend
- React
- Vite
- HTML5 Video & Audio APIs
- CSS animations

---

## ☁ Deployment

- **Frontend:** Vercel
- **Backend:** Render (or local hosting via tunnel)
- **Model Hosting:** Hugging Face

Due to resource constraints of free cloud tiers, the backend may be temporarily self-hosted and exposed securely for demonstrations.

---

## ⚠ Disclaimer

This application is **not a replacement for professional mental health care**.  
If you or someone you know is in immediate danger, please seek professional help.

---

## 📌 Author

**Achintya Gupta**  
Full Stack & Generative AI Developer

---

## ⭐ Acknowledgements

- Hugging Face
- DeepSeek AI
- OpenAI Whisper
- Coqui TTS
