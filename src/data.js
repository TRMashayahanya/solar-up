import {
  HomeIco,
  AptIco,
  OffIco,
  ShpIco,
  FrmIco,
  SchIco,
  EstIco,
} from "./icons.js";

export const PROPS = [
  { value: "small_home", label: "Small Home", sub: "1–3 beds", Icon: HomeIco, color: "#4ADE80" },
  { value: "apartment", label: "Apartment", sub: "Flat", Icon: AptIco, color: "#60A5FA" },
  { value: "family_home", label: "Family Home", sub: "3–5 beds", Icon: HomeIco, color: "#D4AF37" },
  { value: "office", label: "Office", sub: "Work", Icon: OffIco, color: "#A78BFA" },
  { value: "shop", label: "Shop", sub: "Retail", Icon: ShpIco, color: "#FB923C" },
  { value: "farm", label: "Farm", sub: "Estate", Icon: FrmIco, color: "#34D399" },
  { value: "school", label: "School", sub: "Clinic", Icon: SchIco, color: "#FCD34D" },
  { value: "large_home", label: "Large Home", sub: "6+ rooms", Icon: EstIco, color: "#F9A8D4" },
];

export const CATS = [
  {
    id: "essentials",
    iconKey: "essentials",
    color: "#E8C547",
    q: "Basics",
    hint: "Whole home — count once.",
    items: [
      { id: "ess_led", label: "LED lights", sub: "12W", w: 12, iconKey: "led", dh: 5 },
      { id: "ess_fan", label: "Fans", sub: "75W", w: 75, iconKey: "fan", dh: 6 },
      { id: "ess_wifi", label: "WiFi", sub: "15W", w: 15, iconKey: "wifi", dh: 24 },
      { id: "ess_phone", label: "Chargers", sub: "10W", w: 10, iconKey: "phone", dh: 8 },
    ],
  },
  {
    id: "accessories",
    iconKey: "accessories",
    color: "#A78BFA",
    q: "Accessories",
    hint: "Laptops, PCs & gadgets — count what you use.",
    items: [
      { id: "off_laptop", label: "Laptop", sub: "60W", w: 60, iconKey: "laptop", dh: 8 },
      { id: "off_desk", label: "Desktop PC", sub: "150W", w: 150, iconKey: "monitor", dh: 8 },
      { id: "off_printer", label: "Printer", sub: "400W", w: 400, iconKey: "printer", dh: 0.5 },
    ],
  },
  {
    id: "bedroom",
    iconKey: "bedroom",
    color: "#C4B5FD",
    q: "Bedrooms",
    hint: "TVs & AC only.",
    items: [
      { id: "bed_tv", label: "TV", sub: "80W", w: 80, iconKey: "tv", dh: 4 },
      { id: "bed_ac", label: "AC", sub: "900W", w: 900, iconKey: "ac", dh: 7 },
    ],
  },
  {
    id: "lounge",
    iconKey: "lounge",
    color: "#60A5FA",
    q: "Lounge",
    hint: "Main living area.",
    items: [
      { id: "lng_tv", label: "TV", sub: "100W", w: 100, iconKey: "tv", dh: 6 },
      { id: "lng_dstv", label: "DStv", sub: "30W", w: 30, iconKey: "satellite", dh: 6 },
      { id: "lng_ac", label: "AC (2HP)", sub: "1800W", w: 1800, iconKey: "ac", dh: 6 },
    ],
  },
  {
    id: "kitchen",
    iconKey: "kitchen",
    color: "#FB923C",
    q: "Kitchen",
    hint: "Fridge runs 24/7.",
    items: [
      { id: "kit_fridge", label: "Fridge", sub: "150W", w: 150, iconKey: "fridge", dh: 24 },
      { id: "kit_freeze", label: "Freezer", sub: "150W", w: 150, iconKey: "freezer", dh: 24 },
    ],
  },
  {
    id: "outdoor",
    iconKey: "outdoor",
    color: "#34D399",
    q: "Security",
    hint: "Outdoor & gates.",
    items: [
      { id: "out_seclight", label: "Flood lights", sub: "30W", w: 30, iconKey: "led", dh: 12 },
      { id: "out_cctv", label: "CCTV", sub: "15W", w: 15, iconKey: "camera", dh: 24 },
      { id: "out_alarm", label: "Alarm", sub: "20W", w: 20, iconKey: "bell", dh: 24 },
      { id: "out_gate", label: "Gate motor", sub: "200W", w: 200, iconKey: "gate", dh: 0.5 },
      { id: "out_pool", label: "Pool pump", sub: "750W", w: 750, iconKey: "pool", dh: 5 },
    ],
  },
  {
    id: "water",
    iconKey: "water",
    color: "#38BDF8",
    q: "Water",
    hint: "Borehole / tank.",
    items: [
      { id: "wp_1", label: "Borehole 1HP", sub: "750W", w: 750, iconKey: "pump", dh: 3 },
      { id: "wp_2", label: "Borehole 2HP", sub: "1500W", w: 1500, iconKey: "pump", dh: 4 },
    ],
  },
  {
    id: "laundry",
    iconKey: "laundry",
    color: "#FCA5A5",
    q: "Laundry",
    hint: "Wash & dry.",
    items: [
      { id: "lnd_wash", label: "Washing machine", sub: "500W", w: 500, iconKey: "washer", dh: 1 },
      { id: "lnd_dryer", label: "Tumble dryer", sub: "2200W", w: 2200, iconKey: "dryer", dh: 1 },
    ],
  },
];

export const INVS = [
  { id: "i1", kva: 1, price: 115, brand: "Sumry", name: "1 kVA Hybrid" },
  { id: "i32", kva: 3.2, price: 160, brand: "Sumry", name: "3.2 kVA Hybrid" },
  { id: "i4", kva: 4, price: 200, brand: "Sumry", name: "4 kVA Next" },
  { id: "i62", kva: 6.2, price: 320, brand: "Sumry", name: "6.2 kVA Hybrid" },
  { id: "i65", kva: 6.5, price: 320, brand: "Sumry", name: "6.5 kVA Next" },
  { id: "i10", kva: 10.2, price: 540, brand: "Sumry", name: "10.2 kVA Hybrid" },
];

export const BATS = [
  { id: "b12", wh: 1200, v: 12, price: 215, brand: "Polaris", name: "12V 100Ah Lithium" },
  { id: "b25", wh: 2560, v: 25.6, price: 320, brand: "HzSolar", name: "25.6V 100Ah Lithium" },
  { id: "b51", wh: 5120, v: 51.2, price: 630, brand: "Polaris", name: "51.2V 100Ah Lithium" },
  { id: "b51d", wh: 5120, v: 51.2, price: 700, brand: "DEYE", name: "51.2V 100Ah Wall Mount" },
];

export const PANS = [
  { id: "p450", w: 450, price: 70, brand: "Jinko", name: "450W High-Performance" },
  { id: "p550", w: 550, price: 75, brand: "JA Solar", name: "550W Mono Crystalline" },
  { id: "p650", w: 650, price: 84, brand: "JA Solar", name: "650W Large-Format" },
];

export const WHATSAPP = "263773757018";

export function whatsAppChatUrl(text) {
  return "https://api.whatsapp.com/send?phone=" + WHATSAPP + "&text=" + encodeURIComponent(text);
}

function usd(amount) {
  return "$" + Number(amount).toLocaleString();
}

/** Section keys for tailored WhatsApp copy. */
export const WA_SECTION = {
  HOME: "home",
  PRODUCTS: "products",
  QUOTE: "quote",
  ITEMS: "items",
};

const CATALOG_TAB_LABEL = {
  inverters: "Inverters",
  batteries: "Batteries",
  panels: "Panels",
};

/** Home — short general enquiry. */
export function homeWhatsAppMessage() {
  return "Hi Energi Tech — I used SolarApp and need help with solar. My name & area:";
}

export function homeWhatsAppUrl() {
  return whatsAppChatUrl(homeWhatsAppMessage());
}

/** @deprecated Use homeWhatsAppUrl */
export function contactWhatsAppMessage() {
  return homeWhatsAppMessage();
}

export function contactWhatsAppUrl() {
  return homeWhatsAppUrl();
}

/** Products catalog — one line per product type / tab. */
export function productWhatsAppMessage(brand, name, price, category, catalogTab) {
  const tab = CATALOG_TAB_LABEL[catalogTab] || "Products";
  if (category === "inverter") {
    return (
      "Hi Energi Tech — SolarApp " +
      tab +
      ": quote for " +
      brand +
      " " +
      name +
      " inverter (" +
      usd(price) +
      "). In stock?"
    );
  }
  if (category === "battery") {
    return (
      "Hi Energi Tech — SolarApp " +
      tab +
      ": quote for " +
      brand +
      " " +
      name +
      " battery (" +
      usd(price) +
      "). In stock?"
    );
  }
  if (category === "solar panel") {
    return (
      "Hi Energi Tech — SolarApp " +
      tab +
      ": quote for " +
      brand +
      " " +
      name +
      " panel (" +
      usd(price) +
      "). In stock?"
    );
  }
  if (category === "package") {
    return (
      "Hi Energi Tech — SolarApp: quote for " +
      name +
      " (" +
      usd(price) +
      ", Harare install included). Available?"
    );
  }
  return (
    "Hi Energi Tech — SolarApp " + tab + ": quote for " + brand + " " + name + " (" + usd(price) + "). In stock?"
  );
}

/** Quote / results screen — compact system summary. */
export function quoteWhatsAppMessage(sizing, propLabel, deliveryQuote) {
  if (!sizing) return homeWhatsAppMessage();
  const prop = propLabel || "property";
  const dq = deliveryQuote && deliveryQuote.enabled ? deliveryQuote : null;
  const total = sizing.tot + (dq && !dq.feePending ? dq.fee : 0);
  const pkgLabel = sizing.pkg ? sizing.pkg.name : sizing.kva + " kVA system";
  let msg =
    "Hi Energi Tech — SolarApp quote (" +
    prop +
    "): " +
    pkgLabel +
    ", " +
    usd(total) +
    (dq?.feePending ? " (package only)" : " total") +
    ". ";
  if (dq?.zone === "harare" || !dq) {
    msg += "Harare install included in package. ";
  } else if (dq.feePending) {
    msg +=
      "Outside Harare" +
      (dq.locationLabel ? " (" + dq.locationLabel + ")" : "") +
      " — please confirm delivery at $0.50/km. ";
  } else {
    msg += "Outside Harare: " + dq.km + " km delivery $" + dq.fee + " ($0.50/km). ";
  }
  msg += "Load sized: " + sizing.pW + "W peak, ~" + sizing.bk + "h backup. Please confirm.";
  return msg;
}

export function quoteWhatsAppUrl(sizing, propLabel, deliveryQuote) {
  return whatsAppChatUrl(quoteWhatsAppMessage(sizing, propLabel, deliveryQuote));
}

/** After Save & download PDF — client requests payment / next-step help. */
export function paymentAssistWhatsAppMessage(client, sizing, propLabel, deliveryQuote, grandTotal, customQuote) {
  const name = String(client?.name || "").trim() || "—";
  const phone = String(client?.phone || "").trim() || "—";
  const email = String(client?.email || "").trim() || "—";
  const address = String(client?.address || "").trim() || "—";
  const prop = propLabel || "property";
  const notes = String(client?.notes || "").trim();

  const lines = [
    "Hi Energi Tech — SolarApp payment assistance",
    "",
    "Name: " + name,
    "Phone: " + phone,
    "Email: " + email,
    "Address: " + address,
    "Property: " + prop,
  ];

  if (customQuote) {
    lines.push("Quote type: Custom sizing (formal quote needed)");
    lines.push(
      "Load: " +
        Number(sizing?.pW || 0).toLocaleString() +
        "W peak · " +
        Number(sizing?.dWh || 0).toLocaleString() +
        " Wh/day"
    );
  } else if (sizing?.pkg) {
    lines.push("Package: " + sizing.pkg.name + " — " + usd(sizing.pkg.price));
    if (grandTotal != null) lines.push("Total quoted: " + usd(grandTotal));
  } else if (sizing) {
    lines.push("System: " + (sizing.kva || "—") + " kVA — " + usd(sizing.tot || 0));
    if (grandTotal != null) lines.push("Total quoted: " + usd(grandTotal));
  }

  const dq = deliveryQuote && deliveryQuote.enabled ? deliveryQuote : null;
  if (dq?.zone === "outside") {
    if (dq.feePending) {
      lines.push("Delivery: outside Harare — fee to confirm ($0.50/km)");
    } else {
      lines.push("Delivery: " + dq.km + " km — $" + dq.fee);
    }
  } else if (!customQuote) {
    lines.push("Harare install included on package.");
  }

  if (notes) lines.push("Notes: " + notes);
  lines.push("");
  lines.push(
    "I saved my quote PDF in SolarApp. Please help me with payment options and how to proceed. Thank you!"
  );
  return lines.join("\n");
}

export function paymentAssistWhatsAppUrl(client, sizing, propLabel, deliveryQuote, grandTotal, customQuote) {
  return whatsAppChatUrl(
    paymentAssistWhatsAppMessage(client, sizing, propLabel, deliveryQuote, grandTotal, customQuote)
  );
}

/** Items / sizing screen — load in progress (optional button). */
export function itemsWhatsAppMessage(propLabel, peakW, dailyWh, activeCount, customNames) {
  const prop = propLabel || "my property";
  const load =
    peakW > 0
      ? " Load so far: " + Number(peakW).toLocaleString() + "W peak, " + Number(dailyWh).toLocaleString() + "Wh/day, " + activeCount + " items."
      : "";
  const custom =
    customNames && customNames.length
      ? " Custom: " + customNames.join(", ") + "."
      : "";
  return (
    "Hi Energi Tech — SolarApp quote (" +
    prop +
    "):" +
    load +
    custom +
    " Please review my sizing and advise."
  );
}

export function itemsWhatsAppUrl(propLabel, peakW, dailyWh, activeCount, customNames) {
  return whatsAppChatUrl(itemsWhatsAppMessage(propLabel, peakW, dailyWh, activeCount, customNames));
}
