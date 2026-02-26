from fastapi import APIRouter, BackgroundTasks, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.models.contact_message import ContactMessage
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.email import EmailService, get_email_service

router = APIRouter(tags=["contact"])


@router.post("/contact", status_code=201, response_model=ContactResponse)
async def create_contact_message(
    data: ContactCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_session),
    email_service: EmailService = Depends(get_email_service),
):
    contact = ContactMessage(
        name=data.name,
        email=data.email,
        phone=data.phone,
        message=data.message,
    )
    db.add(contact)
    await db.commit()
    await db.refresh(contact)

    # Send email notification in background
    background_tasks.add_task(email_service.send_contact_notification, data)

    return contact
