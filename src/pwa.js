/** PWA install helpers — shared by boot + home download button. */

const SW_URL = "/sw.js";
const ICON_VER = "sun4";

export function isSecureForInstall() {
  return window.isSecureContext === true;
}

export function isStandaloneApp() {
  try {
    if (window.matchMedia("(display-mode: standalone)").matches) return true;
  } catch (_) {
    /* ignore */
  }
  return !!window.navigator.standalone;
}

/** @param {string} [ua] @param {number} [touchPoints] @param {string} [platformId] */
export function detectInstallPlatform(
  ua = typeof navigator !== "undefined" ? navigator.userAgent || "" : "",
  touchPoints = typeof navigator !== "undefined" ? navigator.maxTouchPoints || 0 : 0,
  platformId = typeof navigator !== "undefined" ? navigator.platform || "" : ""
) {
  const isAppleMobile = /iPhone|iPad|iPod/i.test(ua);
  const isIpadDesktop =
    (platformId === "MacIntel" || /Macintosh/i.test(ua)) && touchPoints > 1;
  const isIos = isAppleMobile || isIpadDesktop;
  const isAndroid = /Android/i.test(ua);
  const inApp = /WhatsApp|WAWeb|Instagram|FBAN|FBAV|Twitter|Line\/|MicroMessenger|Telegram/i.test(ua);
  const isIosBrowser = /CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua);
  const isSafari =
    isIos && /Safari/i.test(ua) && !isIosBrowser && !inApp;
  const isChromium =
    /Chrome|Chromium|Edg\//i.test(ua) && !/OPR\//i.test(ua) && !isIos;
  return { isIos, isAndroid, inApp, isChromium, isSafari, isIosBrowser, ua };
}

/** Register the service worker (single canonical URL — no query string). */
export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;
  try {
    return await navigator.serviceWorker.register(SW_URL, { scope: "/" });
  } catch (_) {
    return null;
  }
}

/** Wait until a service worker controls this page (required for Chrome install). */
export async function ensureServiceWorkerControl(timeoutMs = 12000) {
  if (!("serviceWorker" in navigator)) return false;
  await registerServiceWorker();

  if (navigator.serviceWorker.controller) return true;

  const ready = await Promise.race([
    navigator.serviceWorker.ready,
    new Promise((r) => setTimeout(r, timeoutMs)),
  ]);

  if (navigator.serviceWorker.controller) return true;

  if (ready && ready.active) {
    await new Promise((resolve) => {
      const timer = setTimeout(resolve, 1500);
      navigator.serviceWorker.addEventListener(
        "controllerchange",
        () => {
          clearTimeout(timer);
          resolve();
        },
        { once: true }
      );
    });
  }

  return !!navigator.serviceWorker.controller;
}

/** Verify manifest + required icons load (installability prerequisites). */
export async function verifyInstallAssets() {
  const checks = [
    "/manifest.webmanifest?v=" + ICON_VER,
    "/icons/icon-192.png?v=" + ICON_VER,
    "/icons/icon-512.png?v=" + ICON_VER,
  ];
  const results = await Promise.all(
    checks.map((url) =>
      fetch(url, { cache: "no-cache" })
        .then((r) => r.ok)
        .catch(() => false)
    )
  );
  return results.every(Boolean);
}

export async function warmInstallShell(onProgress) {
  const assets = [
    "/",
    "/index.html",
    "/manifest.webmanifest?v=" + ICON_VER,
    "/icons/icon-192.png?v=" + ICON_VER,
    "/icons/icon-512.png?v=" + ICON_VER,
    "/icons/apple-touch-icon.png?v=" + ICON_VER,
  ];
  const total = assets.length + 2;
  let done = 0;

  function tick() {
    done += 1;
    if (onProgress) onProgress(Math.round((done / total) * 55));
  }

  const controlled = await ensureServiceWorkerControl(10000);
  tick();

  if (!controlled) tick();

  await Promise.all(
    assets.map((url) =>
      fetch(url, { cache: "no-cache" })
        .then(() => tick())
        .catch(() => tick())
    )
  );

  if (onProgress) onProgress(58);
  return controlled;
}

/** Resume install after a one-time reload to pick up the service worker. */
export function markInstallResume() {
  try {
    sessionStorage.setItem("solarapp-install-resume", "1");
  } catch (_) {
    /* ignore */
  }
}

export function consumeInstallResume() {
  try {
    if (sessionStorage.getItem("solarapp-install-resume") === "1") {
      sessionStorage.removeItem("solarapp-install-resume");
      return true;
    }
  } catch (_) {
    /* ignore */
  }
  return false;
}

export function markInstallRetried() {
  try {
    sessionStorage.setItem("solarapp-install-retried", "1");
  } catch (_) {
    /* ignore */
  }
}

export function hasInstallRetried() {
  try {
    return sessionStorage.getItem("solarapp-install-retried") === "1";
  } catch (_) {
    return false;
  }
}

export function clearInstallRetryFlags() {
  try {
    sessionStorage.removeItem("solarapp-install-retried");
    sessionStorage.removeItem("solarapp-install-resume");
  } catch (_) {
    /* ignore */
  }
}
