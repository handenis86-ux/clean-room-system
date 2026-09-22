"""Обёртка над Claude API: запрос формулы и разбор ответа."""

from __future__ import annotations

import json
import logging
import re
import time
from dataclasses import dataclass, field
from decimal import Decimal

import anthropic

from app.db.models import MODE_GENERATE
from app.services.pricing import TokenUsage, cost_usd
from app.services.prompts import RESPONSE_SCHEMA, SYSTEM_PROMPT, build_user_message

logger = logging.getLogger(__name__)

_JSON_OBJECT_RE = re.compile(r"\{.*\}", re.DOTALL)


class FormulaServiceError(Exception):
    """Ответ от модели получить не удалось — пользователю показываем мягкую ошибку."""


@dataclass
class FormulaAnswer:
    formula_ru: str
    formula_en: str
    explanation: str
    note: str = ""
    usage: TokenUsage = field(default_factory=TokenUsage)
    cost: Decimal = Decimal("0")
    latency_ms: int = 0

    @property
    def has_formula(self) -> bool:
        return bool(self.formula_ru.strip() or self.formula_en.strip())

    def as_dict(self) -> dict:
        """То, что уходит в requests.response_json."""
        return {
            "formula_ru": self.formula_ru,
            "formula_en": self.formula_en,
            "explanation": self.explanation,
            "note": self.note,
        }


def parse_model_payload(text: str) -> dict[str, str]:
    """Разбирает JSON из ответа модели.

    При structured outputs ответ и так валидный JSON, но модель может быть вызвана
    и без них (фоллбэк), поэтому вырезаем объект из текста и приводим поля к строкам.
    """
    text = (text or "").strip()
    if not text:
        raise FormulaServiceError("пустой ответ модели")

    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        match = _JSON_OBJECT_RE.search(text)
        if not match:
            raise FormulaServiceError("ответ модели не содержит JSON") from None
        try:
            data = json.loads(match.group(0))
        except json.JSONDecodeError as exc:
            raise FormulaServiceError("ответ модели — невалидный JSON") from exc

    if not isinstance(data, dict):
        raise FormulaServiceError("ответ модели — не объект")

    missing = [key for key in ("formula_ru", "formula_en", "explanation") if key not in data]
    if missing:
        raise FormulaServiceError(f"в ответе нет полей: {', '.join(missing)}")

    return {
        "formula_ru": str(data.get("formula_ru") or "").strip(),
        "formula_en": str(data.get("formula_en") or "").strip(),
        "explanation": str(data.get("explanation") or "").strip(),
        "note": str(data.get("note") or "").strip(),
    }


class ClaudeService:
    def __init__(
        self,
        api_key: str,
        model: str,
        *,
        max_tokens: int = 1000,
        temperature: float = 0.2,
        timeout_seconds: float = 30.0,
        input_price_per_mtok: float = 1.0,
        output_price_per_mtok: float = 5.0,
        client: anthropic.AsyncAnthropic | None = None,
    ) -> None:
        # max_retries=1 — ровно один повтор при сбое, как в ТЗ.
        self._client = client or anthropic.AsyncAnthropic(
            api_key=api_key, timeout=timeout_seconds, max_retries=1
        )
        self._model = model
        self._max_tokens = max_tokens
        self._temperature = temperature
        self._input_price = input_price_per_mtok
        self._output_price = output_price_per_mtok

    async def ask(
        self,
        task: str,
        mode: str = MODE_GENERATE,
        *,
        variant: bool = False,
        elaborate: bool = False,
    ) -> FormulaAnswer:
        message = build_user_message(task, mode, variant=variant, elaborate=elaborate)
        started = time.monotonic()
        try:
            response = await self._client.messages.create(
                model=self._model,
                max_tokens=self._max_tokens,
                temperature=self._temperature,
                system=[
                    {
                        "type": "text",
                        "text": SYSTEM_PROMPT,
                        # Системный промпт одинаков для всех запросов — кэшируем его.
                        "cache_control": {"type": "ephemeral"},
                    }
                ],
                messages=[{"role": "user", "content": message}],
                output_config={"format": {"type": "json_schema", "schema": RESPONSE_SCHEMA}},
            )
        except anthropic.APIError as exc:
            logger.warning("claude api error: %s", exc)
            raise FormulaServiceError(str(exc)) from exc

        latency_ms = int((time.monotonic() - started) * 1000)

        if response.stop_reason == "refusal":
            raise FormulaServiceError("модель отклонила запрос")

        text = "".join(block.text for block in response.content if block.type == "text")
        payload = parse_model_payload(text)

        usage = TokenUsage(
            input_tokens=getattr(response.usage, "input_tokens", 0) or 0,
            output_tokens=getattr(response.usage, "output_tokens", 0) or 0,
            cache_read_tokens=getattr(response.usage, "cache_read_input_tokens", 0) or 0,
            cache_write_tokens=getattr(response.usage, "cache_creation_input_tokens", 0) or 0,
        )

        return FormulaAnswer(
            **payload,
            usage=usage,
            cost=cost_usd(usage, self._input_price, self._output_price),
            latency_ms=latency_ms,
        )
