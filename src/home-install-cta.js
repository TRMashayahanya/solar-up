import React, { useState, useEffect, useRef, useCallback } from "react";
import { G } from "./tokens.js";
import { BUILD } from "./build.js";

const ICON_VER = "sun4";

function installAssetList() {
  return [
    "/",
    "/manifest.webmanifest?v=" + ICON_VER,
    "/icons/icon-192.png?v=" + ICON_VER,
    "/icons/icon-512.png?v=" + ICON_VER,
    "/icons/icon.svg?v=" + ICON_VER,
    "/icons/apple-touch-icon.png?v=" + ICON_VER,
    "/sw.js?v=" + BUILD,
  ];
}

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

function stepLabel(step, total, text, pct) {
  const base = "Step " + step + " of " + total + " · " + text;
  return typeof pct === "number" && pct >= 0 ? base + " · " + pct + "%" : base;
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

function HomeInstallStatus({ phase, message, progress, hint, onCopy }) {
  const hints = {
    inapp: {
      title: "Open in your browser",
      body: "In-app browsers cannot install apps. Tap ⋮ → Open in Safari or Chrome, then tap Download again.",
    },
    ios: {
      title: "Add to Home Screen",
      body: "In Safari: tap Share (↑) → Add to Home Screen → Add. SolarApp appears as the gold sun icon.",
    },
    android: {
      title: "Finish install in Chrome",
      body: "Tap ⋮ in Chrome → Install app. SolarApp will appear on your home screen.",
    },
    desktop: {
      title: "Install on your phone",
      body: "Open this link on your phone in Safari or Chrome, then tap Download SolarApp.",
    },
  };

  const hintCopy = hint ? hints[hint] : null;
  const showPanel = (phase && phase !== "idle") || hintCopy;
  if (!showPanel) return null;

  const pct = typeof progress === "number" && progress >= 0 ? progress : null;

  return React.createElement(
    "div",
    {
      className:
        "home-install-status" +
        (phase === "done" ? " home-install-status--done" : "") +
        (phase === "error" ? " home-install-status--error" : ""),
      role: "status",
      "aria-live": "polite",
    },
    phase && phase !== "idle" && phase !== "error" &&
      React.createElement(
        "div",
        { className: "home-install-progress-row" },
        React.createElement(
          "div",
          { className: "home-install-progress", "aria-hidden": true },
          React.createElement("div", {
            className:
              "home-install-progress-fill" + (progress < 0 ? " home-install-progress-fill--pulse" : ""),
            style: pct !== null ? { width: Math.min(100, pct) + "%" } : undefined,
          })
        ),
        pct !== null && React.createElement("span", { className: "home-install-pct" }, pct + "%")
      ),
    message && React.createElement("p", { className: "home-install-status-msg" }, message),
    hintCopy &&
      React.createElement(
        "div",
        { className: "home-install-hint" },
        React.createElement("p", { className: "home-install-hint-title" }, hintCopy.title),
        React.createElement("p", { className: "home-install-hint-body" }, hintCopy.body),
        hint === "desktop" &&
          React.createElement(
            "button",
            { type: "button", className: "home-install-hint-copy", onClick: onCopy },
            "Copy link for phone"
          )
      )
  );
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register("/sw.js?v=" + BUILD);
    await Promise.race([
      navigator.serviceWorker.ready,
      new Promise((r) => setTimeout(r, 5000)),
    ]);
    if (reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
    if (reg.active && !navigator.serviceWorker.controller) {
      await new Promise((r) => setTimeout(r, 400));
    }
    return reg;
  } catch (_) {
    return null;
  }
}

async function warmInstallAssets(onProgress) {
  const assets = installAssetList();
  const total = assets.length + 1;
  let done = 0;

  function tick() {
    done += 1;
    const pct = Math.round((done / total) * 58);
    if (onProgress) onProgress(pct);
  }

  await registerServiceWorker();
  tick();

  await Promise.all(
    assets.map((url) =>
      fetch(url, { cache: "force-cache" })
        .then(() => tick())
        .catch(() => tick())
    )
  );

  if (onProgress) onProgress(62);
}

/** One-tap download/install on home — visible progress, no separate page. */
export function HomeInstallCta() {
  const [installed, setInstalled] = useState(() => isAppInstalled());
  const [phase, setPhase] = useState("idle");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [hint, setHint] = useState(null);
  const [buttonLabel, setButtonLabel] = useState("Download SolarApp");

  const deferredRef = useRef(null);
  const installQueued = useRef(false);
  const promptingRef = useRef(false);
  const waitTimer = useRef(null);
  const pollRef = useRef(null);
  const prewarmedRef = useRef(false);
  const platform = detectPlatform();

  const busy = phase !== "idle" && phase !== "done" && phase !== "error";

  const setStep = useCallback((nextPhase, msg, pct) => {
    setPhase(nextPhase);
    setMessage(msg);
    if (typeof pct === "number") setProgress(pct);
  }, []);

  const runInstallPrompt = useCallback(
    async (promptEvent) => {
      if (!promptEvent || promptingRef.current) return false;
      promptingRef.current = true;
      installQueued.current = false;
      if (waitTimer.current) clearTimeout(waitTimer.current);
      if (pollRef.current) clearInterval(pollRef.current);
      setStep("prompting", stepLabel(3, 3, "Confirm install on your screen", 88), 88);
      setButtonLabel("Confirm install…");
      setHint(null);
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        deferredRef.current = null;
        if (choice?.outcome === "accepted") {
          setStep("done", "Download complete — SolarApp is on your home screen.", 100);
          setButtonLabel("Installed");
          setInstalled(isAppInstalled());
          return true;
        }
        setStep("error", "Install cancelled — tap Download to try again.", 0);
        setButtonLabel("Download SolarApp");
        setHint(platform.isAndroid ? "android" : null);
        return false;
      } catch (_) {
        setStep("error", "Could not start install — see steps below.", 0);
        setButtonLabel("Download SolarApp");
        setHint(platform.isAndroid ? "android" : null);
        return false;
      } finally {
        promptingRef.current = false;
      }
    },
    [platform.isAndroid, setStep]
  );

  const beginWaitingForPrompt = useCallback(() => {
    installQueued.current = true;
    setStep("waiting", stepLabel(3, 3, "Starting install", -1), -1);
    setButtonLabel("Starting install…");
    setHint(null);

    if (waitTimer.current) clearTimeout(waitTimer.current);
    waitTimer.current = setTimeout(() => {
      if (!installQueued.current) return;
      installQueued.current = false;
      setStep("error", "Install did not start — use Chrome steps below.", 0);
      setButtonLabel("Download SolarApp");
      setHint("android");
    }, 12000);

    if (pollRef.current) clearInterval(pollRef.current);
    const pollStart = Date.now();
    pollRef.current = setInterval(() => {
      if (deferredRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
        runInstallPrompt(deferredRef.current);
        return;
      }
      if (Date.now() - pollStart > 12000) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    }, 200);
  }, [runInstallPrompt, setStep]);

  useEffect(() => {
    setInstalled(isAppInstalled());

    if (!prewarmedRef.current) {
      prewarmedRef.current = true;
      warmInstallAssets(null).catch(() => {});
    }

    function onBeforeInstall(e) {
      e.preventDefault();
      deferredRef.current = e;
      if (installQueued.current) {
        setStep("waiting", stepLabel(3, 3, "Install ready — opening", 82), 82);
        runInstallPrompt(e);
      }
    }

    function onAppInstalled() {
      if (waitTimer.current) clearTimeout(waitTimer.current);
      if (pollRef.current) clearInterval(pollRef.current);
      installQueued.current = false;
      setStep("done", "Download complete — SolarApp is on your home screen.", 100);
      setButtonLabel("Installed");
      setHint(null);
      setInstalled(true);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onAppInstalled);
      if (waitTimer.current) clearTimeout(waitTimer.current);
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [runInstallPrompt, setStep]);

  if (installed) return null;

  async function onDownload(e) {
    e.preventDefault();
    if (busy) return;

    setHint(null);
    setStep("preparing", stepLabel(1, 3, "Preparing download", 5), 5);
    setButtonLabel("Preparing…");

    if (platform.inApp) {
      setStep("error", "Open in Safari or Chrome first.", 0);
      setButtonLabel("Download SolarApp");
      setHint("inapp");
      return;
    }

    if (platform.isIos) {
      setStep("caching", stepLabel(2, 3, "Downloading app files", 15), 15);
      setButtonLabel("Downloading…");
      await warmInstallAssets((pct) => {
        setStep("caching", stepLabel(2, 3, "Downloading app files", pct), pct);
      });
      setStep("done", "Files downloaded — follow the steps below to add SolarApp.", 100);
      setButtonLabel("Download SolarApp");
      setHint("ios");
      return;
    }

    if (!platform.isAndroid) {
      setStep("caching", stepLabel(2, 3, "Preparing app link", 20), 20);
      setButtonLabel("Downloading…");
      await warmInstallAssets((pct) => {
        setStep("caching", stepLabel(2, 3, "Preparing app link", pct), pct);
      });
      setStep("done", "Ready — copy the link and open on your phone.", 100);
      setButtonLabel("Download SolarApp");
      setHint("desktop");
      return;
    }

    if (deferredRef.current) {
      setStep("caching", stepLabel(2, 3, "Finalising download", 70), 70);
      setButtonLabel("Downloading…");
      await warmInstallAssets((pct) => {
        setStep("caching", stepLabel(2, 3, "Downloading app files", Math.max(15, pct)), pct);
      });
      await runInstallPrompt(deferredRef.current);
      return;
    }

    setStep("caching", stepLabel(2, 3, "Downloading app files", 12), 12);
    setButtonLabel("Downloading…");
    await warmInstallAssets((pct) => {
      setStep("caching", stepLabel(2, 3, "Downloading app files", pct), pct);
    });

    if (deferredRef.current) {
      await runInstallPrompt(deferredRef.current);
      return;
    }

    beginWaitingForPrompt();
  }

  function copyLink() {
    const url = window.location.origin + "/";
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).catch(() => alert("Copy this link:\n" + url));
    } else {
      alert("Copy this link:\n" + url);
    }
  }

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
      React.createElement("span", { key: "t" }, buttonLabel)
    ),
    React.createElement(HomeInstallStatus, {
      phase,
      message,
      progress,
      hint,
      onCopy: copyLink,
    })
  );
}
