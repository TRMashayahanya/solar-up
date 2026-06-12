import {
  getDeliveryQuote,
  applyAddressToDeliveryOpts,
  billableDeliveryKm,
  deliveryFeeFromDistanceKm,
  formatLocationDistanceHint,
  formatSuggestionKmLabel,
  installationCheckoutNote,
  installationQualificationMessage,
  OUTSIDE_DELIVERY_FREE_KM,
} from "../src/delivery.js";

let failed = 0;

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    failed++;
  } else {
    console.log("ok", msg);
  }
}

assert(billableDeliveryKm(25) === 0, "Ruwa 25km — no billable km");
assert(billableDeliveryKm(30) === 0, "30km — still free");
assert(billableDeliveryKm(31) === 1, "31km — 1 billable km");
assert(billableDeliveryKm(45) === 15, "Norton 45km — 15 billable km");
assert(deliveryFeeFromDistanceKm(45) === 8, "Norton fee $8 (15 × $0.5)");
assert(deliveryFeeFromDistanceKm(440) === 205, "Bulawayo fee $205 (410 × $0.5)");

const ruwa = getDeliveryQuote({
  enabled: true,
  zone: "outside",
  locationLabel: "Ruwa",
  distanceKm: 25,
});
assert(ruwa.zone === "harare", "Ruwa quote treated as Harare install");
assert(ruwa.fee === 0, "Ruwa no delivery fee");

const norton = getDeliveryQuote({
  enabled: true,
  zone: "outside",
  locationLabel: "Norton",
  distanceKm: 45,
});
assert(norton.zone === "outside", "Norton outside zone");
assert(norton.billableKm === 15, "Norton billable km");
assert(norton.fee === 8, "Norton delivery fee");

const ruwaOpts = applyAddressToDeliveryOpts("288 Chimoyo Crescent Ruwa", { enabled: true, zone: "outside" }, {
  distanceKm: 25,
});
assert(ruwaOpts.zone === "harare", "applyAddress Ruwa → harare zone");

assert(formatSuggestionKmLabel(25).includes("free"), "Ruwa suggestion shows free");
assert(formatSuggestionKmLabel(45).includes("+$8"), "Norton suggestion shows +$8");
assert(installationCheckoutNote({ enabled: true, km: 25, fee: 0 }).includes("Qualified"), "Ruwa checkout note shows qualification");
assert(
  installationQualificationMessage({ km: 0, fee: 0, zone: "harare", locationLabel: "Borrowdale" }).includes("Qualified"),
  "Borrowdale qualification message without km"
);
assert(installationQualificationMessage({ km: 25, fee: 0, zone: "harare" }).includes("Qualified"), "Ruwa qualification message");
assert(formatLocationDistanceHint(25).includes("30"), "Ruwa hint mentions 30 km free");
assert(formatLocationDistanceHint(45).includes("$8"), "Norton hint shows $8 fee");

console.log("Free radius:", OUTSIDE_DELIVERY_FREE_KM, "km");
if (failed) {
  console.error("\n" + failed + " test(s) failed");
  process.exit(1);
}
console.log("\nAll delivery tests passed.");
