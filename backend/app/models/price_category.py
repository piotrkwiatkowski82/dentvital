import uuid

from sqlalchemy import String, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class PriceCategory(Base):
    __tablename__ = "price_categories"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    icon: Mapped[str] = mapped_column(String(10), nullable=False, default="🦷")
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    rows: Mapped[list["PriceRow"]] = relationship(  # noqa: F821
        "PriceRow",
        back_populates="category",
        cascade="all, delete-orphan",
        order_by="PriceRow.sort_order",
    )
