import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    email: EmailStr
    phone: str | None = Field(None, max_length=20)
    message: str = Field(..., min_length=10, max_length=5000)


class ContactResponse(BaseModel):
    id: uuid.UUID
    message: str = "Wiadomość została wysłana. Dziękujemy!"
    created_at: datetime

    model_config = {"from_attributes": True}
