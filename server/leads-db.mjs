/**
 * Lead storage — SQLite when Node supports node:sqlite, else JSONL fallback.
 * Backend owns validation shape; browser only POSTs to /api/leads.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const DB_PATH = path.join(DATA_DIR, "solarup.db");
const JSONL_PATH = path.join(DATA_DIR, "leads.jsonl");

const require = createRequire(import.meta.url);

let sqliteDb = null;
let mode = "jsonl";

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function newId() {
  return "lead_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
}

export function normalizeLead(body) {
  const delivery = body.deliveryInstall || body.delivery || null;
  return {
    id: newId(),
    name: String(body.name || "").trim(),
    phone: String(body.phone || "").trim(),
    email: String(body.email || "").trim().toLowerCase(),
    address: String(body.address || "").trim(),
    notes: String(body.notes || "").trim(),
    propertyType: body.propertyType || null,
    propertyLabel: String(body.propertyLabel || "").trim(),
    quoteTotal: body.quoteTotal ?? null,
    quoteGrandTotal: body.quoteGrandTotal ?? null,
    peakW: body.peakW ?? null,
    dailyWh: body.dailyWh ?? null,
    deliveryInstall: delivery,
    customAccessories: Array.isArray(body.customAccessories) ? body.customAccessories : [],
    submittedAt: body.submittedAt || new Date().toISOString(),
    savedAt: new Date().toISOString(),
  };
}

function tryInitSqlite() {
  if (sqliteDb) return true;
  try {
    const { DatabaseSync } = require("node:sqlite");
    ensureDataDir();
    sqliteDb = new DatabaseSync(DB_PATH);
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        address TEXT NOT NULL,
        notes TEXT,
        property_type TEXT,
        property_label TEXT,
        quote_total REAL,
        quote_grand_total REAL,
        peak_w INTEGER,
        daily_wh INTEGER,
        delivery_json TEXT,
        accessories_json TEXT,
        payload_json TEXT NOT NULL,
        submitted_at TEXT,
        saved_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_leads_saved_at ON leads(saved_at DESC);
      CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
    `);
    mode = "sqlite";
    return true;
  } catch {
    sqliteDb = null;
    mode = "jsonl";
    return false;
  }
}

async function insertJsonl(record) {
  ensureDataDir();
  await fs.promises.appendFile(JSONL_PATH, JSON.stringify(record) + "\n", "utf8");
}

function insertSqlite(record) {
  const stmt = sqliteDb.prepare(`
    INSERT INTO leads (
      id, name, phone, email, address, notes,
      property_type, property_label, quote_total, quote_grand_total,
      peak_w, daily_wh, delivery_json, accessories_json, payload_json,
      submitted_at, saved_at
    ) VALUES (
      @id, @name, @phone, @email, @address, @notes,
      @propertyType, @propertyLabel, @quoteTotal, @quoteGrandTotal,
      @peakW, @dailyWh, @deliveryJson, @accessoriesJson, @payloadJson,
      @submittedAt, @savedAt
    )
  `);
  stmt.run({
    id: record.id,
    name: record.name,
    phone: record.phone,
    email: record.email,
    address: record.address,
    notes: record.notes,
    propertyType: record.propertyType,
    propertyLabel: record.propertyLabel,
    quoteTotal: record.quoteTotal,
    quoteGrandTotal: record.quoteGrandTotal,
    peakW: record.peakW,
    dailyWh: record.dailyWh,
    deliveryJson: JSON.stringify(record.deliveryInstall || null),
    accessoriesJson: JSON.stringify(record.customAccessories || []),
    payloadJson: JSON.stringify(record),
    submittedAt: record.submittedAt,
    savedAt: record.savedAt,
  });
}

function listSqlite({ limit = 50, offset = 0 } = {}) {
  const rows = sqliteDb
    .prepare(
      `SELECT id, name, phone, email, address, property_label, quote_grand_total,
              submitted_at, saved_at, payload_json
       FROM leads ORDER BY saved_at DESC LIMIT ? OFFSET ?`
    )
    .all(limit, offset);
  const total = sqliteDb.prepare("SELECT COUNT(*) AS c FROM leads").get();
  return {
    storage: "sqlite",
    path: DB_PATH,
    total: total.c,
    leads: rows.map((r) => ({
      id: r.id,
      name: r.name,
      phone: r.phone,
      email: r.email,
      address: r.address,
      propertyLabel: r.property_label,
      quoteGrandTotal: r.quote_grand_total,
      submittedAt: r.submitted_at,
      savedAt: r.saved_at,
      payload: JSON.parse(r.payload_json),
    })),
  };
}

async function listJsonl({ limit = 50, offset = 0 } = {}) {
  ensureDataDir();
  if (!fs.existsSync(JSONL_PATH)) {
    return { storage: "jsonl", path: JSONL_PATH, total: 0, leads: [] };
  }
  const text = await fs.promises.readFile(JSONL_PATH, "utf8");
  const all = text
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
  const slice = all.reverse().slice(offset, offset + limit);
  return {
    storage: "jsonl",
    path: JSONL_PATH,
    total: all.length,
    leads: slice,
  };
}

export async function initLeadsDatabase() {
  tryInitSqlite();
  ensureDataDir();
  return { mode, dbPath: mode === "sqlite" ? DB_PATH : JSONL_PATH };
}

export async function insertLead(body) {
  const record = normalizeLead(body);
  if (mode === "sqlite" && sqliteDb) {
    insertSqlite(record);
  } else {
    await insertJsonl(record);
  }
  return record;
}

export async function listLeads(opts) {
  if (mode === "sqlite" && sqliteDb) return listSqlite(opts);
  return listJsonl(opts);
}

export function leadsStorageInfo() {
  return { mode, dbPath: mode === "sqlite" ? DB_PATH : JSONL_PATH };
}
