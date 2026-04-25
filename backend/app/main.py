from contextlib import asynccontextmanager
from collections.abc import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.routers import booking, contact, health, news
from app.routers import gallery_public, pricing_public, services_public, settings as settings_router, team_public, testimonials_public
from app.routers.admin.router import router as admin_router


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    # Startup
    yield
    # Shutdown


app = FastAPI(
    title="Dentvital API",
    description="Backend API for Dentvital dental clinic",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

# Serve uploaded files (in production Nginx serves /uploads/ directly)
app.mount("/uploads", StaticFiles(directory=settings.UPLOADS_DIR, html=False), name="uploads")

# Public routers
app.include_router(health.router, prefix="/api")
app.include_router(booking.router, prefix="/api")
app.include_router(contact.router, prefix="/api")
app.include_router(news.router, prefix="/api")
app.include_router(settings_router.router, prefix="/api")
app.include_router(gallery_public.router, prefix="/api")
app.include_router(pricing_public.router, prefix="/api")
app.include_router(team_public.router, prefix="/api")
app.include_router(services_public.router, prefix="/api")
app.include_router(testimonials_public.router, prefix="/api")

# Admin routers (all protected by JWT)
app.include_router(admin_router, prefix="/api")
