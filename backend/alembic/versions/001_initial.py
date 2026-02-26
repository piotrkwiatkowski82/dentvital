"""Initial tables + seed news

Revision ID: 001_initial
Revises:
Create Date: 2026-02-25
"""

import uuid
from datetime import datetime, timezone

import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

from alembic import op

revision = "001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Bookings
    op.create_table(
        "bookings",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column("service", sa.String(200), nullable=False),
        sa.Column("date", sa.Date(), nullable=False),
        sa.Column("time", sa.Time(), nullable=False),
        sa.Column("name", sa.String(200), nullable=False),
        sa.Column("phone", sa.String(20), nullable=False),
        sa.Column("email", sa.String(200), nullable=True),
        sa.Column("status", sa.String(20), nullable=False, server_default="pending"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    # Contact messages
    op.create_table(
        "contact_messages",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column("name", sa.String(200), nullable=False),
        sa.Column("email", sa.String(200), nullable=False),
        sa.Column("phone", sa.String(20), nullable=True),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    # News
    news_table = op.create_table(
        "news",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column("slug", sa.String(200), unique=True, nullable=False),
        sa.Column("title", sa.String(300), nullable=False),
        sa.Column("excerpt", sa.Text(), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("published_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    # Seed news articles
    op.bulk_insert(
        news_table,
        [
            {
                "id": uuid.uuid4(),
                "slug": "nowy-sprzet-higienizacja",
                "title": "Nowy sprzęt do higienizacji",
                "excerpt": "Zwiększamy komfort i skuteczność zabiegów higienizacji dzięki nowemu unitowi.",
                "content": "Z radością informujemy, że nasi pacjenci mogą korzystać z najnowszego sprzętu do higienizacji. Urządzenia zapewniają delikatniejsze i skuteczniejsze usuwanie osadów.",
                "published_at": datetime(2025, 9, 12, tzinfo=timezone.utc),
                "is_active": True,
            },
            {
                "id": uuid.uuid4(),
                "slug": "warsztaty-profilaktyka",
                "title": "Warsztaty profilaktyki dla pacjentów",
                "excerpt": "Zapraszamy na krótkie warsztaty dotyczące profilaktyki jamy ustnej i kręgosłupa.",
                "content": "W ramach działań edukacyjnych organizujemy warsztaty z profilaktyki: prawidłowe szczotkowanie, nitkowanie oraz ergonomia pracy przy biurku.",
                "published_at": datetime(2025, 8, 28, tzinfo=timezone.utc),
                "is_active": True,
            },
            {
                "id": uuid.uuid4(),
                "slug": "fizjoterapia-plecy",
                "title": "Program dla zdrowych pleców",
                "excerpt": "Indywidualne plany ćwiczeń i terapia manualna — ból pleców pod kontrolą.",
                "content": "Nasi fizjoterapeuci przygotowali program dedykowany osobom z bólem odcinka lędźwiowego. Łączymy terapię manualną z bezpiecznymi ćwiczeniami.",
                "published_at": datetime(2025, 7, 21, tzinfo=timezone.utc),
                "is_active": True,
            },
        ],
    )


def downgrade() -> None:
    op.drop_table("news")
    op.drop_table("contact_messages")
    op.drop_table("bookings")
