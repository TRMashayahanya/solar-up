import { CATS } from "./data.js";
import { PRESETS } from "./prefills.js";
import { getCategoryCopy } from "./copy.js";

/** Flat appliance list for a property type — no room sections. */
export function getItemsForProperty(propType) {
  const groups = getGroupedItemsForProperty(propType);
  return groups.flatMap((g) => g.items);
}

/** Groups with labels tailored to the chosen property type. */
export function getGroupedItemsForProperty(propType) {
  const preset = PRESETS[propType] || PRESETS.family_home;
  const skip = new Set(preset.skipCats || []);
  const groups = [];
  for (const cat of CATS) {
    if (skip.has(cat.id)) continue;
    const copy = getCategoryCopy(propType, cat.id);
    const items = cat.items.map((it) => ({
      ...it,
      catId: cat.id,
      tailoredHint: copy.itemHints?.[it.id],
    }));
    groups.push({
      catId: cat.id,
      label: copy.label || cat.q,
      hint: copy.hint || cat.hint,
      color: cat.color,
      iconKey: cat.iconKey,
      items,
    });
  }
  return groups;
}

export function getPropertyItemSummary(propType) {
  const groups = getGroupedItemsForProperty(propType);
  const count = groups.reduce((n, g) => n + g.items.length, 0);
  const labels = groups.flatMap((g) => g.items.map((i) => i.label)).slice(0, 4);
  return { itemCount: count, groupCount: groups.length, preview: labels.join(" · ") };
}
