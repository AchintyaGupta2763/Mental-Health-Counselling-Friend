from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File
from fastapi.responses import Response
from app.api.tts import TextToSpeech
from app.api.stt import SpeechToText
from app.schemas import HealthResponse, UserTextInput, CounselorResponse, ConverseResponse
from app.agents.counseling import CounselingAgent

app = FastAPI(
    title="Mental Health Counseling Friend API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

stt = SpeechToText()
agent = CounselingAgent()
tts = TextToSpeech()


@app.get("/health", response_model=HealthResponse)
def health_check():
    return {"status": "ok"}

@app.post("/stt")
async def speech_to_text(file: UploadFile = File(...)):
    audio_bytes = await file.read()
    text = stt.transcribe(audio_bytes)
    return {"text": text}

@app.post("/chat", response_model=CounselorResponse)
def chat(input: UserTextInput):
    result = agent.respond(input.text)
    return result

@app.post("/converse", response_model=ConverseResponse)
async def converse(file: UploadFile = File(...)):
    audio_bytes = await file.read()
    user_text = stt.transcribe(audio_bytes)
    agent_result = agent.respond(user_text)
    return {
        "user_text": user_text,
        "reply": agent_result["reply"],
        "severity": agent_result["severity"],
        "emotion": agent_result["emotion"]
    }

@app.post("/converse-audio")
async def converse_audio(file: UploadFile = File(...)):
    audio_bytes = await file.read()
    user_text = stt.transcribe(audio_bytes)
    agent_result = agent.respond(user_text)
    reply_text = agent_result["reply"]
    audio_output = tts.synthesize(reply_text)
    return Response(
        content=audio_output,
        media_type="audio/wav"
    )






