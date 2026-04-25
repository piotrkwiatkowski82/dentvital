import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, Form, HTTPException, UploadFile, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_session
from app.dependencies.auth import get_current_admin
from app.models.gallery_image import GalleryImage
from app.schemas.gallery import GalleryImageAdmin, GalleryListAdmin

router = APIRouter(tags=["admin-gallery"])

ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB
MIME_TO_EXT = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}
VALID_CATEGORIES = {"gabinety", "zespol", "zabiegi"}


@router.get("/gallery", response_model=GalleryListAdmin)
async def list_gallery(
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> GalleryListAdmin:
    result = await session.execute(
        select(GalleryImage).order_by(
            GalleryImage.sort_order.asc(), GalleryImage.created_at.asc()
        )
    )
    images = result.scalars().all()

    count_result = await session.execute(select(func.count()).select_from(GalleryImage))
    total = count_result.scalar_one()

    return GalleryListAdmin(
        items=[GalleryImageAdmin.model_validate(img) for img in images],
        total=total,
    )


@router.post("/gallery", response_model=GalleryImageAdmin, status_code=status.HTTP_201_CREATED)
async def add_gallery_image(
    file: UploadFile,
    alt: str = Form(..., max_length=300),
    category: str = Form(...),
    caption: str | None = Form(None),
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> GalleryImageAdmin:
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Allowed formats: JPEG, PNG, WebP",
        )
    if category not in VALID_CATEGORIES:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Category must be one of: {', '.join(VALID_CATEGORIES)}",
        )

    data = await file.read()
    if len(data) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="File too large (max 5 MB)",
        )

    ext = MIME_TO_EXT[file.content_type]
    filename = f"{uuid.uuid4().hex}{ext}"
    upload_dir = Path(settings.UPLOADS_DIR) / "gallery"
    upload_dir.mkdir(parents=True, exist_ok=True)
    (upload_dir / filename).write_bytes(data)

    # Determine sort_order as next after current max
    max_result = await session.execute(select(func.max(GalleryImage.sort_order)))
    max_order = max_result.scalar_one_or_none() or -1

    image = GalleryImage(
        src=f"/uploads/gallery/{filename}",
        alt=alt,
        category=category,
        caption=caption or None,
        sort_order=max_order + 1,
    )
    session.add(image)
    await session.commit()
    await session.refresh(image)
    return GalleryImageAdmin.model_validate(image)


@router.delete("/gallery/{image_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_gallery_image(
    image_id: uuid.UUID,
    session: AsyncSession = Depends(get_session),
    _: str = Depends(get_current_admin),
) -> None:
    result = await session.execute(
        select(GalleryImage).where(GalleryImage.id == image_id)
    )
    image = result.scalar_one_or_none()
    if image is None:
        raise HTTPException(status_code=404, detail="Image not found")

    # Delete physical file if it's a local upload
    if image.src.startswith("/uploads/"):
        file_path = Path(settings.UPLOADS_DIR) / image.src.removeprefix("/uploads/")
        file_path.unlink(missing_ok=True)

    await session.delete(image)
    await session.commit()
