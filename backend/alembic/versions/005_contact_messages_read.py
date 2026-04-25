"""Add is_read to contact_messages

Revision ID: 005_contact_messages_read
Revises: 004_contact_settings
Create Date: 2026-04-16
"""

import sqlalchemy as sa
from alembic import op

revision = "005_contact_messages_read"
down_revision = "004_contact_settings"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "contact_messages",
        sa.Column("is_read", sa.Boolean(), nullable=False, server_default="false"),
    )


def downgrade() -> None:
    op.drop_column("contact_messages", "is_read")
