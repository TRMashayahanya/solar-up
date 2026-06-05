/** Harare reference + Zimbabwe bounds (SolarApp delivery territory). */

export const HARARE_COORDS = { lat: -17.8252, lon: 31.0335 };

/** Approximate Zimbabwe bounding box for map/search/GPS checks. */
export const ZIMBABWE_BOUNDS = {
  south: -22.45,
  west: 25.22,
  north: -15.58,
  east: 33.08,
};

export function isWithinZimbabwe(lat, lon) {
  const la = Number(lat);
  const lo = Number(lon);
  if (!Number.isFinite(la) || !Number.isFinite(lo)) return false;
  return (
    la >= ZIMBABWE_BOUNDS.south &&
    la <= ZIMBABWE_BOUNDS.north &&
    lo >= ZIMBABWE_BOUNDS.west &&
    lo <= ZIMBABWE_BOUNDS.east
  );
}

export const ZIMBABWE_MAP_CENTER = { lat: -19.0154, lon: 29.1549 };

function haversineKm(lat1, lon1, lat2, lon2) {
  const r = Math.PI / 180;
  const a = (lat2 - lat1) * r;
  const b = (lon2 - lon1) * r;
  const x =
    Math.sin(a / 2) ** 2 +
    Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(b / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

export function roadKmFromHarare(lat, lon) {
  const straight = haversineKm(HARARE_COORDS.lat, HARARE_COORDS.lon, lat, lon);
  return Math.max(1, Math.round(straight * 1.12));
}
