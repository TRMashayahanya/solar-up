/**
 * Zimbabwe search query normalization + geocoder bounding helpers.
 * Keeps regional suburbs, growth points, and towns discoverable.
 */

/** Strict Zimbabwe bounding box for geocoders (lat/lng). */
export const ZIMBABWE_GEO_BOUNDS = {
  south: -22.5,
  north: -15.5,
  west: 25.0,
  east: 33.5,
};

/** Nominatim viewbox: west, north, east, south. */
export const NOMINATIM_VIEWBOX = "25.0,-15.5,33.5,-22.5";

const ZW_SUFFIX_RE = /,\s*(zimbabwe|zw|zim)\s*$/i;

/** Clean user input and append ", Zimbabwe" when missing. */
export function normalizeZimbabweSearchQuery(raw) {
  let q = String(raw || "")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/^[,.\s]+|[,.\s]+$/g, "");

  if (!q) return "";

  q = q.replace(/\bGP\b/gi, "Growth Point");
  q = q.replace(/\bHre\b/gi, "Harare");
  q = q.replace(/\bGP\s+(\w)/gi, "Growth Point $1");

  if (!ZW_SUFFIX_RE.test(q) && !/\bzimbabwe\b/i.test(q)) {
    q = q + ", Zimbabwe";
  }

  return q;
}

/** Strip country suffix for display / dedupe keys. */
export function stripZimbabweSuffix(label) {
  return String(label || "")
    .replace(/,\s*Zimbabwe\s*$/i, "")
    .trim();
}

/** True when coords fall inside Zimbabwe bounds. */
export function isWithinZimbabweBounds(lat, lon) {
  const la = Number(lat);
  const lo = Number(lon);
  if (!Number.isFinite(la) || !Number.isFinite(lo)) return false;
  const b = ZIMBABWE_GEO_BOUNDS;
  return la >= b.south && la <= b.north && lo >= b.west && lo <= b.east;
}

/** Build Nominatim search URL params for a pass. */
export function nominatimSearchParams(query, { limit = 8, bounded = false, featuretype } = {}) {
  const params = {
    q: normalizeZimbabweSearchQuery(query),
    format: "json",
    addressdetails: "1",
    countrycodes: "zw",
    limit: String(limit),
    dedupe: "1",
    viewbox: NOMINATIM_VIEWBOX,
    bounded: bounded ? "1" : "0",
  };
  if (featuretype) params.featuretype = featuretype;
  return params;
}

/** Ordered Nominatim passes — bias first, then bounded, then settlement/city types. */
export const NOMINATIM_SEARCH_PASSES = [
  { bounded: false },
  { bounded: true },
  { bounded: false, featuretype: "settlement" },
  { bounded: false, featuretype: "city" },
];
