/** Shared product library for custom accessories (no other imports). */

export const LIBRARY = [
  { id: "deep_freezer", label: "Deep freezer", w: 150, dh: 24, iconKey: "freezer", keywords: ["freezer", "deep freeze", "chest freezer"], types: ["all"] },
  { id: "second_fridge", label: "Second fridge", w: 150, dh: 24, iconKey: "fridge", keywords: ["bar fridge", "drinks fridge", "mini fridge"], types: ["all"] },
  { id: "gas_stove_elec", label: "Electric stove / oven", w: 2000, dh: 1.5, iconKey: "kitchen", keywords: ["stove", "oven", "cooker", "hob"], types: ["all"] },
  { id: "airfryer", label: "Air fryer", w: 1500, dh: 0.5, iconKey: "microwave", keywords: ["air fryer", "airfryer"], types: ["all"] },
  { id: "blender", label: "Blender / juicer", w: 500, dh: 0.3, iconKey: "kitchen", keywords: ["blender", "juicer", "smoothie"], types: ["all"] },
  { id: "iron", label: "Electric iron", w: 1200, dh: 0.5, iconKey: "other", keywords: ["iron", "pressing"], types: ["all"] },
  { id: "hair_dryer", label: "Hair dryer", w: 1200, dh: 0.3, iconKey: "other", keywords: ["hair dryer", "blow dry"], types: ["all"] },
  { id: "vacuum", label: "Vacuum cleaner", w: 1200, dh: 0.5, iconKey: "other", keywords: ["vacuum", "hoover"], types: ["all"] },
  { id: "welder", label: "Welder", w: 3000, dh: 2, iconKey: "other", keywords: ["welder", "welding"], types: ["shop", "farm", "office"] },
  { id: "angle_grinder", label: "Angle grinder", w: 900, dh: 0.5, iconKey: "other", keywords: ["grinder", "angle grinder"], types: ["shop", "farm"] },
  { id: "projector", label: "Projector", w: 300, dh: 4, iconKey: "tv", keywords: ["projector", "beamer"], types: ["school", "office", "family_home", "large_home"] },
  { id: "sound_system", label: "Sound system / amplifier", w: 200, dh: 4, iconKey: "other", keywords: ["amplifier", "amp", "speakers", "pa system"], types: ["all"] },
  { id: "garage_door", label: "Garage door motor", w: 400, dh: 0.3, iconKey: "gate", keywords: ["garage", "garage door"], types: ["family_home", "large_home", "apartment"] },
  { id: "electric_fence", label: "Electric fence energizer", w: 30, dh: 24, iconKey: "other", keywords: ["fence", "energizer", "nemtek"], types: ["farm", "family_home", "large_home"] },
  { id: "borehole_starter", label: "Borehole starter box", w: 50, dh: 12, iconKey: "pump", keywords: ["starter", "borehole control"], types: ["farm", "family_home", "large_home"] },
  { id: "water_heater", label: "Instant water heater", w: 3000, dh: 1, iconKey: "shower", keywords: ["instant geyser", "water heater"], types: ["all"] },
  { id: "solar_pump_inverter", label: "Pump inverter", w: 750, dh: 4, iconKey: "pump", keywords: ["pump inverter", "vfd"], types: ["farm", "family_home"] },
  { id: "server_nas", label: "Server / NAS", w: 150, dh: 24, iconKey: "monitor", keywords: ["server", "nas", "network storage"], types: ["office", "shop", "school"] },
  { id: "pos_terminal", label: "POS / card machine", w: 40, dh: 12, iconKey: "other", keywords: ["pos", "card machine", "swipe"], types: ["shop"] },
  { id: "commercial_fridge", label: "Commercial display fridge", w: 300, dh: 24, iconKey: "fridge", keywords: ["display fridge", "commercial fridge"], types: ["shop"] },
  { id: "cold_room", label: "Cold room compressor", w: 1500, dh: 24, iconKey: "freezer", keywords: ["cold room", "walk in"], types: ["shop", "farm"] },
  { id: "photocopier", label: "Photocopier", w: 1000, dh: 2, iconKey: "printer", keywords: ["copier", "photocopy"], types: ["office", "school"] },
  { id: "electric_kettle_com", label: "Commercial kettle", w: 2000, dh: 2, iconKey: "kettle", keywords: ["urn", "commercial kettle"], types: ["office", "school", "shop"] },
  { id: "workshop_compressor", label: "Air compressor", w: 1500, dh: 1, iconKey: "other", keywords: ["compressor", "air compressor"], types: ["shop", "farm"] },
  { id: "sewing_machine", label: "Sewing machine", w: 100, dh: 4, iconKey: "other", keywords: ["sewing", "tailor"], types: ["shop", "family_home"] },
  { id: "gaming_pc", label: "Gaming PC / console", w: 400, dh: 6, iconKey: "monitor", keywords: ["gaming", "playstation", "xbox", "ps5"], types: ["family_home", "apartment", "large_home"] },
  { id: "baby_heater", label: "Baby bottle warmer / heater", w: 500, dh: 2, iconKey: "other", keywords: ["bottle warmer", "baby"], types: ["family_home", "apartment", "small_home"] },
  { id: "medical_fridge", label: "Medical / vaccine fridge", w: 100, dh: 24, iconKey: "fridge", keywords: ["vaccine", "medical fridge"], types: ["school", "farm"] },
  { id: "band_saw", label: "Workshop machine", w: 1200, dh: 2, iconKey: "other", keywords: ["band saw", "table saw", "workshop"], types: ["farm", "shop"] },
  { id: "heat_lamp", label: "Heat lamp / brooder", w: 250, dh: 12, iconKey: "led", keywords: ["brooder", "chick", "heat lamp"], types: ["farm"] },
  { id: "electric_mower", label: "Electric lawnmower", w: 1200, dh: 0.5, iconKey: "other", keywords: ["lawn", "mower", "grass cutter"], types: ["family_home", "large_home", "farm"] },
  { id: "router_extra", label: "Extra WiFi router", w: 20, dh: 24, iconKey: "wifi", keywords: ["router", "mesh", "extender"], types: ["all"] },
  { id: "inverter_trolley", label: "Backup inverter trolley", w: 200, dh: 8, iconKey: "other", keywords: ["trolley", "backup inverter"], types: ["all"] },
  { id: "fish_pond", label: "Fish pond aerator", w: 60, dh: 24, iconKey: "pump", keywords: ["pond", "aerator", "fish"], types: ["farm", "large_home"] },
];

export const LIB_CATALOG_OVERLAP = {
  deep_freezer: "kit_freeze",
  second_fridge: "kit_fridge",
};

export function seedFromLibrary(entry) {
  if (!entry) return null;
  return {
    label: entry.label,
    w: entry.w,
    dh: entry.dh,
    qty: 1,
    iconKey: entry.iconKey || "other",
  };
}
