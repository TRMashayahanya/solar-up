import React from "react";
import { G } from "./tokens.js";
import { SunIco } from "./icons.js";

/** Visual Add to Home Screen guide for iPhone, iPad, and iOS browsers. */
export function IosInstallGuide({ variant, onOpenSafari }) {
  const needsSafari = variant === "open-safari";

  return React.createElement(
    "div",
    { className: "ios-install-guide" },
    React.createElement(
      "div",
      { className: "ios-install-preview ios-install-preview--sun" },
      React.createElement(
        "span",
        { className: "ios-install-preview-icon", "aria-hidden": true },
        React.createElement(
          "span",
          { className: "home-brand-sun" },
          React.createElement(SunIco, { s: 52, c: G })
        )
      )
    ),
    needsSafari &&
      React.createElement(
        "p",
        { className: "ios-install-safari-note" },
        "Install works in ",
        React.createElement("strong", null, "Safari"),
        " on iPhone and iPad. Chrome and WhatsApp cannot add apps to your home screen."
      ),
    React.createElement(
      "ol",
      { className: "ios-install-steps" },
      React.createElement(
        "li",
        null,
        React.createElement("span", { className: "ios-install-step-num", "aria-hidden": true }, "1"),
        React.createElement(
          "span",
          null,
          needsSafari
            ? React.createElement(React.Fragment, null, "Open this page in ", React.createElement("strong", null, "Safari"))
            : React.createElement(React.Fragment, null, "Tap ", React.createElement("strong", null, "Share"), " (↑ at the bottom of Safari)")
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement("span", { className: "ios-install-step-num", "aria-hidden": true }, needsSafari ? "2" : "2"),
        React.createElement(
          "span",
          null,
          needsSafari
            ? React.createElement(React.Fragment, null, "Return here and tap ", React.createElement("strong", null, "Download SolarApp"), " again")
            : React.createElement(React.Fragment, null, "Scroll and tap ", React.createElement("strong", null, "Add to Home Screen"))
        )
      ),
      React.createElement(
        "li",
        null,
        React.createElement("span", { className: "ios-install-step-num", "aria-hidden": true }, needsSafari ? "3" : "3"),
        React.createElement(
          "span",
          null,
          needsSafari
            ? React.createElement(React.Fragment, null, "Follow the steps to ", React.createElement("strong", null, "Add to Home Screen"))
            : React.createElement(React.Fragment, null, "Tap ", React.createElement("strong", null, "Add"), " — SolarApp appears on your home screen")
        )
      )
    ),
    needsSafari &&
      React.createElement(
        "button",
        { type: "button", className: "ios-install-open-safari", onClick: onOpenSafari },
        "Open in Safari"
      )
  );
}
