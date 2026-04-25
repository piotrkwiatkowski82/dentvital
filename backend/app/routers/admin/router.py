from fastapi import APIRouter

from app.routers.admin import auth, bookings, gallery, messages, news, pricing, services, settings, team, testimonials

router = APIRouter(prefix="/admin")
router.include_router(auth.router)
router.include_router(settings.router)
router.include_router(gallery.router)
router.include_router(pricing.router)
router.include_router(news.router)
router.include_router(bookings.router)
router.include_router(messages.router)
router.include_router(team.router)
router.include_router(services.router)
router.include_router(testimonials.router)
