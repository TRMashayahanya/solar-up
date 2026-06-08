/**
 * Location search / geocode tests — includes 288 Chimoyo Crescent Ruwa.
 */
import { parseZimbabweAddress, buildGeocodeVariants, matchLocality } from "../src/address-parse.js";

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
});

await case_("geocodePlace module (offline fallback path)", async () => {
  const { geocodePlace } = await import("../src/geo.js");
  const hit = await geocodePlace("288 Chimoyo Crescent Ruwa");
  assert(hit, "geocode result");
  assert(hit.label && /ruwa/i.test(hit.label), "label mentions Ruwa");
  assert(hit.lat != null && hit.lon != null, "coordinates");
  assert(hit.distanceKm >= 20 && hit.distanceKm <= 35, "Ruwa ~25km from Harare, got " + hit.distanceKm);
  console.log("   →", hit.label, "|", hit.distanceKm + " km |", hit.precision || "full");
});

if (failed) {
  console.error("\n" + failed + " test(s) failed");
  process.exit(1);
}
console.log("\nAll location tests passed.");
