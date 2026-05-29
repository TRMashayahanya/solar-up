#!/usr/bin/env sh
cd "$(dirname "$0")"
# Load ADMIN_API_KEY and PORT from .env if present (easy for non-developers)
if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  . ./.env
  set +a
fi
PORT="${PORT:-5173}"
if lsof -ti:"$PORT" >/dev/null 2>&1; then
  echo "Port $PORT in use — stopping old process..."
  lsof -ti:"$PORT" | xargs kill -9 2>/dev/null || true
  sleep 0.5
fi
echo "Starting SolarApp on http://localhost:$PORT"
if [ -n "$ADMIN_API_KEY" ]; then
  echo "Admin page:  http://localhost:$PORT/admin/"
  echo "(password = ADMIN_API_KEY in your .env file)"
fi
exec node server.mjs
