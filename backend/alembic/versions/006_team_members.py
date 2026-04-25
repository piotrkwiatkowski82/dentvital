"""Team members table and seed

Revision ID: 006_team_members
Revises: 005_contact_messages_read
Create Date: 2026-04-16
"""

import json
import uuid

import sqlalchemy as sa
from alembic import op

revision = "006_team_members"
down_revision = "005_contact_messages_read"
branch_labels = None
depends_on = None

SEED = [
    {
        "name": "lek. dent. Anna Kowalska",
        "title": "Stomatolog, założycielka kliniki",
        "specializations": ["Stomatologia zachowawcza", "Stomatologia estetyczna", "Protetyka"],
        "bio": "Absolwentka Pomorskiego Uniwersytetu Medycznego w Szczecinie. Od ponad 15 lat zajmuje się kompleksową opieką stomatologiczną. Specjalizuje się w stomatologii estetycznej i odbudowach protetycznych.",
        "image_url": "https://images.pexels.com/photos/5214999/pexels-photo-5214999.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        "sort_order": 0,
    },
    {
        "name": "lek. dent. Marek Nowak",
        "title": "Implantolog",
        "specializations": ["Implantologia", "Chirurgia stomatologiczna", "Protetyka CAD/CAM"],
        "bio": "Specjalista implantologii z wieloletnim doświadczeniem. Ukończył liczne kursy podyplomowe w kraju i za granicą. Wykonuje implanty jednoetapowe, augmentację kości oraz zaawansowane prace protetyczne.",
        "image_url": "https://images.pexels.com/photos/6812464/pexels-photo-6812464.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        "sort_order": 1,
    },
    {
        "name": "lek. dent. Katarzyna Wiśniewska",
        "title": "Ortodonta",
        "specializations": ["Ortodoncja", "Alignery", "Aparaty stałe"],
        "bio": "Specjalista ortodoncji, certyfikowany terapeuta systemów alignerowych. Prowadzi leczenie ortodontyczne zarówno u dzieci, jak i dorosłych, stosując najnowsze techniki cyfrowego planowania leczenia.",
        "image_url": "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        "sort_order": 2,
    },
    {
        "name": "mgr fizjoterapii Piotr Zając",
        "title": "Fizjoterapeuta",
        "specializations": ["Fizjoterapia stomatologiczna (TMJ)", "Terapia manualna", "Rehabilitacja pourazowa"],
        "bio": "Magister fizjoterapii, specjalista terapii manualnej i rehabilitacji. Zajmuje się leczeniem bólów kręgosłupa, stawów oraz fizjoterapią stomatologiczną — leczeniem zaburzeń stawu skroniowo-żuchwowego.",
        "image_url": "https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        "sort_order": 3,
    },
    {
        "name": "mgr Magdalena Dąbrowska",
        "title": "Logopeda",
        "specializations": ["Logopedia", "Terapia wad wymowy", "Terapia dzieci i dorosłych"],
        "bio": "Certyfikowany logopeda z doświadczeniem w terapii wad wymowy u dzieci i dorosłych. Współpracuje z ortodontami kliniki w zakresie terapii miofunkcjonalnej i przygotowania do leczenia ortodontycznego.",
        "image_url": "https://images.pexels.com/photos/5214997/pexels-photo-5214997.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        "sort_order": 4,
    },
    {
        "name": "mgr Tomasz Król",
        "title": "Trener medyczny",
        "specializations": ["Trening medyczny", "Programy funkcjonalne", "Rehabilitacja sportowa"],
        "bio": "Certyfikowany trener medyczny z wykształceniem w zakresie fizjoterapii i treningu funkcjonalnego. Tworzy indywidualne programy ćwiczeń wspierające rehabilitację i poprawiające sprawność ruchową.",
        "image_url": "https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
        "sort_order": 5,
    },
]


def upgrade() -> None:
    op.create_table(
        "team_members",
        sa.Column("id", sa.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(200), nullable=False),
        sa.Column("title", sa.String(200), nullable=False),
        sa.Column("specializations", sa.Text, nullable=False, server_default="[]"),
        sa.Column("bio", sa.Text, nullable=False, server_default=""),
        sa.Column("image_url", sa.String(500), nullable=False, server_default=""),
        sa.Column("sort_order", sa.Integer, nullable=False, server_default="0"),
        sa.Column("is_active", sa.Boolean, nullable=False, server_default="true"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    conn = op.get_bind()
    for member in SEED:
        conn.execute(
            sa.text(
                """
                INSERT INTO team_members (id, name, title, specializations, bio, image_url, sort_order, is_active)
                VALUES (:id, :name, :title, :specializations, :bio, :image_url, :sort_order, true)
                """
            ),
            {
                "id": str(uuid.uuid4()),
                "name": member["name"],
                "title": member["title"],
                "specializations": json.dumps(member["specializations"], ensure_ascii=False),
                "bio": member["bio"],
                "image_url": member["image_url"],
                "sort_order": member["sort_order"],
            },
        )


def downgrade() -> None:
    op.drop_table("team_members")
