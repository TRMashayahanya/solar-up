# Solar Up — Backend & client database

Client details from the **final step** (PDF modal → “Save & download PDF”) are sent to **your** server. The browser never writes to the database directly.

## Flow

```
Browser (ClientModal form)
    → POST /api/leads  (JSON)
    → server.mjs validates & saves
    → data/solarup.db (SQLite) or data/leads.jsonl (fallback)
    → then PDF download runs in the browser
```

Fields saved include: name, phone, email, address, notes, property type, quote totals, delivery choice, custom accessories, peak/daily load.

## Run the backend

```bash
cd ~/Projects/solar-up
node server.mjs
```

With admin access (list/export leads):

```bash
ADMIN_API_KEY=my-secret-key node server.mjs
```

Or:

```bash
export ADMIN_API_KEY=my-secret-key
./start.sh
```

The app must be opened at **http://localhost:5173** (not `file://`) so `fetch("/api/leads")` hits this server.

## Public API (browser)

**POST** `/api/leads`

Required JSON fields:

| Field | Rule |
|-------|------|
| `name` | min 2 characters |
| `phone` | min 8 characters |
| `email` | must contain `@` |
| `address` | min 3 characters |

Optional: `notes`, `propertyType`, `propertyLabel`, `quoteTotal`, `quoteGrandTotal`, `deliveryInstall`, `customAccessories`, `peakW`, `dailyWh`, `submittedAt`.

Example:

```bash
curl -X POST http://localhost:5173/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tendai Moyo",
    "phone": "0773757018",
    "email": "tendai@example.com",
    "address": "Borrowdale, Harare",
    "propertyType": "small_home",
    "quoteTotal": 3480,
    "quoteGrandTotal": 3480
  }'
```

Response: `201` `{ "ok": true, "id": "lead_…", "storage": "sqlite" }`

## Admin API (backend control)

Only works when `ADMIN_API_KEY` is set on the server. Send the key in either header:

- `X-Admin-Key: your-secret`
- `Authorization: Bearer your-secret`

**List leads**

```bash
curl "http://localhost:5173/api/leads?limit=20&offset=0" \
  -H "X-Admin-Key: my-secret-key"
```

**Export CSV**

```bash
curl "http://localhost:5173/api/leads/export" \
  -H "X-Admin-Key: my-secret-key" \
  -o solarup-leads.csv
```

## Where data lives

| Storage | Path | When |
|---------|------|------|
| SQLite | `data/solarup.db` | Node 22+ with built-in `node:sqlite` |
| JSONL | `data/leads.jsonl` | Fallback on older Node |

Both are gitignored under `data/`. Back up this folder for production.

## Changing what you store (backend control)

1. **Validation** — edit `validLead()` in `server.mjs`.
2. **Record shape** — edit `normalizeLead()` in `server/leads-db.mjs`.
3. **New fields from the form** — add inputs in `src/components.js` (`ClientModal`), pass through `handlePrint` in `src/App.js`; the backend stores any extra keys inside `payload_json` (SQLite) or the full JSON line (JSONL).

## Production notes

- Run behind HTTPS (nginx, Caddy, or your host).
- Use a strong `ADMIN_API_KEY`; never expose it in frontend code.
- For high volume, point `leads-db.mjs` at PostgreSQL/MySQL instead of SQLite (same POST handler, swap `insertLead` / `listLeads`).
- Restrict admin routes by IP or VPN if possible.

## Offline fallback

If the server is down, the app may save leads to the browser’s `localStorage` key `solarup-leads`. Sync those manually or re-post to `/api/leads` when the server is back.
