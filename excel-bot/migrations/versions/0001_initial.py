"""Начальная схема: users, requests, payments.

Revision ID: 0001_initial
Revises:
"""

from __future__ import annotations

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("tg_id", sa.BigInteger(), primary_key=True, autoincrement=False),
        sa.Column("username", sa.String(length=64), nullable=True),
        sa.Column("lang", sa.String(length=8), nullable=False, server_default="ru"),
        sa.Column("plan", sa.String(length=16), nullable=False, server_default="free"),
        sa.Column("plan_until", sa.DateTime(timezone=True), nullable=True),
        sa.Column("requests_used_month", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("quota_month", sa.Date(), nullable=False),
        sa.Column(
            "created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()
        ),
    )

    op.create_table(
        "requests",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column(
            "user_id",
            sa.BigInteger(),
            sa.ForeignKey("users.tg_id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("mode", sa.String(length=16), nullable=False, server_default="generate"),
        sa.Column("prompt", sa.Text(), nullable=False),
        sa.Column("response_json", postgresql.JSONB(), nullable=True),
        sa.Column("tokens_in", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("tokens_out", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("cost_usd", sa.Numeric(10, 6), nullable=False, server_default="0"),
        sa.Column("latency_ms", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("feedback", sa.SmallInteger(), nullable=True),
        sa.Column(
            "created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()
        ),
    )
    op.create_index("ix_requests_user_id", "requests", ["user_id"])
    op.create_index("ix_requests_created_at", "requests", ["created_at"])

    op.create_table(
        "payments",
        sa.Column("id", sa.BigInteger(), primary_key=True, autoincrement=True),
        sa.Column(
            "user_id",
            sa.BigInteger(),
            sa.ForeignKey("users.tg_id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("provider", sa.String(length=16), nullable=False),
        sa.Column("amount", sa.Numeric(14, 2), nullable=False),
        sa.Column("currency", sa.String(length=8), nullable=False, server_default="UZS"),
        sa.Column("state", sa.String(length=16), nullable=False, server_default="created"),
        sa.Column("external_id", sa.String(length=128), nullable=True, unique=True),
        sa.Column(
            "created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()
        ),
        sa.Column("paid_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index("ix_payments_user_id", "payments", ["user_id"])


def downgrade() -> None:
    op.drop_table("payments")
    op.drop_index("ix_requests_created_at", table_name="requests")
    op.drop_index("ix_requests_user_id", table_name="requests")
    op.drop_table("requests")
    op.drop_table("users")
