import React, { useMemo } from "react";
import { ShldIco } from "./icons.js";
import { QUOTE_VALIDITY_DAYS } from "./quote.js";

export function makeQuotePreviewRef() {
  return "SA-" + Date.now().toString().slice(-6);
}

/** Diagonal watermark — discourages casual screenshots; official terms on PDF. */
export function QuoteWatermarkShield({ previewRef }) {
  const tiles = Array.from({ length: 18 }, (_, i) =>
    React.createElement(
      "span",
      { key: i, className: "quote-wm-tile" },
      "SolarApp · Energi Tech · Preview · Not for redistribution"
    )
  );
  return React.createElement(
    "div",
    { className: "quote-wm-shield", "aria-hidden": true },
    React.createElement("div", { className: "quote-wm-grid" }, tiles),
    previewRef &&
      React.createElement("p", { className: "quote-wm-ref" }, "Ref " + previewRef + " · Request PDF for official quote")
  );
}

export function QuoteBrandBar({ previewRef, custom }) {
  return React.createElement(
    "header",
    { className: "quote-brand-bar" },
    React.createElement(
      "div",
      { className: "quote-brand-bar-top" },
      React.createElement(
        "div",
        { className: "quote-brand-bar-lockup" },
        React.createElement(
          "span",
          { className: "quote-gold-icon" },
          React.createElement(ShldIco, { s: 18, c: "currentColor" })
        ),
        React.createElement(
          "div",
          null,
          React.createElement("p", { className: "quote-brand-bar-title" }, "Solar", React.createElement("em", null, "App")),
          React.createElement("p", { className: "quote-brand-bar-sub" }, "Energi Tech · Zimbabwe")
        )
      ),
      previewRef &&
        React.createElement(
          "div",
          { className: "quote-brand-bar-ref" },
          React.createElement("p", { className: "quote-brand-bar-ref-label" }, custom ? "Custom sizing" : "Quotation"),
          React.createElement("p", { className: "quote-brand-bar-ref-id" }, previewRef)
        )
    ),
    React.createElement(
      "p",
      { className: "quote-brand-bar-note" },
      React.createElement(
        "span",
        { className: "quote-gold-icon" },
        React.createElement(ShldIco, { s: 12, c: "currentColor" })
      ),
      " Screen preview only — download PDF for the official ",
      QUOTE_VALIDITY_DAYS,
      "-day quote. Not valid if shared as a screenshot."
    )
  );
}

export function QuoteHeroCard({ custom, title, subtitle, peakW, dailyWh, priceLabel, priceSub }) {
  return React.createElement(
    "div",
    { className: "quote-hero-card" + (custom ? " quote-hero-card--custom" : "") },
    React.createElement(
      "div",
      { className: "quote-hero-card-head" },
      React.createElement(
        "div",
        { className: "quote-hero-card-left" },
        React.createElement("p", { className: "quote-hero-eyebrow" }, custom ? "Tailored system" : "Recommended package"),
        React.createElement("h2", { className: "quote-hero-title" }, title),
        subtitle && React.createElement("p", { className: "quote-hero-sub" }, subtitle)
      ),
      React.createElement(
        "div",
        { className: "quote-hero-card-price" },
        React.createElement("p", { className: "quote-hero-price" }, priceLabel),
        priceSub && React.createElement("p", { className: "quote-hero-price-sub" }, priceSub)
      )
    ),
    React.createElement(
      "div",
      { className: "quote-hero-stats" },
      React.createElement(
        "div",
        { className: "quote-hero-stat" },
        React.createElement("p", { className: "quote-hero-stat-val" }, (peakW || 0).toLocaleString() + "W"),
        React.createElement("p", { className: "quote-hero-stat-lbl" }, "Peak load")
      ),
      React.createElement(
        "div",
        { className: "quote-hero-stat" },
        React.createElement("p", { className: "quote-hero-stat-val" }, (dailyWh || 0).toLocaleString()),
        React.createElement("p", { className: "quote-hero-stat-lbl" }, "Wh / day")
      )
    )
  );
}

export function QuoteSpecTable({ specs, custom }) {
  if (!specs?.length) return null;
  return React.createElement(
    "div",
    { className: "quote-spec-table" },
    React.createElement("p", { className: "quote-spec-table-title" }, "System breakdown"),
    specs.map((r, i) =>
      React.createElement(
        "div",
        {
          key: r.label,
          className: "quote-spec-row" + (i < specs.length - 1 ? " quote-spec-row--border" : ""),
        },
        React.createElement(
          "div",
          { className: "quote-spec-icon" },
          React.createElement("span", { className: "quote-gold-icon" }, React.createElement(r.Ico, { s: 15, c: "currentColor" }))
        ),
        React.createElement(
          "div",
          { className: "quote-spec-main" },
          React.createElement("p", { className: "quote-spec-label" }, r.label),
          React.createElement("p", { className: "quote-spec-val" }, r.val)
        ),
        r.tot != null && !custom &&
          React.createElement("p", { className: "quote-spec-price" }, "$" + r.tot.toLocaleString())
      )
    )
  );
}

export function useQuotePreviewRef() {
  return useMemo(() => makeQuotePreviewRef(), []);
}
