/**
 * Predictive suggestions for custom accessories based on
 * property type + active catalog load (product affinity).
 */

import { LIBRARY, LIB_CATALOG_OVERLAP, seedFromLibrary } from "./custom-library.js";

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function libById(id) {
  return LIBRARY.find((e) => e.id === id);
}

function isExcluded(entry, ctx) {
  const qtys = ctx.qtys || {};
  const customLabels = (ctx.customLabels || []).map(norm);
  const catId = LIB_CATALOG_OVERLAP[entry.id];
  if (catId && (qtys[catId] || 0) > 0) return true;
  const labelNorm = norm(entry.label);
  if (customLabels.some((l) => l === labelNorm || l.includes(labelNorm) || labelNorm.includes(l))) return true;
  if (!entry.types.includes("all") && ctx.propType && !entry.types.includes(ctx.propType)) return true;
  return false;
}

/** Catalog id → suggested library ids + human reason */
const AFFINITY = [
  { ids: ["wp_1", "wp_2"], lib: ["borehole_starter", "solar_pump_inverter"], reason: "Pairs with your borehole" },
  { ids: ["out_pool"], lib: ["electric_mower"], reason: "Common with pool homes" },
  { ids: ["out_gate"], lib: ["garage_door", "electric_fence"], reason: "Matches gate / outdoor security" },
  { ids: ["out_cctv", "out_alarm"], lib: ["electric_fence", "router_extra"], reason: "Extra security & connectivity" },
  { ids: ["kit_freeze"], lib: ["deep_freezer", "second_fridge"], reason: "More cold storage" },
  { ids: ["kit_fridge"], lib: ["second_fridge", "deep_freezer"], reason: "Backup or drinks fridge" },
  { ids: ["kit_kettle", "kit_micro"], lib: ["airfryer", "blender"], reason: "Kitchen extras" },
  { ids: ["bath_geyser"], lib: ["water_heater", "hair_dryer"], reason: "Hot water & grooming" },
  { ids: ["off_laptop", "off_desk"], lib: ["router_extra", "gaming_pc"], reason: "Home office / study" },
  { ids: ["off_printer"], lib: ["photocopier", "server_nas"], reason: "Office equipment" },
  { ids: ["lng_tv", "bed_tv"], lib: ["sound_system", "projector"], reason: "Entertainment add-ons" },
  { ids: ["bed_ac", "lng_ac"], lib: ["iron", "vacuum"], reason: "High-use home appliances" },
  { ids: ["lnd_wash", "lnd_dryer"], lib: ["iron", "sewing_machine"], reason: "Laundry area extras" },
  { ids: ["ess_wifi"], lib: ["router_extra", "inverter_trolley"], reason: "Backup power & WiFi" },
];

const PROP_AFFINITY = {
  shop: [
    { lib: ["pos_terminal", "commercial_fridge", "cold_room"], reason: "Typical shop load" },
    { lib: ["welder", "angle_grinder"], reason: "Workshop tools" },
  ],
  farm: [
    { lib: ["electric_fence", "heat_lamp", "fish_pond"], reason: "Farm essentials" },
    { lib: ["cold_room", "workshop_compressor"], reason: "Agri / workshop" },
  ],
  office: [
    { lib: ["server_nas", "photocopier", "electric_kettle_com"], reason: "Office staples" },
  ],
  school: [
    { lib: ["projector", "photocopier", "medical_fridge"], reason: "School / clinic" },
  ],
  family_home: [
    { lib: ["garage_door", "electric_fence", "gaming_pc"], reason: "Family home extras" },
  ],
  large_home: [
    { lib: ["garage_door", "electric_mower", "projector"], reason: "Large property" },
  ],
  apartment: [
    { lib: ["airfryer", "baby_heater", "router_extra"], reason: "Flat living" },
  ],
  small_home: [
    { lib: ["airfryer", "iron", "router_extra"], reason: "Compact home" },
  ],
};

function activeQty(qtys, id) {
  return qtys[id] || 0;
}

function anyActive(qtys, ids) {
  return ids.some((id) => activeQty(qtys, id) > 0);
}

function acCount(qtys) {
  return activeQty(qtys, "bed_ac") + activeQty(qtys, "lng_ac");
}

/**
 * Returns library entries scored by load prediction, each with `reason` and `predictScore`.
 */
export function getPredictiveSuggestions(propType, ctx, limit = 6) {
  const qtys = ctx?.qtys || {};
  const scores = new Map();

  function boost(libId, amount, reason) {
    const entry = libById(libId);
    if (!entry || isExcluded(entry, { ...ctx, propType })) return;
    const prev = scores.get(libId) || { entry, score: 0, reasons: [] };
    prev.score += amount;
    if (reason && !prev.reasons.includes(reason)) prev.reasons.push(reason);
    scores.set(libId, prev);
  }

  for (const rule of AFFINITY) {
    if (!anyActive(qtys, rule.ids)) continue;
    for (const libId of rule.lib) boost(libId, 12, rule.reason);
  }

  if (acCount(qtys) >= 2) {
    boost("iron", 8, "Multiple ACs — high household use");
    boost("vacuum", 7, "Multiple ACs — high household use");
  }

  if (activeQty(qtys, "off_printer") > 0 && propType === "shop") {
    boost("pos_terminal", 14, "Shop with printer");
  }

  const propRules = PROP_AFFINITY[propType] || [];
  for (const pr of propRules) {
    for (const libId of pr.lib) boost(libId, 6, pr.reason);
  }

  const out = [...scores.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry, score, reasons }) => ({
      ...entry,
      predictScore: score,
      reason: reasons[0] || "Suggested for your load",
      tailored: true,
    }));

  return out;
}

/** Merge predictive + property-type suggestions (deduped, predictive first). */
export function getUnifiedSuggestions(propType, ctx, limit = 8) {
  if (!ctx) return [];
  let predictive = [];
  try {
    predictive = getPredictiveSuggestions(propType, ctx, limit);
  } catch (err) {
    console.error("Solar Up: predictive suggestions failed", err);
  }
  const seen = new Set(predictive.map((e) => e.id));

  const qtys = ctx?.qtys || {};
  const customLabels = (ctx?.customLabels || []).map(norm);
  const rest = [];

  for (const entry of LIBRARY) {
    if (seen.has(entry.id)) continue;
    if (isExcluded(entry, { qtys, customLabels, propType })) continue;
    const tailored = propType && entry.types.includes(propType) && !entry.types.includes("all");
    rest.push({ ...entry, tailored, predictScore: tailored ? 4 : 2, reason: tailored ? "Common for this property" : null });
  }

  rest.sort((a, b) => (b.predictScore || 0) - (a.predictScore || 0) || (b.tailored ? 1 : 0) - (a.tailored ? 1 : 0));

  return [...predictive, ...rest].slice(0, limit);
}

export function seedsFromEntries(entries) {
  return (entries || []).map((e) => seedFromLibrary(e)).filter(Boolean);
}
