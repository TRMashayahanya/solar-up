/**
 * PWA installability checks — manifest, icons, service worker, HTML meta.
 * Run with server up: npm start & npm run test:pwa
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { detectInstallPlatform } from "../src/pwa.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BASE = process.env.TEST_BASE || "http://127.0.0.1:5173";

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

await case_("detect iPhone Safari", async () => {
  const p = detectInstallPlatform(
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    5,
    "iPhone"
  );
  assert(p.isIos && p.isSafari, "iPhone Safari");
  assert(!p.isChromium, "not chromium");
});

await case_("detect iPad", async () => {
  const p = detectInstallPlatform(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    5,
    "MacIntel"
  );
  assert(p.isIos, "iPad desktop UA");
});

await case_("detect iOS Chrome needs Safari", async () => {
  const p = detectInstallPlatform(
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) CriOS/120.0.6099.119 Mobile/15E148 Safari/604.1",
    5,
    "iPhone"
  );
  assert(p.isIos && !p.isSafari && p.isIosBrowser, "iOS Chrome");
});

await case_("detect Android Chrome", async () => {
  const p = detectInstallPlatform(
    "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    5,
    "Linux armv8l"
  );
  assert(p.isAndroid && p.isChromium, "Android Chrome");
});

await case_("manifest file valid", async () => {
  const raw = fs.readFileSync(path.join(ROOT, "manifest.webmanifest"), "utf8");
  const m = JSON.parse(raw);
  assert(m.name && m.short_name, "name");
  assert(m.display === "standalone", "standalone display");
  assert(m.start_url && m.scope, "start_url scope");
  assert(Array.isArray(m.icons) && m.icons.length >= 2, "icons");
  const sizes = m.icons.map((i) => i.sizes);
  assert(sizes.some((s) => s.includes("192")), "192 icon");
  assert(sizes.some((s) => s.includes("512")), "512 icon");
  assert(sizes.some((s) => s.includes("180")), "180 apple icon");
});

await case_("icon PNG files exist", async () => {
  for (const f of ["icon-192.png", "icon-512.png", "apple-touch-icon.png"]) {
    assert(fs.existsSync(path.join(ROOT, "icons", f)), f + " exists");
  }
});

await case_("index.html PWA meta", async () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  assert(html.includes('rel="manifest"'), "manifest link");
  assert(html.includes("apple-mobile-web-app-capable"), "apple capable");
  assert(html.includes("apple-touch-icon"), "apple touch icon");
  assert(html.includes('register("/sw.js"'), "early sw register");
});

await case_("ios install guide uses rotating sun not static PNG", async () => {
  const guide = fs.readFileSync(path.join(ROOT, "src", "ios-install-guide.js"), "utf8");
  assert(!guide.includes("apple-touch-icon.png"), "no static install preview icon");
  assert(guide.includes("home-brand-sun"), "rotating sun preview");
});

await case_("sw.js has fetch handler", async () => {
  const sw = fs.readFileSync(path.join(ROOT, "sw.js"), "utf8");
  assert(sw.includes('addEventListener("fetch"'), "fetch handler");
  assert(sw.includes("skipWaiting"), "skipWaiting");
  assert(sw.includes("clients.claim"), "clients.claim");
});

async function fetchOk(url, label) {
  const res = await fetch(url);
  assert(res.ok, label + " " + res.status);
  return res;
}

await case_("HTTP index", async () => {
  await fetchOk(BASE + "/", "index");
});

await case_("HTTP manifest", async () => {
  const res = await fetchOk(BASE + "/manifest.webmanifest", "manifest");
  const m = await res.json();
  assert(m.short_name === "SolarApp", "short_name live");
});

await case_("HTTP icons", async () => {
  await fetchOk(BASE + "/icons/icon-192.png", "icon-192");
  await fetchOk(BASE + "/icons/icon-512.png", "icon-512");
  await fetchOk(BASE + "/icons/apple-touch-icon.png", "apple-touch");
});

await case_("HTTP sw.js headers", async () => {
  const res = await fetch(BASE + "/sw.js");
  assert(res.ok, "sw status");
  const ct = res.headers.get("content-type") || "";
  assert(ct.includes("javascript"), "sw content-type");
});

await case_("HTTP api config", async () => {
  const res = await fetchOk(BASE + "/api/config", "config");
  const j = await res.json();
  assert(typeof j.mapsProvider === "string", "mapsProvider");
});

if (failed) {
  console.error("\n" + failed + " test(s) failed");
  process.exit(1);
}
console.log("\nAll PWA tests passed.");
