import uuid
from datetime import datetime

from pydantic import BaseModel


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
