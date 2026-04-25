"""Admin settings and gallery images

Revision ID: 002_admin_and_gallery
Revises: 001_initial
Create Date: 2026-04-16
"""

import uuid

import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

from alembic import op

revision = "002_admin_and_gallery"
down_revision = "001_initial"
branch_labels = None
depends_on = None

HERO_IMAGE_URL = (
    "https://images.pexels.com/photos/3779705/pexels-photo-3779705.jpeg"
    "?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop"
)

GALLERY_SEED = [
    # Gabinety
    {
        "src": "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800",
        "alt": "Gabinet stomatologiczny Dentvital",
        "category": "gabinety",
        "caption": "Gabinet stomatologiczny",
        "sort_order": 0,
    },
    {
        "src": "https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg?auto=compress&cs=tinysrgb&w=800",
        "alt": "Nowoczesne wyposażenie gabinetu",
        "category": "gabinety",
        "caption": "Nowoczesne wyposażenie",
        "sort_order": 1,
    },
    {
        "src": "https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=800",
        "alt": "Poczekalnia kliniki Dentvital",
        "category": "gabinety",
        "caption": "Poczekalnia",
        "sort_order": 2,
    },
    {
        "src": "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=800",
        "alt": "Recepcja kliniki",
        "category": "gabinety",
        "caption": "Recepcja",
        "sort_order": 3,
    },
    {
        "src": "https://images.pexels.com/photos/4687360/pexels-photo-4687360.jpeg?auto=compress&cs=tinysrgb&w=800",
        "alt": "Gabinet fizjoterapii",
        "category": "gabinety",
        "caption": "Gabinet fizjoterapii",
        "sort_order": 4,
    },
    # Zespół
    {
        "src": "https://images.pexels.com/photos/6812464/pexels-photo-6812464.jpeg?auto=compress&cs=tinysrgb&w=800",
        "alt": "Zespół kliniki Dentvital",
        "category": "zespol",
        "caption": "Nasz zespół",
        "sort_order": 5,
    },
    {
        "src": "https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=800",
        "alt": "Stomatolog podczas konsultacji",
        "category": "zespol",
        "caption": "Konsultacja stomatologiczna",
        "sort_order": 6,
    },
    {
        "src": "https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=800",
        "alt": "Fizjoterapeuta podczas terapii",
        "category": "zespol",
        "caption": "Fizjoterapia",
        "sort_order": 7,
    },
    {
        "src": "https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=800",
        "alt": "Trening medyczny",
        "category": "zespol",
        "caption": "Trening medyczny",
        "sort_order": 8,
    },
    # Zabiegi
    {
        "src": "https://images.pexels.com/photos/3779705/pexels-photo-3779705.jpeg?auto=compress&cs=tinysrgb&w=800",
        "alt": "Zabieg stomatologiczny",
        "category": "zabiegi",
        "caption": "Leczenie stomatologiczne",
        "sort_order": 9,
    },
    {
        "src": "https://images.pexels.com/photos/3845811/pexels-photo-3845811.jpeg?auto=compress&cs=tinysrgb&w=800",
        "alt": "Diagnostyka RTG",
        "category": "zabiegi",
        "caption": "Diagnostyka cyfrowa",
        "sort_order": 10,
    },
    {
        "src": "https://images.pexels.com/photos/6627639/pexels-photo-6627639.jpeg?auto=compress&cs=tinysrgb&w=800",
        "alt": "Higienizacja zębów",
        "category": "zabiegi",
        "caption": "Higienizacja",
        "sort_order": 11,
    },
]


def upgrade() -> None:
    settings_table = op.create_table(
        "site_settings",
        sa.Column("key", sa.String(100), primary_key=True),
        sa.Column("value", sa.Text(), nullable=False),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
        ),
    )

    gallery_table = op.create_table(
        "gallery_images",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("src", sa.String(500), nullable=False),
        sa.Column("alt", sa.String(300), nullable=False),
        sa.Column("category", sa.String(50), nullable=False),
        sa.Column("caption", sa.String(300), nullable=True),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column(
            "is_active",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("true"),
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
        ),
    )

    op.bulk_insert(
        settings_table,
        [{"key": "hero_image_url", "value": HERO_IMAGE_URL}],
    )

    op.bulk_insert(
        gallery_table,
        [
            {
                "id": uuid.uuid4(),
                "src": item["src"],
                "alt": item["alt"],
                "category": item["category"],
                "caption": item["caption"],
                "sort_order": item["sort_order"],
                "is_active": True,
            }
            for item in GALLERY_SEED
        ],
    )


def downgrade() -> None:
    op.drop_table("gallery_images")
    op.drop_table("site_settings")
