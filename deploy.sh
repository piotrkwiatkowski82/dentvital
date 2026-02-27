#!/usr/bin/env bash
# Deploy Dentvital na serwerze (za Traefikiem).
# Użycie:
#   ./deploy.sh           # deploy z aktualnego commita
#   ./deploy.sh v1.0.0    # deploy z taga (np. po release)
#
# Wymaga: Docker, Docker Compose, w katalogu .env z TRAEFIK_DOMAIN, CORS_ORIGINS itd.
# Sieć Traefika: domyślnie traefik_public (albo TRAEFIK_NETWORK w .env).

set -e
cd "$(dirname "$0")"

if [ ! -f docker-compose.yml ]; then
  echo "Błąd: Uruchom skrypt z katalogu głównego repozytorium (gdzie jest docker-compose.yml)."
  exit 1
fi

TAG="${1:-}"

if [ -n "$TAG" ]; then
  echo "==> Pobieranie taga: $TAG"
  git fetch origin tag "$TAG" --no-tags 2>/dev/null || git fetch --tags
  git checkout "tags/$TAG" -B "deploy-$TAG" 2>/dev/null || git checkout "$TAG"
  echo "==> W checkout na: $TAG"
fi

if [ ! -f .env ]; then
  echo "==> Brak .env – kopiuję z .env.example. Uzupełnij .env przed ponownym deployem."
  cp .env.example .env
  exit 1
fi

echo "==> Uruchamiam stack (Traefik override)..."
docker compose -f docker-compose.yml -f docker-compose.traefik.yml up -d --build

echo "==> Gotowe. Aplikacja za Traefikiem pod domeną z TRAEFIK_DOMAIN."
