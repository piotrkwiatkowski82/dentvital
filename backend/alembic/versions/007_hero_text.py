"""Hero text seed

Revision ID: 007_hero_text
Revises: 006_team_members
Create Date: 2026-04-16
"""

import json

import sqlalchemy as sa
from alembic import op

revision = "007_hero_text"
down_revision = "006_team_members"
branch_labels = None
depends_on = None

HERO_TEXT_DEFAULT = {
    "badge": "Klinika stomatologiczna",
    "heading_line1": "Twój uśmiech,",
    "heading_line2": "nasz priorytet",
    "subtext": "Kompleksowa opieka, komfort i transparentność na każdym etapie leczenia. Od pierwszej wizyty po gotowy uśmiech.",
    "cta_primary": "Umów wizytę",
    "tags": ["Stomatologia estetyczna", "Implantologia", "Wybielanie zębów"],
}


def upgrade() -> None:
    conn = op.get_bind()
    conn.execute(
        sa.text(
            "INSERT INTO site_settings (key, value, updated_at) VALUES (:key, :value, NOW()) ON CONFLICT (key) DO NOTHING"
        ),
        {"key": "hero_text", "value": json.dumps(HERO_TEXT_DEFAULT, ensure_ascii=False)},
    )


def downgrade() -> None:
    conn = op.get_bind()
    conn.execute(sa.text("DELETE FROM site_settings WHERE key = 'hero_text'"))
