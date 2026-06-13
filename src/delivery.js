/** Delivery pricing — Energi Tech Zimbabwe */

import { OUTSIDE_DELIVERY_PER_KM_USD, PACKAGE_PRICE_NOTE, OUTSIDE_DELIVERY_FREE_KM } from "./packages.js";
import { roadKmFromHarare } from "./geo-distance.js";
import { matchLocality, parseZimbabweAddress, LOCALITY_ALIASES } from "./address-parse.js";

export { OUTSIDE_DELIVERY_PER_KM_USD, PACKAGE_PRICE_NOTE, OUTSIDE_DELIVERY_FREE_KM };

/** Road-km from Harare that are included (no delivery fee). */
export function isWithinFreeDeliveryRadius(totalKm) {
  const km = Math.round(Number(totalKm) || 0);
  return km > 0 && km <= OUTSIDE_DELIVERY_FREE_KM;
}

/** Chargeable km after the free Harare radius. */
export function billableDeliveryKm(totalKm) {
  const km = Math.round(Number(totalKm) || 0);
  if (km <= OUTSIDE_DELIVERY_FREE_KM) return 0;
  return km - OUTSIDE_DELIVERY_FREE_KM;
}

export function deliveryFeeFromDistanceKm(totalKm) {
  return Math.round(billableDeliveryKm(totalKm) * OUTSIDE_DELIVERY_PER_KM_USD);
}

export function deliveryPricingLabel(totalKm) {
  const km = Math.round(Number(totalKm) || 0);
  const billable = billableDeliveryKm(km);
  if (billable <= 0) {
    return km > 0
      ? "Within " + OUTSIDE_DELIVERY_FREE_KM + " km — no delivery charge"
      : "Installation included in price";
  }
  return (
    billable +
    " km × $" +
    OUTSIDE_DELIVERY_PER_KM_USD +
    "/km (first " +
    OUTSIDE_DELIVERY_FREE_KM +
    " km free)"
  );
}

/** User-facing hint after Google Maps / GPS distance (30 km free radius). */
export function formatLocationDistanceHint(totalKm) {
  const km = Math.round(Number(totalKm) || 0);
  if (km <= 0) return "Address set";
  if (isWithinFreeDeliveryRadius(km)) {
    return (
      "~" +
      km +
      " km from Harare — within " +
      OUTSIDE_DELIVERY_FREE_KM +
      " km (installation included, no delivery charge)"
    );
  }
  const billable = billableDeliveryKm(km);
  const fee = deliveryFeeFromDistanceKm(km);
  return (
    "~" +
    km +
    " km from Harare — $" +
    fee +
    " delivery (" +
    billable +
    " km × $" +
    OUTSIDE_DELIVERY_PER_KM_USD +
    "/km after " +
    OUTSIDE_DELIVERY_FREE_KM +
    " km free)"
  );
}

/** Short badge for search suggestions. */
export function formatSuggestionKmLabel(totalKm) {
  const km = Math.round(Number(totalKm) || 0);
  if (km <= 0) return "";
  if (isWithinFreeDeliveryRadius(km)) return "~" + km + " km · free";
  const fee = deliveryFeeFromDistanceKm(km);
  return "~" + km + " km · +$" + fee;
}

/** @deprecated Install is included in package price for Harare */
export const DELIVERY_INSTALL_HARARE_USD = 0;

export const HARARE_INSTALL_INCLUDED_NOTE =
  "Full installation is included within " + OUTSIDE_DELIVERY_FREE_KM + " km of Harare.";

export const INSTALL_RADIUS_NOTE =
  "Free installation within " + OUTSIDE_DELIVERY_FREE_KM + " km of Harare — distance is set from your area.";

/** Short badge for products / quote headers. */
export function installationRadiusBadge() {
  return OUTSIDE_DELIVERY_FREE_KM + " km · free installation";
}

/** Badge when the user's area qualifies for free installation. */
export function installationQualifiedBadge() {
  return "Qualified · free installation included";
}

/** Status line after the user confirms their area. */
export function installationQualificationMessage(quote) {
  const km = Math.round(Number(quote?.km) || 0);
  const hasLocation = !!(quote?.locationLabel || "").trim();
  if (quote?.fee > 0) {
    return "Delivery +" + quote.fee.toLocaleString() + " for installation · ~" + km + " km from Harare";
  }
  if (hasLocation && quote?.zone !== "outside" && (km <= 0 || isWithinFreeDeliveryRadius(km))) {
    if (km > 0) {
      return "Qualified — free installation included · ~" + km + " km from Harare";
    }
    return "Qualified — free installation within " + OUTSIDE_DELIVERY_FREE_KM + " km of Harare";
  }
  if (km > 0 && isWithinFreeDeliveryRadius(km)) {
    return "Qualified — free installation included · ~" + km + " km from Harare";
  }
  if (km > 0) {
    return "Free installation within " + OUTSIDE_DELIVERY_FREE_KM + " km · ~" + km + " km from Harare";
  }
  return "Free installation within " + OUTSIDE_DELIVERY_FREE_KM + " km of Harare";
}

/** One-line note for checkout bars and quote summaries. */
export function installationCheckoutNote(deliveryQuote) {
  if (!deliveryQuote?.enabled) {
    return "Free installation within " + OUTSIDE_DELIVERY_FREE_KM + " km of Harare";
  }
  if (deliveryQuote.fee > 0) {
    return "+" + deliveryQuote.fee.toLocaleString() + " delivery for installation";
  }
  if (deliveryQuote.km > 0 && isWithinFreeDeliveryRadius(deliveryQuote.km)) {
    return "Qualified · free installation included";
  }
  if (deliveryQuote.locationLabel && deliveryQuote.zone !== "outside" && deliveryQuote.fee <= 0) {
    return "Qualified · free installation included";
  }
  return "Free installation within " + OUTSIDE_DELIVERY_FREE_KM + " km of Harare";
}

/** One-tap install areas on the quote page (label + approximate km from Harare). */
export const INSTALL_QUICK_PICKS = [
  { label: "Borrowdale, Harare", distanceKm: 14 },
  { label: "Mount Pleasant, Harare", distanceKm: 10 },
  { label: "Westgate, Harare", distanceKm: 12 },
  { label: "Ruwa, Zimbabwe", distanceKm: 25 },
  { label: "Norton, Zimbabwe", distanceKm: 45 },
];

export const OUTSIDE_DEALER_ADVISORY =
  "Beyond " +
  OUTSIDE_DELIVERY_FREE_KM +
  " km from Harare: delivery at $" +
  OUTSIDE_DELIVERY_PER_KM_USD +
  "/km (first " +
  OUTSIDE_DELIVERY_FREE_KM +
  " km free). Use the map pin or type your suburb or city — distance is estimated automatically.";

/** Approximate road distance from Harare (km) for common areas */
const CITY_KM_FROM_HARARE = {
  bulawayo: 440,
  mutare: 270,
  gweru: 280,
  masvingo: 300,
  kadoma: 140,
  kwekwe: 200,
  chinhoyi: 120,
  marondera: 80,
  "victoria falls": 870,
  hwange: 750,
  rusape: 170,
  nyanga: 280,
  chegutu: 100,
  bindura: 90,
  kariba: 360,
  chipinge: 450,
  chiredzi: 480,
  plumtree: 450,
  beitbridge: 580,
  redcliff: 300,
  zvishavane: 350,
  norton: 45,
  ruwa: 25,
  chitungwiza: 30,
};

const OUTSIDE_CITIES = Object.keys(CITY_KM_FROM_HARARE).map((key) => ({
  key,
  label: key.replace(/\b\w/g, (c) => c.toUpperCase()),
  km: CITY_KM_FROM_HARARE[key],
}));

const OUTSIDE_MARKERS = [
  "outside harare",
  "out of harare",
  "not harare",
  ...OUTSIDE_CITIES.map((c) => c.key),
];

const HARARE_MARKERS = [
  "harare",
  "borrowdale",
  "avondale",
  "greendale",
  "mount pleasant",
  "mt pleasant",
  "highlands",
  "belgravia",
  "alexandra park",
  "marlborough",
  "westgate",
  "hatfield",
  "waterfalls",
  "crowborough",
  "mabvuku",
  "tafara",
  "glen view",
  "glenview",
  "mbare",
  "warren park",
  "budiriro",
  "kambuzuma",
  "msasa",
  "graniteside",
  "southerton",
  "workington",
];

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function estimateKmFromAddress(text) {
  const loc = matchLocality(text);
  if (!loc) return null;
  if (Number.isFinite(loc.lat) && Number.isFinite(loc.lon)) {
    return roadKmFromHarare(loc.lat, loc.lon);
  }
  if (loc.km > 0) return loc.km;
  return null;
}

export function getOutsideLocationLabel(text) {
  const loc = matchLocality(text);
  if (loc) return loc.label.replace(/, Harare$/i, "");
  const t = norm(text);
  if (!t) return "";
  for (const c of OUTSIDE_CITIES) {
    if (t.includes(c.key)) return c.label;
  }
  return "";
}

/** @returns {boolean|null} true = Harare, false = outside, null = unknown */
export function isHarareAddress(text) {
  const t = norm(text);
  if (!t) return null;
  for (const m of OUTSIDE_MARKERS) {
    if (t.includes(m)) return false;
  }
  for (const m of HARARE_MARKERS) {
    if (t.includes(m)) return true;
  }
  return null;
}

export function getDeliveryInstallFee(zone) {
  if (zone === "outside") return 0;
  return 0;
}

/**
 * @param {{ enabled?: boolean, zone?: 'harare'|'outside', locationLabel?: string, distanceKm?: number }} opts
 */
export function getDeliveryQuote(opts) {
  const empty = {
    enabled: false,
    zone: "harare",
    fee: 0,
    feePending: false,
    installIncluded: true,
    perKm: OUTSIDE_DELIVERY_PER_KM_USD,
    km: 0,
    locationLabel: "",
    label: "",
    summary: "",
    dealerAdvisory: "",
    locationDisplay: "",
  };

  if (!opts?.enabled) return { ...empty };

  const locationLabel = String(opts.locationLabel || "").trim();
  const geoKm = Number(opts.distanceKm) > 0 ? Math.round(Number(opts.distanceKm)) : 0;
  const estimatedKm = estimateKmFromAddress(locationLabel);
  const km = geoKm > 0 ? geoKm : estimatedKm || 0;

  const base = {
    enabled: true,
    installIncluded: true,
    perKm: OUTSIDE_DELIVERY_PER_KM_USD,
    freeKm: OUTSIDE_DELIVERY_FREE_KM,
    locationLabel,
  };

  if (!km || km <= 0) {
    return {
      ...base,
      zone: "harare",
      fee: 0,
      feePending: false,
      km: 0,
      billableKm: 0,
      label: "Installation (within " + OUTSIDE_DELIVERY_FREE_KM + " km)",
      summary: HARARE_INSTALL_INCLUDED_NOTE,
      dealerAdvisory: "",
      locationDisplay: locationLabel || "Within " + OUTSIDE_DELIVERY_FREE_KM + " km of Harare",
    };
  }

  const billableKm = billableDeliveryKm(km);
  if (billableKm <= 0) {
    return {
      ...base,
      zone: "harare",
      fee: 0,
      feePending: false,
      km,
      billableKm: 0,
      label: "Installation (within " + OUTSIDE_DELIVERY_FREE_KM + " km)",
      summary: "~" + km + " km from Harare — you qualify for free installation.",
      dealerAdvisory: "",
      locationDisplay: locationLabel || km + " km from Harare",
    };
  }

  const fee = deliveryFeeFromDistanceKm(km);
  return {
    ...base,
    zone: "outside",
    fee,
    feePending: false,
    km,
    billableKm,
    label: "Delivery (" + billableKm + " km × $" + OUTSIDE_DELIVERY_PER_KM_USD + "/km)",
    summary:
      "~" +
      km +
      " km from Harare — $" +
      fee +
      " delivery (" +
      billableKm +
      " km × $" +
      OUTSIDE_DELIVERY_PER_KM_USD +
      "/km after " +
      OUTSIDE_DELIVERY_FREE_KM +
      " km free).",
    dealerAdvisory: OUTSIDE_DEALER_ADVISORY,
    locationDisplay: locationLabel || km + " km from Harare",
  };
}

/** Local suburb/city suggestions (no network). */
export function localPlaceSuggestions(query, { limit = 6 } = {}) {
  const t = norm(query);
  if (t.length < 2) return [];

  const seen = new Set();
  const out = [];

  function push(label, km, lat, lon) {
    const key = label.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    const item = { label, distanceKm: km, source: "local" };
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      item.lat = lat;
      item.lon = lon;
      item.distanceKm = roadKmFromHarare(lat, lon);
    }
    out.push(item);
  }

  for (const loc of LOCALITY_ALIASES) {
    for (const key of loc.keys) {
      const kn = norm(key);
      if (kn.includes(t) || t.includes(kn)) {
        push(loc.label + (loc.harare ? "" : ", Zimbabwe"), loc.km || 0, loc.lat, loc.lon);
      }
    }
  }
  for (const c of OUTSIDE_CITIES) {
    if (c.key.includes(t) || c.label.toLowerCase().includes(t)) {
      push(c.label + ", Zimbabwe", c.km);
    }
  }
  for (const m of HARARE_MARKERS) {
    if (m.includes(t) && m.length > 3) {
      const label = m.replace(/\b\w/g, (c) => c.toUpperCase()) + ", Harare";
      push(label, 0);
    }
  }

  const parsed = parseZimbabweAddress(query);
  const loc = matchLocality(query) || (parsed.locality ? matchLocality(parsed.locality) : null);
  if (loc && (parsed.street || parsed.streetNumber || t.includes(loc.key) || t === loc.key)) {
    push(parsed.formatted || loc.label + (loc.harare ? "" : ", Zimbabwe"), loc.km || 0, loc.lat, loc.lon);
  }

  return out.slice(0, limit);
}

/** Apply typed, GPS, or picked place to delivery opts (distance from Harare sets install vs delivery). */
export function applyAddressToDeliveryOpts(address, opts = {}, meta = {}) {
  const addr = String(address || "").trim();
  if (!addr) {
    return { enabled: true, locationLabel: "", distanceKm: 0, zone: "harare" };
  }

  const cityLabel = getOutsideLocationLabel(addr);
  const geoKm = Number(meta.distanceKm) > 0 ? Math.round(Number(meta.distanceKm)) : 0;
  const metaLat = Number(meta.lat);
  const metaLon = Number(meta.lon);
  let km = 0;
  if (Number.isFinite(metaLat) && Number.isFinite(metaLon)) {
    km = roadKmFromHarare(metaLat, metaLon);
  } else if (geoKm > 0) {
    km = geoKm;
  } else {
    km = estimateKmFromAddress(addr) || 0;
  }

  const label = cityLabel || addr;
  const withinRadius = km > 0 && isWithinFreeDeliveryRadius(km);
  return {
    enabled: true,
    locationLabel: label,
    distanceKm: km || 0,
    zone: km > 0 && !withinRadius ? "outside" : "harare",
    lat: Number.isFinite(metaLat) ? metaLat : undefined,
    lon: Number.isFinite(metaLon) ? metaLon : undefined,
  };
}

export function quoteGrandTotal(productTotal, deliveryQuote) {
  if (!deliveryQuote?.enabled) return productTotal || 0;
  if (deliveryQuote.feePending) return productTotal || 0;
  return (productTotal || 0) + (deliveryQuote.fee || 0);
}
