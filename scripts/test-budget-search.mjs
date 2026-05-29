import {
  matchExactPackageBudget,
  matchPackageTier,
  isExactPackagePrice,
  MIN_PACKAGE_USD,
  MAX_PACKAGE_USD,
  PACKAGE_TIERS,
} from "../src/budget-search.js";

let failed = 0;
function assert(c, m) {
  if (!c) {
    console.error("FAIL:", m);
    failed++;
  }
}

assert(PACKAGE_TIERS.length === 8, "8 tiers");
assert(MIN_PACKAGE_USD === 950, "min price");
assert(MAX_PACKAGE_USD === 3400, "max price");

const exact = matchExactPackageBudget(1500);
assert(exact.status === "exact", "1500 exact");
assert(exact.canInquire === true, "1500 can inquire");
assert(exact.pkg?.kva === 5.5, "1500 is 5.5 kVA");

const between = matchExactPackageBudget(1200);
assert(between.status === "not_exact", "1200 not exact");
assert(between.canInquire === false, "1200 blocked");
assert(between.pkg === null, "1200 no pkg");

const low = matchExactPackageBudget(500);
assert(low.status === "below_min", "500 below min");
assert(low.canInquire === false, "500 blocked");

const tier = matchPackageTier("3.2kva-basic");
assert(tier.status === "exact" && tier.canInquire, "tier pick works");

assert(isExactPackagePrice(1250) === true, "1250 in set");
assert(isExactPackagePrice(1200) === false, "1200 not in set");

console.log(failed ? failed + " failed" : "All budget search tests passed");
process.exit(failed ? 1 : 0);
