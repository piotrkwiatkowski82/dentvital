"""Pricing categories and rows

Revision ID: 003_pricing
Revises: 002_admin_and_gallery
Create Date: 2026-04-16
"""

import uuid

import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

from alembic import op

revision = "003_pricing"
down_revision = "002_admin_and_gallery"
branch_labels = None
depends_on = None

SEED = [
    {
        "icon": "🦷",
        "title": "Stomatologia zachowawcza",
        "rows": [
            ("Wypełnienie kompozytowe", "300–500 zł"),
            ("Lakowanie bruzd", "150 zł"),
            ("Leczenie kanałowe (1 kanał)", "600 zł"),
            ("Leczenie kanałowe (2–3 kanały)", "800–1000 zł"),
            ("Scaling (skaling)", "250 zł"),
            ("Piaskowanie", "300 zł"),
            ("Fluoryzacja", "80 zł"),
        ],
    },
    {
        "icon": "✨",
        "title": "Stomatologia estetyczna",
        "rows": [
            ("Licówka kompozytowa", "600 zł"),
            ("Licówka porcelanowa", "2000 zł"),
            ("Wybielanie (lampa)", "1500 zł"),
            ("Wybielanie (nakładki domowe)", "350 zł"),
            ("Proteza tymczasowa", "1000 zł"),
        ],
    },
    {
        "icon": "⚕️",
        "title": "Chirurgia stomatologiczna",
        "rows": [
            ("Ekstrakcja zęba", "300–600 zł"),
            ("Ekstrakcja zęba mądrości", "800 zł"),
            ("Augmentacja kości", "2500–5000 zł"),
            ("Plastyka dziąseł", "od 200 zł / punkt"),
        ],
    },
    {
        "icon": "👑",
        "title": "Protetyka",
        "rows": [
            ("Korona pełnoceramiczna / cyrkonowa", "1200–1800 zł"),
            ("Most ceramiczny (za przęsło)", "1200–1800 zł"),
            ("Proteza akrylowa częściowa", "1500 zł"),
            ("Proteza akrylowa całkowita", "2000 zł"),
            ("Proteza na 4 implantach", "16 000 zł"),
        ],
    },
    {
        "icon": "🔩",
        "title": "Implantologia",
        "rows": [
            ("Konsultacja implantologiczna", "250 zł"),
            ("Implant (wszczepienie)", "3000–4000 zł"),
            ("Podniesienie zatoki (sinus lift)", "2500–4500 zł"),
            ("Augmentacja kości (GBR)", "2500–5000 zł"),
        ],
    },
    {
        "icon": "🦴",
        "title": "Ortodoncja",
        "rows": [
            ("Konsultacja ortodontyczna", "200 zł"),
            ("Aparat stały (łuk)", "2800–4100 zł"),
            ("Aparat ruchomy", "400–1800 zł"),
            ("Retainer stały", "300–500 zł"),
            ("Retainer ruchomy", "100–200 zł"),
        ],
    },
    {
        "icon": "💆",
        "title": "Medycyna estetyczna",
        "rows": [
            ("Wypełniacz tkankowy (kwas hialuronowy)", "900 zł / ml"),
            ("Toksyna botulinowa (Botox) — 1 okolica", "700 zł"),
            ("Toksyna botulinowa (Botox) — 3 okolice", "1200 zł"),
            ("Biorewitalizacja skóry", "400–1400 zł"),
        ],
    },
]


def upgrade() -> None:
    categories_table = op.create_table(
        "price_categories",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("title", sa.String(200), nullable=False),
        sa.Column("icon", sa.String(10), nullable=False, server_default="🦷"),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
    )

    rows_table = op.create_table(
        "price_rows",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column(
            "category_id",
            UUID(as_uuid=True),
            sa.ForeignKey("price_categories.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("service", sa.String(300), nullable=False),
        sa.Column("price", sa.String(100), nullable=False),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
    )

    category_records = []
    row_records = []

    for cat_order, cat in enumerate(SEED):
        cat_id = uuid.uuid4()
        category_records.append(
            {"id": cat_id, "title": cat["title"], "icon": cat["icon"], "sort_order": cat_order}
        )
        for row_order, (service, price) in enumerate(cat["rows"]):
            row_records.append(
                {
                    "id": uuid.uuid4(),
                    "category_id": cat_id,
                    "service": service,
                    "price": price,
                    "sort_order": row_order,
                }
            )

    op.bulk_insert(categories_table, category_records)
    op.bulk_insert(rows_table, row_records)


def downgrade() -> None:
    op.drop_table("price_rows")
    op.drop_table("price_categories")
