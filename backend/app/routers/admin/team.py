import json
import uuid
from pathlib import Path
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_session
from app.dependencies.auth import get_current_admin
from app.models.team_member import TeamMember

router = APIRouter(tags=["admin-team"])

ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024
MIME_TO_EXT = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}


class TeamMemberResponse(BaseModel):
    id: str
    name: str
    title: str
    specializations: list[str]
    bio: str
    image_url: str
    sort_order: int
    is_active: bool

    @classmethod
    def from_orm(cls, m: TeamMember) -> "TeamMemberResponse":
        return cls(
            id=str(m.id),
            name=m.name,
            title=m.title,
            specializations=json.loads(m.specializations),
            bio=m.bio,
            image_url=m.image_url,
            sort_order=m.sort_order,
            is_active=m.is_active,
        )


class TeamMemberCreate(BaseModel):
    name: str
    title: str
    specializations: list[str] = []
    bio: str = ""
    image_url: str = ""
    sort_order: int = 0
    is_active: bool = True


class TeamMemberUpdate(BaseModel):
    name: str
    title: str
    specializations: list[str]
    bio: str
    image_url: str
    sort_order: int
    is_active: bool


class TeamListResponse(BaseModel):
    items: list[TeamMemberResponse]


@router.get("/team", response_model=TeamListResponse)
async def list_team(
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> TeamListResponse:
    result = await session.execute(
        select(TeamMember).order_by(TeamMember.sort_order.asc(), TeamMember.created_at.asc())
    )
    members = list(result.scalars().all())
    return TeamListResponse(items=[TeamMemberResponse.from_orm(m) for m in members])


@router.post("/team", response_model=TeamMemberResponse, status_code=201)
async def create_member(
    data: TeamMemberCreate,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> Any:
    member = TeamMember(
        name=data.name,
        title=data.title,
        specializations=json.dumps(data.specializations, ensure_ascii=False),
        bio=data.bio,
        image_url=data.image_url,
        sort_order=data.sort_order,
        is_active=data.is_active,
    )
    session.add(member)
    await session.commit()
    await session.refresh(member)
    return TeamMemberResponse.from_orm(member)


@router.put("/team/{member_id}", response_model=TeamMemberResponse)
async def update_member(
    member_id: uuid.UUID,
    data: TeamMemberUpdate,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> Any:
    result = await session.execute(select(TeamMember).where(TeamMember.id == member_id))
    member = result.scalar_one_or_none()
    if member is None:
        raise HTTPException(status_code=404, detail="Member not found")
    member.name = data.name
    member.title = data.title
    member.specializations = json.dumps(data.specializations, ensure_ascii=False)
    member.bio = data.bio
    member.image_url = data.image_url
    member.sort_order = data.sort_order
    member.is_active = data.is_active
    await session.commit()
    await session.refresh(member)
    return TeamMemberResponse.from_orm(member)


@router.post("/team/{member_id}/image", response_model=TeamMemberResponse)
async def upload_member_image(
    member_id: uuid.UUID,
    file: UploadFile,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> Any:
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Allowed formats: JPEG, PNG, WebP",
        )
    data = await file.read()
    if len(data) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="File too large (max 5 MB)",
        )
    result = await session.execute(select(TeamMember).where(TeamMember.id == member_id))
    member = result.scalar_one_or_none()
    if member is None:
        raise HTTPException(status_code=404, detail="Member not found")

    ext = MIME_TO_EXT[file.content_type]
    filename = f"{uuid.uuid4().hex}{ext}"
    upload_dir = Path(settings.UPLOADS_DIR) / "team"
    upload_dir.mkdir(parents=True, exist_ok=True)
    (upload_dir / filename).write_bytes(data)

    member.image_url = f"/uploads/team/{filename}"
    await session.commit()
    await session.refresh(member)
    return TeamMemberResponse.from_orm(member)


@router.delete("/team/{member_id}", status_code=204)
async def delete_member(
    member_id: uuid.UUID,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> None:
    result = await session.execute(select(TeamMember).where(TeamMember.id == member_id))
    member = result.scalar_one_or_none()
    if member is None:
        raise HTTPException(status_code=404, detail="Member not found")
    if member.image_url.startswith("/uploads/"):
        Path(settings.UPLOADS_DIR).joinpath(member.image_url.lstrip("/uploads/")).unlink(missing_ok=True)
    await session.delete(member)
    await session.commit()
