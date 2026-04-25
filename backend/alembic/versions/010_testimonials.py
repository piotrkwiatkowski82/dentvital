"""Testimonials table and seed

Revision ID: 010_testimonials
Revises: 009_seo
Create Date: 2026-04-16
"""

import uuid

import sqlalchemy as sa
from alembic import op

revision = "010_testimonials"
down_revision = "009_seo"
branch_labels = None
depends_on = None

SEED = [
    {"author_name": "Agnieszka W.", "author_title": "Pacjentka od 3 lat", "content": "Jestem pod wrażeniem profesjonalizmu całego zespołu. Leczenie implantologiczne przebiegło bez bólu, a efekt przerósł moje oczekiwania. Polecam z całego serca!", "rating": 5},
    {"author_name": "Tomasz K.", "author_title": "Pacjent od 2 lat", "content": "Przyszedłem ze sporą tremą przed implantami. Lekarz wytłumaczył każdy krok, a sama procedura była szybsza niż myślałem. Teraz nie wyobrażam sobie innej kliniki.", "rating": 5},
    {"author_name": "Marta L.", "author_title": "Pacjentka", "content": "Córka chodziła tu na ortodoncję, a ja na fizjoterapię szczęki. Kompleksowe podejście robi różnicę — wszystko skoordynowane w jednym miejscu. Świetny kontakt z personelem.", "rating": 5},
    {"author_name": "Piotr N.", "author_title": "Pacjent od roku", "content": "Higienizacja wykonana bardzo dokładnie, bez dyskomfortu. Na każdej wizycie dostaje rzetelne informacje o stanie zębów. Nareszcie klinika, gdzie czuć, że pacjent jest na pierwszym miejscu.", "rating": 5},
]


def upgrade() -> None:
    op.create_table(
        "testimonials",
        sa.Column("id", sa.UUID(as_uuid=True), primary_key=True),
        sa.Column("author_name", sa.String(200), nullable=False),
        sa.Column("author_title", sa.String(200), nullable=False, server_default=""),
        sa.Column("content", sa.Text, nullable=False),
        sa.Column("rating", sa.Integer, nullable=False, server_default="5"),
        sa.Column("sort_order", sa.Integer, nullable=False, server_default="0"),
        sa.Column("is_active", sa.Boolean, nullable=False, server_default="true"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    conn = op.get_bind()
    for i, t in enumerate(SEED):
        conn.execute(
            sa.text(
                "INSERT INTO testimonials (id, author_name, author_title, content, rating, sort_order, is_active) VALUES (:id, :name, :title, :content, :rating, :sort, true)"
            ),
            {"id": str(uuid.uuid4()), "name": t["author_name"], "title": t["author_title"], "content": t["content"], "rating": t["rating"], "sort": i},
        )


def downgrade() -> None:
    op.drop_table("testimonials")
