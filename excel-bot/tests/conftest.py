from __future__ import annotations

import datetime as dt
from dataclasses import dataclass, field

import pytest
import pytest_asyncio
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.config import Settings
from app.db.base import Base
from app.services.claude_client import FormulaAnswer
from app.services.pricing import TokenUsage, cost_usd


@pytest.fixture
def settings() -> Settings:
    return Settings(
        bot_token="test",
        anthropic_api_key="test",
        free_monthly_limit=10,
        pro_monthly_limit=300,
        rate_limit_per_minute=5,
        max_input_chars=1000,
        admin_ids=[42],
    )


class FakeRedis:
    """Минимальный Redis: столько, сколько нужно RateLimiter."""

    def __init__(self) -> None:
        self.values: dict[str, int] = {}
        self.ttls: dict[str, int] = {}

    async def incr(self, name: str) -> int:
        self.values[name] = self.values.get(name, 0) + 1
        return self.values[name]

    async def expire(self, name: str, time: int) -> bool:
        self.ttls[name] = time
        return True

    async def ttl(self, name: str) -> int:
        return self.ttls.get(name, -1)


@pytest.fixture
def fake_redis() -> FakeRedis:
    return FakeRedis()


@dataclass
class FakeClaude:
    """Подменяет ClaudeService в тестах сценария."""

    answer: FormulaAnswer | None = None
    error: Exception | None = None
    calls: list[dict] = field(default_factory=list)

    async def ask(self, task, mode="generate", *, variant=False, elaborate=False):
        self.calls.append({"task": task, "mode": mode, "variant": variant, "elaborate": elaborate})
        if self.error:
            raise self.error
        return self.answer or sample_answer()


def sample_answer(**overrides) -> FormulaAnswer:
    data = {
        "formula_ru": '=СУММЕСЛИМН(C2:C100;B2:B100;"Иванов")',
        "formula_en": '=SUMIFS(C2:C100,B2:B100,"Иванов")',
        "explanation": "Формула складывает значения из столбца C по условию.",
        "note": "Диапазоны замените на свои.",
        "usage": TokenUsage(input_tokens=600, output_tokens=400),
        "latency_ms": 1200,
    }
    data.update(overrides)
    data.setdefault("cost", cost_usd(data["usage"], 1.0, 5.0))
    return FormulaAnswer(**data)


@pytest_asyncio.fixture
async def session_factory():
    engine = create_async_engine("sqlite+aiosqlite:///:memory:")
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    factory = async_sessionmaker(engine, expire_on_commit=False)
    yield factory
    await engine.dispose()


@pytest.fixture
def today() -> dt.date:
    return dt.date(2026, 3, 15)
