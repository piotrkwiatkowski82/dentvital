from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.models.news import News
from app.schemas.news import NewsDetail, NewsItem, NewsList

router = APIRouter(tags=["news"])


@router.get("/news", response_model=NewsList)
async def list_news(
    limit: int = Query(default=10, ge=1, le=50),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_session),
):
    # Count total
    count_query = select(func.count()).select_from(News).where(News.is_active.is_(True))
    total_result = await db.execute(count_query)
    total = total_result.scalar() or 0

    # Fetch items
    query = (
        select(News)
        .where(News.is_active.is_(True))
        .order_by(News.published_at.desc())
        .offset(offset)
        .limit(limit)
    )
    result = await db.execute(query)
    items = result.scalars().all()

    return NewsList(
        items=[NewsItem.model_validate(item) for item in items],
        total=total,
    )


@router.get("/news/{slug}", response_model=NewsDetail)
async def get_news_detail(
    slug: str,
    db: AsyncSession = Depends(get_session),
):
    query = select(News).where(News.slug == slug, News.is_active.is_(True))
    result = await db.execute(query)
    article = result.scalar_one_or_none()

    if article is None:
        raise HTTPException(status_code=404, detail="Artykuł nie został znaleziony.")

    return NewsDetail.model_validate(article)
