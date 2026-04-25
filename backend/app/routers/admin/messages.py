import uuid

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.dependencies.auth import get_current_admin
from app.models.contact_message import ContactMessage

router = APIRouter(tags=["admin-messages"])


class MessageResponse(BaseModel):
    model_config = {"from_attributes": True}

    id: uuid.UUID
    name: str
    email: str
    phone: str | None
    message: str
    is_read: bool
    created_at: str

    @classmethod
    def from_orm_obj(cls, obj: ContactMessage) -> "MessageResponse":
        return cls(
            id=obj.id,
            name=obj.name,
            email=obj.email,
            phone=obj.phone,
            message=obj.message,
            is_read=obj.is_read,
            created_at=obj.created_at.isoformat(),
        )


class MessageListResponse(BaseModel):
    items: list[MessageResponse]
    total: int
    unread: int


@router.get("/messages", response_model=MessageListResponse)
async def list_messages(
    unread_only: bool = Query(False),
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> MessageListResponse:
    q = select(ContactMessage).order_by(ContactMessage.created_at.desc())
    if unread_only:
        q = q.where(ContactMessage.is_read == False)  # noqa: E712
    result = await session.execute(q)
    items = list(result.scalars().all())

    unread_result = await session.execute(
        select(ContactMessage).where(ContactMessage.is_read == False)  # noqa: E712
    )
    unread_count = len(list(unread_result.scalars().all()))

    return MessageListResponse(
        items=[MessageResponse.from_orm_obj(m) for m in items],
        total=len(items),
        unread=unread_count,
    )


@router.patch("/messages/{message_id}/read", response_model=MessageResponse)
async def mark_read(
    message_id: uuid.UUID,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> MessageResponse:
    result = await session.execute(
        select(ContactMessage).where(ContactMessage.id == message_id)
    )
    msg = result.scalar_one_or_none()
    if msg is None:
        raise HTTPException(status_code=404, detail="Message not found")
    msg.is_read = True
    await session.commit()
    await session.refresh(msg)
    return MessageResponse.from_orm_obj(msg)


@router.delete("/messages/{message_id}", status_code=204)
async def delete_message(
    message_id: uuid.UUID,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> None:
    result = await session.execute(
        select(ContactMessage).where(ContactMessage.id == message_id)
    )
    msg = result.scalar_one_or_none()
    if msg is None:
        raise HTTPException(status_code=404, detail="Message not found")
    await session.delete(msg)
    await session.commit()
