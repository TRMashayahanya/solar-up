# Solar Up — Easy admin guide (no coding)

This guide is for **you** (Energi Tech) to see client details after Solar Up is online — without writing code.

---

## Two parts of the app (simple picture)

| Part | What it is | What clients see |
|------|------------|------------------|
| **Front** (website) | The sizer — property types, items, quote, PDF | https://your-website.com |
| **Back** (server + database) | Saves names, phones, emails when they request a PDF | You only — admin page |

Clients use the **front**. You use the **back** to see who enquired.

---

## Step 1 — Choose your admin password (once)

Pick a long password only you know. Example: `EnergiSolar2026!Harare`

Write it in a safe place (password manager or notebook).

On the computer that runs Solar Up, open the project folder and create a file named **`.env`** (copy from `.env.example`):

```
PORT=5173
ADMIN_API_KEY=EnergiSolar2026!Harare
```

Replace the example with **your** password.

---

## Step 2 — Start the app (same as always)

**On your Mac**, open **Terminal** and run:

```bash
cd ~/Projects/solar-up
./start.sh
```

Leave Terminal open while the app is running.

When published on a hosting company, they will start the server for you — you only need your `.env` file on their system.

---

## Step 3 — Open your admin page (bookmark this)

In Chrome or Safari, go to:

### On your computer (testing)

**http://localhost:5173/admin/**

### After you publish (replace with your real website)

**https://YOUR-WEBSITE-ADDRESS/admin/**

Examples:

- `https://solarup.energitech.co.zw/admin/`
- `https://www.yourdomain.com/admin/`

1. Enter your **admin password** (the same as `ADMIN_API_KEY` in `.env`).
2. Click **Open client list**.
3. You will see a table: name, phone, email, area, property type, quote amount, date.
4. Click **Download spreadsheet (CSV)** to open in Excel or Google Sheets.
5. Click **Refresh list** when you want the latest clients.

**Bookmark** this admin URL in your browser.

---

## What you can do from the admin page

| Action | How |
|--------|-----|
| See new PDF enquiries | Refresh list |
| Export for follow-up | Download CSV |
| Log out | Log out (password cleared on this browser) |

---

## What you cannot do from the admin page (needs a developer)

These need editing project files in **Cursor** or similar — not the admin page:

- Change product prices
- Change delivery fees ($100 Harare, etc.)
- Change wording on screens
- Change logo or colours

Tell your developer: *“Please change X in the Solar Up project.”*

---

## After publishing online

Your hosting provider must:

1. Run `node server.mjs` (or `./start.sh`) 24/7.
2. Set environment variable **`ADMIN_API_KEY`** to your password (same as `.env`).
3. Give you a normal website address (HTTPS).

Then you only visit:

**https://your-site/admin/**

---

## Troubleshooting (plain English)

| Problem | What to do |
|---------|------------|
| “Admin API disabled” | Server started without a password. Add `ADMIN_API_KEY=...` to `.env` and restart. |
| “Invalid or missing admin key” | Wrong password typed. Use the exact value from `.env`. |
| Admin page is blank / 404 | Server not running, or wrong address. Check `https://yoursite/admin/` with trailing slash. |
| List is empty | No one has completed the PDF form yet, or you’re on the wrong server. |
| Clients say PDF failed | They must use your **website link**, not open a file from email. |

---

## Keeping data safe

- Do **not** share your admin password.
- Do **not** post the `/admin/` link publicly.
- Back up the folder **`data/`** on the server (contains `solarup.db`) — your hosting support can help copy it weekly.

---

## Need help?

Give your technical person this file and:

- `docs/BACKEND.md` (technical detail)
- `server.mjs` and `server/leads-db.mjs` (where data is saved)

Your admin URL to bookmark: **`/admin/`** on the same domain as Solar Up.
