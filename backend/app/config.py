import os

# ===== Model identifiers =====
BASE_MODEL_ID = "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B"
ADAPTER_MODEL_ID = "Achintya-Gupta/mh-counselor-qlora"

# ===== Environment =====
ENV = os.getenv("ENV", "development")

# ===== Limits =====
MAX_INPUT_CHARS = 2000
MAX_OUTPUT_TOKENS = 200
