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
const BASE = process.env.SOLARAPP_URL || "http://localhost:5173/?v=109";

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
  const theme = fs.readFileSync(path.join(ROOT, "src/theme.js"), "utf8");

  if (!html.includes('name="viewport"') || !html.includes("width=device-width")) {
    fail("index.html missing viewport meta");
  } else ok("viewport meta present");

  if (!html.includes("viewport-fit=cover")) {
    fail("index.html missing viewport-fit=cover for notched phones");
  } else ok("viewport-fit=cover present");

  if (!html.includes(".home-brand-sun") || !html.includes("bootSunSpin")) {
    fail("index.html missing critical sun animation CSS");
  } else ok("boot critical sun animation present");

  const required = [
    "overflow-x:hidden",
    "@media (max-width:380px)",
    "@media (max-width:340px)",
    "@media (min-width:768px)",
    ".app-shell--sizer",
    ".bottom-nav",
    "100dvh",
    "safe-area-inset",
    "quote-page__scroll",
    "quote-flow-steps",
    "quote-checkout-dock",
    "quoteReadyCtaIn",
    "quoteReadyDockCenter",
    "--vvh",
    "data-keyboard-open",
    "data-quote-location-focus",
    "location-pin-wrap--fixed-suggest",
    "location-pin-wrap--minimal",
    "location-suggest-list--minimal",
    "quote-loc-input-slot",
    "data-loc-suggest-open",
    "quote-page__mast",
    "quote-install-benefit",
    "quote-package-card--strip",
    "quote-page--ready",
    "color:var(--text-primary)",
    "caret-color:var(--text-primary)",
    "line-height:1.25",
  ];
  for (const token of required) {
    const hay = ui.includes(token) || theme.includes(token);
    if (!hay) fail(`css missing responsive token: ${token}`);
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

  async function openQuotePage(page) {
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 20000 });
    const products = page.getByRole("button", { name: /^Products$/i });
    if (await products.isVisible().catch(() => false)) {
      await products.click();
      await page.waitForTimeout(400);
    }
    const viewQuote = page.getByRole("button", { name: /Continue to quote/i });
    if (await viewQuote.isVisible().catch(() => false)) {
      await viewQuote.click();
      await page.waitForTimeout(500);
      return true;
    }
    return false;
  }

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

      if (await openQuotePage(page)) {
        const quote = await page.evaluate(() => {
          const doc = document.documentElement;
          const scroll = document.querySelector(".quote-page__scroll");
          const input = document.querySelector("#quote-delivery-location");
          const dock = document.querySelector(".quote-checkout-dock");
          const nav = document.querySelector(".bottom-nav");
          const delivery = document.querySelector(".quote-install-section");
          const scrollOverflow = scroll ? getComputedStyle(scroll).overflowY : "";
          return {
            overflowX: doc.scrollWidth > doc.clientWidth + 2,
            hasScroll: !!scroll,
            scrollOverflow,
            hasInput: !!input,
            hasDock: !!dock,
            hasDelivery: !!delivery,
            navBottom: nav ? nav.getBoundingClientRect().bottom : 0,
            vh: window.innerHeight,
          };
        });
        if (quote.overflowX) fail(`${vp.name} quote: horizontal overflow`);
        else ok(`${vp.name} quote layout (scroll:${quote.hasScroll}, delivery:${quote.hasDelivery})`);
        if (!quote.hasScroll) fail(`${vp.name} quote: missing scroll container`);
        else ok(`${vp.name} quote scroll area present (${quote.scrollOverflow})`);

        if (quote.hasInput) {
          const slotBefore = await page.evaluate(() => {
            const slot = document.querySelector(".quote-loc-input-slot");
            return slot ? Math.round(slot.getBoundingClientRect().height) : 0;
          });
          if (slotBefore !== 48) fail(`${vp.name} quote: input slot should be 48px, got ${slotBefore}`);
          else ok(`${vp.name} quote input slot fixed 48px`);

          await page.locator("#quote-delivery-location").click();
          await page.locator("#quote-delivery-location").fill("bor");
          await page.waitForTimeout(400);

          const typing = await page.evaluate(() => {
            const slot = document.querySelector(".quote-loc-input-slot");
            const input = document.querySelector("#quote-delivery-location");
            const cta = document.querySelector(".quote-checkout-dock-cta");
            const suggest = document.querySelector(".location-suggest-list--minimal");
            const section = document.querySelector(".quote-install-section");
            const slotH = slot ? Math.round(slot.getBoundingClientRect().height) : 0;
            const sectionH = section ? Math.round(section.getBoundingClientRect().height) : 0;
            const suggestFixed =
              suggest && getComputedStyle(suggest).position === "fixed";
            const ctaDisabled = cta ? cta.disabled : true;
            const inputStyle = input ? getComputedStyle(input) : null;
            const textColor = inputStyle?.color || "";
            const lineHeight = inputStyle?.lineHeight || "";
            const textVisible =
              textColor &&
              textColor !== "rgba(0, 0, 0, 0)" &&
              textColor !== "transparent" &&
              parseFloat(lineHeight) <= 24;
            return {
              slotH,
              sectionH,
              suggestFixed,
              hasSuggest: !!suggest,
              ctaDisabled,
              inputVal: input?.value || "",
              textVisible,
              textColor,
              lineHeight,
            };
          });
          if (typing.slotH !== 48) fail(`${vp.name} quote typing: input slot expanded to ${typing.slotH}px`);
          else ok(`${vp.name} quote typing input slot stable`);
          if (!typing.textVisible) fail(`${vp.name} quote typing: input text not visible (${typing.textColor}, lh ${typing.lineHeight})`);
          else ok(`${vp.name} quote input text visible while typing`);
          if (!typing.ctaDisabled) fail(`${vp.name} quote typing: CTA should stay disabled until pick`);
          else ok(`${vp.name} quote CTA disabled while drafting`);
          if (typing.hasSuggest && !typing.suggestFixed) {
            fail(`${vp.name} quote typing: suggestions should be position fixed`);
          } else if (typing.hasSuggest) {
            ok(`${vp.name} quote minimal suggestions (fixed)`);
          }

          await page.locator("#quote-delivery-location").focus();
          await page.evaluate(() => {
            document.documentElement.dataset.keyboardOpen = "1";
            document.documentElement.dataset.quoteLocationFocus = "1";
            document.documentElement.style.setProperty("--vvh", Math.round(window.innerHeight * 0.52) + "px");
          });
          await page.waitForTimeout(200);
          const kb = await page.evaluate(() => {
            const input = document.querySelector("#quote-delivery-location");
            const footer = document.querySelector(".quote-checkout-cta");
            const nav = document.querySelector(".bottom-nav");
            const pkg = document.querySelector(".quote-package-card");
            const installTitle = document.querySelector(".quote-install-title");
            const fixedSuggest = document.querySelector(".location-pin-wrap--fixed-suggest");
            const ir = input?.getBoundingClientRect();
            const vvh = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--vvh"), 10);
            const footerHidden = !footer || getComputedStyle(footer).display === "none";
            const navHidden = nav && getComputedStyle(nav).opacity === "0";
            const pkgHidden = !pkg || getComputedStyle(pkg).display === "none";
            const installContextVisible =
              installTitle &&
              getComputedStyle(installTitle).display !== "none" &&
              /system installation/i.test(installTitle.textContent || "");
            return {
              inputVisible: ir ? ir.top >= 0 && ir.bottom <= (vvh || window.innerHeight) + 2 : false,
              footerHidden,
              navHidden,
              pkgHidden,
              installContextVisible,
              hasFixedSuggest: !!fixedSuggest,
            };
          });
          if (!kb.inputVisible) fail(`${vp.name} quote keyboard: delivery input not in visible area`);
          else ok(`${vp.name} quote keyboard input visible`);
          if (!kb.footerHidden) fail(`${vp.name} quote keyboard: checkout actions should hide`);
          else ok(`${vp.name} quote keyboard checkout collapsed`);
          if (!kb.pkgHidden) fail(`${vp.name} quote keyboard: package card should hide`);
          else ok(`${vp.name} quote keyboard package hidden`);
          if (!kb.installContextVisible) fail(`${vp.name} quote keyboard: system installation context should stay visible`);
          else ok(`${vp.name} quote keyboard install context visible`);
          if (!kb.hasFixedSuggest) fail(`${vp.name} quote: fixed suggestion dropdown missing`);
          else ok(`${vp.name} quote fixed suggestions`);
          await page.evaluate(() => {
            delete document.documentElement.dataset.keyboardOpen;
            delete document.documentElement.dataset.quoteLocationFocus;
            document.documentElement.style.removeProperty("--vvh");
          });
        }
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
