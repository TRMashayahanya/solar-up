# Solar Up — System Sizer

**Free** solar system sizing for Zimbabwe, powered by **Energi Tech**. Pick property type, adjust a flat list of appliances, get a sized system and PDF quote.

## Run locally

No npm required — Node 18+:

```bash
cd ~/Projects/solar-up
node server.mjs
```

Open [http://localhost:5173](http://localhost:5173).

## Publish as a web app (phone + desktop)

**[docs/PUBLISH-WEB-APP.md](docs/PUBLISH-WEB-APP.md)** — one link for phones and computers. Summary: **PUBLISH.txt**

Technical detail: [docs/PUBLISH.md](docs/PUBLISH.md) · **Render errors:** [docs/RENDER-FIX.md](docs/RENDER-FIX.md)

## Features

- Property types with smart prefills
- Flat appliance list per property (no room-by-room sections)
- Bottom nav: Home · Products · Items · Quote
- PDF quote only after client details are saved
- Leads stored in `data/leads.jsonl` for marketing follow-up
- WhatsApp links on products and results

## Easy admin (no coding)

1. Copy `.env.example` to `.env` and set `ADMIN_API_KEY` to a password you choose.
2. Run `./start.sh`
3. Open **http://localhost:5173/admin/** and enter that password.
4. View clients and download a spreadsheet (CSV).

Full step-by-step: **[docs/ADMIN-EASY-GUIDE.md](docs/ADMIN-EASY-GUIDE.md)**

## Client database (backend)

When a client completes the **PDF details** step, the app `POST`s to your server. The backend validates and saves to **`data/solarup.db`** (SQLite) or **`data/leads.jsonl`** (fallback).

**You control storage from the server** — not from the browser. See **[docs/BACKEND.md](docs/BACKEND.md)** for:

- `POST /api/leads` — public (browser)
- `GET /api/leads` — list leads (requires `ADMIN_API_KEY`)
- `GET /api/leads/export` — CSV export

```bash
ADMIN_API_KEY=your-secret node server.mjs
curl -H "X-Admin-Key: your-secret" http://localhost:5173/api/leads
```

## Contact

**Solar Up** · Powered by Energi Tech · 0773757018 · @SolarUp
