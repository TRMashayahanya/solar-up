import React, { useState, useCallback, useEffect } from "react";
import { CARD } from "./tokens.js";
import { LocationPinField } from "./LocationPinField.js";
import { MapPinIco } from "./icons.js";
import {
  OUTSIDE_DELIVERY_FREE_KM,
  getDeliveryQuote,
  quoteGrandTotal,
  deliveryPricingLabel,
  isWithinFreeDeliveryRadius,
  installationQualificationMessage,
  installationRadiusBadge,
  installationQualifiedBadge,
  installationCheckoutNote,
  applyAddressToDeliveryOpts,
} from "./delivery.js";
import { installationQualifiedLabel } from "./strings.js";

function setQuoteLocationFocus(on) {
  const root = document.documentElement;
  if (on) root.dataset.quoteLocationFocus = "1";
  else delete root.dataset.quoteLocationFocus;
}

function locationPrimary(label) {
  return String(label || "").split(",")[0].trim() || "Installation area";
}

function InstallStatusChip({ quote, alwaysShow = false }) {
  const hasLocation = !!(quote.locationLabel || quote.km);
  if (!hasLocation && !alwaysShow) return null;

  const within = quote.km > 0 ? isWithinFreeDeliveryRadius(quote.km) : quote.zone !== "outside";
  const label = !hasLocation ? null : installationQualificationMessage(quote);
  const tone = !hasLocation ? "pending" : within ? "included" : "delivery";
  const qualified = hasLocation && within;

  return React.createElement(
    "div",
    {
      className:
        "quote-install-status quote-install-status--" +
        tone +
        (qualified ? " quote-install-status--qualified" : ""),
      role: "status",
    },
    React.createElement("span", { className: "quote-install-status-dot", "aria-hidden": true }),
    qualified &&
      React.createElement("span", { className: "quote-install-status-check", "aria-hidden": true }, "✓"),
    React.createElement("span", { className: "quote-install-status-text" }, label)
  );
}

function InstallLocationConfirmed({ label, quote, onChange }) {
  const primary = locationPrimary(label);
  const secondary = String(label || "").includes(",")
    ? String(label).split(",").slice(1).join(",").trim()
    : null;
  const within = quote?.km > 0 ? isWithinFreeDeliveryRadius(quote.km) : quote?.zone !== "outside";
  const qualifyLine = within
    ? installationQualifiedLabel(quote?.km || 0)
    : quote?.fee > 0
      ? "Delivery +" + quote.fee.toLocaleString() + " for installation"
      : null;

  return React.createElement(
    "div",
    { className: "quote-install-confirmed" + (within ? " quote-install-confirmed--qualified" : "") },
    React.createElement(
      "span",
      { className: "quote-install-confirmed-pin", "aria-hidden": true },
      React.createElement(MapPinIco, { s: 16, c: "currentColor" })
    ),
    React.createElement(
      "div",
      { className: "quote-install-confirmed-copy" },
      React.createElement("span", { className: "quote-install-confirmed-eyebrow" }, "Installation location"),
      React.createElement("span", { className: "quote-install-confirmed-name" }, primary),
      qualifyLine &&
        React.createElement("span", { className: "quote-install-confirmed-qualify" }, qualifyLine),
      secondary && React.createElement("span", { className: "quote-install-confirmed-sub" }, secondary)
    ),
    React.createElement(
      "button",
      { type: "button", className: "quote-install-confirmed-change", onClick: onChange },
      "Change"
    )
  );
}

/** Quote page — location sets install eligibility by distance from Harare. */
function QuoteDeliverySimple({ opts, onChange, onLocationResolved }) {
  const quote = getDeliveryQuote({ ...opts, enabled: true });
  const [searchOpen, setSearchOpen] = useState(false);
  const [editing, setEditing] = useState(true);
  const [draft, setDraft] = useState("");

  useEffect(() => () => setQuoteLocationFocus(false), []);

  const confirmedLabel = (opts.locationLabel || "").trim();
  const hasLocation = confirmedLabel.length >= 3;

  useEffect(() => {
    if (hasLocation && !searchOpen) setEditing(false);
    if (!hasLocation) setEditing(true);
  }, [hasLocation, searchOpen]);

  const onLocationFocus = useCallback((focused) => {
    setQuoteLocationFocus(focused);
    if (focused) setEditing(true);
    if (!focused) setSearchOpen(false);
  }, []);

  function resolveLocation(address, meta) {
    const label = String(address || "").trim();
    if (!label) return;
    onChange({ ...opts, enabled: true, locationLabel: label });
    if (onLocationResolved) onLocationResolved(label, meta);
    setDraft(label);
    setEditing(false);
  }

  function startEditing() {
    setDraft(confirmedLabel);
    setEditing(true);
    requestAnimationFrame(() => {
      const el = document.getElementById("quote-delivery-location");
      el?.focus();
    });
  }

  const showField = editing || !hasLocation;
  const withinRadius =
    hasLocation &&
    (quote.km > 0 ? isWithinFreeDeliveryRadius(quote.km) : quote.zone !== "outside" && quote.fee <= 0);

  const showStatusChip = hasLocation && showField;

  return React.createElement(
    "section",
    {
      className:
        "quote-install-section quote-install-section--premium" +
        (hasLocation && !showField ? " quote-install-section--confirmed" : ""),
    },
    React.createElement(
      "header",
      { className: "quote-install-head quote-install-head--compact" },
      React.createElement(
        "span",
        { className: "quote-install-head-icon", "aria-hidden": true },
        React.createElement(MapPinIco, { s: 15, c: "currentColor" })
      ),
      React.createElement(
        "div",
        { className: "quote-install-head-copy" },
        React.createElement("h3", { className: "quote-install-title" }, "System installation"),
        !hasLocation &&
          React.createElement(
            "p",
            { className: "quote-install-sub" },
            "Confirm where we complete your installation"
          )
      ),
      (withinRadius || hasLocation) &&
        React.createElement(
          "span",
          {
            className:
              "quote-install-radius-badge" +
              (withinRadius ? " quote-install-radius-badge--qualified" : ""),
          },
          withinRadius ? installationQualifiedBadge() : installationRadiusBadge()
        )
    ),
    React.createElement(
      "div",
      { className: "quote-loc-field" },
      !showField &&
        React.createElement(InstallLocationConfirmed, {
          label: quote.locationLabel,
          quote,
          onChange: startEditing,
        }),
      showField &&
        React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "label",
            { className: "quote-loc-field-label", htmlFor: "quote-delivery-location" },
            "Installation location"
          ),
          React.createElement(
            "div",
            { className: "quote-loc-input-slot" },
            React.createElement(LocationPinField, {
            id: "quote-delivery-location",
            value: draft,
            onChange: (e) => setDraft(e.target.value),
            onLocated: resolveLocation,
            onFocusChange: onLocationFocus,
            onSuggestOpenChange: setSearchOpen,
            smart: true,
            showMap: false,
            fixedSuggestions: true,
            minimalSuggestions: true,
            placeholder: "Type suburb or town…",
            inputClassName: "quote-zone-input quote-zone-input--with-pin quote-zone-input--loc quote-zone-input--search",
            wrapClassName: "location-pin-wrap",
            ariaLabel: "Search installation location in Zimbabwe",
          })
          ),
          React.createElement(
            "p",
            { className: "quote-loc-field-hint" },
            "Type your suburb — we'll check ",
            React.createElement("span", { className: "quote-loc-field-hint-em" }, OUTSIDE_DELIVERY_FREE_KM + " km"),
            " free installation"
          )
        )
    ),
    !hasLocation &&
      showField &&
      React.createElement(
        "p",
        { className: "quote-install-benefit" },
        "You may qualify for ",
        React.createElement("em", null, "free installation"),
        " within ",
        OUTSIDE_DELIVERY_FREE_KM,
        " km of Harare."
      ),
    showStatusChip && React.createElement(InstallStatusChip, { quote })
  );
}

export function DeliveryInstallOption({ opts, onChange, productTotal, variant = "card", onLocationResolved }) {
  const quote = getDeliveryQuote({ ...opts, enabled: true });
  const grand = quoteGrandTotal(productTotal || 0, quote);
  const compact = variant === "modal";
  const quotePage = variant === "quote" || variant === "modal";
  const quoteCompact = variant === "quote";
  const productsPage = variant === "products";

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
        React.createElement("p", { className: "quote-delivery-compact-title" }, "Installation area"),
        React.createElement(
          "span",
          { className: "quote-delivery-zone-badge quote-delivery-zone-badge--harare" },
          OUTSIDE_DELIVERY_FREE_KM + " km free installation radius"
        )
      ),
      React.createElement(LocationPinField, {
        id: "products-delivery-location",
        value: opts.locationLabel || "",
        onChange: (e) => setLocationLabel(e.target.value),
        onLocated: resolveLocation,
        smart: true,
        showMap: false,
        placeholder: "e.g. Borrowdale, Ruwa, Norton",
        inputClassName: "quote-zone-input quote-zone-input--with-pin",
        wrapClassName: "location-pin-wrap",
      }),
      React.createElement(InstallStatusChip, { quote }),
      React.createElement(QuoteTotalBar, {
        productTotal: productTotal || 0,
        grand,
        quote,
        deliveryOn: true,
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
      "Installation area"
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
    React.createElement(InstallStatusChip, { quote }),
    React.createElement(QuoteTotalBar, {
      productTotal: productTotal || 0,
      grand,
      quote,
      deliveryOn: true,
    })
  );
}

function QuoteTotalBar({ productTotal, grand, quote, deliveryOn, variant }) {
  let deliveryNote = "Installation included in price";

  if (variant === "quote" || deliveryOn) {
    if (quote.fee > 0) {
      deliveryNote = "+" + quote.fee.toLocaleString() + " delivery · " + deliveryPricingLabel(quote.km);
    } else if (quote.km > 0) {
      deliveryNote = deliveryPricingLabel(quote.km);
    } else {
      deliveryNote = installationCheckoutNote(quote);
    }
  }

  const displayAmount = deliveryOn ? grand : productTotal;

  return React.createElement(
    "div",
    { className: "quote-total-bar" },
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
