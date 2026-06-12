import React, { useMemo } from "react";
import { LeafIco, PrtIco, RetIco } from "./icons.js";
import { environmentalImpact } from "./environment.js";
import { BrandHeaderSun } from "./ui.js";
import { OUTSIDE_DELIVERY_FREE_KM, installationCheckoutNote } from "./delivery.js";

export function makeQuotePreviewRef() {
  return "SA-" + Date.now().toString().slice(-6);
}

export function quoteDeliveryNote(deliveryQuote) {
  return installationCheckoutNote(deliveryQuote);
}

/** Three-step flow — orients users without adding clutter. */
export function QuoteFlowSteps({ activeStep = 2 }) {
  const steps = [
    { id: 1, label: "Package" },
    { id: 2, label: "Installation" },
    { id: 3, label: "PDF quote" },
  ];

  return React.createElement(
    "nav",
    { className: "quote-flow-steps", "aria-label": "Quote steps" },
    steps.map((step, i) => {
      const done = step.id < activeStep;
      const active = step.id === activeStep;
      return React.createElement(
        React.Fragment,
        { key: step.id },
        i > 0 &&
          React.createElement("span", {
            className: "quote-flow-steps-line" + (done || active ? " quote-flow-steps-line--on" : ""),
            "aria-hidden": true,
          }),
        React.createElement(
          "span",
          {
            className:
              "quote-flow-step" +
              (active ? " quote-flow-step--active" : "") +
              (done ? " quote-flow-step--done" : ""),
          },
          React.createElement(
            "span",
            { className: "quote-flow-step-num", "aria-hidden": true },
            done ? "✓" : step.id
          ),
          React.createElement("span", { className: "quote-flow-step-label" }, step.label)
        )
      );
    })
  );
}

/** Slim header — rotating sun brand + theme. */
export function QuotePageHeader({ custom, themeToggle }) {
  return React.createElement(
    "header",
    { className: "quote-page-header" },
    React.createElement(
      "div",
      { className: "quote-page-header-brand" },
      React.createElement(BrandHeaderSun, { className: "quote-page-header-icon" }),
      React.createElement(
        "div",
        { className: "quote-page-header-copy" },
        React.createElement("span", { className: "quote-page-header-title" }, "Solar", React.createElement("em", null, "App")),
        React.createElement("span", { className: "quote-page-header-tag" }, custom ? "Custom quote" : "Your quote")
      )
    ),
    themeToggle && React.createElement("div", { className: "quote-page-header-end" }, themeToggle)
  );
}

/** Package summary — full card or compact strip while entering installation. */
export function QuotePackageCard({ custom, title, includesLine, variant = "full", priceLabel }) {
  if (variant === "strip") {
    return React.createElement(
      "section",
      { className: "quote-package-card quote-package-card--strip" + (custom ? " quote-package-card--custom" : "") },
      React.createElement("span", { className: "quote-package-strip-label" }, custom ? "Custom" : "Package"),
      React.createElement(
        "div",
        { className: "quote-package-strip-copy" },
        React.createElement("p", { className: "quote-package-strip-name" }, title),
        includesLine && React.createElement("p", { className: "quote-package-strip-meta" }, includesLine)
      ),
      priceLabel &&
        React.createElement("span", { className: "quote-package-strip-price" }, priceLabel)
    );
  }

  return React.createElement(
    "section",
    {
      className:
        "quote-package-card" +
        (custom ? " quote-package-card--custom" : "") +
        (variant === "slim" ? " quote-package-card--slim" : ""),
    },
    React.createElement("div", { className: "quote-package-card-accent", "aria-hidden": true }),
    React.createElement(
      "div",
      { className: "quote-package-card-inner" },
      React.createElement("span", { className: "quote-package-eyebrow" }, custom ? "Custom sizing" : "Package"),
      React.createElement("h2", { className: "quote-package-name" }, title),
      includesLine && React.createElement("p", { className: "quote-package-includes" }, includesLine)
    )
  );
}

/** Compact checkout dock — hint + price-in-CTA (no duplicate total row). */
export function QuoteCheckoutBar({
  grandTotal,
  deliveryNote,
  custom,
  onSubmit,
  onReset,
  locationReady = true,
  installationQualified = false,
}) {
  const amountLabel = custom ? null : "$" + (grandTotal || 0).toLocaleString();
  const canSubmit = custom || locationReady;
  const hint = custom
    ? "Sized to your load"
    : locationReady
      ? deliveryNote || "Ready for your PDF"
      : "Add installation location to check qualification";

  return React.createElement(
    "footer",
    { className: "quote-checkout-dock" + (locationReady && !custom ? " quote-checkout-dock--ready" : "") },
    React.createElement("div", { className: "quote-checkout-dock-accent", "aria-hidden": true }),
    React.createElement(
      "p",
      {
        className:
          "quote-checkout-dock-hint" + (installationQualified ? " quote-checkout-dock-hint--qualified" : ""),
        "aria-live": "polite",
      },
      hint
    ),
    React.createElement(
      "button",
      {
        type: "button",
        className: "quote-checkout-dock-cta" + (!canSubmit ? " quote-checkout-dock-cta--idle" : ""),
        onClick: onSubmit,
        disabled: !canSubmit,
      },
      React.createElement(
        "span",
        { className: "quote-checkout-dock-cta-main" },
        React.createElement(PrtIco, { s: 14, c: "#0a0800" }),
        custom ? "Request PDF quote" : "Get PDF quote"
      ),
      amountLabel && React.createElement("span", { className: "quote-checkout-dock-cta-price" }, amountLabel)
    ),
    React.createElement(
      "button",
      { type: "button", className: "quote-page-reset", onClick: onReset },
      React.createElement(RetIco, { s: 10, c: "currentColor" }),
      "Start over"
    )
  );
}

export function useQuotePreviewRef() {
  return useMemo(() => makeQuotePreviewRef(), []);
}

/** Plain-language planet benefit — easy for anyone to read. */
export function QuoteEcoRibbon({ dWh, dailyGenWh }) {
  if (!dWh && !dailyGenWh) return null;
  const eco = environmentalImpact(dWh, dailyGenWh || 0);
  const trees = eco.trees;
  const benefit =
    trees >= 2
      ? "About the same clean-air benefit as planting " + trees + " trees every year."
      : "Uses sunshine instead of coal power from the grid — cleaner air for your home.";

  return React.createElement(
    "div",
    { className: "quote-eco-ribbon", role: "note" },
    React.createElement(
      "div",
      { className: "quote-eco-ribbon-head" },
      React.createElement(LeafIco, { s: 12, c: "currentColor" }),
      React.createElement("span", { className: "quote-eco-ribbon-title" }, "Good for the planet")
    ),
    React.createElement("p", { className: "quote-eco-ribbon-text" }, benefit)
  );
}

/** @deprecated Preview watermark removed from quote screen — PDF is official. */
export function QuoteWatermarkShield() {
  return null;
}

/** @deprecated Use QuotePageHeader */
export function QuoteBrandBar(props) {
  return React.createElement(QuotePageHeader, props);
}

/** @deprecated Use QuotePackageCard */
export function QuoteHeroCard(props) {
  return React.createElement(QuotePackageCard, {
    custom: props.custom,
    title: props.title,
    includesLine: props.subtitle,
  });
}

/** @deprecated Spec table hidden on quote screen — details are in the PDF. */
export function QuoteSpecTable() {
  return null;
}
