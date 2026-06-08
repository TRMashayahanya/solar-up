import React, { useEffect, useCallback } from "react";
import { CARD } from "./tokens.js";
import { LocationPinField } from "./LocationPinField.js";
import { ShldIco } from "./icons.js";
import { OUTSIDE_DELIVERY_PER_KM_USD, OUTSIDE_DELIVERY_FREE_KM, getDeliveryQuote, quoteGrandTotal, deliveryPricingLabel } from "./delivery.js";

const DELIVERY_MODES = [
  { id: "harare", label: "Harare", sub: "Install included" },
  { id: "outside", label: "Outside", sub: "After " + OUTSIDE_DELIVERY_FREE_KM + " km" },
  { id: "later", label: "Later", sub: "On quote" },
];

function deliveryModeFromOpts(opts) {
  if (!opts?.enabled) return "later";
  return opts.zone === "outside" ? "outside" : "harare";
}

function DeliveryModePicker({ opts, onChange, compact }) {
  const mode = deliveryModeFromOpts(opts);

  function pick(id) {
    if (id === "later") {
      onChange({ ...opts, enabled: false, zone: "harare", locationLabel: "", distanceKm: 0 });
      return;
    }
    onChange({
      ...opts,
      enabled: true,
      zone: id === "outside" ? "outside" : "harare",
      ...(id === "harare" ? { distanceKm: 0 } : {}),
    });
  }

  return React.createElement(
    "div",
    { className: "delivery-mode-picker" + (compact ? " delivery-mode-picker--compact" : "") },
    DELIVERY_MODES.map((m) =>
      React.createElement(
        "button",
        {
          key: m.id,
          type: "button",
          className: "delivery-mode-btn" + (mode === m.id ? " delivery-mode-btn--active" : ""),
          onClick: () => pick(m.id),
          "aria-pressed": mode === m.id,
        },
        React.createElement("span", { className: "delivery-mode-btn-label" }, m.label),
        React.createElement("span", { className: "delivery-mode-btn-sub" }, m.sub)
      )
    )
  );
}

function setQuoteLocationFocus(on) {
  const root = document.documentElement;
  if (on) root.dataset.quoteLocationFocus = "1";
  else delete root.dataset.quoteLocationFocus;
}

/** Minimal quote-page flow — Harare install as benefit, optional area, simple zone toggle. */
function QuoteDeliverySimple({ opts, onChange, productTotal, onLocationResolved }) {
  const quote = getDeliveryQuote({ ...opts, enabled: true });
  const withinFreeRadius = quote.km > 0 && quote.billableKm === 0;
  const isOutside = quote.zone === "outside";
  const grand = quoteGrandTotal(productTotal || 0, quote);

  useEffect(() => () => setQuoteLocationFocus(false), []);

  const onLocationFocus = useCallback((focused) => {
    setQuoteLocationFocus(focused);
  }, []);

  function setLocationLabel(text) {
    onChange({ ...opts, enabled: true, locationLabel: text });
  }

  function resolveLocation(address, meta) {
    if (onLocationResolved) onLocationResolved(address, meta);
  }

  function setZone(zone) {
    onChange({
      ...opts,
      enabled: true,
      zone,
      ...(zone === "harare" ? { distanceKm: 0 } : {}),
    });
  }

  return React.createElement(
    "section",
    { className: "quote-install-section" },
    React.createElement(
      "div",
      { className: "quote-install-benefit" },
      React.createElement(
        "span",
        { className: "quote-install-benefit-icon", "aria-hidden": true },
        React.createElement(ShldIco, { s: 16, c: "currentColor" })
      ),
      React.createElement(
        "div",
        { className: "quote-install-benefit-body" },
        React.createElement("p", { className: "quote-install-benefit-title" }, "Full Harare install included"),
        React.createElement(
          "p",
          { className: "quote-install-benefit-text" },
          "Supply, mounting, wiring, and handover — included in your package price within " +
            OUTSIDE_DELIVERY_FREE_KM +
            " km of Harare."
        )
      )
    ),
    React.createElement(
      "div",
      { className: "quote-install-zone-toggle", role: "group", "aria-label": "Install area" },
      React.createElement(
        "button",
        {
          type: "button",
          className: "quote-install-zone-btn" + (!isOutside ? " quote-install-zone-btn--active" : ""),
          onClick: () => setZone("harare"),
          "aria-pressed": !isOutside,
        },
        "Harare"
      ),
      React.createElement(
        "button",
        {
          type: "button",
          className: "quote-install-zone-btn" + (isOutside ? " quote-install-zone-btn--active" : ""),
          onClick: () => setZone("outside"),
          "aria-pressed": isOutside,
        },
        "Outside Harare"
      )
    ),
    (isOutside || withinFreeRadius) &&
      React.createElement(
        "p",
        { className: "quote-install-outside-hint" },
        withinFreeRadius && !isOutside
          ? "~" + quote.km + " km from Harare — within free " + OUTSIDE_DELIVERY_FREE_KM + " km radius."
          : "Beyond " +
            OUTSIDE_DELIVERY_FREE_KM +
            " km: $" +
            OUTSIDE_DELIVERY_PER_KM_USD +
            "/km delivery (first " +
            OUTSIDE_DELIVERY_FREE_KM +
            " km free)."
      ),
    React.createElement(
      "label",
      { className: "quote-install-area-label", htmlFor: "quote-delivery-location" },
      "Your area ",
      React.createElement(
        "span",
        { className: "quote-install-area-optional" },
        isOutside ? "(for delivery estimate)" : "(optional)"
      )
    ),
    React.createElement(LocationPinField, {
      id: "quote-delivery-location",
      value: opts.locationLabel || "",
      onChange: (e) => setLocationLabel(e.target.value),
      onLocated: resolveLocation,
      onFocusChange: onLocationFocus,
      smart: true,
      showMap: false,
      fixedSuggestions: true,
      placeholder: isOutside ? "e.g. Ruwa, Bulawayo, Mutare" : "e.g. Borrowdale (optional)",
      inputClassName: "quote-zone-input quote-zone-input--with-pin",
      wrapClassName: "location-pin-wrap",
    }),
    React.createElement(QuoteTotalBar, {
      productTotal: productTotal || 0,
      grand,
      quote,
      feePending: quote.feePending && isOutside,
      deliveryOn: true,
      isOutside,
      variant: "quote",
    })
  );
}

export function DeliveryInstallOption({ opts, onChange, productTotal, variant = "card", onLocationResolved }) {
  const quote = getDeliveryQuote(opts);
  const grand = quoteGrandTotal(productTotal || 0, quote);
  const compact = variant === "modal";
  const quotePage = variant === "quote" || variant === "modal";
  const quoteCompact = variant === "quote";
  const productsPage = variant === "products";
  const deliveryOn = !!opts?.enabled;
  const isHarare = opts.zone !== "outside";

  function setLocationLabel(text) {
    onChange({ ...opts, enabled: true, locationLabel: text });
  }

  function resolveLocation(address, meta) {
    if (onLocationResolved) onLocationResolved(address, meta);
  }

  if (quoteCompact) {
    return React.createElement(QuoteDeliverySimple, {
      opts,
      onChange,
      productTotal,
      onLocationResolved,
    });
  }

  if (productsPage) {
    return React.createElement(
      "section",
      { className: "quote-delivery-card quote-delivery-card--compact quote-delivery-card--products" },
      React.createElement(
        "div",
        { className: "quote-delivery-head" },
        React.createElement("p", { className: "quote-delivery-compact-title" }, "Delivery preference"),
        deliveryOn &&
          React.createElement(
            "span",
            {
              className:
                "quote-delivery-zone-badge" + (isHarare ? " quote-delivery-zone-badge--harare" : ""),
            },
            isHarare ? "Harare · install included" : "Beyond " + OUTSIDE_DELIVERY_FREE_KM + " km · $" + OUTSIDE_DELIVERY_PER_KM_USD + "/km"
          )
      ),
      React.createElement(DeliveryModePicker, { opts, onChange, compact: true }),
      deliveryOn
        ? React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "p",
              { className: "quote-delivery-help" },
              isHarare
                ? "Harare address optional — install is included in your package price."
                : "Search your address, tap a suggestion, use GPS, or tap the map to set the pin."
            ),
            React.createElement(LocationPinField, {
              id: "products-delivery-location",
              value: opts.locationLabel || "",
              onChange: (e) => setLocationLabel(e.target.value),
              onLocated: resolveLocation,
              smart: true,
              showMap: false,
              placeholder: isHarare
                ? "e.g. Borrowdale, Avondale (optional)"
                : "e.g. Ruwa, Bulawayo, Mutare",
              inputClassName: "quote-zone-input quote-zone-input--with-pin",
              wrapClassName: "location-pin-wrap",
            })
          )
        : React.createElement(
            "p",
            { className: "quote-delivery-help quote-delivery-help--muted" },
            "Package price only for now. Add Harare install or outside delivery on your quote."
          ),
      React.createElement(QuoteTotalBar, {
        productTotal: productTotal || 0,
        grand,
        quote,
        feePending: quote.feePending,
        deliveryOn,
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
      { style: { color: "var(--text-primary)", fontSize: compact ? 13 : 15, fontWeight: 700, margin: "0 0 8px" } },
      "Delivery area"
    ),
    React.createElement(DeliveryModePicker, { opts, onChange }),
    deliveryOn &&
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
      deliveryOn,
    })
  );
}

function QuoteTotalBar({ productTotal, grand, quote, feePending, deliveryOn, isOutside, variant }) {
  let deliveryNote = "Install included in price";
  if (variant === "quote") {
    if (feePending) {
      deliveryNote = "Enter area above for delivery estimate";
    } else if (quote.fee > 0) {
      deliveryNote = "+" + quote.fee.toLocaleString() + " delivery · " + deliveryPricingLabel(quote.km);
    } else if (quote.km > 0) {
      deliveryNote = deliveryPricingLabel(quote.km);
    } else if (isOutside) {
      deliveryNote = "Beyond " + OUTSIDE_DELIVERY_FREE_KM + " km — add your area";
    }
  } else if (!deliveryOn) {
    deliveryNote = "Delivery optional — confirm on quote";
  } else if (feePending) {
    deliveryNote = "Add your address above for delivery cost";
  } else if (quote.zone === "outside" && quote.fee > 0) {
    deliveryNote = "+" + quote.fee.toLocaleString() + " delivery · " + deliveryPricingLabel(quote.km);
  } else if (!isOutside && deliveryOn) {
    deliveryNote = "Harare install included";
  }

  const displayAmount =
    variant === "quote"
      ? feePending && isOutside
        ? productTotal
        : grand
      : !deliveryOn
        ? productTotal
        : feePending
          ? productTotal
          : grand;

  return React.createElement(
    "div",
    { className: "quote-total-bar" + (feePending && deliveryOn ? " quote-total-bar--pending" : "") },
    React.createElement(
      "div",
      { className: "quote-total-bar-meta" },
      React.createElement("span", { className: "quote-total-bar-label" }, "Your total"),
      React.createElement("span", { className: "quote-total-bar-note" }, deliveryNote)
    ),
    React.createElement(
      "span",
      { className: "quote-total-bar-amount" },
      "$" + (displayAmount || 0).toLocaleString()
    )
  );
}
