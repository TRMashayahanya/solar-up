# Fix Render “package.json not found” error

Your error shows Render looking here:

`/opt/render/project/src/package.json`

That means **Root Directory** is set to `src` — but `package.json` and `server.mjs` are in the **repo root**, not inside `src/`.

---

## Fix in Render (2 minutes)

1. Open [dashboard.render.com](https://dashboard.render.com)
2. Click your **solar-up** service
3. Go to **Settings**
4. Find **Root Directory** → **clear it** (leave completely empty)
5. Set **Build Command** to:

   ```
   true
   ```

   (not `npm install`)

6. Set **Start Command** to:

   ```
   node server.mjs
   ```

7. **Environment** → add if missing:

   | Key | Value |
   |-----|--------|
   | `ADMIN_API_KEY` | your admin password |
   | `NODE_VERSION` | `22` |

8. **Save** → **Manual Deploy** → **Deploy latest commit**

---

## Check GitHub has the right files

At the **top level** of https://github.com/TRMashayahanya/solar-up you should see:

- `package.json`
- `server.mjs`
- `index.html`
- `render.yaml`
- folders: `src/`, `admin/`, `icons/`, etc.

If only `src/` is at the top level, re-upload the **whole** `solar-up` project folder.

---

## Push latest fix (on your Mac)

```bash
cd ~/Projects/solar-up
git add .
git commit -m "Fix Render deploy settings"
git push
```

Render will redeploy automatically.

---

## Success looks like

```
==> Running build command 'true'...
==> Build successful
==> Running 'node server.mjs'
Solar Up → https://solar-up-xxxx.onrender.com
```
