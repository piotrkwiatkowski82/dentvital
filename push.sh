#!/usr/bin/env bash
# Skrypt deployujący Dentvital na serwer produkcyjny.
# Użycie: ./push.sh ["commit message"]
# Przykład: ./push.sh "poprawki hero"

set -e

REMOTE_HOST="ubuntu@51.75.52.122"
REMOTE_DIR="/home/ubuntu/apps/dentvital"
COMMIT_MSG="${1:-deploy $(date '+%Y-%m-%d %H:%M')}"

echo "==> Sprawdzam zmiany..."
git add -A

if git diff --cached --quiet; then
  echo "==> Brak nowych zmian do commitowania."
else
  echo "==> Commitowanie: \"$COMMIT_MSG\""
  git commit -m "$COMMIT_MSG"
fi

echo "==> Pushowanie do origin..."
git push origin main

echo "==> Łączenie z serwerem i deploy..."
ssh "$REMOTE_HOST" bash <<ENDSSH
  set -e
  cd "$REMOTE_DIR"
  echo "--> Git pull..."
  git pull origin main
  echo "--> Deploy..."
  ./deploy.sh
  echo "--> Gotowe!"
ENDSSH

echo ""
echo "✓ Deploy zakończony pomyślnie."
