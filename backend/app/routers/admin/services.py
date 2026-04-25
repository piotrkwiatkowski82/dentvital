import uuid

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.dependencies.auth import get_current_admin
from app.models.service import Service

router = APIRouter(tags=["admin-services"])

VALID_ICONS = {"search", "sparkle", "shield", "pulse", "sun", "users", "tooth", "star", "heart", "plus"}


class ServiceResponse(BaseModel):
    model_config = {"from_attributes": True}
    id: str
    title: str
    icon: str
    description: str
    sort_order: int
    is_active: bool

    @classmethod
    def from_orm(cls, s: Service) -> "ServiceResponse":
        return cls(id=str(s.id), title=s.title, icon=s.icon, description=s.description, sort_order=s.sort_order, is_active=s.is_active)


class ServiceWrite(BaseModel):
    title: str
    icon: str = "sparkle"
    description: str = ""
    sort_order: int = 0
    is_active: bool = True


class ServiceListResponse(BaseModel):
    items: list[ServiceResponse]


@router.get("/services", response_model=ServiceListResponse)
async def list_services(session: AsyncSession = Depends(get_session), _: str = Depends(get_current_admin)) -> ServiceListResponse:
    result = await session.execute(select(Service).order_by(Service.sort_order.asc(), Service.created_at.asc()))
    return ServiceListResponse(items=[ServiceResponse.from_orm(s) for s in result.scalars().all()])


@router.post("/services", response_model=ServiceResponse, status_code=201)
async def create_service(data: ServiceWrite, session: AsyncSession = Depends(get_session), _: str = Depends(get_current_admin)) -> ServiceResponse:
    s = Service(title=data.title, icon=data.icon, description=data.description, sort_order=data.sort_order, is_active=data.is_active)
    session.add(s)
    await session.commit()
    await session.refresh(s)
    return ServiceResponse.from_orm(s)


@router.put("/services/{service_id}", response_model=ServiceResponse)
async def update_service(service_id: uuid.UUID, data: ServiceWrite, session: AsyncSession = Depends(get_session), _: str = Depends(get_current_admin)) -> ServiceResponse:
    result = await session.execute(select(Service).where(Service.id == service_id))
    s = result.scalar_one_or_none()
    if s is None:
        raise HTTPException(status_code=404, detail="Service not found")
    s.title = data.title
    s.icon = data.icon
    s.description = data.description
    s.sort_order = data.sort_order
    s.is_active = data.is_active
    await session.commit()
    await session.refresh(s)
    return ServiceResponse.from_orm(s)


@router.delete("/services/{service_id}", status_code=204)
async def delete_service(service_id: uuid.UUID, session: AsyncSession = Depends(get_session), _: str = Depends(get_current_admin)) -> None:
    result = await session.execute(select(Service).where(Service.id == service_id))
    s = result.scalar_one_or_none()
    if s is None:
        raise HTTPException(status_code=404, detail="Service not found")
    await session.delete(s)
    await session.commit()
