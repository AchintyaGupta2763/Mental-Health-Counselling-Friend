from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str


class UserTextInput(BaseModel):
    text: str


class CounselorResponse(BaseModel):
    reply: str
    emotion: str | None = None
    severity: str | None = None

class ConverseResponse(BaseModel):
    user_text: str
    reply: str
    severity: str
    emotion: str | None = None

class ConverseAudioResponse(BaseModel):
    user_text: str
    reply: str
    severity: str
