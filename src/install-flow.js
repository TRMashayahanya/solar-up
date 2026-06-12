/**
 * One-tap PWA install — prewarm on load, native prompt on tap (Android/Chrome).
 * iOS Safari has no install API; we open the system share sheet as the only native one-tap UI.
 */
import {
  detectInstallPlatform,
  isSecureForInstall,
  isStandaloneApp,
  registerServiceWorker,
  ensureServiceWorkerControl,
  verifyInstallAssets,
  warmInstallShell,
} from "./pwa.js";

let deferredPrompt = null;
let prewarmPromise = null;
let prewarmReady = false;

export function getDeferredInstallPrompt() {
  return deferredPrompt;
}

export function setDeferredInstallPrompt(event) {
  if (!event) {
    deferredPrompt = null;
    return;
  }
  event.preventDefault();
  deferredPrompt = event;
}

/** Take and clear the captured install prompt (call prompt() immediately after). */
export function takeDeferredInstallPrompt() {
  const e = deferredPrompt;
  deferredPrompt = null;
  return e;
}

export function isPrewarmReady() {
  return prewarmReady;
}

/** Silent background prep — SW control + manifest/icons + shell cache. */
export function prewarmInstall() {
  if (prewarmPromise) return prewarmPromise;
  prewarmPromise = (async () => {
    if (!isSecureForInstall()) {
      const local =
        typeof location !== "undefined" &&
        (location.hostname === "localhost" || location.hostname === "127.0.0.1");
      if (!local) return false;
    }
    await registerServiceWorker();
    const reg = await navigator.serviceWorker?.ready?.catch(() => null);
    if (reg?.waiting) {
      reg.waiting.postMessage({ type: "SKIP_WAITING" });
    }
    await ensureServiceWorkerControl(12000);
    const assetsOk = await verifyInstallAssets();
    if (!assetsOk) return false;
    await warmInstallShell();
    prewarmReady = true;
    return true;
  })().catch(() => false);
  return prewarmPromise;
}

export function supportsNativeInstallPrompt(platform = detectInstallPlatform()) {
  return platform.isAndroid || platform.isChromium;
}

export function canAttemptInstall(platform = detectInstallPlatform()) {
  if (typeof window !== "undefined" && isStandaloneApp()) return false;
  if (typeof window !== "undefined" && !isSecureForInstall()) {
    const local =
      typeof location !== "undefined" &&
      (location.hostname === "localhost" || location.hostname === "127.0.0.1");
    if (!local) return false;
  }
  return true;
}

/** Open this page in Chrome (Android in-app browsers). */
export function openInChrome() {
  const url = encodeURIComponent(location.href);
  location.href =
    "intent://" +
    location.host +
    location.pathname +
    location.search +
    "#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=" +
    url +
    ";end";
}

/** Open this page in Safari (iOS in-app / non-Safari browsers). */
export function openInSafari() {
  const url = location.href.replace(/^https?:\/\//, "");
  location.href = "x-safari-https://" + url;
}

/**
 * Fire native install dialog — MUST be called synchronously from a user click
 * when deferredPrompt is available (do not await before prompt()).
 * @returns {Promise<{ outcome: string } | null>}
 */
export function promptInstallNow(promptEvent) {
  const e = promptEvent || takeDeferredInstallPrompt();
  if (!e?.prompt) return Promise.resolve(null);
  return e
    .prompt()
    .then(() => e.userChoice)
    .catch(() => null);
}

/** iOS Safari — no install API; open native share sheet (one system UI). */
export async function installViaIosShare() {
  await prewarmInstall();
  if (navigator.share) {
    try {
      await navigator.share({
        title: "SolarApp",
        text: "Solar sizer for Zimbabwe",
        url: location.href,
      });
      return { outcome: "shared" };
    } catch {
      return null;
    }
  }
  return null;
}

/** Resolve install path for platform. */
export function installPath(platform = detectInstallPlatform()) {
  if (platform.inApp) {
    if (platform.isAndroid) return "open-chrome";
    if (platform.isIos) return "open-safari";
    return "blocked";
  }
  if (platform.isIos) {
    if (platform.isSafari) return "ios-share";
    return "open-safari";
  }
  if (supportsNativeInstallPrompt(platform)) return "native-prompt";
  return "unsupported";
}
