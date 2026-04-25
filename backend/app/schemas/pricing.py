import uuid

from pydantic import BaseModel, Field


class PriceRowOut(BaseModel):
    model_config = {"from_attributes": True}
    id: uuid.UUID
    service: str
    price: str
    sort_order: int


class PriceCategoryOut(BaseModel):
    model_config = {"from_attributes": True}
    id: uuid.UUID
    title: str
    icon: str
    sort_order: int
    rows: list[PriceRowOut]


class PricingResponse(BaseModel):
    categories: list[PriceCategoryOut]


# Write schemas
class PriceCategoryCreate(BaseModel):
    title: str = Field(..., max_length=200)
    icon: str = Field(default="🦷", max_length=10)


class PriceCategoryUpdate(BaseModel):
    title: str = Field(..., max_length=200)
    icon: str = Field(..., max_length=10)


class PriceRowCreate(BaseModel):
    service: str = Field(..., max_length=300)
    price: str = Field(..., max_length=100)


class PriceRowUpdate(BaseModel):
    service: str = Field(..., max_length=300)
    price: str = Field(..., max_length=100)
