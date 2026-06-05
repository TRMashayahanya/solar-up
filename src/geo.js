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
  const withCountry = /\bzimbabwe\b/i.test(q) ? q : q + ", Zimbabwe";
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(withCountry);
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
  const parts = [
    a.road,
    a.footway,
    a.pedestrian,
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

/** Nominatim search — Zimbabwe only. */
async function searchPlacesNominatim(query, { limit = 8 } = {}) {
  const q = String(query || "").trim();
  if (q.length < 2) return [];

  const searchQ = /\bzimbabwe\b/i.test(q) ? q : q + ", Zimbabwe";
  const url =
    NOMINATIM +
    "/search?" +
    new URLSearchParams({
      q: searchQ,
      format: "json",
      addressdetails: "1",
      countrycodes: "zw",
      limit: String(limit),
    });

  const res = await fetch(url, FETCH_OPTS);
  if (!res.ok) return [];

  const data = await res.json();
  if (!Array.isArray(data)) return [];

  const seen = new Set();
  const out = [];
  for (const item of data) {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;
    if (!isWithinZimbabwe(lat, lon)) continue;
    const label = formatSearchItem(item);
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
    });
  }
  return out;
}

/** Zimbabwe places: local list → Google (ZW) → Nominatim (ZW). */
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
    add(item);
    if (out.length >= limit) return out.slice(0, limit);
  }

  const nom = await searchPlacesNominatim(q, { limit });
  for (const item of nom) {
    add(item);
    if (out.length >= limit) break;
  }

  return out.slice(0, limit);
}

export async function geocodePlace(query) {
  const q = String(query || "").trim();
  if (q.length < 3) return null;
  try {
    await initGoogleMaps();
    if (isGoogleMapsReady()) {
      const g = await geocodeAddressGoogle(q);
      if (g) return g;
    }
  } catch {
    /* fallback */
  }
  const list = await searchPlaces(q, { limit: 1 });
  return list[0] || null;
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
