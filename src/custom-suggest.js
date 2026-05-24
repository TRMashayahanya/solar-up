/**
 * Smart suggestions & parsing for custom accessories.
 */
import { LIBRARY, LIB_CATALOG_OVERLAP, seedFromLibrary } from "./custom-library.js";

export { LIBRARY, LIB_CATALOG_OVERLAP, seedFromLibrary };

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreMatch(query, entry) {
  const q = norm(query);
  if (!q) return 0;
  const label = norm(entry.label);
  if (label === q) return 1;
  if (label.includes(q) || q.includes(label)) return 0.85;
  let best = 0;
  for (const kw of entry.keywords || []) {
    const k = norm(kw);
    if (k === q) best = Math.max(best, 0.9);
    else if (k.includes(q) || q.includes(k)) best = Math.max(best, 0.75);
    else if (q.split(" ").some((w) => w.length > 2 && k.includes(w))) best = Math.max(best, 0.55);
  }
  if (q.split(" ").some((w) => w.length > 2 && label.includes(w))) best = Math.max(best, 0.65);
  return best;
}

export function findBestLibraryMatch(query) {
  let best = null;
  let bestScore = 0;
  for (const entry of LIBRARY) {
    const s = scoreMatch(query, entry);
    if (s > bestScore) {
      bestScore = s;
      best = { ...entry, score: s };
    }
  }
  return bestScore >= 0.45 ? best : null;
}

export function searchSuggestions(query, propType, limit = 6) {
  const q = norm(query);
  const scored = [];
  for (const entry of LIBRARY) {
    if (!entry.types.includes("all") && propType && !entry.types.includes(propType)) continue;
    const s = q ? scoreMatch(q, entry) : 0.3;
    if (q && s < 0.35) continue;
    scored.push({ ...entry, score: s });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

export function getPropertySuggestions(propType, ctx) {
  const qtys = ctx?.qtys || {};
  const customLabels = (ctx?.customLabels || []).map(norm);
  const out = [];
  for (const entry of LIBRARY) {
    if (!entry.types.includes("all") && propType && !entry.types.includes(propType)) continue;
    const catId = LIB_CATALOG_OVERLAP[entry.id];
    if (catId && (qtys[catId] || 0) > 0) continue;
    const labelNorm = norm(entry.label);
    if (customLabels.some((l) => l === labelNorm || l.includes(labelNorm) || labelNorm.includes(l))) continue;
    const tailored = propType && entry.types.includes(propType) && !entry.types.includes("all");
    out.push({ ...entry, tailored });
  }
  out.sort((a, b) => (b.tailored ? 1 : 0) - (a.tailored ? 1 : 0));
  return out.slice(0, 8);
}

export function parseQuickInput(text) {
  const raw = String(text || "").trim();
  if (!raw) return null;

  let work = raw.toLowerCase();
  let qty = 1;
  const qtyLead = work.match(/^(\d+)\s*(?:x|×|\*)\s*/i);
  if (qtyLead) {
    qty = Math.min(99, parseInt(qtyLead[1], 10));
    work = work.slice(qtyLead[0].length);
  } else {
    const qtyWord = work.match(/^(\d+)\s+(?=[a-z])/i);
    if (qtyWord) {
      qty = Math.min(99, parseInt(qtyWord[1], 10));
      work = work.slice(qtyWord[0].length);
    }
  }

  let w = null;
  let dh = null;
  const wMatch = work.match(/(\d+)\s*w(?:att)?s?\b/i);
  if (wMatch) {
    w = parseInt(wMatch[1], 10);
    work = (work.slice(0, wMatch.index) + work.slice(wMatch.index + wMatch[0].length)).trim();
  }
  const hMatch = work.match(/(\d+(?:\.\d+)?)\s*(?:h|hr|hrs|hour|hours)(?:\s*\/\s*day)?\b/i);
  if (hMatch) {
    dh = parseFloat(hMatch[1]);
    work = (work.slice(0, hMatch.index) + work.slice(hMatch.index + hMatch[0].length)).trim();
  }

  let label = work.replace(/[,;]+/g, " ").replace(/\s+/g, " ").trim();
  if (!label) label = raw.replace(/\d+\s*w.*/i, "").trim() || "Custom item";

  const lib = findBestLibraryMatch(label);
  const pretty =
    lib && lib.score >= 0.55
      ? lib.label
      : label.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bAnd\b/g, "and");

  return {
    label: pretty,
    w: w != null && w > 0 ? w : lib?.w ?? 100,
    dh: dh != null && dh >= 0 ? dh : lib?.dh ?? 4,
    qty,
    iconKey: lib?.iconKey ?? "other",
    fromLibrary: !!lib && lib.score >= 0.55,
  };
}

export function suggestEnrichment(label, currentW, currentDh) {
  const lib = findBestLibraryMatch(label);
  if (!lib || lib.score < 0.5) return null;
  const wDefault = currentW === 100 || currentW == null;
  const hDefault = currentDh === 4 || currentDh == null;
  return {
    label: lib.label,
    w: lib.w,
    dh: lib.dh,
    iconKey: lib.iconKey,
    autoW: wDefault,
    autoH: hDefault,
    score: lib.score,
  };
}

