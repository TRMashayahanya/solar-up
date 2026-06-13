/**
 * Location search / geocode tests — Ruwa, Chihota, and coordinate-first distance.
 */
import { parseZimbabweAddress, buildGeocodeVariants, matchLocality, localityAnchor } from "../src/address-parse.js";
import { applyAddressToDeliveryOpts, isWithinFreeDeliveryRadius, getDeliveryQuote } from "../src/delivery.js";
import { roadKmFromHarare } from "../src/geo-distance.js";

let failed = 0;

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    failed++;
  }
}

async function case_(label, fn) {
  try {
    await fn();
    console.log("ok", label);
  } catch (e) {
    console.error("FAIL:", label, e.message);
    failed++;
  }
}

await case_("parse Chimoyo Crescent Ruwa", async () => {
  const p = parseZimbabweAddress("288 Chimoyo Crescent Ruwa");
  assert(p.streetNumber === "288", "street number");
  assert(/chimoyo/i.test(p.street), "street name");
  assert(p.locality === "ruwa", "locality");
  assert(/ruwa/i.test(p.formatted), "formatted");
});

await case_("match Chihota locality", async () => {
  const loc = matchLocality("Chihota");
  assert(loc && loc.label === "Chihota", "Chihota match");
  assert(loc.km === 80, "Chihota catalog km");
  assert(Number.isFinite(loc.lat) && Number.isFinite(loc.lon), "Chihota anchor coords");
});

await case_("Chihota anchor distance outside free radius", async () => {
  const anchor = localityAnchor("Chihota, Zimbabwe");
  assert(anchor, "anchor");
  const km = roadKmFromHarare(anchor.lat, anchor.lon);
  assert(km > 30, "Chihota > 30 km, got " + km);
  assert(!isWithinFreeDeliveryRadius(km), "Chihota not free install");
});

await case_("coords beat static km table in applyAddressToDeliveryOpts", async () => {
  const opts = applyAddressToDeliveryOpts("Chihota", {}, { lat: -18.203, lon: 31.283 });
  assert(opts.distanceKm > 30, "Chihota distance from coords");
  assert(opts.zone === "outside", "Chihota outside zone");
  assert(opts.lat === -18.203 && opts.lon === 31.283, "coords stored");
  const quote = getDeliveryQuote(opts);
  assert(quote.fee > 0, "Chihota has delivery fee");
});

await case_("build geocode variants for Chihota", async () => {
  const v = buildGeocodeVariants("Chihota");
  assert(v.some((x) => /Chihota/i.test(x)), "includes Chihota");
  assert(v.some((x) => /Zimbabwe/i.test(x)), "includes Zimbabwe");
});

await case_("build geocode variants", async () => {
  const v = buildGeocodeVariants("288 Chimoyo Crescent Ruwa");
  assert(v.length >= 3, "multiple variants");
  assert(v.some((x) => /Ruwa/i.test(x)), "includes Ruwa");
});

await case_("match Ruwa locality", async () => {
  const loc = matchLocality("288 Chimoyo Crescent Ruwa");
  assert(loc && loc.label === "Ruwa", "Ruwa match");
  assert(loc.km === 25, "Ruwa km");
});

await case_("Nominatim geocode Ruwa fallback", async () => {
  try {
    const res = await fetch(
      "https://nominatim.openstreetmap.org/search?" +
        new URLSearchParams({
          q: "Ruwa, Zimbabwe",
          format: "json",
          addressdetails: "1",
          countrycodes: "zw",
          limit: "1",
        }),
      { headers: { Accept: "application/json", "User-Agent": "SolarApp/1.0 (Energi Tech Zimbabwe)" } }
    );
    assert(res.ok, "nominatim ok");
    const data = await res.json();
    assert(data.length > 0, "Ruwa found");
    const lat = parseFloat(data[0].lat);
    assert(lat < -17 && lat > -18, "Ruwa latitude band");
  } catch (e) {
    console.log("   (skipped — nominatim unreachable:", e.message + ")");
  }
});

await case_("geocodePlace Ruwa", async () => {
  const { geocodePlace } = await import("../src/geo.js");
  const hit = await geocodePlace("288 Chimoyo Crescent Ruwa");
  assert(hit, "geocode result");
  assert(hit.label && /ruwa/i.test(hit.label), "label mentions Ruwa");
  assert(hit.lat != null && hit.lon != null, "coordinates");
  assert(hit.distanceKm >= 20 && hit.distanceKm <= 35, "Ruwa ~25km from Harare, got " + hit.distanceKm);
  console.log("   →", hit.label, "|", hit.distanceKm + " km |", hit.precision || "full");
});

await case_("geocodePlace Chihota", async () => {
  const { geocodePlace } = await import("../src/geo.js");
  const hit = await geocodePlace("Chihota");
  assert(hit, "Chihota geocode result");
  assert(hit.lat != null && hit.lon != null, "Chihota coordinates");
  assert(hit.distanceKm > 30, "Chihota outside free radius, got " + hit.distanceKm);
  console.log("   →", hit.label, "|", hit.distanceKm + " km |", hit.precision || "full");
});

await case_("reconcile blocks false free install for Chihota homonym", async () => {
  const { reconcileLocalityHit } = await import("../src/geo.js");
  const wrong = {
    label: "Chihota",
    lat: -17.9,
    lon: 31.1,
    distanceKm: 12,
    source: "nominatim",
  };
  const fixed = reconcileLocalityHit("Chihota", wrong);
  assert(fixed.distanceKm > 30, "homonym corrected to outside radius, got " + fixed.distanceKm);
  assert(fixed.source === "anchor", "uses anchor");
  const quote = getDeliveryQuote(
    applyAddressToDeliveryOpts("Chihota", { enabled: true }, { lat: fixed.lat, lon: fixed.lon })
  );
  assert(quote.fee > 0, "Chihota homonym does not get free install");
});

await case_("remote areas outside free radius", async () => {
  const { geocodePlace } = await import("../src/geo.js");
  for (const area of ["Murewa", "Mutoko", "Mahusekwa", "Wedza"]) {
    const hit = await geocodePlace(area);
    assert(hit && hit.distanceKm > 30, area + " outside free radius, got " + hit?.distanceKm);
  }
});

await case_("near-Harare areas qualify for free install", async () => {
  const { geocodePlace } = await import("../src/geo.js");
  for (const area of ["Borrowdale", "Ruwa", "Epworth"]) {
    const hit = await geocodePlace(area);
    assert(hit, area + " geocoded");
    assert(hit.distanceKm <= 30, area + " within free radius, got " + hit.distanceKm);
    const quote = getDeliveryQuote(
      applyAddressToDeliveryOpts(area, { enabled: true }, { lat: hit.lat, lon: hit.lon, distanceKm: hit.distanceKm })
    );
    assert(quote.fee === 0, area + " has no delivery fee");
  }
});

if (failed) {
  console.error("\n" + failed + " test(s) failed");
  process.exit(1);
}
console.log("\nAll location tests passed.");
