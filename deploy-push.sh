#!/usr/bin/env sh
# Push Solar Up to GitHub so Render can deploy.
# Run once:  sh deploy-push.sh
# You will be asked for your GitHub username and password/token.

set -e
cd "$(dirname "$0")"

echo "=== Solar Up — push to GitHub ==="

if [ ! -d .git ]; then
  git init
  git branch -M main
fi

git add .
git status

echo ""
echo "Committing..."
git commit -m "Fix Render deploy: src package.json + render settings" || true

if ! git remote get-url origin 2>/dev/null; then
  git remote add origin "https://github.com/TRMashayahanya/solar-up.git"
fi

echo ""
echo "Pushing to GitHub (you may need to log in)..."
git push -u origin main --force

echo ""
echo "Done! Now in Render:"
echo "  Root Directory:  src"
echo "  Build Command:   npm install"
echo "  Start Command:   node ../server.mjs"
echo "  Add ADMIN_API_KEY in Environment"
echo ""
echo "Then click Manual Deploy → Deploy latest commit"
