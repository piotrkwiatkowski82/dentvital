import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.dependencies.auth import get_current_admin
from app.models.price_category import PriceCategory
from app.models.price_row import PriceRow
from app.schemas.pricing import (
    PriceCategoryCreate,
    PriceCategoryOut,
    PriceCategoryUpdate,
    PricingResponse,
    PriceRowCreate,
    PriceRowOut,
    PriceRowUpdate,
)

router = APIRouter(tags=["admin-pricing"])


async def _get_category_or_404(
    category_id: uuid.UUID, session: AsyncSession
) -> PriceCategory:
    result = await session.execute(
        select(PriceCategory)
        .options(selectinload(PriceCategory.rows))
        .where(PriceCategory.id == category_id)
    )
    cat = result.scalar_one_or_none()
    if cat is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return cat


# ── Categories ──────────────────────────────────────────

@router.get("/pricing", response_model=PricingResponse)
async def list_pricing(
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> PricingResponse:
    result = await session.execute(
        select(PriceCategory)
        .options(selectinload(PriceCategory.rows))
        .order_by(PriceCategory.sort_order.asc())
    )
    categories = result.scalars().all()
    return PricingResponse(
        categories=[PriceCategoryOut.model_validate(c) for c in categories]
    )


@router.post(
    "/pricing/categories",
    response_model=PriceCategoryOut,
    status_code=status.HTTP_201_CREATED,
)
async def create_category(
    body: PriceCategoryCreate,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> PriceCategoryOut:
    max_result = await session.execute(select(func.max(PriceCategory.sort_order)))
    max_order = max_result.scalar_one_or_none() or -1

    cat = PriceCategory(title=body.title, icon=body.icon, sort_order=max_order + 1)
    session.add(cat)
    await session.commit()
    await session.refresh(cat)
    # Load rows relationship (empty for new category)
    await session.execute(
        select(PriceCategory)
        .options(selectinload(PriceCategory.rows))
        .where(PriceCategory.id == cat.id)
    )
    return PriceCategoryOut.model_validate(cat)


@router.put("/pricing/categories/{category_id}", response_model=PriceCategoryOut)
async def update_category(
    category_id: uuid.UUID,
    body: PriceCategoryUpdate,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> PriceCategoryOut:
    cat = await _get_category_or_404(category_id, session)
    cat.title = body.title
    cat.icon = body.icon
    await session.commit()
    await session.refresh(cat)
    return PriceCategoryOut.model_validate(cat)


@router.delete("/pricing/categories/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(
    category_id: uuid.UUID,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> None:
    cat = await _get_category_or_404(category_id, session)
    await session.delete(cat)
    await session.commit()


# ── Rows ────────────────────────────────────────────────

@router.post(
    "/pricing/categories/{category_id}/rows",
    response_model=PriceRowOut,
    status_code=status.HTTP_201_CREATED,
)
async def add_row(
    category_id: uuid.UUID,
    body: PriceRowCreate,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> PriceRowOut:
    await _get_category_or_404(category_id, session)

    max_result = await session.execute(
        select(func.max(PriceRow.sort_order)).where(PriceRow.category_id == category_id)
    )
    max_order = max_result.scalar_one_or_none() or -1

    row = PriceRow(
        category_id=category_id,
        service=body.service,
        price=body.price,
        sort_order=max_order + 1,
    )
    session.add(row)
    await session.commit()
    await session.refresh(row)
    return PriceRowOut.model_validate(row)


@router.put("/pricing/rows/{row_id}", response_model=PriceRowOut)
async def update_row(
    row_id: uuid.UUID,
    body: PriceRowUpdate,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> PriceRowOut:
    result = await session.execute(select(PriceRow).where(PriceRow.id == row_id))
    row = result.scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=404, detail="Row not found")
    row.service = body.service
    row.price = body.price
    await session.commit()
    await session.refresh(row)
    return PriceRowOut.model_validate(row)


@router.delete("/pricing/rows/{row_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_row(
    row_id: uuid.UUID,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> None:
    result = await session.execute(select(PriceRow).where(PriceRow.id == row_id))
    row = result.scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=404, detail="Row not found")
    await session.delete(row)
    await session.commit()
