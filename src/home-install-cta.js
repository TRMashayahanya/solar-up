import React, { useState, useEffect, useRef, useCallback } from "react";
import { G } from "./tokens.js";
import {
  detectInstallPlatform,
  isStandaloneApp,
  registerServiceWorker,
} from "./pwa.js";
import {
  prewarmInstall,
  setDeferredInstallPrompt,
  takeDeferredInstallPrompt,
  getDeferredInstallPrompt,
  promptInstallNow,
  installViaIosShare,
  installPath,
  openInChrome,
  openInSafari,
  canAttemptInstall,
  supportsNativeInstallPrompt,
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

/** One-tap install — native Chrome/Android dialog; iOS opens system share sheet. */
export function HomeInstallCta() {
  const [installed, setInstalled] = useState(() => isAppInstalled());
  const [busy, setBusy] = useState(false);
  const [nativeReady, setNativeReady] = useState(() => !!getDeferredInstallPrompt());
  const platform = detectInstallPlatform();
  const needsNativePrompt = supportsNativeInstallPrompt(platform) && !platform.inApp;
  const waitTimerRef = useRef(null);

  const finishInstalled = useCallback(() => {
    setBusy(false);
    setInstalled(true);
    if (waitTimerRef.current) clearTimeout(waitTimerRef.current);
  }, []);

  const runNativePrompt = useCallback(
    (promptEvent) => {
      setBusy(true);
      promptInstallNow(promptEvent).then((choice) => {
        if (choice?.outcome === "accepted") {
          finishInstalled();
          return;
        }
        setBusy(false);
      });
    },
    [finishInstalled]
  );

  useEffect(() => {
    if (installed) return;
    registerServiceWorker();
    prewarmInstall();

    if (getDeferredInstallPrompt()) setNativeReady(true);

    function onBeforeInstall(e) {
      setDeferredInstallPrompt(e);
      setNativeReady(true);
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
  }, [installed, finishInstalled]);

  if (installed) return null;
  if (!canAttemptInstall(platform)) return null;

  const path = installPath(platform);
  const preparing = needsNativePrompt && !nativeReady;
  const canTap = !busy && !preparing;

  function onInstall(e) {
    e.preventDefault();
    if (!canTap) return;

    if (path === "open-chrome") {
      openInChrome();
      return;
    }
    if (path === "open-safari") {
      openInSafari();
      return;
    }

    // Android / Chrome — prompt() must start synchronously in this click handler.
    const captured = takeDeferredInstallPrompt();
    if (captured) {
      runNativePrompt(captured);
      return;
    }

    if (path === "ios-share") {
      setBusy(true);
      installViaIosShare().finally(() => setBusy(false));
    }
  }

  const label = busy ? "Installing…" : preparing ? "Preparing…" : "Install SolarApp";

  return React.createElement(
    "div",
    { className: "home-install-wrap" },
    React.createElement(
      "button",
      {
        type: "button",
        className:
          "home-install-cta" +
          (busy || preparing ? " home-install-cta--busy" : ""),
        onClick: onInstall,
        disabled: !canTap,
        "aria-busy": busy || preparing,
        "aria-label": label,
      },
      busy || preparing
        ? React.createElement("span", { className: "home-install-spinner", "aria-hidden": true })
        : React.createElement(DwnIco, { key: "i" }),
      React.createElement("span", { key: "t" }, label)
    )
  );
}
