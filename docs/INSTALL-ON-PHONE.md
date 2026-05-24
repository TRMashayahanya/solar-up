# Install Solar Up on iPhone & Android

Solar Up is a **web app**. Clients install it from your website — **not** from the App Store or Play Store (unless you pay for a separate native wrapper later).

**Requirement:** your site must use **https://** (Render gives this automatically).

---

## What clients do

Share your live link, e.g. `https://solar.yoursite.com`

### Android
1. Open link in **Chrome**
2. Tap **Install app** (banner on the site) **or** menu **⋮** → **Install app**
3. Icon appears on home screen

### iPhone
1. Open link in **Safari** (important — not only inside WhatsApp)
2. Tap **Share** → **Add to Home Screen** → **Add**

Help page for clients: **`https://your-site.com/install/`**

---

## What you need when publishing

1. Deploy with Render (see `docs/PUBLISH-WEB-APP.md`)
2. Icons are in `icons/` (PNG for phones). Regenerate on Mac:
   ```bash
   node scripts/generate-icons-node.mjs
   ```
3. After deploy, test install on a real Android phone and iPhone

---

## App Store / Play Store?

This project uses **install from browser** (PWA). That is the fast, free path.

To list on Apple App Store or Google Play later, you need a developer account and a tool like [PWABuilder](https://www.pwabuilder.com/) or Capacitor — ask a developer.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| No “Install app” on Android | Use Chrome + HTTPS; visit site twice |
| iPhone won’t install | Must use Safari; tap Share, not just bookmark |
| Install button missing locally | Normal on `http://localhost` sometimes — test on published HTTPS URL |
