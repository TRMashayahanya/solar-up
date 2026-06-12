/**
 * Install flow unit tests — Android one-tap path, iOS share path, platform routing.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { detectInstallPlatform } from "../src/pwa.js";
import {
  installPath,
  supportsNativeInstallPrompt,
  canAttemptInstall,
  setDeferredInstallPrompt,
  takeDeferredInstallPrompt,
} from "../src/install-flow.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

let failed = 0;

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    failed++;
  }
}

function case_(label, fn) {
  try {
    fn();
    console.log("ok", label);
  } catch (e) {
    console.error("FAIL:", label, e.message);
    failed++;
  }
}

const ANDROID_CHROME =
  "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36";
const IPHONE_SAFARI =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const IPHONE_CHROME =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) CriOS/120.0.6099.119 Mobile/15E148 Safari/604.1";
const WHATSAPP_ANDROID =
  "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 WhatsApp/2.24.0 Mobile Safari/537.36";

case_("Android Chrome uses native-prompt path", () => {
  const p = detectInstallPlatform(ANDROID_CHROME, 5, "Linux armv8l");
  assert(supportsNativeInstallPrompt(p), "supports native");
  assert(installPath(p) === "native-prompt", "native-prompt");
});

case_("iPhone Safari uses ios-share path", () => {
  const p = detectInstallPlatform(IPHONE_SAFARI, 5, "iPhone");
  assert(!supportsNativeInstallPrompt(p), "no native on iOS");
  assert(installPath(p) === "ios-share", "ios-share");
});

case_("iPhone Chrome opens Safari", () => {
  const p = detectInstallPlatform(IPHONE_CHROME, 5, "iPhone");
  assert(installPath(p) === "open-safari", "open-safari");
});

case_("WhatsApp Android opens Chrome", () => {
  const p = detectInstallPlatform(WHATSAPP_ANDROID, 5, "Linux armv8l");
  assert(p.inApp, "in-app");
  assert(installPath(p) === "open-chrome", "open-chrome");
});

case_("deferred prompt capture and take", () => {
  const mock = { preventDefault() {}, prompt() {} };
  setDeferredInstallPrompt(mock);
  const taken = takeDeferredInstallPrompt();
  assert(taken === mock, "taken mock");
  assert(takeDeferredInstallPrompt() === null, "cleared");
});

case_("home-install-cta has no step labels or ios guide", () => {
  const src = fs.readFileSync(path.join(ROOT, "src", "home-install-cta.js"), "utf8");
  assert(!src.includes("IosInstallGuide"), "no ios guide import");
  assert(!src.includes("Step 1 of"), "no step labels");
  assert(!src.includes("home-install-status"), "no status panel");
  assert(src.includes("takeDeferredInstallPrompt"), "sync prompt path");
  assert(src.includes("Install SolarApp"), "install label");
});

case_("install-flow prewarms on load pattern", () => {
  const src = fs.readFileSync(path.join(ROOT, "src", "install-flow.js"), "utf8");
  assert(src.includes("prewarmInstall"), "prewarm export");
  assert(src.includes("promptInstallNow"), "prompt export");
  assert(src.includes("SKIP_WAITING"), "skip waiting without reload");
});

case_("canAttemptInstall allows in-app for redirect", () => {
  const p = detectInstallPlatform(WHATSAPP_ANDROID, 5, "Linux armv8l");
  assert(canAttemptInstall(p), "in-app can show install button");
});

if (failed) {
  console.error("\n" + failed + " test(s) failed");
  process.exit(1);
}
console.log("\nAll install tests passed.");
