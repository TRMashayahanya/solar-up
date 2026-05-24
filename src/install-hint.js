import React, { useEffect, useState } from "react";
import { G, W4, W8, GRAD_GOLD, ci } from "./tokens.js";

const DISMISS_KEY = "solarup-install-hint-dismissed";

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches || /iPhone|iPad|Android/i.test(navigator.userAgent);
}

function isStandalone() {
  return (
    typeof window !== "undefined" &&
    (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true)
  );
}

function isIos() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

export function InstallHint() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [deferred, setDeferred] = useState(null);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function onBip(e) {
      e.preventDefault();
      setDeferred(e);
    }
    window.addEventListener("beforeinstallprompt", onBip);
    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, []);

  if (isStandalone() || dismissed) return null;

  const showBar = isMobile() || deferred;

  if (!showBar) return null;

  async function installAndroid() {
    if (!deferred) return;
    setInstalling(true);
    try {
      deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
      setDismissed(true);
      try {
        localStorage.setItem(DISMISS_KEY, "1");
      } catch (_) {}
    } finally {
      setInstalling(false);
    }
  }

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch (_) {}
    setDismissed(true);
  }

  const ios = isIos();
  const android = isAndroid() && deferred;

  return React.createElement(
    "div",
    {
      style: {
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "calc(88px + env(safe-area-inset-bottom, 0px))",
        width: "min(400px, calc(100% - 24px))",
        zIndex: 9995,
        padding: "14px 16px",
        borderRadius: 14,
        background: "linear-gradient(145deg, rgba(15,31,23,.98), rgba(8,12,10,.98))",
        border: "1px solid rgba(232,197,71,.4)",
        boxShadow: "0 12px 40px rgba(0,0,0,.5)",
      },
    },
    React.createElement(
      "p",
      { style: { color: G, fontSize: 13, fontWeight: 700, margin: "0 0 6px" } },
      "Install Solar Up on your phone"
    ),
    React.createElement(
      "p",
      { style: { color: W4, fontSize: 11, margin: "0 0 12px", lineHeight: 1.45 } },
      android
        ? "Add to your home screen — opens like an app, no Play Store needed."
        : ios
          ? "iPhone: tap Share (↑) then “Add to Home Screen”."
          : "Add to home screen from your browser menu for quick access."
    ),
    React.createElement(
      "div",
      { style: { display: "flex", flexWrap: "wrap", gap: 8 } },
      android &&
        React.createElement(
          "button",
          {
            type: "button",
            disabled: installing,
            onClick: installAndroid,
            style: {
              flex: 1,
              minWidth: 120,
              padding: "10px 14px",
              border: "none",
              borderRadius: 10,
              background: GRAD_GOLD,
              color: "#0a0800",
              fontWeight: 700,
              fontSize: 13,
              cursor: installing ? "wait" : "pointer",
              fontFamily: "inherit",
            },
          },
          installing ? "Installing…" : "Install app"
        ),
      React.createElement(
        "a",
        {
          href: "/install/",
          style: {
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,.15)",
            color: W8,
            fontSize: 12,
            fontWeight: 600,
            textDecoration: "none",
            ...ci,
          },
        },
        "How to install"
      ),
      React.createElement(
        "button",
        {
          type: "button",
          onClick: dismiss,
          style: {
            padding: "10px 12px",
            border: "none",
            borderRadius: 10,
            background: "rgba(255,255,255,.08)",
            color: W4,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "inherit",
          },
        },
        "Later"
      )
    )
  );
}
