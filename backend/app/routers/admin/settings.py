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
from app.models.site_setting import SiteSetting
from app.schemas.site_setting import SiteSettingResponse

router = APIRouter(tags=["admin-settings"])


class BannerData(BaseModel):
    is_active: bool
    text: str
    type: str = "info"  # info | warning | success
    link_url: str = ""
    link_text: str = ""
    dismissable: bool = True


class HeroTextData(BaseModel):
    badge: str
    heading_line1: str
    heading_line2: str
    subtext: str
    cta_primary: str
    tags: list[str]


class SeoPageMeta(BaseModel):
    title: str
    description: str


class SeoData(BaseModel):
    home: SeoPageMeta
    uslugi: SeoPageMeta
    galeria: SeoPageMeta
    aktualnosci: SeoPageMeta
    zespol: SeoPageMeta
    kontakt: SeoPageMeta


class ContactData(BaseModel):
    address: str
    address_short: str
    city: str
    phone: str
    phone_raw: str
    email: str
    hours: str
    map_embed: str
    map_link: str
    building_image_url: str

ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB
MIME_TO_EXT = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}


@router.get("/settings/hero", response_model=SiteSettingResponse)
async def get_hero_setting(
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> SiteSettingResponse:
    result = await session.execute(
        select(SiteSetting).where(SiteSetting.key == "hero_image_url")
    )
    setting = result.scalar_one_or_none()
    if setting is None:
        raise HTTPException(status_code=404, detail="Setting not found")
    return SiteSettingResponse.model_validate(setting)


@router.post("/settings/hero", response_model=SiteSettingResponse)
async def upload_hero_image(
    file: UploadFile,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> SiteSettingResponse:
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

    ext = MIME_TO_EXT[file.content_type]
    filename = f"{uuid.uuid4().hex}{ext}"
    upload_dir = Path(settings.UPLOADS_DIR) / "hero"
    upload_dir.mkdir(parents=True, exist_ok=True)
    (upload_dir / filename).write_bytes(data)

    new_value = f"/uploads/hero/{filename}"

    result = await session.execute(
        select(SiteSetting).where(SiteSetting.key == "hero_image_url")
    )
    setting = result.scalar_one_or_none()
    if setting is None:
        setting = SiteSetting(key="hero_image_url", value=new_value)
        session.add(setting)
    else:
        setting.value = new_value

    await session.commit()
    await session.refresh(setting)
    return SiteSettingResponse.model_validate(setting)


@router.get("/settings/contact", response_model=ContactData)
async def get_contact_setting(
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> Any:
    result = await session.execute(
        select(SiteSetting).where(SiteSetting.key == "contact")
    )
    setting = result.scalar_one_or_none()
    if setting is None:
        raise HTTPException(status_code=404, detail="Setting not found")
    return json.loads(setting.value)


@router.put("/settings/contact", response_model=ContactData)
async def update_contact_setting(
    data: ContactData,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> Any:
    result = await session.execute(
        select(SiteSetting).where(SiteSetting.key == "contact")
    )
    setting = result.scalar_one_or_none()
    new_value = data.model_dump_json()
    if setting is None:
        setting = SiteSetting(key="contact", value=new_value)
        session.add(setting)
    else:
        setting.value = new_value
    await session.commit()
    await session.refresh(setting)
    return json.loads(setting.value)


@router.post("/settings/contact/image", response_model=ContactData)
async def upload_contact_image(
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

    ext = MIME_TO_EXT[file.content_type]
    filename = f"{uuid.uuid4().hex}{ext}"
    upload_dir = Path(settings.UPLOADS_DIR) / "contact"
    upload_dir.mkdir(parents=True, exist_ok=True)
    (upload_dir / filename).write_bytes(data)

    new_image_url = f"/uploads/contact/{filename}"

    result = await session.execute(
        select(SiteSetting).where(SiteSetting.key == "contact")
    )
    setting = result.scalar_one_or_none()
    if setting is None:
        raise HTTPException(status_code=404, detail="Contact settings not found")

    contact_data = json.loads(setting.value)
    contact_data["building_image_url"] = new_image_url
    setting.value = json.dumps(contact_data, ensure_ascii=False)
    await session.commit()
    await session.refresh(setting)
    return json.loads(setting.value)


async def _get_json_setting(key: str, session: AsyncSession) -> Any:
    result = await session.execute(select(SiteSetting).where(SiteSetting.key == key))
    setting = result.scalar_one_or_none()
    if setting is None:
        raise HTTPException(status_code=404, detail="Setting not found")
    return json.loads(setting.value)


async def _put_json_setting(key: str, data: Any, session: AsyncSession) -> Any:
    result = await session.execute(select(SiteSetting).where(SiteSetting.key == key))
    setting = result.scalar_one_or_none()
    new_val = json.dumps(data.model_dump(), ensure_ascii=False)
    if setting is None:
        setting = SiteSetting(key=key, value=new_val)
        session.add(setting)
    else:
        setting.value = new_val
    await session.commit()
    await session.refresh(setting)
    return json.loads(setting.value)


@router.get("/settings/banner", response_model=BannerData)
async def get_banner(session: AsyncSession = Depends(get_session), _: str = Depends(get_current_admin)) -> Any:
    return await _get_json_setting("banner", session)


@router.put("/settings/banner", response_model=BannerData)
async def update_banner(data: BannerData, session: AsyncSession = Depends(get_session), _: str = Depends(get_current_admin)) -> Any:
    return await _put_json_setting("banner", data, session)


@router.get("/settings/hero-text", response_model=HeroTextData)
async def get_hero_text(session: AsyncSession = Depends(get_session), _: str = Depends(get_current_admin)) -> Any:
    return await _get_json_setting("hero_text", session)


@router.put("/settings/hero-text", response_model=HeroTextData)
async def update_hero_text(data: HeroTextData, session: AsyncSession = Depends(get_session), _: str = Depends(get_current_admin)) -> Any:
    return await _put_json_setting("hero_text", data, session)


@router.get("/settings/seo", response_model=SeoData)
async def get_seo(session: AsyncSession = Depends(get_session), _: str = Depends(get_current_admin)) -> Any:
    return await _get_json_setting("seo", session)


@router.put("/settings/seo", response_model=SeoData)
async def update_seo(data: SeoData, session: AsyncSession = Depends(get_session), _: str = Depends(get_current_admin)) -> Any:
    return await _put_json_setting("seo", data, session)
