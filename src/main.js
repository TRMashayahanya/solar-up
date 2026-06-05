import React from "react";
import { createRoot } from "react-dom/client";

import { BUILD } from "./build.js";

function showBootError(message, detail) {
  const root = document.getElementById("root");
  if (!root) return;
  root.innerHTML =
    '<div style="max-width:480px;margin:40px auto;padding:24px;font-family:system-ui,sans-serif;color:#f8fafc">' +
    "<h2 style=\"color:#f87171;margin:0 0 12px\">SolarApp could not start</h2>" +
    "<p style=\"color:rgba(255,255,255,.75);line-height:1.5;margin:0 0 12px\">" +
    escapeHtml(message) +
    "</p>" +
    (detail
      ? '<pre style="font-size:12px;white-space:pre-wrap;background:rgba(0,0,0,.4);padding:12px;border-radius:8px;overflow:auto">' +
        escapeHtml(detail) +
        "</pre>"
      : "") +
    '<p style="margin-top:16px;font-size:12px;color:rgba(255,255,255,.45)">Run <code style="color:#E8C547">./start.sh</code> then open <a href="http://localhost:5173/?v=' +
    BUILD +
    '" style="color:#E8C547">http://localhost:5173/?v=' +
    BUILD +
    "</a></p></div>";
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function boot() {
  if (location.protocol === "file:") {
    showBootError("Open via the local server, not the HTML file directly.", "cd ~/Projects/solar-up && ./start.sh");
    return;
  }

  try {
    import("./runtime-config.js").then((m) => m.getRuntimeConfig()).catch(() => {});
    import("./google-maps.js").then((m) => m.initGoogleMaps()).catch(() => {});
    const { default: App } = await import("./App.js?v=" + BUILD);
    const rootEl = document.getElementById("root");
    if (!rootEl) throw new Error("Missing #root element");
    createRoot(rootEl).render(React.createElement(App));
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js?v=" + BUILD).catch(() => {});
    }
  } catch (err) {
    console.error(err);
    const msg = err.message || String(err);
    const hint =
      msg.includes("Failed to fetch") || msg.includes("dynamically imported module")
        ? "Start the server: ./start.sh — then hard-refresh (Cmd+Shift+R)."
        : "";
    showBootError(msg, (err.stack || "") + (hint ? "\n\n" + hint : ""));
  }
}

boot();
