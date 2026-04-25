import uuid
from datetime import datetime

from pydantic import BaseModel, Field


class NewsItem(BaseModel):
    slug: str
    title: str
    excerpt: str
    published_at: datetime

    model_config = {"from_attributes": True}


class NewsDetail(BaseModel):
    id: uuid.UUID
    slug: str
    title: str
    excerpt: str
    content: str
    published_at: datetime

    model_config = {"from_attributes": True}


class NewsList(BaseModel):
    items: list[NewsItem]
    total: int


# Admin schemas
class NewsAdminItem(BaseModel):
    model_config = {"from_attributes": True}
    id: uuid.UUID
    slug: str
    title: str
    excerpt: str
    published_at: datetime
    is_active: bool
    created_at: datetime


class NewsAdminList(BaseModel):
    items: list[NewsAdminItem]
    total: int


class NewsAdminDetail(BaseModel):
    model_config = {"from_attributes": True}
    id: uuid.UUID
    slug: str
    title: str
    excerpt: str
    content: str
    published_at: datetime
    is_active: bool


class NewsCreate(BaseModel):
    title: str = Field(..., max_length=300)
    slug: str | None = Field(default=None, max_length=200)
    excerpt: str
    content: str
    published_at: datetime
    is_active: bool = True


class NewsUpdate(BaseModel):
    title: str = Field(..., max_length=300)
    slug: str = Field(..., max_length=200)
    excerpt: str
    content: str
    published_at: datetime
    is_active: bool
