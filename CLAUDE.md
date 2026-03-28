# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dentvital is a dental clinic booking and management system (Polish-language UI). It is a monorepo with a FastAPI backend, React + TypeScript + Vite frontend, and Docker-based deployment.

## Commands

### Frontend (`/frontend`)
```bash
npm run dev      # Dev server on port 5173
npm run build    # TypeScript compile + Vite build
npm run lint     # ESLint
npm run preview  # Preview production build
```

### Backend
No standalone run script — use Docker Compose or run directly:
```bash
# Run locally (requires local PostgreSQL):
cd backend && uvicorn app.main:app --reload

# Create a new migration:
alembic revision --autogenerate -m "description"

# Apply migrations:
alembic upgrade head
```

### Docker (full stack)
```bash
docker compose up -d --build          # Development (ports exposed)
docker compose logs -f backend        # Watch backend logs
docker compose down
```

### Production deploy
```bash
./deploy.sh            # Deploy current HEAD
./deploy.sh v1.0.0     # Deploy from git tag
```
Production uses Traefik: `docker compose -f docker-compose.yml -f docker-compose.traefik.yml up -d --build`

## Architecture

### Stack
- **Backend:** Python 3.12, FastAPI, async SQLAlchemy 2.0, asyncpg, Alembic, aiosmtplib, Jinja2
- **Frontend:** React 19, TypeScript, Vite, React Router DOM 7
- **Database:** PostgreSQL 16
- **Infra:** Docker Compose, Nginx (frontend serving + API proxy), Traefik (production TLS)

### Request flow (production)
```
Browser → Traefik (TLS) → Nginx container
  /api/* → proxied to backend:8000 (FastAPI/Uvicorn)
  /*     → served as React SPA (index.html fallback)
```

### Backend structure (`/backend/app/`)
- `main.py` — FastAPI app, CORS middleware, router registration
- `config.py` — Pydantic-settings `Settings` class (reads from env)
- `database.py` — async SQLAlchemy engine, session factory, `Base`
- `models/` — ORM models: `Booking`, `News`, `ContactMessage`
- `schemas/` — Pydantic request/response schemas
- `routers/` — Route handlers: `health`, `booking`, `contact`, `news`
- `services/email.py` — `EmailService` using aiosmtplib + Jinja2 HTML templates
- `templates/` — Email HTML templates for booking and contact notifications

All API endpoints are prefixed with `/api`. The backend uses async throughout (`async def`, `AsyncSession`).

### Frontend structure (`/frontend/src/`)
- `App.tsx` — React Router setup (routes: `/`, `/aktualnosci/:slug`)
- `api/` — HTTP client functions (`client.ts` provides `apiPost`/`apiGet`)
- `components/` — Grouped by section: `booking/`, `contact/`, `news/`, `hero/`, `services/`, `team/`, `panels/`, `layout/`
- `pages/` — `HomePage.tsx` (all sections), `NewsDetailPage.tsx`
- `hooks/` — `useScrollReveal`, `useScrolledHeader`
- `constants/` — Static data (navigation, services list, etc.)
- `types/` — TypeScript type definitions

### Data models
- **Booking** — service, date, time, name, phone, email, status (`pending`), created_at
- **News** — slug (unique), title, excerpt, content, published_at, is_active
- **ContactMessage** — name, email, phone, message, created_at

### Email notifications
When a booking or contact form is submitted, `EmailService` sends an HTML email to the clinic (`CLINIC_EMAIL`). If SMTP is unconfigured, it logs the email content instead (safe for dev).

## Environment Configuration

Copy `.env.example` to `.env` to configure. Key variables:
- `DATABASE_URL` — asyncpg connection string
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_USE_TLS`
- `CLINIC_EMAIL` — recipient for booking/contact notifications
- `CORS_ORIGINS` — comma-separated allowed origins
- `TRAEFIK_DOMAIN` — production domain (used in `docker-compose.traefik.yml` labels)
- `VITE_API_URL` — optional frontend API base URL (defaults to `/api/`)

## Dev Ports
- Frontend (Nginx): `127.0.0.1:8080`
- Backend (Uvicorn): `127.0.0.1:8000`
- PostgreSQL: `127.0.0.1:5433`
