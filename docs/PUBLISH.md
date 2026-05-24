# Publish Solar Up online (short guide)

**Time:** about 30 minutes · **Cost:** free to start (Render.com)

You need: a **GitHub** account (free) and **Render** account (free).

---

## Step 1 — Put the project on GitHub

1. Go to [github.com](https://github.com) → sign up / log in.
2. Click **+** → **New repository** → name it `solar-up` → **Create**.
3. On your Mac, open **Terminal**:

```bash
cd ~/Projects/solar-up
git init
git add .
git commit -m "Solar Up ready to publish"
```

4. On GitHub, copy the commands under **“…or push an existing repository”** (they look like `git remote add origin …` and `git push`). Paste them in Terminal.

---

## Step 2 — Deploy on Render

1. Go to [render.com](https://render.com) → sign up (use “Sign in with GitHub”).
2. **New +** → **Web Service** → connect repository **solar-up**.
3. Render should detect settings from `render.yaml`. If not, set:
   - **Build command:** `true` (or leave empty)
   - **Start command:** `node server.mjs`
4. Open **Environment** → add:

| Key | Value |
|-----|--------|
| `ADMIN_API_KEY` | Your admin password (same as local `.env`) |
| `NODE_VERSION` | `22` |

5. Click **Create Web Service** → wait until status is **Live**.

Your public link will look like:

`https://solar-up-xxxx.onrender.com`

---

## Step 3 — Test

| Page | URL |
|------|-----|
| Solar Up (clients) | `https://YOUR-LINK/` |
| Admin (you) | `https://YOUR-LINK/admin/` |

Share only the **first** link with customers. Keep **admin** private.

---

## Step 4 — Custom name (optional)

In Render: **Settings** → **Custom Domain** → add e.g. `solar.energitech.co.zw` and follow DNS instructions from your domain provider.

---

## Client data (important)

On the **free** plan, client records may reset when Render redeploys. To keep the database permanently:

- Render **paid** plan + **persistent disk** mounted at `data/`, or  
- Download CSV from **/admin/** regularly as backup.

---

## Updating the site later

After you change files on your Mac:

```bash
cd ~/Projects/solar-up
git add .
git commit -m "Update"
git push
```

Render redeploys automatically in a few minutes.

---

## Need help?

Give your developer: `server.mjs`, `render.yaml`, and this file.
