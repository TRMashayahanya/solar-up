/** SolarApp — service worker (installable PWA; network-first for app code) */
const CACHE = "solarapp-shell-v35";
const ICON_VER = "sun4";

const SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest?v=" + ICON_VER,
  "/icons/icon.svg?v=" + ICON_VER,
  "/icons/icon-192.png?v=" + ICON_VER,
  "/icons/icon-512.png?v=" + ICON_VER,
  "/icons/apple-touch-icon.png?v=" + ICON_VER,
  "/install/",
  "/install/index.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

function networkFirst(request) {
  return fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(request, copy));
      }
      return response;
    })
    .catch(() => caches.match(request));
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname.startsWith("/api/")) return;
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(networkFirst(event.request).catch(() => caches.match("/index.html")));
    return;
  }

  const isAppCode =
    url.pathname.startsWith("/src/") ||
    url.pathname.startsWith("/vendor/") ||
    url.pathname === "/sw.js" ||
    url.pathname.startsWith("/admin/");

  if (isAppCode) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  const isIconOrManifest =
    url.pathname.startsWith("/icons/") ||
    url.pathname.endsWith(".webmanifest");

  if (isIconOrManifest) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  const isStatic = url.pathname.startsWith("/install/");

  if (!isStatic) return;

  event.respondWith(
    caches.match(event.request).then(
      (cached) =>
        cached ||
        fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
    )
  );
});
