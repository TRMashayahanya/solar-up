/** Client-added appliances not in the catalog. */

import { isRestrictedCustomLabel } from "./restricted-appliances.js";

export function newCustomItem(seed) {
  const row = {
    id: "cus_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    label: "",
    w: 100,
    dh: 4,
    qty: 1,
    iconKey: "other",
  };
  if (!seed) return row;
  return {
    ...row,
    label: seed.label != null ? seed.label : row.label,
    w: seed.w != null ? seed.w : row.w,
    dh: seed.dh != null ? seed.dh : row.dh,
    qty: seed.qty != null ? seed.qty : row.qty,
    iconKey: seed.iconKey || row.iconKey,
  };
}

export function isCustomItemActive(item) {
  if (!item || isRestrictedCustomLabel(item.label)) return false;
  return (
    (item.qty || 0) > 0 &&
    String(item.label || "").trim().length >= 1 &&
    Number(item.w) > 0 &&
    Number(item.dh) >= 0
  );
}

export function countActiveCustom(items) {
  return (items || []).filter(isCustomItemActive).length;
}

export function customItemsToLoadEntries(items) {
  const rows = [];
  for (const c of items || []) {
    if (!isCustomItemActive(c)) continue;
    const q = Math.max(1, Math.round(c.qty));
    const label = String(c.label).trim();
    rows.push({
      id: c.id,
      label: q > 1 ? label + " ×" + q : label,
      iconKey: c.iconKey || "other",
      w: Number(c.w) * q,
      h: Number(c.dh),
      custom: true,
    });
  }
  return rows;
}
