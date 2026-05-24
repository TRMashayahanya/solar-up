#!/usr/bin/env node
/**
 * Solar Up backend — static app + client lead database.
 *
 * Public:  POST /api/leads     (browser, final PDF step)
 * Admin:   GET  /api/leads     (list, requires ADMIN_API_KEY)
 *          GET  /api/leads/export?format=csv
 *
 * Usage:
 *   node server.mjs
 *   ADMIN_API_KEY=your-secret node server.mjs
 */

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { initLeadsDatabase, insertLead, listLeads, leadsStorageInfo } from "./server/leads-db.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 5173;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".png": "image/png",
};

function cors(res, code, body, type = "application/json") {
  res.writeHead(code, {
    "Content-Type": type,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Key, Authorization",
  });
  res.end(typeof body === "string" ? body : JSON.stringify(body));
}

function validLead(body) {
  return (
    body &&
    String(body.name || "").trim().length >= 2 &&
    String(body.phone || "").trim().length >= 8 &&
    String(body.email || "").trim().includes("@") &&
    String(body.address || "").trim().length >= 3
  );
}

function parseAdminKey(req) {
  const h = req.headers.authorization || "";
  if (h.startsWith("Bearer ")) return h.slice(7).trim();
  return (req.headers["x-admin-key"] || "").trim();
}

function requireAdmin(req, res) {
  if (!ADMIN_API_KEY) {
    cors(res, 503, {
      error: "Admin API disabled. Set ADMIN_API_KEY when starting the server.",
    });
    return false;
  }
  if (parseAdminKey(req) !== ADMIN_API_KEY) {
    cors(res, 401, { error: "Invalid or missing admin key." });
    return false;
  }
  return true;
}

function serveStatic(req, res) {
  let urlPath = req.url.split("?")[0];
  if (urlPath === "/") urlPath = "/index.html";
  if (urlPath === "/admin" || urlPath === "/admin/") urlPath = "/admin/index.html";
  if (urlPath === "/install" || urlPath === "/install/") urlPath = "/install/index.html";
  const filePath = path.join(__dirname, decodeURIComponent(urlPath));
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath);
    const headers = { "Content-Type": MIME[ext] || "application/octet-stream" };
    if (ext === ".js" || ext === ".html") {
      headers["Cache-Control"] = "no-store";
    }
    res.writeHead(200, headers);
    res.end(data);
  });
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

async function handlePostLead(req, res) {
  let body;
  try {
    body = JSON.parse(await readBody(req));
  } catch {
    cors(res, 400, { error: "Invalid JSON" });
    return;
  }
  if (!validLead(body)) {
    cors(res, 400, { error: "Name, phone, email, and address are required." });
    return;
  }
  try {
    const record = await insertLead(body);
    cors(res, 201, { ok: true, id: record.id, storage: leadsStorageInfo().mode });
  } catch (e) {
    cors(res, 500, { error: String(e.message || e) });
  }
}

async function handleListLeads(req, res) {
  if (!requireAdmin(req, res)) return;
  const q = new URL(req.url, "http://localhost").searchParams;
  const limit = Math.min(500, Math.max(1, Number(q.get("limit")) || 50));
  const offset = Math.max(0, Number(q.get("offset")) || 0);
  try {
    const data = await listLeads({ limit, offset });
    cors(res, 200, data);
  } catch (e) {
    cors(res, 500, { error: String(e.message || e) });
  }
}

async function handleExportLeads(req, res) {
  if (!requireAdmin(req, res)) return;
  const q = new URL(req.url, "http://localhost").searchParams;
  const limit = Math.min(5000, Math.max(1, Number(q.get("limit")) || 1000));
  try {
    const { leads, storage, total } = await listLeads({ limit, offset: 0 });
    const header =
      "id,name,phone,email,address,property_label,quote_total,quote_grand_total,peak_w,daily_wh,submitted_at,saved_at\n";
    const rows = leads.map((r) => {
      const p = r.payload || r;
      const esc = (s) => '"' + String(s ?? "").replace(/"/g, '""') + '"';
      return [
        p.id,
        esc(p.name),
        esc(p.phone),
        esc(p.email),
        esc(p.address),
        esc(p.propertyLabel || p.property_label),
        p.quoteTotal ?? p.quote_total ?? "",
        p.quoteGrandTotal ?? p.quote_grand_total ?? "",
        p.peakW ?? p.peak_w ?? "",
        p.dailyWh ?? p.daily_wh ?? "",
        p.submittedAt || p.submitted_at,
        p.savedAt || p.saved_at,
      ].join(",");
    });
    const csv = header + rows.join("\n");
    res.writeHead(200, {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="solarup-leads.csv"',
      "Access-Control-Allow-Origin": "*",
    });
    res.end(csv);
  } catch (e) {
    cors(res, 500, { error: String(e.message || e) });
  }
}

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];

  if (req.method === "OPTIONS" && url.startsWith("/api/")) {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Admin-Key, Authorization",
    });
    res.end();
    return;
  }

  if (req.method === "POST" && url === "/api/leads") {
    handlePostLead(req, res);
    return;
  }

  if (req.method === "GET" && url === "/api/leads") {
    handleListLeads(req, res);
    return;
  }

  if (req.method === "GET" && url === "/api/leads/export") {
    handleExportLeads(req, res);
    return;
  }

  if (req.method === "GET") {
    serveStatic(req, res);
    return;
  }

  res.writeHead(405);
  res.end("Method not allowed");
});

const boot = await initLeadsDatabase();
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Solar Up → http://localhost:${PORT}`);
  console.log(`Leads database: ${boot.mode} → ${boot.dbPath}`);
  if (ADMIN_API_KEY) {
    console.log(`Admin page:  http://localhost:${PORT}/admin/`);
    console.log("             (use your ADMIN_API_KEY as the password)");
  } else {
    console.log("Admin page:  disabled — add ADMIN_API_KEY to .env then restart");
  }
});
