"""Схема БД: users, requests, payments — ровно три таблицы, как в ТЗ."""

from __future__ import annotations

import datetime as dt
from decimal import Decimal

from sqlalchemy import (
    JSON,
    BigInteger,
    Date,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    Numeric,
    SmallInteger,
    String,
    Text,
    func,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

# Боевая БД — PostgreSQL; варианты для sqlite нужны только тестам, которые
# гоняют тот же слой репозитория на файловой/in-memory базе.
BigIntPk = BigInteger().with_variant(Integer, "sqlite")
JsonDict = JSONB().with_variant(JSON, "sqlite")

PLAN_FREE = "free"
PLAN_PRO = "pro"

PAYMENT_CREATED = "created"
PAYMENT_PAID = "paid"
PAYMENT_CANCELED = "canceled"

MODE_GENERATE = "generate"
MODE_CHECK = "check"


class User(Base):
    __tablename__ = "users"

    tg_id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=False)
    username: Mapped[str | None] = mapped_column(String(64))
    lang: Mapped[str] = mapped_column(String(8), default="ru", server_default="ru")
    plan: Mapped[str] = mapped_column(String(16), default=PLAN_FREE, server_default=PLAN_FREE)
    plan_until: Mapped[dt.datetime | None] = mapped_column(DateTime(timezone=True))
    requests_used_month: Mapped[int] = mapped_column(Integer, default=0, server_default="0")
    # Месяц, к которому относится счётчик (всегда 1-е число). Когда наступает новый
    # месяц, счётчик обнуляется при первом же обращении пользователя — крон не нужен.
    quota_month: Mapped[dt.date] = mapped_column(Date, default=dt.date.today)
    created_at: Mapped[dt.datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    requests: Mapped[list[Request]] = relationship(back_populates="user")


class Request(Base):
    __tablename__ = "requests"

    id: Mapped[int] = mapped_column(BigIntPk, primary_key=True)
    user_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey("users.tg_id", ondelete="CASCADE"), index=True
    )
    mode: Mapped[str] = mapped_column(String(16), default=MODE_GENERATE)
    prompt: Mapped[str] = mapped_column(Text)
    response_json: Mapped[dict | None] = mapped_column(JsonDict)
    tokens_in: Mapped[int] = mapped_column(Integer, default=0)
    tokens_out: Mapped[int] = mapped_column(Integer, default=0)
    cost_usd: Mapped[Decimal] = mapped_column(Numeric(10, 6), default=Decimal("0"))
    latency_ms: Mapped[int] = mapped_column(Integer, default=0)
    # NULL — оценки нет, -1 — нажали «не сработало». Отсюда метрика доли жалоб.
    feedback: Mapped[int | None] = mapped_column(SmallInteger)
    created_at: Mapped[dt.datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    user: Mapped[User] = relationship(back_populates="requests")


Index("ix_requests_created_at", Request.created_at)


class Payment(Base):
    __tablename__ = "payments"

    id: Mapped[int] = mapped_column(BigIntPk, primary_key=True)
    user_id: Mapped[int] = mapped_column(
        BigInteger, ForeignKey("users.tg_id", ondelete="CASCADE"), index=True
    )
    provider: Mapped[str] = mapped_column(String(16))
    amount: Mapped[Decimal] = mapped_column(Numeric(14, 2))
    currency: Mapped[str] = mapped_column(String(8), default="UZS")
    state: Mapped[str] = mapped_column(String(16), default=PAYMENT_CREATED)
    # Идентификатор транзакции на стороне провайдера. Уникальный — это и есть защита
    # от повторного callback'а: задвоить оплату не получится.
    external_id: Mapped[str | None] = mapped_column(String(128), unique=True)
    created_at: Mapped[dt.datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    paid_at: Mapped[dt.datetime | None] = mapped_column(DateTime(timezone=True))
