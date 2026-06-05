import React, { useState, useEffect, useRef } from "react";
import { G } from "./tokens.js";
import { BUILD } from "./build.js";

export function isAppInstalled() {
  try {
    if (window.matchMedia("(display-mode: standalone)").matches) return true;
  } catch (_) {
    /* ignore */
  }
  return !!window.navigator.standalone;
}

function detectPlatform() {
  const ua = navigator.userAgent || "";
  return {
    isIos: /iPhone|iPad|iPod/i.test(ua),
    isAndroid: /Android/i.test(ua),
    inApp: /WhatsApp|WAWeb|Instagram|FBAN|FBAV|Twitter|Line\/|MicroMessenger|Telegram/i.test(ua),
  };
}

function DwnIco({ s = 16, c = G }) {
  return React.createElement(
    "svg",
    {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: c,
      strokeWidth: "1.6",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true,
    },
    React.createElement("path", { d: "M12 3v10" }),
    React.createElement("path", { d: "M8 9l4 4 4-4" }),
    React.createElement("path", { d: "M5 20h14" })
  );
}

function HomeInstallHint({ kind, onCopy }) {
  if (!kind) return null;
  const copy = {
    inapp: {
      title: "Open in your browser",
      body: "In-app browsers cannot install apps. Tap ⋮ → Open in Safari or Chrome, then tap Download again.",
    },
    ios: {
      title: "Add to Home Screen",
      body: "In Safari: tap Share (↑) → Add to Home Screen → Add. SolarApp appears as the gold sun icon.",
    },
    android: {
      title: "Almost ready",
      body: "If install did not start, tap ⋮ in Chrome → Install app. SolarApp will appear on your home screen.",
    },
    desktop: {
      title: "Install on your phone",
      body: "Open this same link on your phone in Safari or Chrome, then tap Download SolarApp once.",
    },
  }[kind];

  if (!copy) return null;

  return React.createElement(
    "div",
    { className: "home-install-hint", role: "status", "aria-live": "polite" },
    React.createElement("p", { className: "home-install-hint-title" }, copy.title),
    React.createElement("p", { className: "home-install-hint-body" }, copy.body),
    kind === "desktop" &&
      React.createElement(
        "button",
        { type: "button", className: "home-install-hint-copy", onClick: onCopy },
        "Copy link for phone"
      )
  );
}

/** One-tap download/install on home — no separate install page. */
export function HomeInstallCta() {
  const [installed, setInstalled] = useState(() => isAppInstalled());
  const [deferred, setDeferred] = useState(null);
  const [busy, setBusy] = useState(false);
  const [hint, setHint] = useState(null);
  const installQueued = useRef(false);
  const deferredRef = useRef(null);
  const platform = detectPlatform();

  async function runInstallPrompt(promptEvent) {
    if (!promptEvent) return;
    setBusy(true);
    setHint(null);
    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      installQueued.current = false;
      if (choice?.outcome === "accepted") {
        setInstalled(isAppInstalled());
      } else {
        setHint(platform.isAndroid ? "android" : null);
      }
    } catch (_) {
      setHint(platform.isAndroid ? "android" : null);
    } finally {
      setBusy(false);
      setDeferred(null);
      deferredRef.current = null;
    }
  }

  useEffect(() => {
    setInstalled(isAppInstalled());
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js?v=" + BUILD).catch(() => {});
    }

    function onBeforeInstall(e) {
      e.preventDefault();
      deferredRef.current = e;
      setDeferred(e);
      if (installQueued.current) runInstallPrompt(e);
    }
    function onAppInstalled() {
      installQueued.current = false;
      setBusy(false);
      setHint(null);
      setInstalled(true);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  if (installed) return null;

  async function onDownload(e) {
    e.preventDefault();
    if (busy) return;

    if (platform.inApp) {
      setHint("inapp");
      return;
    }
    if (platform.isIos) {
      setHint("ios");
      return;
    }
    if (!platform.isAndroid) {
      setHint("desktop");
      return;
    }

    if (deferredRef.current || deferred) {
      await runInstallPrompt(deferredRef.current || deferred);
      return;
    }

    installQueued.current = true;
    setBusy(true);
    setHint(null);
    setTimeout(() => {
      if (!installQueued.current) return;
      setBusy(false);
      setHint("android");
      installQueued.current = false;
    }, 6000);
  }

  function copyLink() {
    const url = window.location.origin + "/";
    const done = () => setHint(null);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(() => alert("Copy this link:\n" + url));
    } else {
      alert("Copy this link:\n" + url);
      done();
    }
  }

  const label = busy ? "Installing…" : "Download SolarApp";

  return React.createElement(
    "div",
    { className: "home-install-wrap" },
    React.createElement(
      "button",
      {
        type: "button",
        className: "home-install-cta" + (busy ? " home-install-cta--busy" : ""),
        onClick: onDownload,
        disabled: busy,
        "aria-busy": busy,
      },
      busy
        ? React.createElement("span", { className: "home-install-spinner", "aria-hidden": true })
        : React.createElement(DwnIco, { key: "i" }),
      React.createElement("span", { key: "t" }, label)
    ),
    React.createElement(HomeInstallHint, { kind: hint, onCopy: copyLink })
  );
}
