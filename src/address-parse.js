/** Parse Zimbabwe street addresses + locality anchors for geocoding. */
import { normalizeZimbabweSearchQuery } from "./search-query.js";

export const LOCALITY_ALIASES = [
  { keys: ["ruwa"], label: "Ruwa", km: 25, lat: -17.889, lon: 31.244 },
  { keys: ["norton"], label: "Norton", km: 45, lat: -17.883, lon: 30.707 },
  { keys: ["chitungwiza", "chitungwiza town"], label: "Chitungwiza", km: 30, lat: -18.012, lon: 31.075 },
  { keys: ["epworth"], label: "Epworth", km: 20, lat: -17.890, lon: 31.147 },
  { keys: ["seke", "st marys", "st. marys", "saint marys"], label: "Seke", km: 32, lat: -18.003, lon: 31.089 },
  { keys: ["damofalls", "damo falls"], label: "Damofalls", km: 28, lat: -17.868, lon: 31.156 },
  { keys: ["zimre park"], label: "Zimre Park", km: 22, lat: -17.905, lon: 31.118 },
  { keys: ["chihota", "chihota growth point"], label: "Chihota", km: 80, lat: -18.203, lon: 31.283 },
  { keys: ["domboshava"], label: "Domboshava", km: 28, lat: -17.648, lon: 31.133 },
  { keys: ["juru"], label: "Juru", km: 35, lat: -17.850, lon: 31.200 },
  { keys: ["beatrice"], label: "Beatrice", km: 55, lat: -18.258, lon: 31.013 },
  { keys: ["mahusekwa"], label: "Mahusekwa", km: 65, lat: -18.183, lon: 31.017 },
  { keys: ["murewa", "murehwa"], label: "Murewa", km: 85, lat: -17.643, lon: 31.784 },
  { keys: ["mutoko"], label: "Mutoko", km: 140, lat: -17.397, lon: 32.226 },
  { keys: ["mudzi"], label: "Mudzi", km: 120, lat: -17.520, lon: 32.050 },
  { keys: ["shamva"], label: "Shamva", km: 95, lat: -17.312, lon: 31.574 },
  { keys: ["wedza"], label: "Wedza", km: 95, lat: -18.629, lon: 31.567 },
  { keys: ["goromonzi"], label: "Goromonzi", km: 45, lat: -17.783, lon: 31.133 },
  { keys: ["marondera"], label: "Marondera", km: 80, lat: -18.185, lon: 31.551 },
  { keys: ["headlands"], label: "Headlands", km: 130, lat: -18.277, lon: 32.048 },
  { keys: ["rusape"], label: "Rusape", km: 170, lat: -18.527, lon: 32.128 },
  { keys: ["bindura"], label: "Bindura", km: 90, lat: -17.301, lon: 31.328 },
  { keys: ["glendale"], label: "Glendale", km: 35, lat: -17.355, lon: 31.067 },
  { keys: ["concession"], label: "Concession", km: 55, lat: -17.383, lon: 30.950 },
  { keys: ["centenary"], label: "Centenary", km: 130, lat: -16.723, lon: 31.117 },
  { keys: ["mvurwi"], label: "Mvurwi", km: 100, lat: -17.033, lon: 30.850 },
  { keys: ["chegutu"], label: "Chegutu", km: 100, lat: -18.130, lon: 30.140 },
  { keys: ["kadoma"], label: "Kadoma", km: 140, lat: -18.333, lon: 29.915 },
  { keys: ["chinhoyi"], label: "Chinhoyi", km: 120, lat: -17.354, lon: 30.195 },
  { keys: ["karoi"], label: "Karoi", km: 185, lat: -16.810, lon: 29.692 },
  { keys: ["kariba"], label: "Kariba", km: 360, lat: -16.516, lon: 28.800 },
  { keys: ["borrowdale"], label: "Borrowdale, Harare", km: 0, harare: true, lat: -17.765, lon: 31.088 },
  { keys: ["avondale"], label: "Avondale, Harare", km: 0, harare: true, lat: -17.801, lon: 31.041 },
  { keys: ["greendale"], label: "Greendale, Harare", km: 0, harare: true, lat: -17.820, lon: 31.108 },
  { keys: ["mount pleasant", "mt pleasant"], label: "Mount Pleasant, Harare", km: 0, harare: true, lat: -17.782, lon: 31.052 },
  { keys: ["highlands"], label: "Highlands, Harare", km: 0, harare: true, lat: -17.793, lon: 31.075 },
  { keys: ["westgate"], label: "Westgate, Harare", km: 0, harare: true, lat: -17.789, lon: 30.996 },
  { keys: ["hatfield"], label: "Hatfield, Harare", km: 0, harare: true, lat: -17.887, lon: 31.053 },
  { keys: ["waterfalls"], label: "Waterfalls, Harare", km: 0, harare: true, lat: -17.882, lon: 31.031 },
  { keys: ["msasa"], label: "Msasa, Harare", km: 0, harare: true, lat: -17.842, lon: 31.095 },
  { keys: ["belgravia"], label: "Belgravia, Harare", km: 0, harare: true, lat: -17.808, lon: 31.045 },
  { keys: ["marlborough"], label: "Marlborough, Harare", km: 0, harare: true, lat: -17.785, lon: 31.035 },
  { keys: ["alexandra park"], label: "Alexandra Park, Harare", km: 0, harare: true, lat: -17.798, lon: 31.033 },
  { keys: ["mabelreign"], label: "Mabelreign, Harare", km: 0, harare: true, lat: -17.870, lon: 30.995 },
  { keys: ["warren park"], label: "Warren Park, Harare", km: 0, harare: true, lat: -17.888, lon: 30.978 },
  { keys: ["crowborough"], label: "Crowborough, Harare", km: 0, harare: true, lat: -17.855, lon: 31.018 },
  { keys: ["mabvuku"], label: "Mabvuku, Harare", km: 0, harare: true, lat: -17.835, lon: 31.208 },
  { keys: ["tafara"], label: "Tafara, Harare", km: 0, harare: true, lat: -17.825, lon: 31.215 },
  { keys: ["glen view", "glenview"], label: "Glen View, Harare", km: 0, harare: true, lat: -17.910, lon: 30.978 },
  { keys: ["glen norah", "glennorah"], label: "Glen Norah, Harare", km: 0, harare: true, lat: -17.905, lon: 30.965 },
  { keys: ["mbare"], label: "Mbare, Harare", km: 0, harare: true, lat: -17.860, lon: 31.035 },
  { keys: ["budiriro"], label: "Budiriro, Harare", km: 0, harare: true, lat: -17.895, lon: 30.955 },
  { keys: ["kambuzuma"], label: "Kambuzuma, Harare", km: 0, harare: true, lat: -17.875, lon: 30.965 },
  { keys: ["kuwadzana"], label: "Kuwadzana, Harare", km: 0, harare: true, lat: -17.855, lon: 30.945 },
  { keys: ["dzivarasekwa"], label: "Dzivarasekwa, Harare", km: 0, harare: true, lat: -17.845, lon: 30.935 },
  { keys: ["mufakose"], label: "Mufakose, Harare", km: 0, harare: true, lat: -17.865, lon: 30.928 },
  { keys: ["hatcliffe"], label: "Hatcliffe, Harare", km: 0, harare: true, lat: -17.745, lon: 31.065 },
  { keys: ["graniteside"], label: "Graniteside, Harare", km: 0, harare: true, lat: -17.855, lon: 31.075 },
  { keys: ["southerton"], label: "Southerton, Harare", km: 0, harare: true, lat: -17.865, lon: 31.055 },
  { keys: ["workington"], label: "Workington, Harare", km: 0, harare: true, lat: -17.845, lon: 31.015 },
  { keys: ["bulawayo"], label: "Bulawayo", km: 440, lat: -20.153, lon: 28.583 },
  { keys: ["mutare"], label: "Mutare", km: 270, lat: -18.970, lon: 32.671 },
  { keys: ["gweru"], label: "Gweru", km: 280, lat: -19.450, lon: 29.817 },
  { keys: ["masvingo"], label: "Masvingo", km: 300, lat: -20.074, lon: 30.833 },
  { keys: ["kwekwe"], label: "Kwekwe", km: 200, lat: -18.928, lon: 29.815 },
  { keys: ["victoria falls"], label: "Victoria Falls", km: 870, lat: -17.924, lon: 25.857 },
  { keys: ["hwange"], label: "Hwange", km: 750, lat: -18.365, lon: 26.498 },
  { keys: ["nyanga"], label: "Nyanga", km: 280, lat: -18.217, lon: 32.750 },
  { keys: ["chipinge"], label: "Chipinge", km: 450, lat: -20.188, lon: 32.608 },
  { keys: ["chiredzi"], label: "Chiredzi", km: 480, lat: -21.050, lon: 31.667 },
  { keys: ["plumtree"], label: "Plumtree", km: 450, lat: -20.483, lon: 27.817 },
  { keys: ["beitbridge"], label: "Beitbridge", km: 580, lat: -22.217, lon: 30.000 },
  { keys: ["redcliff"], label: "Redcliff", km: 300, lat: -19.033, lon: 29.783 },
  { keys: ["zvishavane"], label: "Zvishavane", km: 350, lat: -20.333, lon: 30.033 },
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
      const exact = t === kn;
      const suffix = t.endsWith(" " + kn);
      const embedded = t.includes(" " + kn + " ") || t.startsWith(kn + " ");
      const singleWord = !t.includes(" ") && t.length >= 3 && (t === kn || kn.startsWith(t + " ") || kn.startsWith(t));
      if (exact || suffix || embedded || singleWord) {
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
  out.add(normalizeZimbabweSearchQuery(q));

  if (parsed.formatted && parsed.formatted !== q) {
    out.add(parsed.formatted);
    out.add(normalizeZimbabweSearchQuery(parsed.formatted));
  }

  if (parsed.streetNumber && parsed.street && parsed.localityLabel) {
    out.add(parsed.streetNumber + " " + parsed.street + ", " + parsed.localityLabel + ", Zimbabwe");
    out.add(parsed.street + ", " + parsed.localityLabel + ", Zimbabwe");
  } else if (parsed.street && parsed.localityLabel) {
    out.add(parsed.street + ", " + parsed.localityLabel + ", Zimbabwe");
  }

  if (parsed.localityLabel) {
    out.add(parsed.localityLabel + ", Zimbabwe");
    out.add(parsed.localityLabel + ", Mashonaland East, Zimbabwe");
  }

  const loc = matchLocality(q);
  if (loc?.matched) {
    out.add(loc.label + ", Zimbabwe");
    if (loc.matched.includes("growth")) {
      out.add(loc.matched.replace(/ growth point/i, "") + " Growth Point, Zimbabwe");
    }
    if (loc.matched === "chihota" || loc.matched === "murewa" || loc.matched === "murehwa" || loc.matched === "mutoko") {
      out.add(loc.matched + ", Marondera, Zimbabwe");
    }
    if (loc.matched === "shamva" || loc.matched === "bindura") {
      out.add(loc.matched + ", Mashonaland Central, Zimbabwe");
    }
  }

  return [...out].filter(Boolean);
}

export { normalizeZimbabweSearchQuery };

/** Anchor coords for a known locality when geocoders miss rural addresses. */
export function localityAnchor(text) {
  const loc = matchLocality(text);
  if (!loc || !Number.isFinite(loc.lat) || !Number.isFinite(loc.lon)) return null;
  return { lat: loc.lat, lon: loc.lon, label: loc.label, locality: loc };
}
