import json

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.models.team_member import TeamMember

router = APIRouter(tags=["team"])


class TeamMemberPublic(BaseModel):
    id: str
    name: str
    title: str
    specializations: list[str]
    bio: str
    image_url: str
    sort_order: int


class TeamListResponse(BaseModel):
    items: list[TeamMemberPublic]


@router.get("/team", response_model=TeamListResponse)
async def list_team(session: AsyncSession = Depends(get_session)) -> TeamListResponse:
    result = await session.execute(
        select(TeamMember)
        .where(TeamMember.is_active == True)  # noqa: E712
        .order_by(TeamMember.sort_order.asc(), TeamMember.created_at.asc())
    )
    members = list(result.scalars().all())
    return TeamListResponse(
        items=[
            TeamMemberPublic(
                id=str(m.id),
                name=m.name,
                title=m.title,
                specializations=json.loads(m.specializations),
                bio=m.bio,
                image_url=m.image_url,
                sort_order=m.sort_order,
            )
            for m in members
        ]
    )
