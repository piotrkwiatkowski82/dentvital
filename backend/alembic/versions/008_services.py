"""Services table and seed

Revision ID: 008_services
Revises: 007_hero_text
Create Date: 2026-04-16
"""

import uuid

import sqlalchemy as sa
from alembic import op

revision = "008_services"
down_revision = "007_hero_text"
branch_labels = None
depends_on = None

SEED = [
    {"title": "Konsultacje i planowanie", "icon": "search", "desc": "Cyfrowe skanery, RTG i analiza uśmiechu — dokładna diagnostyka przed rozpoczęciem leczenia.", "sort_order": 0},
    {"title": "Stomatologia estetyczna", "icon": "sparkle", "desc": "Licówki, odbudowy kompozytowe i bonding dla harmonijnego uśmiechu.", "sort_order": 1},
    {"title": "Implantologia & protetyka", "icon": "shield", "desc": "Implanty w technologii CAD/CAM oraz prace protetyczne wykonywane w naszym laboratorium.", "sort_order": 2},
    {"title": "Profilaktyka i higienizacja", "icon": "pulse", "desc": "Skaling ultradźwiękowy, piaskowanie i instruktaż domowej pielęgnacji.", "sort_order": 3},
    {"title": "Chirurgia i endodoncja", "icon": "sun", "desc": "Precyzyjne zabiegi mikroskopowe, leczenie kanałowe i regeneracja tkanek.", "sort_order": 4},
    {"title": "Opieka rodzinna", "icon": "users", "desc": "Wizyty adaptacyjne, logopedia i fizjoterapia stomatologiczna w jednym miejscu.", "sort_order": 5},
]


def upgrade() -> None:
    op.create_table(
        "services",
        sa.Column("id", sa.UUID(as_uuid=True), primary_key=True),
        sa.Column("title", sa.String(200), nullable=False),
        sa.Column("icon", sa.String(50), nullable=False, server_default="sparkle"),
        sa.Column("description", sa.Text, nullable=False, server_default=""),
        sa.Column("sort_order", sa.Integer, nullable=False, server_default="0"),
        sa.Column("is_active", sa.Boolean, nullable=False, server_default="true"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    conn = op.get_bind()
    for s in SEED:
        conn.execute(
            sa.text(
                "INSERT INTO services (id, title, icon, description, sort_order, is_active) VALUES (:id, :title, :icon, :desc, :sort_order, true)"
            ),
            {"id": str(uuid.uuid4()), "title": s["title"], "icon": s["icon"], "desc": s["desc"], "sort_order": s["sort_order"]},
        )


def downgrade() -> None:
    op.drop_table("services")
