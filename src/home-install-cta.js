import React, { useState, useEffect, useRef, useCallback } from "react";
import { G } from "./tokens.js";
import { detectInstallPlatform, isStandaloneApp, registerServiceWorker } from "./pwa.js";
import {
  prewarmInstall,
  prewarmInstallFast,
  getDeferredInstallPrompt,
  takeDeferredInstallPrompt,
  promptInstallNow,
  installViaIosShare,
  installPath,
  openInChrome,
  openInSafari,
  canAttemptInstall,
  reloadForInstallControl,
  clearInstallResumeAfterSuccess,
  consumeInstallResume,
  queueInstallTap,
  clearInstallTapQueue,
  isInstallTapQueued,
} from "./install-flow.js";

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

export function isAppInstalled() {
  return isStandaloneApp();
}

/** Single-tap download / install — queues retry when prompt is not ready yet. */
export function HomeInstallCta() {
  const [installed, setInstalled] = useState(() => isAppInstalled());
  const [busy, setBusy] = useState(false);
  const [hint, setHint] = useState("");
  const platform = detectInstallPlatform();
  const path = installPath(platform);

  const installQueued = useRef(false);
  const waitTimerRef = useRef(null);

  const finishInstalled = useCallback(() => {
    setBusy(false);
    setHint("");
    setInstalled(true);
    installQueued.current = false;
    clearInstallTapQueue();
    clearInstallResumeAfterSuccess();
    if (waitTimerRef.current) clearTimeout(waitTimerRef.current);
  }, []);

  const runNativePrompt = useCallback(
    (promptEvent) => {
      if (!promptEvent?.prompt) return false;
      setBusy(true);
      setHint("");
      installQueued.current = false;
      if (waitTimerRef.current) clearTimeout(waitTimerRef.current);
      promptInstallNow(promptEvent).then((choice) => {
        if (choice?.outcome === "accepted") {
          finishInstalled();
          return;
        }
        setBusy(false);
        setHint("Install cancelled — tap to try again.");
      });
      return true;
    },
    [finishInstalled]
  );

  const tryQueuedInstall = useCallback(() => {
    if (!installQueued.current && !isInstallTapQueued()) return false;
    const captured = takeDeferredInstallPrompt();
    if (!captured) return false;
    return runNativePrompt(captured);
  }, [runNativePrompt]);

  useEffect(() => {
    if (installed) return;
    registerServiceWorker();
    prewarmInstall();

    if (consumeInstallResume()) {
      installQueued.current = true;
      queueInstallTap();
      setHint("Tap Download to finish installing.");
    }

    function onInstallReady() {
      if (tryQueuedInstall()) return;
      if (getDeferredInstallPrompt()) {
        setHint("");
        setBusy(false);
      }
    }

    function onAppInstalled() {
      finishInstalled();
    }

    if (getDeferredInstallPrompt()) {
      setHint("");
    }

    window.addEventListener("solarapp-install-ready", onInstallReady);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("solarapp-install-ready", onInstallReady);
      window.removeEventListener("appinstalled", onAppInstalled);
      if (waitTimerRef.current) clearTimeout(waitTimerRef.current);
    };
  }, [installed, finishInstalled, tryQueuedInstall]);

  if (installed) return null;
  if (!canAttemptInstall(platform)) return null;

  function runInstall() {
    const captured = takeDeferredInstallPrompt();
    if (captured) {
      runNativePrompt(captured);
      return;
    }

    if (path === "ios-share") {
      setBusy(true);
      setHint("");
      installViaIosShare().finally(() => setBusy(false));
      return;
    }

    if (path === "native-prompt") {
      installQueued.current = true;
      queueInstallTap();
      prewarmInstallFast();

      if (
        typeof navigator !== "undefined" &&
        "serviceWorker" in navigator &&
        !navigator.serviceWorker.controller
      ) {
        if (reloadForInstallControl()) return;
      }

      setBusy(true);
      setHint("Getting install ready — tap again in a moment.");
      if (waitTimerRef.current) clearTimeout(waitTimerRef.current);
      waitTimerRef.current = setTimeout(() => {
        if (!installQueued.current) return;
        setBusy(false);
        setHint("Tap Download again to install.");
      }, 4500);
    }
  }

  function onInstall(e) {
    e.preventDefault();
    if (busy && !installQueued.current) return;

    if (path === "open-chrome") {
      openInChrome();
      return;
    }
    if (path === "open-safari") {
      openInSafari();
      return;
    }

    runInstall();
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
        onClick: onInstall,
        disabled: busy && !installQueued.current,
        "aria-busy": busy,
        "aria-label": label,
      },
      busy
        ? React.createElement("span", { className: "home-install-spinner", "aria-hidden": true })
        : React.createElement(DwnIco, { key: "i" }),
      React.createElement("span", { key: "t" }, label)
    ),
    hint &&
      React.createElement(
        "p",
        { className: "home-install-hint-msg", role: "status", "aria-live": "polite" },
        hint
      )
  );
}
