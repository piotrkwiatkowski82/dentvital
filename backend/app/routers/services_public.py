from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.models.service import Service

router = APIRouter(tags=["services"])


class ServicePublic(BaseModel):
    id: str
    title: str
    icon: str
    description: str
    sort_order: int


class ServiceListResponse(BaseModel):
    items: list[ServicePublic]


@router.get("/services", response_model=ServiceListResponse)
async def list_services(session: AsyncSession = Depends(get_session)) -> ServiceListResponse:
    result = await session.execute(
        select(Service)
        .where(Service.is_active == True)  # noqa: E712
        .order_by(Service.sort_order.asc(), Service.created_at.asc())
    )
    items = list(result.scalars().all())
    return ServiceListResponse(
        items=[ServicePublic(id=str(s.id), title=s.title, icon=s.icon, description=s.description, sort_order=s.sort_order) for s in items]
    )
