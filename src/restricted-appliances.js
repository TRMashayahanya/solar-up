/**
 * Electric heating elements (kettles, microwaves, irons, etc.) cause damaging
 * surge loads on inverters & batteries — excluded from SolarApp sizing.
 */

export const RESTRICTED_USER_MESSAGE =
  "Not allowed — electric kettles, microwaves, irons and similar heating elements can overload inverters and batteries. WhatsApp Energi Tech (077 375 7018) for safe alternatives.";

export const RESTRICTED_SHORT_NOTE =
  "Kettles, microwaves & irons are excluded (high surge risk to inverters).";

/** Built-in catalog item ids — removed from lists & presets. */
export const RESTRICTED_CATALOG_IDS = new Set(["kit_kettle", "kit_micro"]);

/** Custom accessory library ids — not offered in suggestions. */
export const RESTRICTED_LIBRARY_IDS = new Set([
  "iron",
  "electric_kettle_com",
  "airfryer",
  "gas_stove_elec",
  "water_heater",
  "hair_dryer",
  "baby_heater",
]);

const RESTRICTED_REGEX = [
  /\bkettles?\b/i,
  /\bmicrowaves?\b/i,
  /\bmicro\s*wave\b/i,
  /\birons?\b/i,
  /\bsteam\s*iron\b/i,
  /\bclothes\s*iron\b/i,
  /\bpressing\b/i,
  /\btoasters?\b/i,
  /\bair\s*fryers?\b/i,
  /\bairfryers?\b/i,
  /\bhot\s*plates?\b/i,
  /\bhotplates?\b/i,
  /\bsandwich\s*(maker|press|toaster)\b/i,
  /\belectric\s*oven\b/i,
  /\belectric\s*stoves?\b/i,
  /\belectric\s*cookers?\b/i,
  /\belectric\s*hobs?\b/i,
  /\binduction\s*(cook|hob|plate)?\b/i,
  /\bimmersion\s*(rod|heater)?\b/i,
  /\binstant\s*geyser\b/i,
  /\bwater\s*heaters?\b/i,
  /\bhot\s*water\s*dispenser\b/i,
  /\bwater\s*urn\b/i,
  /\bcommercial\s*kettles?\b/i,
  /\belectric\s*urn\b/i,
  /\bcurling\s*iron\b/i,
  /\bhair\s*dryers?\b/i,
  /\bblow\s*dryers?\b/i,
  /\bstraighteners?\b/i,
  /\broom\s*heaters?\b/i,
  /\bspace\s*heaters?\b/i,
  /\bfan\s*heaters?\b/i,
  /\bbar\s*heaters?\b/i,
  /\boil\s*heaters?\b/i,
  /\bpanel\s*heaters?\b/i,
  /\bdeep\s*fryers?\b/i,
  /\belectric\s*grills?\b/i,
  /\bwaffle\s*(maker|iron)\b/i,
  /\bcoffee\s*makers?\b/i,
  /\bespresso\b/i,
  /\bbottle\s*warmers?\b/i,
  /\bheating\s*elements?\b/i,
];

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesRestrictedText(...parts) {
  const text = norm(parts.filter(Boolean).join(" "));
  if (!text) return false;
  return RESTRICTED_REGEX.some((re) => re.test(text));
}

export function isRestrictedCatalogItemId(id) {
  return RESTRICTED_CATALOG_IDS.has(id);
}

export function isRestrictedLibraryEntry(entry) {
  if (!entry) return false;
  if (RESTRICTED_LIBRARY_IDS.has(entry.id)) return true;
  return matchesRestrictedText(entry.label, ...(entry.keywords || []));
}

export function isRestrictedCustomLabel(label) {
  return matchesRestrictedText(label);
}

export function filterRestrictedLibrary(entries) {
  return (entries || []).filter((e) => !isRestrictedLibraryEntry(e));
}
