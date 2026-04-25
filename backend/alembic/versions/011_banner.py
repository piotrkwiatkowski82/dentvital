"""Banner/announcement setting seed

Revision ID: 011_banner
Revises: 010_testimonials
Create Date: 2026-04-16
"""

import json

import sqlalchemy as sa
from alembic import op

revision = "011_banner"
down_revision = "010_testimonials"
branch_labels = None
depends_on = None

BANNER_DEFAULT = {
    "is_active": False,
    "text": "",
    "type": "info",
    "link_url": "",
    "link_text": "",
    "dismissable": True,
}


def upgrade() -> None:
    conn = op.get_bind()
    conn.execute(
        sa.text(
            "INSERT INTO site_settings (key, value, updated_at) VALUES (:key, :value, NOW()) ON CONFLICT (key) DO NOTHING"
        ),
        {"key": "banner", "value": json.dumps(BANNER_DEFAULT)},
    )


def downgrade() -> None:
    conn = op.get_bind()
    conn.execute(sa.text("DELETE FROM site_settings WHERE key = 'banner'"))
