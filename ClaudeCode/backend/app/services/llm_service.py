import os
import httpx

LLM_API_URL = os.getenv("LLM_API_URL", "")
LLM_API_KEY = os.getenv("LLM_API_KEY", "")
LLM_MODEL = os.getenv("LLM_MODEL", "qwen-plus")

async def call_llm(prompt: str, system_prompt: str = "") -> str:
    if not LLM_API_KEY:
        return "mock_response"  # No API key configured, return mock
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": prompt})
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(LLM_API_URL, headers={"Authorization": f"Bearer {LLM_API_KEY}", "Content-Type": "application/json"},
            json={"model": LLM_MODEL, "messages": messages})
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]
