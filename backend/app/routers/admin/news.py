import re
import unicodedata
import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.dependencies.auth import get_current_admin
from app.models.news import News
from app.schemas.news import (
    NewsAdminDetail,
    NewsAdminItem,
    NewsAdminList,
    NewsCreate,
    NewsUpdate,
)

router = APIRouter(tags=["admin-news"])


def _slugify(text: str) -> str:
    """Convert Polish title to URL-safe slug."""
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s-]+", "-", text).strip("-")
    return text or "artykul"


async def _unique_slug(base: str, session: AsyncSession, exclude_id: uuid.UUID | None = None) -> str:
    slug = base
    i = 2
    while True:
        q = select(News).where(News.slug == slug)
        if exclude_id:
            q = q.where(News.id != exclude_id)
        result = await session.execute(q)
        if result.scalar_one_or_none() is None:
            return slug
        slug = f"{base}-{i}"
        i += 1


@router.get("/news", response_model=NewsAdminList)
async def list_news(
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> NewsAdminList:
    count_result = await session.execute(select(func.count()).select_from(News))
    total = count_result.scalar_one()

    result = await session.execute(select(News).order_by(News.published_at.desc()))
    items = result.scalars().all()

    return NewsAdminList(
        items=[NewsAdminItem.model_validate(a) for a in items],
        total=total,
    )


@router.get("/news/{article_id}", response_model=NewsAdminDetail)
async def get_news(
    article_id: uuid.UUID,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> NewsAdminDetail:
    result = await session.execute(select(News).where(News.id == article_id))
    article = result.scalar_one_or_none()
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    return NewsAdminDetail.model_validate(article)


@router.post("/news", response_model=NewsAdminDetail, status_code=status.HTTP_201_CREATED)
async def create_news(
    body: NewsCreate,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> NewsAdminDetail:
    base_slug = body.slug.strip() if body.slug else _slugify(body.title)
    slug = await _unique_slug(base_slug, session)

    article = News(
        slug=slug,
        title=body.title,
        excerpt=body.excerpt,
        content=body.content,
        published_at=body.published_at,
        is_active=body.is_active,
    )
    session.add(article)
    await session.commit()
    await session.refresh(article)
    return NewsAdminDetail.model_validate(article)


@router.put("/news/{article_id}", response_model=NewsAdminDetail)
async def update_news(
    article_id: uuid.UUID,
    body: NewsUpdate,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> NewsAdminDetail:
    result = await session.execute(select(News).where(News.id == article_id))
    article = result.scalar_one_or_none()
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")

    # Ensure slug uniqueness (excluding current article)
    slug = await _unique_slug(body.slug.strip(), session, exclude_id=article_id)

    article.title = body.title
    article.slug = slug
    article.excerpt = body.excerpt
    article.content = body.content
    article.published_at = body.published_at
    article.is_active = body.is_active

    await session.commit()
    await session.refresh(article)
    return NewsAdminDetail.model_validate(article)


@router.delete("/news/{article_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_news(
    article_id: uuid.UUID,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> None:
    result = await session.execute(select(News).where(News.id == article_id))
    article = result.scalar_one_or_none()
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found")
    await session.delete(article)
    await session.commit()
