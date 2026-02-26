from datetime import date as date_type

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.models.booking import Booking
from app.schemas.booking import BookingCreate, BookingResponse
from app.services.email import EmailService, get_email_service

router = APIRouter(tags=["bookings"])


@router.post("/bookings", status_code=201, response_model=BookingResponse)
async def create_booking(
    data: BookingCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_session),
    email_service: EmailService = Depends(get_email_service),
):
    # Validate date is not in the past
    if data.date < date_type.today():
        raise HTTPException(status_code=422, detail="Data wizyty nie może być w przeszłości.")

    booking = Booking(
        service=data.service,
        date=data.date,
        time=data.time,
        name=data.name,
        phone=data.phone,
        email=data.email,
    )
    db.add(booking)
    await db.commit()
    await db.refresh(booking)

    # Send email notification in background
    background_tasks.add_task(email_service.send_booking_notification, data)

    return booking
