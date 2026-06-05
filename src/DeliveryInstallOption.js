import React from "react";
import { G, W4, W6, W8, W10, G_DIM, GRAD_GOLD, CARD, BORDER, BORDER_FOCUS, SURFACE_STRONG, ci } from "./tokens.js";
import { LocationPinField } from "./LocationPinField.js";
import { OUTSIDE_DELIVERY_PER_KM_USD, getDeliveryQuote } from "./delivery.js";

export function DeliveryInstallOption({ opts, onChange, productTotal, variant = "card", onLocationResolved }) {
  const quote = getDeliveryQuote({ ...opts, enabled: true });
  const grand = (productTotal || 0) + (quote.feePending ? 0 : quote.fee);
  const compact = variant === "modal";
  const quotePage = variant === "quote" || variant === "modal";
  const quoteCompact = variant === "quote";
  const isHarare = opts.zone !== "outside";

  function setLocationLabel(text) {
    onChange({ ...opts, enabled: true, locationLabel: text });
  }

  function resolveLocation(address, meta) {
    if (onLocationResolved) onLocationResolved(address, meta);
  }

  if (quoteCompact) {
    return React.createElement(
      "section",
      { className: "quote-delivery-card quote-delivery-card--compact" },
      React.createElement(
        "div",
        { className: "quote-delivery-head" },
        React.createElement("p", { className: "quote-delivery-compact-title" }, "Where we deliver"),
        React.createElement(
          "span",
          { className: "quote-delivery-zone-badge" + (isHarare ? " quote-delivery-zone-badge--harare" : "") },
          isHarare ? "Harare · install included" : "Outside Harare · $" + OUTSIDE_DELIVERY_PER_KM_USD + "/km"
        )
      ),
      React.createElement(
        "p",
        { className: "quote-delivery-help" },
        "Search your address, tap a suggestion, use GPS, or tap the map to set the pin."
      ),
      React.createElement(LocationPinField, {
        id: "quote-delivery-location",
        value: opts.locationLabel || "",
        onChange: (e) => setLocationLabel(e.target.value),
        onLocated: resolveLocation,
        smart: true,
        showMap: true,
        placeholder: "e.g. Borrowdale, Samora Machel Ave, Bulawayo",
        inputClassName: "quote-zone-input quote-zone-input--with-pin",
        wrapClassName: "location-pin-wrap",
      }),
      React.createElement(QuoteTotalBar, {
        productTotal: productTotal || 0,
        grand,
        quote,
        feePending: quote.feePending,
      })
    );
  }

  return React.createElement(
    "div",
    {
      className: quotePage ? "quote-delivery-card" : undefined,
      style: quotePage
        ? undefined
        : {
            ...CARD,
            padding: compact ? "14px 16px" : "18px 20px",
            marginBottom: compact ? 14 : 12,
            border: "1px solid rgba(232,197,71,.35)",
            background: "linear-gradient(165deg, rgba(232,197,71,.08) 0%, rgba(8,12,10,.95) 55%)",
          },
    },
    React.createElement(
      "p",
      { style: { color: W10, fontSize: compact ? 13 : 15, fontWeight: 700, margin: "0 0 8px" } },
      "Delivery area"
    ),
    React.createElement(LocationPinField, {
      value: opts.locationLabel || "",
      onChange: (e) => setLocationLabel(e.target.value),
      onLocated: resolveLocation,
      smart: true,
      showMap: quotePage,
      inputClassName: quotePage ? "quote-zone-input quote-zone-input--with-pin" : "location-pin-input",
      wrapClassName: "location-pin-wrap",
    }),
    React.createElement(QuoteTotalBar, {
      productTotal: productTotal || 0,
      grand,
      quote,
      feePending: quote.feePending,
    })
  );
}

function QuoteTotalBar({ productTotal, grand, quote, feePending }) {
  const deliveryNote = feePending
    ? "Add your address above for delivery cost"
    : quote.zone === "outside" && quote.fee > 0
      ? "+" + quote.fee.toLocaleString() + " delivery (" + quote.km + " km)"
      : "Harare install included";

  return React.createElement(
    "div",
    { className: "quote-total-bar" + (feePending ? " quote-total-bar--pending" : "") },
    React.createElement(
      "div",
      { className: "quote-total-bar-meta" },
      React.createElement("span", { className: "quote-total-bar-label" }, "Total"),
      React.createElement("span", { className: "quote-total-bar-note" }, deliveryNote)
    ),
    React.createElement("span", { className: "quote-total-bar-amount" }, "$" + (feePending ? productTotal : grand).toLocaleString())
  );
}
