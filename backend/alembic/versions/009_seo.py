"""SEO meta settings seed

Revision ID: 009_seo
Revises: 008_services
Create Date: 2026-04-16
"""

import json

import sqlalchemy as sa
from alembic import op

revision = "009_seo"
down_revision = "008_services"
branch_labels = None
depends_on = None

SEO_DEFAULT = {
    "home": {
        "title": "Dentvital — Klinika stomatologiczna Szczecin",
        "description": "Kompleksowa klinika stomatologiczna w Szczecinie. Implanty, ortodoncja, stomatologia estetyczna, fizjoterapia i logopedia pod jednym dachem.",
    },
    "uslugi": {
        "title": "Usługi — Dentvital Szczecin",
        "description": "Oferta Dentvital: stomatologia zachowawcza, estetyczna, implantologia, protetyka, ortodoncja, chirurgia i fizjoterapia stomatologiczna.",
    },
    "galeria": {
        "title": "Galeria — Dentvital Szczecin",
        "description": "Zdjęcia gabinetów, zespołu i zabiegów kliniki Dentvital w Szczecinie.",
    },
    "aktualnosci": {
        "title": "Aktualności — Dentvital Szczecin",
        "description": "Najnowsze informacje, porady stomatologiczne i aktualności z kliniki Dentvital.",
    },
    "zespol": {
        "title": "Nasz zespół — Dentvital Szczecin",
        "description": "Poznaj specjalistów kliniki Dentvital: stomatolodzy, ortodonci, fizjoterapeuci, logopedzi i trenerzy medyczni.",
    },
    "kontakt": {
        "title": "Kontakt — Dentvital Szczecin",
        "description": "Skontaktuj się z kliniką Dentvital. Adres, telefon, godziny otwarcia i formularz kontaktowy.",
    },
}


def upgrade() -> None:
    conn = op.get_bind()
    conn.execute(
        sa.text(
            "INSERT INTO site_settings (key, value, updated_at) VALUES (:key, :value, NOW()) ON CONFLICT (key) DO NOTHING"
        ),
        {"key": "seo", "value": json.dumps(SEO_DEFAULT, ensure_ascii=False)},
    )


def downgrade() -> None:
    conn = op.get_bind()
    conn.execute(sa.text("DELETE FROM site_settings WHERE key = 'seo'"))
