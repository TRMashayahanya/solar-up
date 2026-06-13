/** Parse Zimbabwe street addresses + locality anchors for geocoding. */

export const LOCALITY_ALIASES = [
  { keys: ["ruwa"], label: "Ruwa", km: 25, lat: -17.889, lon: 31.244 },
  { keys: ["norton"], label: "Norton", km: 45, lat: -17.883, lon: 30.707 },
  { keys: ["chitungwiza"], label: "Chitungwiza", km: 30, lat: -18.012, lon: 31.075 },
  { keys: ["epworth"], label: "Epworth", km: 20, lat: -17.890, lon: 31.147 },
  { keys: ["chihota", "chihota growth point"], label: "Chihota", km: 80, lat: -18.203, lon: 31.283 },
  { keys: ["domboshava"], label: "Domboshava", km: 28, lat: -17.648, lon: 31.133 },
  { keys: ["juru"], label: "Juru", km: 35, lat: -17.850, lon: 31.200 },
  { keys: ["beatrice"], label: "Beatrice", km: 55, lat: -18.258, lon: 31.013 },
  { keys: ["mahusekwa"], label: "Mahusekwa", km: 65, lat: -18.183, lon: 31.017 },
  { keys: ["murewa"], label: "Murewa", km: 85, lat: -17.643, lon: 31.784 },
  { keys: ["mutoko"], label: "Mutoko", km: 140, lat: -17.397, lon: 32.226 },
  { keys: ["mudzi"], label: "Mudzi", km: 120, lat: -17.520, lon: 32.050 },
  { keys: ["shamva"], label: "Shamva", km: 95, lat: -17.312, lon: 31.574 },
  { keys: ["wedza"], label: "Wedza", km: 95, lat: -18.629, lon: 31.567 },
  { keys: ["goromonzi"], label: "Goromonzi", km: 45, lat: -17.783, lon: 31.133 },
  { keys: ["marondera"], label: "Marondera", km: 80, lat: -18.185, lon: 31.551 },
  { keys: ["borrowdale"], label: "Borrowdale, Harare", km: 0, harare: true, lat: -17.765, lon: 31.088 },
  { keys: ["avondale"], label: "Avondale, Harare", km: 0, harare: true, lat: -17.801, lon: 31.041 },
  { keys: ["greendale"], label: "Greendale, Harare", km: 0, harare: true, lat: -17.820, lon: 31.108 },
  { keys: ["mount pleasant", "mt pleasant"], label: "Mount Pleasant, Harare", km: 0, harare: true, lat: -17.782, lon: 31.052 },
  { keys: ["highlands"], label: "Highlands, Harare", km: 0, harare: true, lat: -17.793, lon: 31.075 },
  { keys: ["westgate"], label: "Westgate, Harare", km: 0, harare: true, lat: -17.789, lon: 30.996 },
  { keys: ["hatfield"], label: "Hatfield, Harare", km: 0, harare: true, lat: -17.887, lon: 31.053 },
  { keys: ["waterfalls"], label: "Waterfalls, Harare", km: 0, harare: true, lat: -17.882, lon: 31.031 },
  { keys: ["msasa"], label: "Msasa, Harare", km: 0, harare: true, lat: -17.842, lon: 31.095 },
  { keys: ["bulawayo"], label: "Bulawayo", km: 440, lat: -20.153, lon: 28.583 },
  { keys: ["mutare"], label: "Mutare", km: 270, lat: -18.970, lon: 32.671 },
  { keys: ["gweru"], label: "Gweru", km: 280, lat: -19.450, lon: 29.817 },
  { keys: ["kadoma"], label: "Kadoma", km: 140, lat: -18.333, lon: 29.915 },
  { keys: ["chinhoyi"], label: "Chinhoyi", km: 120, lat: -17.354, lon: 30.195 },
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
      if (t === kn || t.endsWith(" " + kn) || t.includes(" " + kn + " ") || t.startsWith(kn + " ")) {
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

  const loc = matchLocality(q);
  if (loc?.matched) {
    out.add(loc.label + ", Zimbabwe");
    if (loc.matched === "chihota" || loc.matched === "murewa" || loc.matched === "mutoko") {
      out.add(loc.matched + ", Marondera, Zimbabwe");
    }
  }

  return [...out].filter(Boolean);
}

/** Anchor coords for a known locality when geocoders miss rural addresses. */
export function localityAnchor(text) {
  const loc = matchLocality(text);
  if (!loc || !Number.isFinite(loc.lat) || !Number.isFinite(loc.lon)) return null;
  return { lat: loc.lat, lon: loc.lon, label: loc.label, locality: loc };
}
