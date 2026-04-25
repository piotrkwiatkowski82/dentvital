from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.models.gallery_image import GalleryImage
from app.schemas.gallery import GalleryImagePublic, GalleryList

router = APIRouter(tags=["gallery"])


@router.get("/gallery", response_model=GalleryList)
async def get_gallery(
    session: AsyncSession = Depends(get_session),
) -> GalleryList:
    result = await session.execute(
        select(GalleryImage)
        .where(GalleryImage.is_active == True)  # noqa: E712
        .order_by(GalleryImage.sort_order.asc(), GalleryImage.created_at.asc())
    )
    images = result.scalars().all()

    count_result = await session.execute(
        select(func.count()).select_from(GalleryImage).where(GalleryImage.is_active == True)  # noqa: E712
    )
    total = count_result.scalar_one()

    return GalleryList(
        items=[GalleryImagePublic.model_validate(img) for img in images],
        total=total,
    )
