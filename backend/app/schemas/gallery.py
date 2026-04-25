import uuid
from datetime import datetime

from pydantic import BaseModel


class GalleryImagePublic(BaseModel):
    model_config = {"from_attributes": True}

    id: uuid.UUID
    src: str
    alt: str
    category: str
    caption: str | None = None


class GalleryImageAdmin(BaseModel):
    model_config = {"from_attributes": True}

    id: uuid.UUID
    src: str
    alt: str
    category: str
    caption: str | None = None
    sort_order: int
    is_active: bool
    created_at: datetime


class GalleryList(BaseModel):
    items: list[GalleryImagePublic]
    total: int


class GalleryListAdmin(BaseModel):
    items: list[GalleryImageAdmin]
    total: int
