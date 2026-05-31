/**
 * Responsive layout checks — static audit + optional Playwright (npm i -D playwright)
 * Usage: node scripts/test-responsive.mjs
 */
import fs from "fs";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BASE = process.env.SOLARAPP_URL || "http://localhost:5173/?v=44";

const VIEWPORTS = [
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "iPhone 14", width: 390, height: 844 },
  { name: "iPhone 14 Pro Max", width: 430, height: 932 },
  { name: "Galaxy S20", width: 360, height: 800 },
  { name: "Narrow Android", width: 320, height: 568 },
  { name: "iPad Mini", width: 768, height: 1024 },
  { name: "Desktop", width: 1280, height: 800 },
];

let failed = 0;

function fail(msg) {
  console.error("FAIL:", msg);
  failed++;
}

function ok(msg) {
  console.log("ok", msg);
}

function fetchStatus(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(res.statusCode);
    });
    req.on("error", reject);
    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error("timeout"));
    });
  });
}

function staticAudit() {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const ui = fs.readFileSync(path.join(ROOT, "src/ui.js"), "utf8");

  if (!html.includes('name="viewport"') || !html.includes("width=device-width")) {
    fail("index.html missing viewport meta");
  } else ok("viewport meta present");

  if (!html.includes("viewport-fit=cover")) {
    fail("index.html missing viewport-fit=cover for notched phones");
  } else ok("viewport-fit=cover present");

  const required = [
    "overflow-x:hidden",
    "@media (max-width:380px)",
    "@media (max-width:340px)",
    "@media (min-width:768px)",
    ".app-shell--sizer",
    ".bottom-nav",
    "100dvh",
    "safe-area-inset",
  ];
  for (const token of required) {
    if (!ui.includes(token)) fail(`ui.js missing responsive token: ${token}`);
    else ok(`css includes ${token}`);
  }
}

async function playwrightChecks() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.log("skip Playwright layout tests (install: npm i -D playwright && npx playwright install chromium)");
    return;
  }

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (e) {
    console.log("skip Playwright:", e.message);
    return;
  }

  const context = await browser.newContext({ locale: "en-US" });

  for (const vp of VIEWPORTS) {
    const page = await context.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });
    try {
      await page.goto(BASE, { waitUntil: "networkidle", timeout: 20000 });

      const home = await page.evaluate(() => {
        const doc = document.documentElement;
        const shell = document.querySelector(".app-shell");
        const nav = document.querySelector(".bottom-nav");
        return {
          overflowX: doc.scrollWidth > doc.clientWidth + 2,
          sw: doc.scrollWidth,
          cw: doc.clientWidth,
          shellW: shell?.getBoundingClientRect().width ?? 0,
          navOk: nav ? nav.getBoundingClientRect().bottom <= window.innerHeight + 2 : true,
        };
      });
      if (home.overflowX) fail(`${vp.name} home: horizontal overflow ${home.sw}>${home.cw}`);
      else ok(`${vp.name} home ${home.cw}px wide, no overflow`);

      const family = page.getByRole("button", { name: /Family Home/i });
      if (await family.isVisible().catch(() => false)) {
        await family.click();
        await page.waitForTimeout(500);
        const sizer = await page.evaluate(() => {
          const doc = document.documentElement;
          const scroll = document.querySelector(".sizer-scroll");
          return {
            overflowX: doc.scrollWidth > doc.clientWidth + 2,
            hasScroll: !!scroll,
            acc: document.querySelectorAll(".sizer-accordion").length,
          };
        });
        if (sizer.overflowX) fail(`${vp.name} sizer: horizontal overflow`);
        else ok(`${vp.name} sizer (${sizer.acc} sections, scroll:${sizer.hasScroll})`);
      }
    } catch (e) {
      fail(`${vp.name}: ${e.message}`);
    }
    await page.close();
  }

  await browser.close();
}

async function main() {
  console.log("SolarApp responsive audit\n");
  staticAudit();

  try {
    const root = BASE.replace(/\?.*$/, "") || "http://localhost:5173";
    const code = await fetchStatus(root + "/");
    if (code !== 200) console.log("warn server check:", code, "(run ./start.sh for live layout tests)");
    else ok(`server ${root}`);
  } catch (e) {
    console.log("warn server not reachable:", e.message);
  }

  await playwrightChecks();

  console.log(failed ? `\n${failed} check(s) failed` : "\nAll checks passed");
  process.exit(failed ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
