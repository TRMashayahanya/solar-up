/**
 * One-tap PWA install — fast SW prep on load, native prompt on tap (Android/Chrome).
 */
import {
  detectInstallPlatform,
  isSecureForInstall,
  isStandaloneApp,
  registerServiceWorker,
  ensureServiceWorkerControl,
  verifyInstallAssets,
  warmInstallShell,
  markInstallResume,
  consumeInstallResume,
  markInstallRetried,
  hasInstallRetried,
  clearInstallRetryFlags,
} from "./pwa.js";

let deferredPrompt = null;
let prewarmPromise = null;
let installTapQueued = false;

function hydrateEarlyPrompt() {
  if (typeof window === "undefined") return;
  const early = window.__solarappInstallPrompt;
  if (early && !deferredPrompt) {
    deferredPrompt = early;
  }
}

function notifyInstallReady() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new Event("solarapp-install-ready"));
  } catch (_) {
    /* ignore */
  }
}

if (typeof window !== "undefined") {
  hydrateEarlyPrompt();
  window.addEventListener("beforeinstallprompt", (e) => {
    setDeferredInstallPrompt(e);
    window.__solarappInstallPrompt = e;
    notifyInstallReady();
  });
  window.addEventListener("solarapp-install-ready", hydrateEarlyPrompt);
}

export function getDeferredInstallPrompt() {
  hydrateEarlyPrompt();
  return deferredPrompt;
}

export function setDeferredInstallPrompt(event) {
  if (!event) {
    deferredPrompt = null;
    if (typeof window !== "undefined") window.__solarappInstallPrompt = null;
    return;
  }
  event.preventDefault();
  deferredPrompt = event;
  if (typeof window !== "undefined") window.__solarappInstallPrompt = event;
}

/** Take and clear the captured install prompt (call prompt() immediately after). */
export function takeDeferredInstallPrompt() {
  hydrateEarlyPrompt();
  const e = deferredPrompt;
  deferredPrompt = null;
  if (typeof window !== "undefined") window.__solarappInstallPrompt = null;
  return e;
}

export function isInstallTapQueued() {
  return installTapQueued;
}

export function queueInstallTap() {
  installTapQueued = true;
}

export function clearInstallTapQueue() {
  installTapQueued = false;
}

/** Register SW immediately — does not block on asset warming. */
export async function prewarmInstallFast() {
  if (!isSecureForInstall()) {
    const local =
      typeof location !== "undefined" &&
      (location.hostname === "localhost" || location.hostname === "127.0.0.1");
    if (!local) return false;
  }
  await registerServiceWorker();
  const reg = await navigator.serviceWorker?.ready?.catch(() => null);
  if (reg?.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
  return true;
}

function scheduleFullPrewarm() {
  const run = () => {
    ensureServiceWorkerControl(6000)
      .then((ok) => {
        if (!ok) return;
        return verifyInstallAssets().then((assetsOk) => {
          if (assetsOk) return warmInstallShell();
        });
      })
      .catch(() => {});
  };
  if (typeof requestIdleCallback === "function") requestIdleCallback(run, { timeout: 4000 });
  else setTimeout(run, 800);
}

/** Fast boot prewarm + idle asset cache (non-blocking). */
export function prewarmInstall() {
  if (prewarmPromise) return prewarmPromise;
  prewarmPromise = prewarmInstallFast().then((ok) => {
    scheduleFullPrewarm();
    return ok;
  });
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

export function openInSafari() {
  const url = location.href.replace(/^https?:\/\//, "");
  location.href = "x-safari-https://" + url;
}

/**
 * Fire native install dialog — call synchronously from a user click when possible.
 * @returns {Promise<{ outcome: string } | null>}
 */
export function promptInstallNow(promptEvent) {
  const e = promptEvent || deferredPrompt;
  deferredPrompt = null;
  if (typeof window !== "undefined") window.__solarappInstallPrompt = null;
  if (!e?.prompt) return Promise.resolve(null);
  clearInstallTapQueue();
  return e
    .prompt()
    .then(() => e.userChoice)
    .catch(() => null);
}

/** iOS Safari — open native share sheet (Add to Home Screen). */
export function installViaIosShare() {
  prewarmInstallFast().catch(() => {});
  if (navigator.share) {
    return navigator.share({
      title: "SolarApp",
      text: "Solar sizer for Zimbabwe",
      url: location.href,
    }).catch(() => null);
  }
  return Promise.resolve(null);
}

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

/** One-time reload so the service worker controls the page (first visit only). */
export function reloadForInstallControl() {
  if (hasInstallRetried()) return false;
  markInstallRetried();
  markInstallResume();
  queueInstallTap();
  location.reload();
  return true;
}

export function clearInstallResumeAfterSuccess() {
  clearInstallRetryFlags();
  clearInstallTapQueue();
}

export { consumeInstallResume };
