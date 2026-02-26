import uuid
from datetime import date, datetime, time

from pydantic import BaseModel, EmailStr, Field


class BookingCreate(BaseModel):
    service: str = Field(..., min_length=2, max_length=200)
    date: date
    time: time
    name: str = Field(..., min_length=2, max_length=200)
    phone: str = Field(..., min_length=6, max_length=20)
    email: EmailStr | None = None


class BookingResponse(BaseModel):
    id: uuid.UUID
    service: str
    date: date
    time: time
    name: str
    phone: str
    email: str | None
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}
