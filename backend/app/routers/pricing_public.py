from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.models.price_category import PriceCategory
from app.schemas.pricing import PriceCategoryOut, PricingResponse

router = APIRouter(tags=["pricing"])


@router.get("/pricing", response_model=PricingResponse)
async def get_pricing(session: AsyncSession = Depends(get_session)) -> PricingResponse:
    result = await session.execute(
        select(PriceCategory)
        .options(selectinload(PriceCategory.rows))
        .order_by(PriceCategory.sort_order.asc())
    )
    categories = result.scalars().all()
    return PricingResponse(
        categories=[PriceCategoryOut.model_validate(c) for c in categories]
    )
