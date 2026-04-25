import uuid

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.dependencies.auth import get_current_admin
from app.models.booking import Booking
from app.schemas.booking import BookingResponse

router = APIRouter(tags=["admin-bookings"])

VALID_STATUSES = {"pending", "confirmed", "cancelled"}


class BookingListResponse(BaseModel):
    items: list[BookingResponse]
    total: int


class StatusUpdate(BaseModel):
    status: str


@router.get("/bookings", response_model=BookingListResponse)
async def list_bookings(
    status: str | None = Query(None),
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> BookingListResponse:
    q = select(Booking).order_by(Booking.date.desc(), Booking.time.desc())
    if status and status in VALID_STATUSES:
        q = q.where(Booking.status == status)
    result = await session.execute(q)
    items = list(result.scalars().all())
    return BookingListResponse(items=items, total=len(items))


@router.patch("/bookings/{booking_id}/status", response_model=BookingResponse)
async def update_booking_status(
    booking_id: uuid.UUID,
    data: StatusUpdate,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> Booking:
    if data.status not in VALID_STATUSES:
        raise HTTPException(status_code=422, detail="Invalid status")
    result = await session.execute(select(Booking).where(Booking.id == booking_id))
    booking = result.scalar_one_or_none()
    if booking is None:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking.status = data.status
    await session.commit()
    await session.refresh(booking)
    return booking
