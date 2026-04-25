import uuid

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.dependencies.auth import get_current_admin
from app.models.testimonial import Testimonial

router = APIRouter(tags=["admin-testimonials"])


class TestimonialResponse(BaseModel):
    id: str
    author_name: str
    author_title: str
    content: str
    rating: int
    sort_order: int
    is_active: bool

    @classmethod
    def from_orm(cls, t: Testimonial) -> "TestimonialResponse":
        return cls(id=str(t.id), author_name=t.author_name, author_title=t.author_title, content=t.content, rating=t.rating, sort_order=t.sort_order, is_active=t.is_active)


class TestimonialWrite(BaseModel):
    author_name: str
    author_title: str = ""
    content: str
    rating: int = 5
    sort_order: int = 0
    is_active: bool = True


class TestimonialListResponse(BaseModel):
    items: list[TestimonialResponse]


@router.get("/testimonials", response_model=TestimonialListResponse)
async def list_testimonials(session: AsyncSession = Depends(get_session), _: str = Depends(get_current_admin)) -> TestimonialListResponse:
    result = await session.execute(select(Testimonial).order_by(Testimonial.sort_order.asc(), Testimonial.created_at.asc()))
    return TestimonialListResponse(items=[TestimonialResponse.from_orm(t) for t in result.scalars().all()])


@router.post("/testimonials", response_model=TestimonialResponse, status_code=201)
async def create_testimonial(data: TestimonialWrite, session: AsyncSession = Depends(get_session), _: str = Depends(get_current_admin)) -> TestimonialResponse:
    t = Testimonial(author_name=data.author_name, author_title=data.author_title, content=data.content, rating=data.rating, sort_order=data.sort_order, is_active=data.is_active)
    session.add(t)
    await session.commit()
    await session.refresh(t)
    return TestimonialResponse.from_orm(t)


@router.put("/testimonials/{tid}", response_model=TestimonialResponse)
async def update_testimonial(tid: uuid.UUID, data: TestimonialWrite, session: AsyncSession = Depends(get_session), _: str = Depends(get_current_admin)) -> TestimonialResponse:
    result = await session.execute(select(Testimonial).where(Testimonial.id == tid))
    t = result.scalar_one_or_none()
    if t is None:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    t.author_name = data.author_name
    t.author_title = data.author_title
    t.content = data.content
    t.rating = data.rating
    t.sort_order = data.sort_order
    t.is_active = data.is_active
    await session.commit()
    await session.refresh(t)
    return TestimonialResponse.from_orm(t)


@router.delete("/testimonials/{tid}", status_code=204)
async def delete_testimonial(tid: uuid.UUID, session: AsyncSession = Depends(get_session), _: str = Depends(get_current_admin)) -> None:
    result = await session.execute(select(Testimonial).where(Testimonial.id == tid))
    t = result.scalar_one_or_none()
    if t is None:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    await session.delete(t)
    await session.commit()
