import React, { useState, useEffect } from "react";
import { G } from "./tokens.js";

export function isAppInstalled() {
  try {
    if (window.matchMedia("(display-mode: standalone)").matches) return true;
  } catch (_) {
    /* ignore */
  }
  return !!window.navigator.standalone;
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

/** Install / download — hidden when already running as installed PWA. */
export function HomeInstallCta() {
  const [installed, setInstalled] = useState(() => isAppInstalled());
  const [deferred, setDeferred] = useState(null);

  useEffect(() => {
    setInstalled(isAppInstalled());
    function onBeforeInstall(e) {
      e.preventDefault();
      setDeferred(e);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  if (installed) return null;

  async function onNativeInstall(e) {
    e.preventDefault();
    if (!deferred) return;
    try {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice?.outcome === "accepted") setInstalled(isAppInstalled());
    } catch (_) {
      /* user dismissed */
    }
    setDeferred(null);
  }

  const label = deferred ? "Install SolarApp" : "Download SolarApp";
  const common = {
    className: "home-install-cta",
    children: [
      React.createElement(DwnIco, { key: "i" }),
      React.createElement("span", { key: "t" }, label),
    ],
  };

  if (deferred) {
    return React.createElement("button", { type: "button", ...common, onClick: onNativeInstall });
  }

  return React.createElement("a", { href: "/install/", ...common });
}
