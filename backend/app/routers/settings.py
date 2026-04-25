from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.models.site_setting import SiteSetting
from app.schemas.site_setting import SiteSettingResponse

router = APIRouter(tags=["settings"])


@router.get("/settings/hero", response_model=SiteSettingResponse)
async def get_hero_setting(session: AsyncSession = Depends(get_session)) -> SiteSettingResponse:
    result = await session.execute(
        select(SiteSetting).where(SiteSetting.key == "hero_image_url")
    )
    setting = result.scalar_one_or_none()
    if setting is None:
        raise HTTPException(status_code=404, detail="Setting not found")
    return SiteSettingResponse.model_validate(setting)


@router.get("/settings/contact", response_model=SiteSettingResponse)
async def get_contact_setting(session: AsyncSession = Depends(get_session)) -> SiteSettingResponse:
    result = await session.execute(
        select(SiteSetting).where(SiteSetting.key == "contact")
    )
    setting = result.scalar_one_or_none()
    if setting is None:
        raise HTTPException(status_code=404, detail="Setting not found")
    return SiteSettingResponse.model_validate(setting)


@router.get("/settings/hero-text", response_model=SiteSettingResponse)
async def get_hero_text_setting(session: AsyncSession = Depends(get_session)) -> SiteSettingResponse:
    result = await session.execute(
        select(SiteSetting).where(SiteSetting.key == "hero_text")
    )
    setting = result.scalar_one_or_none()
    if setting is None:
        raise HTTPException(status_code=404, detail="Setting not found")
    return SiteSettingResponse.model_validate(setting)


@router.get("/settings/seo", response_model=SiteSettingResponse)
async def get_seo_setting(session: AsyncSession = Depends(get_session)) -> SiteSettingResponse:
    result = await session.execute(
        select(SiteSetting).where(SiteSetting.key == "seo")
    )
    setting = result.scalar_one_or_none()
    if setting is None:
        raise HTTPException(status_code=404, detail="Setting not found")
    return SiteSettingResponse.model_validate(setting)


@router.get("/settings/banner", response_model=SiteSettingResponse)
async def get_banner_setting(session: AsyncSession = Depends(get_session)) -> SiteSettingResponse:
    result = await session.execute(
        select(SiteSetting).where(SiteSetting.key == "banner")
    )
    setting = result.scalar_one_or_none()
    if setting is None:
        raise HTTPException(status_code=404, detail="Setting not found")
    return SiteSettingResponse.model_validate(setting)
