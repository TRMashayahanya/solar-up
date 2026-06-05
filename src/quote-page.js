import React, { useMemo } from "react";
import { ShldIco, LeafIco } from "./icons.js";
import { environmentalImpact } from "./environment.js";

export function makeQuotePreviewRef() {
  return "SA-" + Date.now().toString().slice(-6);
}

/** Slim header — ref only; PDF is the official document. */
export function QuotePageHeader({ previewRef, custom, themeToggle }) {
  return React.createElement(
    "header",
    { className: "quote-page-header" },
    React.createElement(
      "div",
      { className: "quote-page-header-brand" },
      React.createElement(
        "span",
        { className: "quote-gold-icon" },
        React.createElement(ShldIco, { s: 14, c: "currentColor" })
      ),
      React.createElement("span", { className: "quote-page-header-title" }, "Solar", React.createElement("em", null, "App"))
    ),
    React.createElement(
      "div",
      { className: "quote-page-header-end" },
      previewRef &&
        React.createElement(
          "span",
          { className: "quote-page-header-ref" },
          custom ? "Custom" : "Quote",
          " · ",
          previewRef
        ),
      themeToggle
    )
  );
}

/** Package + price + load — one premium card. */
export function QuotePackageCard({ custom, title, peakW, dailyWh, priceLabel, priceSub, includesLine, dWh, dailyGenWh }) {
  const loadChip =
    (peakW || dailyWh) &&
    [peakW ? peakW.toLocaleString() + "W peak" : null, dailyWh ? (dailyWh / 1000).toFixed(1) + " kWh/day" : null]
      .filter(Boolean)
      .join(" · ");

  return React.createElement(
    "section",
    { className: "quote-package-card" + (custom ? " quote-package-card--custom" : "") },
    React.createElement(
      "div",
      { className: "quote-package-card-top" },
      React.createElement(
        "div",
        { className: "quote-package-card-main" },
        React.createElement("h2", { className: "quote-package-name" }, title),
        includesLine && React.createElement("p", { className: "quote-package-includes" }, includesLine)
      ),
      React.createElement(
        "div",
        { className: "quote-package-price-block" },
        React.createElement("p", { className: "quote-package-price" }, priceLabel),
        priceSub && React.createElement("p", { className: "quote-package-price-sub" }, priceSub)
      )
    ),
    loadChip && React.createElement("p", { className: "quote-package-load" }, loadChip),
    React.createElement(QuoteEcoRibbon, { dWh, dailyGenWh })
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
    peakW: props.peakW,
    dailyWh: props.dailyWh,
    priceLabel: props.priceLabel,
    priceSub: props.priceSub,
    includesLine: props.subtitle,
  });
}

/** @deprecated Spec table hidden on quote screen — details are in the PDF. */
export function QuoteSpecTable() {
  return null;
}
