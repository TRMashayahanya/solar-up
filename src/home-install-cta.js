import React, { useState, useEffect, useRef, useCallback } from "react";
import { G } from "./tokens.js";
import { detectInstallPlatform, isStandaloneApp, registerServiceWorker } from "./pwa.js";
import {
  prewarmInstall,
  prewarmInstallFast,
  setDeferredInstallPrompt,
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

/** Single-tap download / install — always enabled; fires native dialog when ready. */
export function HomeInstallCta() {
  const [installed, setInstalled] = useState(() => isAppInstalled());
  const [busy, setBusy] = useState(false);
  const platform = detectInstallPlatform();
  const path = installPath(platform);

  const installQueued = useRef(false);
  const lastClickAt = useRef(0);
  const waitTimerRef = useRef(null);

  const finishInstalled = useCallback(() => {
    setBusy(false);
    setInstalled(true);
    installQueued.current = false;
    clearInstallResumeAfterSuccess();
    if (waitTimerRef.current) clearTimeout(waitTimerRef.current);
  }, []);

  const runNativePrompt = useCallback(
    (promptEvent) => {
      if (!promptEvent?.prompt) return false;
      setBusy(true);
      installQueued.current = false;
      if (waitTimerRef.current) clearTimeout(waitTimerRef.current);
      promptInstallNow(promptEvent).then((choice) => {
        if (choice?.outcome === "accepted") {
          finishInstalled();
          return;
        }
        setBusy(false);
      });
      return true;
    },
    [finishInstalled]
  );

  useEffect(() => {
    if (installed) return;
    registerServiceWorker();
    prewarmInstall();
    consumeInstallResume();

    function onBeforeInstall(e) {
      setDeferredInstallPrompt(e);
      if (!installQueued.current) return;
      const withinGesture = Date.now() - lastClickAt.current < 1500;
      if (withinGesture && runNativePrompt(e)) return;
      installQueued.current = false;
      setBusy(false);
    }

    function onAppInstalled() {
      finishInstalled();
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onAppInstalled);
      if (waitTimerRef.current) clearTimeout(waitTimerRef.current);
    };
  }, [installed, finishInstalled, runNativePrompt]);

  if (installed) return null;
  if (!canAttemptInstall(platform)) return null;

  function onInstall(e) {
    e.preventDefault();
    if (busy) return;

    lastClickAt.current = Date.now();

    if (path === "open-chrome") {
      openInChrome();
      return;
    }
    if (path === "open-safari") {
      openInSafari();
      return;
    }

    const captured = takeDeferredInstallPrompt();
    if (captured) {
      runNativePrompt(captured);
      return;
    }

    if (path === "ios-share") {
      setBusy(true);
      installViaIosShare().finally(() => setBusy(false));
      return;
    }

    if (path === "native-prompt") {
      installQueued.current = true;
      prewarmInstallFast();

      if (
        typeof navigator !== "undefined" &&
        "serviceWorker" in navigator &&
        !navigator.serviceWorker.controller
      ) {
        reloadForInstallControl();
        return;
      }

      setBusy(true);
      if (waitTimerRef.current) clearTimeout(waitTimerRef.current);
      waitTimerRef.current = setTimeout(() => {
        if (!installQueued.current) return;
        installQueued.current = false;
        setBusy(false);
      }, 5000);
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
        onClick: onInstall,
        disabled: busy,
        "aria-busy": busy,
        "aria-label": label,
      },
      busy
        ? React.createElement("span", { className: "home-install-spinner", "aria-hidden": true })
        : React.createElement(DwnIco, { key: "i" }),
      React.createElement("span", { key: "t" }, label)
    )
  );
}
