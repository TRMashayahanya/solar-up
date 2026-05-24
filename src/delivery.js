/** Delivery & installation pricing — Energi Tech Zimbabwe */

export const DELIVERY_INSTALL_HARARE_USD = 100;

/** Shown when outside Harare — fee confirmed by dealer from client location */
export const OUTSIDE_DEALER_ADVISORY =
  "Your Energi Tech dealer will advise the delivery & installation cost based on your geographic location.";

const OUTSIDE_CITIES = [
  { key: "bulawayo", label: "Bulawayo" },
  { key: "mutare", label: "Mutare" },
  { key: "gweru", label: "Gweru" },
  { key: "masvingo", label: "Masvingo" },
  { key: "kadoma", label: "Kadoma" },
  { key: "kwekwe", label: "Kwekwe" },
  { key: "chinhoyi", label: "Chinhoyi" },
  { key: "marondera", label: "Marondera" },
  { key: "victoria falls", label: "Victoria Falls" },
  { key: "hwange", label: "Hwange" },
  { key: "rusape", label: "Rusape" },
  { key: "nyanga", label: "Nyanga" },
  { key: "chegutu", label: "Chegutu" },
  { key: "bindura", label: "Bindura" },
  { key: "kariba", label: "Kariba" },
  { key: "chipinge", label: "Chipinge" },
  { key: "chiredzi", label: "Chiredzi" },
  { key: "plumtree", label: "Plumtree" },
  { key: "beitbridge", label: "Beitbridge" },
  { key: "redcliff", label: "Redcliff" },
  { key: "zvishavane", label: "Zvishavane" },
];

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

/**
 * Best-effort city/area label for outside-Harare addresses.
 * @returns {string} e.g. "Bulawayo", or "" if unknown
 */
export function getOutsideLocationLabel(text) {
  const t = norm(text);
  if (!t) return "";
  for (const c of OUTSIDE_CITIES) {
    if (t.includes(c.key)) return c.label;
  }
  return "";
}

/**
 * @returns {boolean|null} true = Harare, false = outside, null = unknown
 */
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
  return DELIVERY_INSTALL_HARARE_USD;
}

/**
 * @param {{ enabled: boolean, zone?: 'harare'|'outside', locationLabel?: string }} opts
 */
export function getDeliveryQuote(opts) {
  if (!opts?.enabled) {
    return {
      enabled: false,
      zone: opts?.zone || "harare",
      fee: 0,
      feePending: false,
      base: 0,
      extra: 0,
      locationLabel: "",
      label: "",
      summary: "",
      dealerAdvisory: "",
    };
  }
  const zone = opts.zone === "outside" ? "outside" : "harare";
  const locationLabel = String(opts.locationLabel || "").trim();

  if (zone === "outside") {
    const place = locationLabel ? locationLabel : "your area";
    const summary =
      "Outside Harare" +
      (locationLabel ? " · " + locationLabel : "") +
      ". " +
      OUTSIDE_DEALER_ADVISORY;
    return {
      enabled: true,
      zone: "outside",
      fee: 0,
      feePending: true,
      base: DELIVERY_INSTALL_HARARE_USD,
      extra: 0,
      locationLabel,
      label: "Delivery & installation (outside Harare)",
      summary,
      dealerAdvisory: OUTSIDE_DEALER_ADVISORY,
      locationDisplay: place,
    };
  }

  const fee = DELIVERY_INSTALL_HARARE_USD;
  return {
    enabled: true,
    zone: "harare",
    fee,
    feePending: false,
    base: fee,
    extra: 0,
    locationLabel: "",
    label: "Delivery & installation (Harare)",
    summary: "$" + fee + " — Harare area",
    dealerAdvisory: "",
    locationDisplay: "Harare",
  };
}

/** Products total; outside-Harare delivery is quoted separately by the dealer. */
export function quoteGrandTotal(productTotal, deliveryQuote) {
  if (!deliveryQuote?.enabled) return productTotal || 0;
  if (deliveryQuote.feePending) return productTotal || 0;
  return (productTotal || 0) + (deliveryQuote.fee || 0);
}
