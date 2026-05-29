#!/usr/bin/env bash
# Export launch-social-flyers.html to PDF (one page per social post, 1080×1080).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HTML="$ROOT/marketing/launch-social-flyers.html"
OUT="$ROOT/marketing/launch-social-flyers.pdf"

BROWSER=""
for c in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium" \
  "google-chrome" \
  "chromium"; do
  if [[ -f "$c" ]]; then
    BROWSER="$c"
    break
  fi
  if command -v "$c" &>/dev/null; then
    BROWSER="$c"
    break
  fi
done

if [[ -z "$BROWSER" ]]; then
  echo "No Chrome/Brave found. Open in browser: file://$HTML"
  echo "Then Print → Save as PDF (background graphics ON, margins none)."
  exit 1
fi

"$BROWSER" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT" \
  "file://$HTML"

echo "Saved: $OUT"
