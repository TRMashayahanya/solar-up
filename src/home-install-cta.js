import React, { useState, useEffect, useRef, useCallback } from "react";
import { G } from "./tokens.js";
import {
  detectInstallPlatform,
  isSecureForInstall,
  isStandaloneApp,
  warmInstallShell,
  verifyInstallAssets,
  markInstallResume,
  consumeInstallResume,
  markInstallRetried,
  hasInstallRetried,
  clearInstallRetryFlags,
  registerServiceWorker,
} from "./pwa.js";
import { IosInstallGuide } from "./ios-install-guide.js";

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
    https: {
      title: "Secure link required",
      body: "Install only works on https:// links. Deploy SolarApp with HTTPS, then share that URL with clients.",
    },
    inapp: {
      title: "Open in your browser",
      body: "In-app browsers cannot install apps. Tap ⋮ → Open in Safari or Chrome, then tap Download again.",
    },
    ios: {
      title: "Almost done — 3 taps in Safari",
      body: "App files are on your device. Complete install with the steps below.",
    },
    "ios-open-safari": {
      title: "Use Safari on iPhone or iPad",
      body: "Apple only allows home-screen install from Safari — not Chrome or WhatsApp.",
    },
    android: {
      title: "Install from Chrome menu",
      body: "Tap ⋮ (top right) → Install app or Add to Home screen. SolarApp will appear on your device.",
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

export function isAppInstalled() {
  return isStandaloneApp();
}

/** One-tap download/install on home — visible progress, native install when supported. */
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
  const resumeHandled = useRef(false);
  const platform = detectInstallPlatform();

  const busy = phase !== "idle" && phase !== "done" && phase !== "error";
  const canNativeInstall = platform.isAndroid || platform.isChromium;

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
      setStep("prompting", stepLabel(3, 3, "Confirm install on your screen", 90), 90);
      setButtonLabel("Confirm install…");
      setHint(null);
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        deferredRef.current = null;
        if (choice?.outcome === "accepted") {
          clearInstallRetryFlags();
          setStep("done", "Installed — open SolarApp from your home screen or app list.", 100);
          setButtonLabel("Installed");
          setInstalled(isAppInstalled());
          return true;
        }
        setStep("error", "Install cancelled — tap Download to try again.", 0);
        setButtonLabel("Download SolarApp");
        setHint(canNativeInstall ? "android" : null);
        return false;
      } catch (err) {
        console.warn("Install prompt failed:", err);
        setStep("error", "Could not open install — use the menu steps below.", 0);
        setButtonLabel("Download SolarApp");
        setHint(canNativeInstall ? "android" : null);
        return false;
      } finally {
        promptingRef.current = false;
      }
    },
    [canNativeInstall, setStep]
  );

  const beginWaitingForPrompt = useCallback(() => {
    installQueued.current = true;
    setStep("waiting", stepLabel(3, 3, "Waiting for install prompt", -1), -1);
    setButtonLabel("Starting install…");

    if (waitTimer.current) clearTimeout(waitTimer.current);
    waitTimer.current = setTimeout(() => {
      if (!installQueued.current) return;
      installQueued.current = false;
      setStep("error", "Install prompt did not appear — use Chrome menu steps below.", 0);
      setButtonLabel("Download SolarApp");
      setHint(canNativeInstall ? "android" : "desktop");
    }, 15000);

    if (pollRef.current) clearInterval(pollRef.current);
    const pollStart = Date.now();
    pollRef.current = setInterval(() => {
      if (deferredRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
        runInstallPrompt(deferredRef.current);
        return;
      }
      if (Date.now() - pollStart > 15000) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    }, 200);
  }, [canNativeInstall, runInstallPrompt, setStep]);

  const runDownloadFlow = useCallback(async () => {
    setHint(null);
    setStep("preparing", stepLabel(1, 3, "Preparing download", 5), 5);
    setButtonLabel("Preparing…");

    if (!isSecureForInstall()) {
      const local =
        location.hostname === "localhost" || location.hostname === "127.0.0.1";
      if (!local) {
        setStep("error", "Install needs a secure https:// link.", 0);
        setButtonLabel("Download SolarApp");
        setHint("https");
        return;
      }
    }

    if (platform.inApp) {
      setStep("error", "Open in Safari or Chrome first.", 0);
      setButtonLabel("Download SolarApp");
      setHint("inapp");
      return;
    }

    if (platform.isIos) {
      if (!platform.isSafari) {
        setStep("error", "Open in Safari to install on iPhone or iPad.", 0);
        setButtonLabel("Download SolarApp");
        setHint("ios-open-safari");
        return;
      }
      setStep("caching", stepLabel(2, 3, "Downloading app files", 15), 15);
      setButtonLabel("Downloading…");
      await warmInstallShell((pct) => {
        setStep("caching", stepLabel(2, 3, "Downloading app files", pct), pct);
      });
      setStep("done", "Download complete — add SolarApp to your home screen (3 taps).", 100);
      setButtonLabel("Added to home screen? Refresh the page.");
      setHint("ios");
      return;
    }

    setStep("caching", stepLabel(2, 3, "Downloading app files", 12), 12);
    setButtonLabel("Downloading…");

    const assetsOk = await verifyInstallAssets();
    if (!assetsOk) {
      setStep("error", "App icons could not load — check your server deploy.", 0);
      setButtonLabel("Download SolarApp");
      return;
    }

    const controlled = await warmInstallShell((pct) => {
      setStep("caching", stepLabel(2, 3, "Downloading app files", pct), pct);
    });

    if (!controlled && canNativeInstall && !hasInstallRetried()) {
      markInstallRetried();
      markInstallResume();
      setStep("caching", stepLabel(2, 3, "Activating offline mode", 62), 62);
      setButtonLabel("Almost ready…");
      window.location.reload();
      return;
    }

    if (deferredRef.current) {
      await runInstallPrompt(deferredRef.current);
      return;
    }

    if (canNativeInstall) {
      await registerServiceWorker();
      beginWaitingForPrompt();
      return;
    }

    setStep("done", "Ready — copy the link and open on your phone.", 100);
    setButtonLabel("Download SolarApp");
    setHint("desktop");
  }, [beginWaitingForPrompt, canNativeInstall, platform.inApp, platform.isIos, runInstallPrompt, setStep]);

  useEffect(() => {
    setInstalled(isAppInstalled());
    registerServiceWorker();

    function onBeforeInstall(e) {
      e.preventDefault();
      deferredRef.current = e;
      if (installQueued.current) {
        setStep("waiting", stepLabel(3, 3, "Install ready — opening", 85), 85);
        runInstallPrompt(e);
      }
    }

    function onAppInstalled() {
      if (waitTimer.current) clearTimeout(waitTimer.current);
      if (pollRef.current) clearInterval(pollRef.current);
      installQueued.current = false;
      clearInstallRetryFlags();
      setStep("done", "Installed — open SolarApp from your home screen or app list.", 100);
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

  useEffect(() => {
    if (resumeHandled.current) return;
    if (consumeInstallResume()) {
      resumeHandled.current = true;
      runDownloadFlow();
    }
  }, [runDownloadFlow]);

  if (installed) return null;

  function onDownload(e) {
    e.preventDefault();
    if (busy) return;
    runDownloadFlow();
  }

  function copyLink() {
    const url = window.location.origin + "/";
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).catch(() => alert("Copy this link:\n" + url));
    } else {
      alert("Copy this link:\n" + url);
    }
  }

  function openInSafari() {
    const url = window.location.href;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    setMessage("Link copied — open Safari, paste it in the address bar, then tap Download again.");
  }

  const showIosGuide = hint === "ios" || hint === "ios-open-safari";

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
    }),
    showIosGuide &&
      React.createElement(IosInstallGuide, {
        variant: hint === "ios-open-safari" ? "open-safari" : "safari",
        onOpenSafari: openInSafari,
      })
  );
}
