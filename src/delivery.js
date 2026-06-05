/** Delivery pricing — Energi Tech Zimbabwe */

import { OUTSIDE_DELIVERY_PER_KM_USD, PACKAGE_PRICE_NOTE } from "./packages.js";
import { roadKmFromHarare } from "./geo-distance.js";

export { OUTSIDE_DELIVERY_PER_KM_USD, PACKAGE_PRICE_NOTE };

/** @deprecated Install is included in package price for Harare */
export const DELIVERY_INSTALL_HARARE_USD = 0;

export const HARARE_INSTALL_INCLUDED_NOTE =
  "Full installation in Harare is included in your package price.";

export const OUTSIDE_DEALER_ADVISORY =
  "Outside Harare: delivery at $0.50/km from Harare. Use the map pin or type your suburb or city — distance is estimated automatically.";

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
  "chitungwiza",
  "epworth",
  "ruwa",
  "norton",
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
  const t = norm(text);
  if (!t) return null;
  for (const c of OUTSIDE_CITIES) {
    if (t.includes(c.key)) return c.km;
  }
  return null;
}

export function getOutsideLocationLabel(text) {
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

  const zone = opts.zone === "outside" ? "outside" : "harare";
  const locationLabel = String(opts.locationLabel || "").trim();

  if (zone === "harare") {
    return {
      enabled: true,
      zone: "harare",
      fee: 0,
      feePending: false,
      installIncluded: true,
      perKm: OUTSIDE_DELIVERY_PER_KM_USD,
      km: 0,
      locationLabel: "",
      label: "Installation (Harare)",
      summary: HARARE_INSTALL_INCLUDED_NOTE,
      dealerAdvisory: "",
      locationDisplay: "Harare",
    };
  }

  const geoKm = Number(opts.distanceKm) > 0 ? Math.round(Number(opts.distanceKm)) : 0;
  const estimatedKm = estimateKmFromAddress(locationLabel);
  const km = geoKm > 0 ? geoKm : estimatedKm || 0;

  if (!km || km <= 0) {
    const place = locationLabel || "your area";
    return {
      enabled: true,
      zone: "outside",
      fee: 0,
      feePending: true,
      installIncluded: true,
      perKm: OUTSIDE_DELIVERY_PER_KM_USD,
      km: 0,
      locationLabel,
      label: "Delivery (outside Harare)",
      summary:
        "Outside Harare · " +
        place +
        ". Use the map pin or pick a suggested area for $" +
        OUTSIDE_DELIVERY_PER_KM_USD +
        "/km delivery estimate.",
      dealerAdvisory: OUTSIDE_DEALER_ADVISORY,
      locationDisplay: place,
    };
  }

  const fee = Math.round(km * OUTSIDE_DELIVERY_PER_KM_USD);
  return {
    enabled: true,
    zone: "outside",
    fee,
    feePending: false,
    installIncluded: true,
    perKm: OUTSIDE_DELIVERY_PER_KM_USD,
    km,
    locationLabel,
    label: "Delivery (" + km + " km × $" + OUTSIDE_DELIVERY_PER_KM_USD + "/km)",
    summary:
      "$" +
      fee +
      " delivery (" +
      km +
      " km × $" +
      OUTSIDE_DELIVERY_PER_KM_USD +
      "/km). Package install is for Harare; outside travel charged separately.",
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

  function push(label, km) {
    const key = label.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ label, distanceKm: km, source: "local" });
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
  return out.slice(0, limit);
}

/** Apply typed, GPS, or picked place to delivery opts (zone + auto km). */
export function applyAddressToDeliveryOpts(address, opts = {}, meta = {}) {
  const addr = String(address || "").trim();
  if (!addr) return { enabled: true };

  const detected = isHarareAddress(addr);
  const cityLabel = getOutsideLocationLabel(addr);
  const geoKm = Number(meta.distanceKm) > 0 ? Math.round(Number(meta.distanceKm)) : 0;
  const metaLat = Number(meta.lat);
  const metaLon = Number(meta.lon);
  let km = geoKm > 0 ? geoKm : estimateKmFromAddress(addr) || 0;
  if (!km && Number.isFinite(metaLat) && Number.isFinite(metaLon)) {
    km = roadKmFromHarare(metaLat, metaLon);
  }

  if (detected === true) {
    return {
      enabled: true,
      zone: "harare",
      locationLabel: addr,
      distanceKm: 0,
    };
  }
  if (detected === false) {
    return {
      enabled: true,
      zone: "outside",
      locationLabel: cityLabel || addr,
      distanceKm: km,
    };
  }
  const patch = { enabled: true, locationLabel: cityLabel || addr };
  if (cityLabel || km > 0) {
    patch.zone = "outside";
    if (km > 0) patch.distanceKm = km;
  }
  return patch;
}

export function quoteGrandTotal(productTotal, deliveryQuote) {
  if (!deliveryQuote?.enabled) return productTotal || 0;
  if (deliveryQuote.feePending) return productTotal || 0;
  return (productTotal || 0) + (deliveryQuote.fee || 0);
}
