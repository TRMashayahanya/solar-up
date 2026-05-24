# Publish Solar Up as a web app (phone + desktop)

**One website link** works everywhere — no App Store, no Play Store.

Clients open your link in:
- **Phone** — Safari (iPhone) or Chrome (Android)
- **Computer** — Chrome, Safari, or Edge

They can also **add it to their home screen** so it opens like an app.

---

## What you publish

| Who | What they use |
|-----|----------------|
| **Clients** | `https://your-link.com` |
| **You (admin)** | `https://your-link.com/admin/` |

Same hosting as before (GitHub + Render). The app is already built for mobile and desktop.

---

## 3 steps to go live

### 1 — GitHub
Upload the project to [github.com](https://github.com) (repository name: `solar-up`).

### 2 — Render
1. [render.com](https://render.com) → sign in with GitHub  
2. **New Web Service** → repo **solar-up**  
3. **Start command:** `node server.mjs`  
4. **Environment variable:** `ADMIN_API_KEY` = your secret password  
5. Wait for **Live**

### 3 — Share one link
Copy your Render URL, e.g. `https://solar-up.onrender.com`

That is your **web app address** for everyone.

---

## Tell your clients (copy & paste)

**WhatsApp / SMS:**

> Size your solar system free with Solar Up (Energi Tech):  
> https://YOUR-LINK.com  
> Works on phone and computer — no download needed.

**Install on phone like an app (no app store):**

- **Android:** Chrome → tap **Install app** on the site (or menu **⋮** → Install)  
- **iPhone:** Safari → Share → **Add to Home Screen**  
- Help page: `https://YOUR-LINK.com/install/` — see **docs/INSTALL-ON-PHONE.md**

---

## Custom address (optional)

Buy a name like `solar.energitech.co.zw` and in Render → **Custom Domain** connect it.  
Clients then use: `https://solar.energitech.co.zw`

---

## Desktop use

Clients open the **same link** on a laptop. No extra steps.

---

## Checklist before you share

- [ ] Link opens on your phone  
- [ ] Link opens on your computer  
- [ ] You can complete a test quote and PDF  
- [ ] `/admin/` works with your password  
- [ ] You did **not** share the `/admin/` link publicly  

---

## Updates

After changes on your Mac: `git push` → Render updates the site in a few minutes.
