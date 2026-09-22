"""Конфигурация сервиса. Всё читается из переменных окружения."""

from __future__ import annotations

from functools import lru_cache

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # Telegram
    bot_token: str = ""
    webhook_base: str = ""
    webhook_secret: str = "dev-secret"
    admin_ids: list[int] = Field(default_factory=list)

    # Claude API
    anthropic_api_key: str = ""
    claude_model: str = "claude-haiku-4-5"
    claude_max_tokens: int = 1000
    claude_temperature: float = 0.2
    claude_timeout_seconds: float = 30.0
    claude_input_price_per_mtok: float = 1.0
    claude_output_price_per_mtok: float = 5.0

    # Инфраструктура
    database_url: str = "postgresql+asyncpg://excelbot:excelbot@localhost:5432/excelbot"
    redis_url: str = "redis://localhost:6379/0"
    sentry_dsn: str = ""
    log_level: str = "INFO"

    # Тарифы и лимиты
    free_monthly_limit: int = 10
    pro_monthly_limit: int = 300
    pro_price_uzs: int = 29_000
    rate_limit_per_minute: int = 5
    max_input_chars: int = 1000

    # Эквайринг
    payment_provider: str = "disabled"
    support_contact: str = ""

    @field_validator("admin_ids", mode="before")
    @classmethod
    def _parse_admin_ids(cls, value: object) -> object:
        """ADMIN_IDS приходит строкой вида "1,2,3" — pydantic сам такое не разберёт."""
        if isinstance(value, str):
            return [int(part) for part in value.replace(" ", "").split(",") if part]
        return value

    @property
    def webhook_path(self) -> str:
        return f"/tg/{self.webhook_secret}"

    @property
    def webhook_url(self) -> str:
        return f"{self.webhook_base.rstrip('/')}{self.webhook_path}"

    def is_admin(self, tg_id: int) -> bool:
        return tg_id in self.admin_ids

    def monthly_limit(self, plan: str) -> int:
        return self.pro_monthly_limit if plan == "pro" else self.free_monthly_limit


@lru_cache
def get_settings() -> Settings:
    return Settings()
