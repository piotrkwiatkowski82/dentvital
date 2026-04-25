from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.models.testimonial import Testimonial

router = APIRouter(tags=["testimonials"])


class TestimonialPublic(BaseModel):
    id: str
    author_name: str
    author_title: str
    content: str
    rating: int


class TestimonialListResponse(BaseModel):
    items: list[TestimonialPublic]


@router.get("/testimonials", response_model=TestimonialListResponse)
async def list_testimonials(session: AsyncSession = Depends(get_session)) -> TestimonialListResponse:
    result = await session.execute(
        select(Testimonial)
        .where(Testimonial.is_active == True)  # noqa: E712
        .order_by(Testimonial.sort_order.asc(), Testimonial.created_at.asc())
    )
    items = list(result.scalars().all())
    return TestimonialListResponse(
        items=[TestimonialPublic(id=str(t.id), author_name=t.author_name, author_title=t.author_title, content=t.content, rating=t.rating) for t in items]
    )
