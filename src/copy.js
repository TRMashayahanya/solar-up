/** Short copy only — quick to scan. */

const DEFAULT = {
  buildingTitle: "Your load",
  buildingSubtitle: "Only items that match your property — adjust counts, then Calculate.",
  homeTagline: "Free sizing for Zimbabwe homes & businesses.",
  homeSteps: "Pick your property → tailor the list → PDF quote.",
};

export const PROP_COPY = {
  small_home: {
    ...DEFAULT,
    buildingTitle: "Small home — your items",
    buildingSubtitle: "Basics + accessories (laptop, etc.). Lights counted once for the whole home.",
    homeTagline: "1–3 bedroom homes — fridge, lounge TV, security.",
  },
  apartment: {
    ...DEFAULT,
    buildingTitle: "Apartment — your items",
    buildingSubtitle: "Flat essentials: kitchen, lounge, geyser — no garden or laundry extras.",
    homeTagline: "Flats & townhouses — lean appliance set.",
  },
  family_home: {
    ...DEFAULT,
    buildingTitle: "Family home — your items",
    buildingSubtitle: "Accessories include laptops & PCs. Bedrooms = TVs & AC only.",
    homeTagline: "3–5 beds — lounge, kitchen, security, optional borehole.",
  },
  office: {
    ...DEFAULT,
    buildingTitle: "Office — your items",
    buildingSubtitle: "Workstations, comms, fridge & security — no home living areas.",
    homeTagline: "Desks, printers, CCTV — sized for business hours.",
  },
  shop: {
    ...DEFAULT,
    buildingTitle: "Shop — your items",
    buildingSubtitle: "Retail lighting, display fridge, gates & CCTV — no home sections.",
    homeTagline: "Retail load — bright lighting and security first.",
  },
  farm: {
    ...DEFAULT,
    buildingTitle: "Farm — your items",
    buildingSubtitle: "Homestead + borehole pump + freezer — add what you actually run.",
    homeTagline: "Estate power — pumps, freezer, outdoor security.",
  },
  school: {
    ...DEFAULT,
    buildingTitle: "School / clinic — your items",
    buildingSubtitle: "Class & admin lighting, geysers, perimeter security — no bedrooms.",
    homeTagline: "Classrooms, clinic geysers, borehole & CCTV.",
  },
  large_home: {
    ...DEFAULT,
    buildingTitle: "Large home — your items",
    buildingSubtitle: "Multiple AC zones, pool pump, laundry — full estate list.",
    homeTagline: "6+ rooms — pool, dryers, extra AC if needed.",
  },
};

/** Per-property category labels (shown as group headers on Items tab). */
export const CAT_COPY = {
  family_home: {
    essentials: { label: "Whole-home basics", hint: "LEDs, fans, WiFi — count once for the house" },
    accessories: { label: "Accessories & gadgets", hint: "Laptops, desktop, printer — homework & home office" },
    bedroom: { label: "Bedrooms", hint: "TV & AC per room — not lights" },
    lounge: { label: "Lounge & TV", hint: "Main living entertainment" },
    kitchen: { label: "Kitchen", hint: "Fridge runs 24/7 — kettle is short bursts" },
    bathroom: { label: "Hot water", hint: "Geyser is often the biggest load" },
    outdoor: { label: "Security & outdoor", hint: "Lights, CCTV, alarm" },
    water: { label: "Borehole", hint: "Add if you pump water" },
    laundry: { label: "Laundry", hint: "Washer cycles — dryer if you have one" },
  },
  small_home: {
    essentials: { label: "Home basics", hint: "All room lights counted here" },
    accessories: { label: "Accessories", hint: "Laptop, PC, printer if you use them" },
    lounge: { label: "Living room", hint: "TV & decoder" },
    kitchen: { label: "Kitchen", hint: "Fridge + kettle" },
    bathroom: { label: "Geyser", hint: "Usually your peak load" },
    outdoor: { label: "Security", hint: "Flood lights & alarm" },
    laundry: { label: "Laundry", hint: "Washing machine" },
  },
  apartment: {
    essentials: { label: "Flat basics", hint: "Lights, fan, WiFi, chargers" },
    accessories: { label: "Accessories", hint: "Laptop & gadgets for work or study" },
    lounge: { label: "Lounge", hint: "TV" },
    kitchen: { label: "Kitchen", hint: "Fridge & microwave" },
    bathroom: { label: "Geyser", hint: "Check size with your plumber" },
    outdoor: { label: "Security", hint: "Alarm system" },
  },
  office: {
    essentials: { label: "Office lighting & comms", hint: "LEDs and WiFi for the whole space" },
    accessories: { label: "Workstations", hint: "Laptops, desktops, printers" },
    kitchen: { label: "Staff kitchen", hint: "Office fridge" },
    outdoor: { label: "Security", hint: "CCTV & perimeter lights" },
  },
  shop: {
    essentials: { label: "Shop lighting", hint: "Bright LEDs across sales floor" },
    accessories: { label: "Accessories", hint: "POS laptop or office PC" },
    kitchen: { label: "Display cold", hint: "Fridge or freezer for stock" },
    outdoor: { label: "Security & access", hint: "CCTV, alarm, gate motor" },
  },
  farm: {
    essentials: { label: "Homestead basics", hint: "Lights, fans, comms" },
    accessories: { label: "Accessories", hint: "Homestead laptop & office gear" },
    bedroom: { label: "Bedrooms", hint: "TV where used" },
    lounge: { label: "Lounge", hint: "" },
    kitchen: { label: "Kitchen & cold storage", hint: "Fridge + deep freezer" },
    bathroom: { label: "Geysers", hint: "May need two units on large homes" },
    outdoor: { label: "Farm security", hint: "Many outdoor lights & cameras" },
    water: { label: "Borehole pump", hint: "Often essential on farms" },
    laundry: { label: "Laundry", hint: "" },
  },
  school: {
    essentials: { label: "Building lighting", hint: "Classrooms, corridors, admin" },
    accessories: { label: "IT & admin", hint: "Laptops, desktops, printers for staff & lab" },
    kitchen: { label: "Kitchen / tuck shop", hint: "Fridges for meals" },
    bathroom: { label: "Geysers", hint: "Staff or clinic hot water" },
    outdoor: { label: "Perimeter security", hint: "CCTV & flood lighting" },
    water: { label: "Water pump", hint: "Borehole or booster" },
  },
  large_home: {
    essentials: { label: "Estate basics", hint: "Whole-home LEDs, fans, WiFi" },
    accessories: { label: "Accessories & gadgets", hint: "Multiple laptops, home office, printers" },
    bedroom: { label: "Bedrooms", hint: "TV & AC per room" },
    lounge: { label: "Living areas", hint: "Multiple TVs & lounge AC" },
    kitchen: { label: "Kitchen", hint: "Fridge + freezer" },
    bathroom: { label: "Geysers", hint: "Two units common on large homes" },
    outdoor: { label: "Security & pool", hint: "CCTV, lights, pool pump" },
    water: { label: "Borehole", hint: "" },
    laundry: { label: "Laundry", hint: "Washer & dryer" },
  },
};

export function getPropCopy(propType) {
  return PROP_COPY[propType] || PROP_COPY.family_home;
}

export function getBuildingCopy(propType) {
  const c = getPropCopy(propType);
  return { title: c.buildingTitle || DEFAULT.buildingTitle, subtitle: c.buildingSubtitle || DEFAULT.buildingSubtitle };
}

export function getHomeCopy(propType) {
  if (!propType) {
    return { tagline: DEFAULT.homeTagline, steps: DEFAULT.homeSteps };
  }
  const c = getPropCopy(propType);
  return {
    tagline: c.homeTagline || DEFAULT.homeTagline,
    steps: c.homeSteps || DEFAULT.homeSteps,
  };
}

export function getCategoryCopy(propType, catId) {
  const tailored = CAT_COPY[propType]?.[catId];
  if (tailored) return tailored;
  return { label: null, hint: null, itemHints: {} };
}

const OTHER_ACCESSORIES_DEFAULT = {
  label: "Add more items",
  hint: "",
};

export function getOtherAccessoriesCopy(propType) {
  const byType = {
    office: { label: "Add equipment", hint: "" },
    shop: { label: "Add shop load", hint: "" },
    school: { label: "Add equipment", hint: "" },
  };
  return byType[propType] || OTHER_ACCESSORIES_DEFAULT;
}

export function advisorPrompt(propType, propLabel, sz) {
  const c = getPropCopy(propType);
  return (
    "Solar Up Zimbabwe. " +
    (propLabel || propType) +
    ". " +
    sz.kva +
    "kVA, $" +
    sz.tot +
    ". " +
    "Free sizing via Solar Up."
  );
}
