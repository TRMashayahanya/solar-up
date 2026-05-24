import React from "react";
import { createRoot } from "react-dom/client";

const BUILD = "17";

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol !== "https:" && location.hostname !== "localhost") return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

registerServiceWorker();

function showBootError(message, detail) {
  const root = document.getElementById("root");
  if (!root) return;
  root.innerHTML =
    '<div style="max-width:480px;margin:40px auto;padding:24px;font-family:system-ui,sans-serif;color:#f8fafc">' +
    "<h2 style=\"color:#f87171;margin:0 0 12px\">Solar Up could not start</h2>" +
    "<p style=\"color:rgba(255,255,255,.75);line-height:1.5;margin:0 0 12px\">" +
    escapeHtml(message) +
    "</p>" +
    (detail
      ? '<pre style="font-size:12px;white-space:pre-wrap;background:rgba(0,0,0,.4);padding:12px;border-radius:8px;overflow:auto">' +
        escapeHtml(detail) +
        "</pre>"
      : "") +
    '<p style="margin-top:16px;font-size:12px;color:rgba(255,255,255,.45)">Run <code style="color:#E8C547">node server.mjs</code> in the project folder, then open <a href="http://localhost:5173" style="color:#E8C547">http://localhost:5173</a></p></div>';
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function boot() {
  if (location.protocol === "file:") {
    showBootError(
      "Open via the local server, not the HTML file directly.",
      "cd ~/Projects/solar-up && node server.mjs"
    );
    return;
  }

  try {
    const { default: App } = await import("./App.js");
    const rootEl = document.getElementById("root");
    if (!rootEl) throw new Error("Missing #root element");
    createRoot(rootEl).render(React.createElement(App));
  } catch (err) {
    console.error(err);
    const msg = err.message || String(err);
    const hint =
      msg.includes("Failed to fetch") || msg.includes("dynamically imported module")
        ? "Start the server (node server.mjs), hard-refresh, and check your internet (React loads from CDN)."
        : "";
    showBootError(msg, (err.stack || "") + (hint ? "\n\n" + hint : ""));
  }
}

boot();
