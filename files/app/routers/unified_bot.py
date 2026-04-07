from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import httpx
from app.utils.llm_client import ask_llm
from app.config import settings

router = APIRouter()

GEMINI_CHATBOT_KEY = settings.gemini_api_key
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key={GEMINI_CHATBOT_KEY}"

SYSTEM_PROMPT = """You are Manzil AI Assistant — the unified brain behind the Manzil AI Student Life OS.

You have deep knowledge of the user's real-time data across THREE pillars:
1. **Study**: Their quiz scores, weak topics, study streak, and spaced repetition progress.
2. **Finance**: Their monthly budget, total spent, savings rate, top spending categories, and savings goals.
3. **Interview**: Their mock interview scores (clarity, depth, structure), filler word usage, and sessions completed.

Your job is to:
- Answer questions by cross-referencing data across all three pillars.
- Give actionable, personalized advice. Never be generic.
- Be encouraging but brutally honest when needed (e.g., "You've spent 60% of your budget on food but haven't studied in 3 days").
- Keep responses concise (2-4 paragraphs max). Use bullet points when listing things.
- Speak like a smart, supportive senior — not a corporate chatbot.
- Use Rs. for currency references.
- If the user asks something unrelated to study/finance/interview, politely steer them back.

IMPORTANT: You will receive the user's real dashboard data as context with each message. Use it to personalize every response."""


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    history: List[ChatMessage] = []
    context: Optional[dict] = None


class ChatResponse(BaseModel):
    reply: str


def _build_context_prompt(context: dict) -> str:
    if not context:
        return ""

    lines = ["\n--- USER'S REAL-TIME DASHBOARD DATA ---"]

    study = context.get("study", {})
    lines.append(f"Study Streak: {study.get('streak_days', 0)} days")
    weak = study.get("weak_topics", [])
    if weak:
        topics_str = ", ".join(
            [f"{t.get('topic', 'N/A')} ({t.get('accuracy', 0)}%)" for t in weak[:5]]
        )
        lines.append(f"Weak Topics: {topics_str}")

    finance = context.get("finance", {})
    lines.append(f"Budget Used: {finance.get('budget_used_percent', 'N/A')}%")
    remaining = finance.get("remaining_balance_paise", 0)
    if remaining:
        lines.append(f"Remaining This Month: Rs.{round(remaining / 100)}")
    top_cat = finance.get("top_category")
    if top_cat:
        lines.append(
            f"Top Spending Category: {top_cat.get('category', 'N/A')} (Rs.{round(top_cat.get('total_paise', 0) / 100)})"
        )

    interview = context.get("interview", {})
    lines.append(f"Avg Interview Score: {interview.get('avg_score', 'N/A')}/100")
    lines.append(f"Sessions This Week: {interview.get('sessions_this_week', 0)}")
    fillers = interview.get("top_filler_words", {})
    if fillers and isinstance(fillers, dict):
        filler_str = ", ".join(
            [f'"{w}" ({c}x)' for w, c in list(fillers.items())[:5]]
        )
        lines.append(f"Top Filler Words: {filler_str}")

    score = context.get("trimind_score", 0)
    lines.append(f"Manzil Life Score: {score}/1000")
    lines.append("--- END OF DATA ---\n")
    return "\n".join(lines)


def _try_gemini(contents: list) -> str | None:
    """Try Gemini API. Returns reply text or None if rate limited."""
    payload = {
        "contents": contents,
        "systemInstruction": {"parts": [{"text": SYSTEM_PROMPT}]},
        "generationConfig": {"maxOutputTokens": 1024, "temperature": 0.8},
    }
    try:
        with httpx.Client(timeout=20.0) as client:
            response = client.post(GEMINI_URL, json=payload)
            if response.status_code == 429:
                return None  # Rate limited, fall back
            response.raise_for_status()
            data = response.json()
            return data["candidates"][0]["content"]["parts"][0]["text"].strip()
    except Exception:
        return None


def _try_groq(full_message: str, history: list) -> str:
    """Fallback to Groq LLM (already working for other tools)."""
    # Build a single prompt with conversation context
    conv_parts = []
    for msg in history:
        prefix = "User" if msg["role"] == "user" else "Assistant"
        conv_parts.append(f"{prefix}: {msg['parts'][0]['text']}")
    conv_parts.append(f"User: {full_message}")
    combined_prompt = "\n".join(conv_parts) if conv_parts else full_message

    return ask_llm(combined_prompt, system=SYSTEM_PROMPT, provider="groq", max_tokens=1024)


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    """Unified chatbot: tries Gemini first, falls back to Groq."""
    try:
        # Build history for API
        contents = []
        for msg in request.history:
            contents.append({
                "role": msg.role,
                "parts": [{"text": msg.content}],
            })

        # Build current message with context
        context_block = _build_context_prompt(request.context or {})
        full_message = f"{context_block}User's question: {request.message}"
        contents.append({"role": "user", "parts": [{"text": full_message}]})

        # Try Gemini first
        reply = _try_gemini(contents)

        # Fallback to Groq if Gemini is rate-limited
        if reply is None:
            reply = _try_groq(full_message, contents[:-1])

        return ChatResponse(reply=reply)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chatbot error: {str(e)}")
