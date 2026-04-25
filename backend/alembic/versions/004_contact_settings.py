"""Contact settings seed

Revision ID: 004_contact_settings
Revises: 003_pricing
Create Date: 2026-04-16
"""

import json

import sqlalchemy as sa
from alembic import op

revision = "004_contact_settings"
down_revision = "003_pricing"
branch_labels = None
depends_on = None

CONTACT_DEFAULT = {
    "address": "ul. Wawrzyniaka 6w, 70-392 Szczecin",
    "address_short": "ul. Wawrzyniaka 6w",
    "city": "70-392 Szczecin",
    "phone": "+48 666 977 530",
    "phone_raw": "+48666977530",
    "email": "recepcja@dentvital.pl",
    "hours": "pn\u2013pt 9:00\u201320:00, sob 9:00\u201313:00",
    "map_embed": (
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2373.1234567890"
        "!2d14.5528!3d53.4289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2"
        "!1s0x0%3A0x0!2zNTPCsDI1JzQ0LjAiTiAxNMKwMzMnMTAuMCJF!5e0!3m2!1spl!2spl!4v1234567890"
    ),
    "map_link": "https://goo.gl/maps/example",
    "building_image_url": (
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
        "?auto=compress&cs=tinysrgb&w=900&h=600&fit=crop"
    ),
}


def upgrade() -> None:
    conn = op.get_bind()
    conn.execute(
        sa.text(
            """
            INSERT INTO site_settings (key, value, updated_at)
            VALUES (:key, :value, NOW())
            ON CONFLICT (key) DO NOTHING
            """
        ),
        {"key": "contact", "value": json.dumps(CONTACT_DEFAULT, ensure_ascii=False)},
    )


def downgrade() -> None:
    conn = op.get_bind()
    conn.execute(
        sa.text("DELETE FROM site_settings WHERE key = 'contact'")
    )
