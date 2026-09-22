from __future__ import annotations

import json
from types import SimpleNamespace

import anthropic
import pytest

from app.db.models import MODE_CHECK
from app.services.claude_client import ClaudeService, FormulaServiceError, parse_model_payload
from app.services.prompts import build_user_message

PAYLOAD = {
    "formula_ru": '=ЕСЛИ(A2>0;"да";"нет")',
    "formula_en": '=IF(A2>0,"да","нет")',
    "explanation": "Проверяет значение и возвращает текст.",
    "note": "",
}


class FakeMessages:
    def __init__(self, response, recorder: dict):
        self._response = response
        self._recorder = recorder

    async def create(self, **kwargs):
        self._recorder.update(kwargs)
        if isinstance(self._response, Exception):
            raise self._response
        return self._response


class FakeClient:
    def __init__(self, response, recorder: dict):
        self.messages = FakeMessages(response, recorder)


def make_response(text: str, stop_reason: str = "end_turn"):
    return SimpleNamespace(
        content=[SimpleNamespace(type="text", text=text)],
        stop_reason=stop_reason,
        usage=SimpleNamespace(
            input_tokens=600,
            output_tokens=400,
            cache_read_input_tokens=0,
            cache_creation_input_tokens=0,
        ),
    )


def make_service(response, recorder: dict | None = None) -> ClaudeService:
    return ClaudeService(
        api_key="test",
        model="claude-haiku-4-5",
        client=FakeClient(response, recorder if recorder is not None else {}),
    )


def test_parse_plain_json():
    parsed = parse_model_payload(json.dumps(PAYLOAD))
    assert parsed["formula_ru"] == PAYLOAD["formula_ru"]
    assert parsed["note"] == ""


def test_parse_json_wrapped_in_text():
    wrapped = "Вот ответ:\n```json\n" + json.dumps(PAYLOAD) + "\n```"
    assert parse_model_payload(wrapped)["formula_en"] == PAYLOAD["formula_en"]


def test_parse_rejects_garbage():
    with pytest.raises(FormulaServiceError):
        parse_model_payload("совсем не json")


def test_parse_requires_core_fields():
    with pytest.raises(FormulaServiceError):
        parse_model_payload(json.dumps({"formula_ru": "=A1"}))


def test_parse_normalises_nulls():
    parsed = parse_model_payload(
        json.dumps(
            {"formula_ru": None, "formula_en": None, "explanation": "нужен VBA", "note": None}
        )
    )
    assert parsed["formula_ru"] == ""
    assert parsed["note"] == ""


async def test_ask_returns_answer_with_usage_and_cost():
    service = make_service(make_response(json.dumps(PAYLOAD)))
    answer = await service.ask("посчитай сумму")
    assert answer.formula_ru == PAYLOAD["formula_ru"]
    assert answer.usage.input_tokens == 600
    assert float(answer.cost) == pytest.approx(0.0026)
    assert answer.has_formula is True


async def test_ask_sends_cached_system_prompt_and_schema():
    recorder: dict = {}
    service = make_service(make_response(json.dumps(PAYLOAD)), recorder)
    await service.ask("=ВПР(...) выдаёт #Н/Д", MODE_CHECK)

    assert recorder["model"] == "claude-haiku-4-5"
    assert recorder["system"][0]["cache_control"] == {"type": "ephemeral"}
    assert recorder["output_config"]["format"]["type"] == "json_schema"
    assert "исправленную формулу" in recorder["messages"][0]["content"]


async def test_ask_wraps_api_errors():
    error = anthropic.APIConnectionError(request=None)
    service = make_service(error)
    with pytest.raises(FormulaServiceError):
        await service.ask("задача")


async def test_ask_rejects_refusal():
    service = make_service(make_response(json.dumps(PAYLOAD), stop_reason="refusal"))
    with pytest.raises(FormulaServiceError):
        await service.ask("задача")


def test_variant_and_elaborate_change_the_message():
    base = build_user_message("задача")
    assert "другое решение" in build_user_message("задача", variant=True)
    assert "по аргументам" in build_user_message("задача", elaborate=True)
    assert base not in ("",)
