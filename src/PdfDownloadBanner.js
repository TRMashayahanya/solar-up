import React from "react";
import { HomeIco } from "./icons.js";

/** Shown after quote submit — PDF runs in background; user can return home anytime. */
export function PdfDownloadBanner({ job, onHome, onDismiss }) {
  if (!job) return null;
  const working = job.phase === "active";
  const error = job.phase === "error";
  const done = job.phase === "done";

  return React.createElement(
    "div",
    {
      className: "pdf-download-banner" + (error ? " pdf-download-banner--error" : ""),
      role: "status",
      "aria-live": "polite",
    },
    React.createElement(
      "div",
      { className: "pdf-download-banner-inner" },
      working &&
        React.createElement("span", { className: "pdf-download-spinner", "aria-hidden": true }),
      React.createElement(
        "div",
        { className: "pdf-download-banner-text" },
        React.createElement("p", { className: "pdf-download-banner-title" }, error ? "Could not finish quote" : done ? "Quote ready" : "Your quote"),
        React.createElement("p", { className: "pdf-download-banner-msg" }, job.message)
      ),
      React.createElement(
        "div",
        { className: "pdf-download-banner-actions" },
        React.createElement(
          "button",
          { type: "button", className: "pdf-download-btn-home", onClick: onHome },
          React.createElement(HomeIco, { s: 14, c: "currentColor" }),
          "Back to Home"
        ),
        (done || error) &&
          React.createElement(
            "button",
            { type: "button", className: "pdf-download-btn-dismiss", onClick: onDismiss },
            "Dismiss"
          )
      )
    )
  );
}
