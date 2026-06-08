/** Parse Zimbabwe street addresses for precise geocoding fallbacks. */

const LOCALITY_ALIASES = [
  { keys: ["ruwa"], label: "Ruwa", km: 25 },
  { keys: ["norton"], label: "Norton", km: 45 },
  { keys: ["chitungwiza"], label: "Chitungwiza", km: 30 },
  { keys: ["epworth"], label: "Epworth", km: 20 },
  { keys: ["borrowdale"], label: "Borrowdale, Harare", km: 0, harare: true },
  { keys: ["avondale"], label: "Avondale, Harare", km: 0, harare: true },
  { keys: ["greendale"], label: "Greendale, Harare", km: 0, harare: true },
  { keys: ["mount pleasant", "mt pleasant"], label: "Mount Pleasant, Harare", km: 0, harare: true },
  { keys: ["highlands"], label: "Highlands, Harare", km: 0, harare: true },
  { keys: ["westgate"], label: "Westgate, Harare", km: 0, harare: true },
  { keys: ["hatfield"], label: "Hatfield, Harare", km: 0, harare: true },
  { keys: ["waterfalls"], label: "Waterfalls, Harare", km: 0, harare: true },
  { keys: ["msasa"], label: "Msasa, Harare", km: 0, harare: true },
  { keys: ["bulawayo"], label: "Bulawayo", km: 440 },
  { keys: ["mutare"], label: "Mutare", km: 270 },
  { keys: ["gweru"], label: "Gweru", km: 280 },
  { keys: ["marondera"], label: "Marondera", km: 80 },
  { keys: ["kadoma"], label: "Kadoma", km: 140 },
  { keys: ["chinhoyi"], label: "Chinhoyi", km: 120 },
];

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Longest locality match at end of text (or anywhere for single-word queries). */
export function matchLocality(text) {
  const t = norm(text);
  if (!t) return null;
  let best = null;
  for (const loc of LOCALITY_ALIASES) {
    for (const key of loc.keys) {
      const kn = norm(key);
      if (t === kn || t.endsWith(" " + kn) || t.includes(" " + kn + " ")) {
        if (!best || kn.length > best.key.length) {
          best = { ...loc, key: kn, matched: key };
        }
      }
    }
  }
  return best;
}

/**
 * Parse e.g. "288 Chimoyo Crescent Ruwa" → { streetNumber, street, locality, formatted }.
 */
export function parseZimbabweAddress(text) {
  const raw = String(text || "").trim();
  if (!raw) {
    return { raw: "", streetNumber: "", street: "", locality: "", formatted: "" };
  }

  let streetNumber = "";
  let body = raw;
  const numMatch = raw.match(/^(\d+[A-Za-z]?)\s+(.+)$/);
  if (numMatch) {
    streetNumber = numMatch[1];
    body = numMatch[2].trim();
  }

  const loc = matchLocality(body) || matchLocality(raw);
  let street = body;
  let locality = "";
  let localityLabel = "";

  if (loc) {
    locality = loc.matched;
    localityLabel = loc.label;
    const re = new RegExp("\\b" + loc.key.replace(/\s+/g, "\\s+") + "\\b", "i");
    street = body.replace(re, "").replace(/,\s*$/, "").trim();
  }

  const parts = [];
  if (streetNumber && street) parts.push(streetNumber + " " + street);
  else if (street) parts.push(street);
  else if (streetNumber) parts.push(streetNumber);
  if (localityLabel) parts.push(localityLabel);
  const formatted = parts.filter(Boolean).join(", ");

  return {
    raw,
    streetNumber,
    street,
    locality,
    localityLabel,
    formatted: formatted || raw,
  };
}

/** Query variants for geocoders (full address → street → town). */
export function buildGeocodeVariants(query) {
  const q = String(query || "").trim();
  if (!q) return [];
  const parsed = parseZimbabweAddress(q);
  const out = new Set();
  out.add(q);
  if (!/\bzimbabwe\b/i.test(q)) out.add(q + ", Zimbabwe");

  if (parsed.formatted && parsed.formatted !== q) {
    out.add(parsed.formatted);
    if (!/\bzimbabwe\b/i.test(parsed.formatted)) out.add(parsed.formatted + ", Zimbabwe");
  }

  if (parsed.streetNumber && parsed.street && parsed.localityLabel) {
    out.add(parsed.streetNumber + " " + parsed.street + ", " + parsed.localityLabel + ", Zimbabwe");
    out.add(parsed.street + ", " + parsed.localityLabel + ", Zimbabwe");
  } else if (parsed.street && parsed.localityLabel) {
    out.add(parsed.street + ", " + parsed.localityLabel + ", Zimbabwe");
  }

  if (parsed.localityLabel) {
    out.add(parsed.localityLabel + ", Zimbabwe");
  }

  return [...out].filter(Boolean);
}
