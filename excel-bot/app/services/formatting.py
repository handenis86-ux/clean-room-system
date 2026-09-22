"""Сборка ответа бота из данных модели."""

from __future__ import annotations

from html import escape

from app.services.claude_client import FormulaAnswer

TELEGRAM_MESSAGE_LIMIT = 4096
# Запас под заголовки, формулы и хвост «Осталось запросов».
_EXPLANATION_LIMIT = 2500


def _shorten(text: str, limit: int) -> str:
    if len(text) <= limit:
        return text
    return text[: limit - 1].rstrip() + "…"


def render_answer(answer: FormulaAnswer, remaining: int | None = None) -> str:
    """HTML для Telegram (parse_mode=HTML)."""
    parts: list[str] = []

    if answer.has_formula:
        parts.append(
            "<b>Формула (русский Excel)</b>\n"
            f"<code>{escape(answer.formula_ru)}</code>\n\n"
            "<b>Формула (английский Excel)</b>\n"
            f"<code>{escape(answer.formula_en)}</code>"
        )

    explanation = _shorten(answer.explanation, _EXPLANATION_LIMIT)
    if explanation:
        parts.append(escape(explanation))

    if answer.note:
        parts.append(f"⚠️ {escape(_shorten(answer.note, 400))}")

    if remaining is not None:
        parts.append(f"<i>Осталось запросов в этом месяце: {remaining}</i>")

    text = "\n\n".join(part for part in parts if part)
    return _shorten(text, TELEGRAM_MESSAGE_LIMIT)
