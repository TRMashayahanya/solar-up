import { getRuntimeConfig } from "./runtime-config.js";
import { buildGeocodeVariants } from "./address-parse.js";
import {
  HARARE_COORDS,
  ZIMBABWE_BOUNDS,
  ZIMBABWE_MAP_CENTER,
  isWithinZimbabwe,
  roadKmFromHarare,
} from "./geo-distance.js";

let loadPromise = null;
let placesServiceDiv = null;

export async function initGoogleMaps() {
  const cfg = await getRuntimeConfig();
  const key = String(cfg.googleMapsApiKey || "").trim();
  if (!key) return false;
  if (window.google?.maps?.places) return true;

  if (!loadPromise) {
    loadPromise = new Promise((resolve, reject) => {
      const id = "google-maps-js";
      if (document.getElementById(id)) {
        const wait = setInterval(() => {
          if (window.google?.maps?.places) {
            clearInterval(wait);
            resolve(true);
          }
        }, 50);
        setTimeout(() => {
          clearInterval(wait);
          if (window.google?.maps?.places) resolve(true);
          else reject(new Error("Google Maps timeout"));
        }, 12000);
        return;
      }
      const script = document.createElement("script");
      script.id = id;
      script.async = true;
      script.defer = true;
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        encodeURIComponent(key) +
        "&libraries=places&region=ZW&language=en";
      script.onload = () => resolve(!!window.google?.maps?.places);
      script.onerror = () => reject(new Error("Google Maps failed to load"));
      document.head.appendChild(script);
    });
  }

  try {
    return await loadPromise;
  } catch {
    loadPromise = null;
    return false;
  }
}

export function isGoogleMapsReady() {
  return !!(window.google?.maps?.places);
}

function zimbabweLatLngBounds() {
  const g = window.google.maps;
  return new g.LatLngBounds(
    new g.LatLng(ZIMBABWE_BOUNDS.south, ZIMBABWE_BOUNDS.west),
    new g.LatLng(ZIMBABWE_BOUNDS.north, ZIMBABWE_BOUNDS.east)
  );
}

function getPlacesService() {
  if (!placesServiceDiv) {
    placesServiceDiv = document.createElement("div");
  }
  return new window.google.maps.places.PlacesService(placesServiceDiv);
}

function component(countryCode) {
  const ac = countryCode || [];
  return ac.find((c) => c.types?.includes("country"));
}

function isZimbabwePlace(place) {
  const country = component(place?.address_components);
  if (country?.short_name === "ZW") return true;
  const loc = place?.geometry?.location;
  const lat = typeof loc?.lat === "function" ? loc.lat() : loc?.lat;
  const lon = typeof loc?.lng === "function" ? loc.lng() : loc?.lng;
  return isWithinZimbabwe(lat, lon);
}

/** Route + suburb + city for Zimbabwe addresses. */
export function formatZimbabweAddress(place) {
  if (!place) return "";
  const ac = place.address_components || [];
  const get = (type) => ac.find((c) => c.types?.includes(type))?.long_name;

  const route = get("route");
  const streetNum = get("street_number");
  const suburb =
    get("sublocality_level_1") ||
    get("sublocality") ||
    get("neighbourhood") ||
    get("suburb");
  const city =
    get("locality") ||
    get("administrative_area_level_2") ||
    get("administrative_area_level_1");

  const parts = [];
  if (route) parts.push(streetNum ? streetNum + " " + route : route);
  else if (place.name && place.name !== city) parts.push(place.name);
  if (suburb && suburb !== city) parts.push(suburb);
  if (city) parts.push(city);

  const line = parts.filter(Boolean).join(", ");
  if (line) return line;

  const formatted = String(place.formatted_address || "").trim();
  if (formatted) {
    return formatted
      .replace(/,?\s*Zimbabwe\s*$/i, "")
      .split(",")
      .slice(0, 4)
      .map((x) => x.trim())
      .filter(Boolean)
      .join(", ");
  }
  return "";
}

export function placeResultToSuggestion(place) {
  const loc = place?.geometry?.location;
  const lat = typeof loc?.lat === "function" ? loc.lat() : loc?.lat;
  const lon = typeof loc?.lng === "function" ? loc.lng() : loc?.lng;
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  if (!isWithinZimbabwe(lat, lon)) return null;
  const label = formatZimbabweAddress(place);
  if (!label) return null;
  return {
    label,
    lat,
    lon,
    distanceKm: roadKmFromHarare(lat, lon),
    source: "google",
    precision: "full",
    placeId: place.place_id,
  };
}

function getPlaceDetails(placeId) {
  return new Promise((resolve) => {
    getPlacesService().getDetails(
      {
        placeId,
        fields: ["place_id", "formatted_address", "geometry", "name", "address_components"],
      },
      (place, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK || !place) {
          resolve(null);
          return;
        }
        resolve(placeResultToSuggestion(place));
      }
    );
  });
}

/** Google Places Autocomplete on the input — fastest search UX. */
export function attachPlaceAutocomplete(inputEl, onPick) {
  if (!inputEl || !window.google?.maps?.places) return () => {};

  const autocomplete = new window.google.maps.places.Autocomplete(inputEl, {
    componentRestrictions: { country: "zw" },
    bounds: zimbabweLatLngBounds(),
    fields: ["place_id", "formatted_address", "geometry", "address_components", "name"],
  });

  const listener = autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    const item = placeResultToSuggestion(place);
    if (item && onPick) onPick(item);
    else if (place?.formatted_address && onPick) {
      onPick({
        label: formatZimbabweAddress(place) || place.formatted_address,
        lat: null,
        lon: null,
        distanceKm: 0,
        source: "google",
      });
    }
  });

  return () => {
    if (listener && window.google?.maps?.event) {
      window.google.maps.event.removeListener(listener);
    }
  };
}

function googleTextSearch(query) {
  const g = window.google.maps;
  const searchQ = /\bzimbabwe\b/i.test(query) ? query : query + ", Zimbabwe";
  return new Promise((resolve) => {
    getPlacesService().textSearch(
      {
        query: searchQ,
        bounds: zimbabweLatLngBounds(),
        region: "zw",
      },
      (results, status) => {
        if (status !== g.places.PlacesServiceStatus.OK || !results?.length) resolve([]);
        else resolve(results);
      }
    );
  });
}

/** Fast Zimbabwe search — autocomplete + text search for exact typed addresses. */
export async function searchPlacesGoogle(query, { limit = 8 } = {}) {
  const q = String(query || "").trim();
  if (q.length < 2) return [];
  const ok = await initGoogleMaps();
  if (!ok) return [];

  const g = window.google.maps;
  const variants = buildGeocodeVariants(q).slice(0, 3);
  const out = [];
  const seen = new Set();

  function add(item) {
    if (!item?.label) return;
    const key = item.label.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push(item);
  }

  for (const variant of variants) {
    const predictions = await new Promise((resolve) => {
      new g.places.AutocompleteService().getPlacePredictions(
        {
          input: variant,
          componentRestrictions: { country: "zw" },
          bounds: zimbabweLatLngBounds(),
        },
        (results, status) => {
          if (status !== g.places.PlacesServiceStatus.OK || !results?.length) resolve([]);
          else resolve(results.slice(0, limit));
        }
      );
    });

    const details = await Promise.all(predictions.map((p) => getPlaceDetails(p.place_id)));
    for (let i = 0; i < predictions.length; i++) {
      add(
        details[i] ||
          (predictions[i].description
            ? {
                label: predictions[i].description.replace(/,?\s*Zimbabwe\s*$/i, "").trim(),
                lat: null,
                lon: null,
                distanceKm: 0,
                source: "google",
                placeId: predictions[i].place_id,
              }
            : null)
      );
      if (out.length >= limit) return out;
    }
  }

  if (out.length < 2) {
    for (const variant of variants) {
      const textHits = await googleTextSearch(variant);
      for (const place of textHits.slice(0, limit)) {
        add(placeResultToSuggestion(place));
        if (out.length >= limit) return out;
      }
    }
  }

  return out.slice(0, limit);
}

function geocodeOnce(searchQ) {
  return new Promise((resolve) => {
    new window.google.maps.Geocoder().geocode(
      {
        address: searchQ,
        componentRestrictions: { country: "ZW" },
        region: "ZW",
      },
      (results, status) => {
        if (status !== "OK" || !results?.length) {
          resolve(null);
          return;
        }
        const hit = results.find((r) => isZimbabwePlace(r)) || results[0];
        resolve(placeResultToSuggestion(hit));
      }
    );
  });
}

/** Geocode typed address in Zimbabwe (Enter / blur) — tries multiple query forms. */
export async function geocodeAddressGoogle(query) {
  const q = String(query || "").trim();
  if (q.length < 3) return null;
  const ok = await initGoogleMaps();
  if (!ok) return null;

  for (const variant of buildGeocodeVariants(q)) {
    const hit = await geocodeOnce(variant);
    if (hit?.lat != null) return hit;
  }

  const textHits = await googleTextSearch(q);
  for (const place of textHits.slice(0, 3)) {
    const hit = placeResultToSuggestion(place);
    if (hit?.lat != null) return hit;
  }

  return null;
}

export async function reverseGeocodeGoogle(lat, lon) {
  if (!isWithinZimbabwe(lat, lon)) return null;
  const ok = await initGoogleMaps();
  if (!ok) return null;

  return new Promise((resolve) => {
    new window.google.maps.Geocoder().geocode(
      { location: { lat, lng: lon }, region: "ZW", language: "en" },
      (results, status) => {
        if (status !== "OK" || !results?.length) {
          resolve(null);
          return;
        }
        const hit = results.find((r) => isZimbabwePlace(r)) || results[0];
        resolve(formatZimbabweAddress(hit) || null);
      }
    );
  });
}

export async function createGoogleMap(el, { lat, lon, zoom = 13, onPinDrop } = {}) {
  const ok = await initGoogleMaps();
  if (!ok || !el) return null;

  const center = {
    lat: Number.isFinite(lat) ? lat : ZIMBABWE_MAP_CENTER.lat,
    lng: Number.isFinite(lon) ? lon : ZIMBABWE_MAP_CENTER.lon,
  };

  const map = new window.google.maps.Map(el, {
    center,
    zoom,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    gestureHandling: "cooperative",
    restriction: { latLngBounds: zimbabweLatLngBounds(), strictBounds: false },
  });

  const marker = new window.google.maps.Marker({
    map,
    position: center,
    draggable: !!onPinDrop,
  });

  if (onPinDrop) {
    marker.addListener("dragend", () => {
      const pos = marker.getPosition();
      if (pos) onPinDrop(pos.lat(), pos.lng());
    });
    map.addListener("click", (e) => {
      if (!e.latLng) return;
      const la = e.latLng.lat();
      const lo = e.latLng.lng();
      if (!isWithinZimbabwe(la, lo)) return;
      marker.setPosition(e.latLng);
      onPinDrop(la, lo);
    });
  }

  return {
    map,
    marker,
    setPosition(lat2, lon2) {
      if (!isWithinZimbabwe(lat2, lon2)) return;
      const pos = { lat: lat2, lng: lon2 };
      marker.setPosition(pos);
      map.panTo(pos);
      if (map.getZoom() < 14) map.setZoom(15);
    },
  };
}

export function osmEmbedUrl(lat, lon) {
  const la = Number.isFinite(lat) ? lat : HARARE_COORDS.lat;
  const lo = Number.isFinite(lon) ? lon : HARARE_COORDS.lon;
  const d = 0.06;
  return (
    "https://www.openstreetmap.org/export/embed.html?bbox=" +
    encodeURIComponent([lo - d, la - d, lo + d, la + d].join(",")) +
    "&layer=mapnik&marker=" +
    encodeURIComponent(la + "," + lo)
  );
}
