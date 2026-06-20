/** Geolocation + Google Maps (Zimbabwe) + Nominatim fallback. */

import {
  initGoogleMaps,
  isGoogleMapsReady,
  searchPlacesGoogle,
  reverseGeocodeGoogle,
  geocodeAddressGoogle,
} from "./google-maps.js";
import {
  HARARE_COORDS,
  roadKmFromHarare,
  isWithinZimbabwe,
} from "./geo-distance.js";
import { buildGeocodeVariants, matchLocality, parseZimbabweAddress, localityAnchor } from "./address-parse.js";
import {
  normalizeZimbabweSearchQuery,
  nominatimSearchParams,
  NOMINATIM_SEARCH_PASSES,
} from "./search-query.js";
import { OUTSIDE_DELIVERY_FREE_KM } from "./packages.js";

export { HARARE_COORDS, roadKmFromHarare, isWithinZimbabwe };

const NOMINATIM = "https://nominatim.openstreetmap.org";
const FETCH_OPTS = {
  headers: {
    Accept: "application/json",
    "User-Agent": "SolarApp/1.0 (Energi Tech Zimbabwe)",
  },
};

export function googleMapsSearchUrl(query) {
  const q = String(query || "").trim();
  if (!q) return "https://www.google.com/maps/search/?api=1&query=Zimbabwe";
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(normalizeZimbabweSearchQuery(q));
}

export function googleMapsCoordsUrl(lat, lon) {
  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(String(lat) + "," + String(lon))
  );
}

function formatReverseAddress(data) {
  if (!data) return "";
  const a = data.address || {};
  const roadLine = a.house_number
    ? String(a.house_number).trim() + " " + String(a.road || a.footway || a.pedestrian || "").trim()
    : a.road || a.footway || a.pedestrian;
  const parts = [
    roadLine,
    a.suburb,
    a.neighbourhood,
    a.quarter,
    a.city_district,
    a.city || a.town || a.village,
  ].filter(Boolean);

  const unique = [];
  for (const p of parts) {
    const s = String(p).trim();
    if (s && !unique.some((u) => u.toLowerCase() === s.toLowerCase())) unique.push(s);
  }
  if (unique.length) return unique.join(", ");

  const dn = String(data.display_name || "").trim();
  if (!dn) return "";
  return dn
    .split(",")
    .slice(0, 4)
    .map((x) => x.trim())
    .filter(Boolean)
    .join(", ");
}

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Location is not supported on this device."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => {
        if (err.code === 1) {
          reject(new Error("Location permission denied. Type your Zimbabwe suburb or street."));
        } else if (err.code === 2) {
          reject(new Error("Location unavailable. Try again or type your address."));
        } else {
          reject(new Error("Could not get location. Try again."));
        }
      },
      { enableHighAccuracy: true, timeout: 14000, maximumAge: 60000 }
    );
  });
}

export async function reverseGeocode(lat, lon) {
  if (!isWithinZimbabwe(lat, lon)) {
    throw new Error("That point is outside Zimbabwe. SolarApp covers Zimbabwe only.");
  }

  try {
    await initGoogleMaps();
    if (isGoogleMapsReady()) {
      const g = await reverseGeocodeGoogle(lat, lon);
      if (g) return g;
    }
  } catch {
    /* fallback */
  }

  const url =
    NOMINATIM +
    "/reverse?lat=" +
    encodeURIComponent(lat) +
    "&lon=" +
    encodeURIComponent(lon) +
    "&format=json&addressdetails=1&countrycodes=zw";
  const res = await fetch(url, FETCH_OPTS);
  if (!res.ok) throw new Error("Could not look up address for this pin.");
  const data = await res.json();
  const cc = String(data?.address?.country_code || "").toLowerCase();
  if (cc && cc !== "zw") {
    throw new Error("GPS is outside Zimbabwe. Type your Zimbabwe address instead.");
  }
  const text = formatReverseAddress(data);
  if (!text) throw new Error("No address found for this location.");
  return text;
}

function formatSearchItem(item) {
  const fromAddr = formatReverseAddress(item);
  if (fromAddr) return fromAddr;
  return String(item.display_name || "")
    .split(",")
    .slice(0, 4)
    .map((x) => x.trim())
    .filter(Boolean)
    .join(", ");
}

async function nominatimSearchOnce(searchQ, limit, passOpts = {}) {
  const url =
    NOMINATIM +
    "/search?" +
    new URLSearchParams(nominatimSearchParams(searchQ, { limit, ...passOpts }));
  const res = await fetch(url, FETCH_OPTS);
  if (!res.ok) return [];
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data;
}

/** Nominatim search — Zimbabwe only, multi-pass (bias → bounded → settlement/city). */
async function searchPlacesNominatim(query, { limit = 8 } = {}) {
  const q = String(query || "").trim();
  if (q.length < 2) return [];

  const variants = buildGeocodeVariants(q);
  const seen = new Set();
  const out = [];

  for (const variant of variants) {
    for (const pass of NOMINATIM_SEARCH_PASSES) {
      const data = await nominatimSearchOnce(variant, limit, pass);
      nominatimToSuggestions(data, seen, out);
      if (out.length >= limit) return out.slice(0, limit);
    }
  }

  return out.slice(0, limit);
}

function nominatimToSuggestions(data, seen, out, preferLabel) {
  for (const item of data) {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;
    if (!isWithinZimbabwe(lat, lon)) continue;
    const label = preferLabel || formatSearchItem(item);
    if (!label) continue;
    const key = label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      label,
      lat,
      lon,
      distanceKm: roadKmFromHarare(lat, lon),
      source: "nominatim",
      precision: preferLabel ? "locality" : "full",
    });
  }
}

/** Prefer catalog anchor when geocoders return a homonym closer to Harare than expected. */
export function reconcileLocalityHit(query, hit) {
  if (!hit?.lat || !hit?.lon) return hit;
  const loc = matchLocality(query) || matchLocality(hit.label);
  if (!loc || !Number.isFinite(loc.lat) || !Number.isFinite(loc.lon)) return hit;

  const anchorKm = roadKmFromHarare(loc.lat, loc.lon);
  const hitKm = roadKmFromHarare(hit.lat, hit.lon);
  const catalogKm = loc.km > 0 ? loc.km : anchorKm;

  // Known remote area geocoded inside free radius — never qualify by mistake.
  if (catalogKm > OUTSIDE_DELIVERY_FREE_KM && hitKm <= OUTSIDE_DELIVERY_FREE_KM) {
    const parsed = parseZimbabweAddress(query);
    return {
      label: parsed.formatted || loc.label + (loc.harare ? "" : ", Zimbabwe"),
      lat: loc.lat,
      lon: loc.lon,
      distanceKm: anchorKm,
      source: "anchor",
      precision: "locality",
    };
  }

  if (catalogKm >= 35 && hitKm + 20 < catalogKm) {
    const parsed = parseZimbabweAddress(query);
    return {
      label: parsed.formatted || loc.label + (loc.harare ? "" : ", Zimbabwe"),
      lat: loc.lat,
      lon: loc.lon,
      distanceKm: anchorKm,
      source: "anchor",
      precision: "locality",
    };
  }

  return { ...hit, distanceKm: hitKm };
}

/** Geocode town/suburb when exact street is not in map data. */
async function geocodeLocalityFallback(query) {
  const parsed = parseZimbabweAddress(query);
  const loc = matchLocality(query) || (parsed.locality ? matchLocality(parsed.locality) : null);
  if (!loc) return null;

  const variants = [loc.label + ", Zimbabwe", loc.matched + ", Zimbabwe", loc.matched + ", Mashonaland East, Zimbabwe"];
  for (const v of variants) {
    const data = await nominatimSearchOnce(v, 3);
    for (const item of data) {
      const lat = parseFloat(item.lat);
      const lon = parseFloat(item.lon);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;
      if (!isWithinZimbabwe(lat, lon)) continue;
      return {
        label: parsed.formatted || query,
        lat,
        lon,
        distanceKm: roadKmFromHarare(lat, lon),
        source: "parsed",
        precision: "locality",
      };
    }
  }

  const anchor = localityAnchor(query);
  if (anchor) {
    return {
      label: parsed.formatted || query,
      lat: anchor.lat,
      lon: anchor.lon,
      distanceKm: roadKmFromHarare(anchor.lat, anchor.lon),
      source: "anchor",
      precision: "locality",
    };
  }

  return null;
}

/** Zimbabwe places: local list → Google (ZW) → Nominatim fallback (OSM detail). */
export async function searchPlaces(query, { limit = 8, localFirst = [] } = {}) {
  const q = String(query || "").trim();
  if (q.length < 2) return [];

  const seen = new Set();
  const out = [];

  function add(item) {
    if (!item?.label) return;
    const key = item.label.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push(item);
  }

  for (const item of localFirst) add(item);

  let google = [];
  try {
    await initGoogleMaps();
    if (isGoogleMapsReady()) google = await searchPlacesGoogle(q, { limit });
  } catch {
    google = [];
  }
  for (const item of google) {
    add(reconcileLocalityHit(q, item));
    if (out.length >= limit) return out.slice(0, limit);
  }

  const needNominatim = out.length < limit && (google.length === 0 || out.length < Math.min(3, limit));
  if (needNominatim) {
    const nom = await searchPlacesNominatim(q, { limit });
    for (const item of nom) {
      add(reconcileLocalityHit(q, item));
      if (out.length >= limit) break;
    }
  }

  if (out.length === 0) {
    const anchor = localityAnchor(q);
    if (anchor) {
      const parsed = parseZimbabweAddress(q);
      add(
        reconcileLocalityHit(q, {
          label: parsed.formatted || anchor.label + ", Zimbabwe",
          lat: anchor.lat,
          lon: anchor.lon,
          distanceKm: roadKmFromHarare(anchor.lat, anchor.lon),
          source: "anchor",
          precision: "locality",
        })
      );
    }
  }

  return out.slice(0, limit);
}

export async function geocodePlace(query) {
  const q = String(query || "").trim();
  if (q.length < 3) return null;

  const variants = buildGeocodeVariants(q);

  try {
    await initGoogleMaps();
    if (isGoogleMapsReady()) {
      for (const v of variants) {
        const g = await geocodeAddressGoogle(v);
        if (g?.lat != null && g?.lon != null) {
          const merged =
            g.label === v || !parseZimbabweAddress(q).street
              ? g
              : { ...g, label: parseZimbabweAddress(q).formatted || q, precision: g.precision || "full" };
          return reconcileLocalityHit(q, merged);
        }
      }
    }
  } catch {
    /* fallback */
  }

  for (const v of variants) {
    for (const pass of NOMINATIM_SEARCH_PASSES) {
      const data = await nominatimSearchOnce(v, 3, pass);
      const seen = new Set();
      const hits = [];
      nominatimToSuggestions(data, seen, hits, null);
      if (hits[0]?.lat != null) {
        const hit =
          hits[0].label.toLowerCase() !== q.toLowerCase()
            ? { ...hits[0], label: parseZimbabweAddress(q).formatted || q }
            : hits[0];
        return reconcileLocalityHit(q, hit);
      }
    }
  }

  const nomList = await searchPlacesNominatim(q, { limit: 3 });
  const exact = nomList.find((x) => x.lat != null) || (await searchPlaces(q, { limit: 3 })).find((x) => x.lat != null);
  if (exact) {
    const hit =
      exact.label.toLowerCase() !== q.toLowerCase()
        ? { ...exact, label: parseZimbabweAddress(q).formatted || q }
        : exact;
    return reconcileLocalityHit(q, hit);
  }

  const fallback = await geocodeLocalityFallback(q);
  return fallback ? reconcileLocalityHit(q, fallback) : null;
}

/** GPS in Zimbabwe → street-level address + km from Harare. */
export async function locateAddress({ openMaps = false } = {}) {
  const { lat, lon } = await getCurrentPosition();

  if (!isWithinZimbabwe(lat, lon)) {
    throw new Error(
      "Your GPS is outside Zimbabwe. SolarApp is Zimbabwe-only — search your suburb or street, or move the pin on the map."
    );
  }

  const address = await reverseGeocode(lat, lon);
  const distanceKm = roadKmFromHarare(lat, lon);

  if (openMaps) {
    try {
      window.open(googleMapsCoordsUrl(lat, lon), "_blank", "noopener,noreferrer");
    } catch {
      /* popup blocked */
    }
  }

  return { address, lat, lon, distanceKm };
}
