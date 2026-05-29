import { PACKAGES } from "./packages.js";

const SORTED = [...PACKAGES].sort((a, b) => a.price - b.price);

/** Fixed tiers — home search uses kVA labels only (no prices shown). */
export const PACKAGE_TIERS = SORTED.map((p) => ({
  id: p.id,
  kva: p.kva,
  name: p.name,
  price: p.price,
  panelCount: p.panelCount,
  panelW: p.panelW,
}));

export const BUDGET_PRESETS = SORTED.map((p) => p.price);

export const MIN_PACKAGE_USD = SORTED[0]?.price || 950;
export const MAX_PACKAGE_USD = SORTED[SORTED.length - 1]?.price || 3400;

const PRICE_SET = new Set(SORTED.map((p) => p.price));

/**
 * Match only when budget equals an exact package price (no in-between inquiries).
 * @param {number|string} budgetUsd
 */
export function matchExactPackageBudget(budgetUsd) {
  const budget = Math.max(0, Math.round(Number(budgetUsd) || 0));

  if (budget <= 0) {
    return {
      status: "empty",
      budget,
      pkg: null,
      nextTier: SORTED[0] || null,
      canInquire: false,
      message: "",
    };
  }

  if (budget < MIN_PACKAGE_USD) {
    return {
      status: "below_min",
      budget,
      pkg: null,
      nextTier: SORTED[0] || null,
      canInquire: false,
      message: "Our smallest system is the " + (SORTED[0]?.kva || 3.2) + " kVA tier — select it below.",
    };
  }

  const exact = SORTED.find((p) => p.price === budget) || null;
  if (exact) {
    return {
      status: "exact",
      budget,
      pkg: exact,
      nextTier: null,
      canInquire: true,
      message: "",
    };
  }

  const nextTier = SORTED.find((p) => p.price > budget) || null;
  const lowerTier = [...SORTED].reverse().find((p) => p.price < budget) || null;

  return {
    status: "not_exact",
    budget,
    pkg: null,
    nextTier,
    lowerTier,
    canInquire: false,
    message: nextTier
      ? "Fixed tiers only — choose " + nextTier.kva + " kVA or pick a tier below."
      : lowerTier
        ? "Fixed tiers only — choose the " + lowerTier.kva + " kVA tier or view all packages."
        : "Fixed tiers only — select a package tier below.",
  };
}

/** Select by tier id (chip click) — always exact, inquiry allowed. */
export function matchPackageTier(tierId) {
  const pkg = SORTED.find((p) => p.id === tierId) || null;
  if (!pkg) {
    return {
      status: "empty",
      budget: 0,
      pkg: null,
      canInquire: false,
      message: "",
    };
  }
  return {
    status: "exact",
    budget: pkg.price,
    pkg,
    nextTier: null,
    canInquire: true,
    message: "",
  };
}

/** @deprecated Use matchExactPackageBudget — kept for tests migrating from old behaviour */
export function searchPackagesByBudget(budgetUsd) {
  const m = matchExactPackageBudget(budgetUsd);
  return {
    status: m.status === "exact" ? "match" : m.status === "below_min" ? "below_min" : m.status,
    budget: m.budget,
    best: m.pkg,
    nextUp: m.nextTier,
    affordable: m.pkg ? [m.pkg] : [],
    savings: 0,
    minPrice: MIN_PACKAGE_USD,
    maxPrice: MAX_PACKAGE_USD,
    canInquire: m.canInquire,
  };
}

export function formatUsd(n) {
  return "$" + Number(n || 0).toLocaleString();
}

export function formatTierLabel(pkg) {
  if (!pkg) return "";
  const k = pkg.kva;
  return (k % 1 === 0 ? String(k) : k.toFixed(1)) + " kVA";
}

export function isExactPackagePrice(n) {
  return PRICE_SET.has(Math.round(Number(n) || 0));
}
