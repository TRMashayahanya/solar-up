import React from "react";
import { G, W4, W6, W8, W10, G_DIM, GRAD_GOLD, CARD, BORDER, BORDER_FOCUS, SURFACE_STRONG, ci } from "./tokens.js";
import { VanIco, LocIco } from "./icons.js";
import {
  HARARE_INSTALL_INCLUDED_NOTE,
  OUTSIDE_DEALER_ADVISORY,
  OUTSIDE_DELIVERY_PER_KM_USD,
  getDeliveryQuote,
} from "./delivery.js";

export function DeliveryInstallOption({ opts, onChange, productTotal, variant = "card" }) {
  const quote = getDeliveryQuote({ ...opts, enabled: true });
  const grand = (productTotal || 0) + (quote.feePending ? 0 : quote.fee);
  const compact = variant === "modal";
  const quotePage = variant === "quote" || variant === "modal";

  function setZone(zone) {
    onChange({ ...opts, enabled: true, zone });
  }

  function setKm(val) {
    const km = Math.max(0, Math.round(Number(val) || 0));
    onChange({ ...opts, enabled: true, zone: "outside", distanceKm: km });
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
      "div",
      { style: { display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 } },
      React.createElement(
        "div",
        {
          style: {
            width: compact ? 40 : 44,
            height: compact ? 40 : 44,
            borderRadius: 12,
            background: G_DIM,
            border: "1px solid rgba(232,197,71,.35)",
            ...ci,
            flexShrink: 0,
          },
        },
        quotePage
          ? React.createElement(
              "span",
              { className: "quote-gold-icon" },
              React.createElement(VanIco, { s: compact ? 20 : 22, c: "currentColor" })
            )
          : React.createElement(VanIco, { s: compact ? 20 : 22, c: G })
      ),
      React.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.createElement(
          "p",
          { style: { color: W10, fontSize: compact ? 13 : 15, fontWeight: 700, margin: "0 0 4px" } },
          "Delivery area"
        ),
        React.createElement(
          "p",
          { style: { color: W4, fontSize: compact ? 11 : 12, margin: 0, lineHeight: 1.45 } },
          "Harare install included on packages."
        )
      )
    ),

    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 } },
      React.createElement(ZoneCard, {
        quotePage,
        active: opts.zone !== "outside",
        onClick: () => setZone("harare"),
        title: "Harare",
        price: "Install included",
        detail: HARARE_INSTALL_INCLUDED_NOTE,
        badge: "In package",
      }),
      React.createElement(ZoneCard, {
        quotePage,
        active: opts.zone === "outside",
        onClick: () => setZone("outside"),
        title: "Outside Harare",
        price: "$" + OUTSIDE_DELIVERY_PER_KM_USD + "/km",
        detail: OUTSIDE_DEALER_ADVISORY,
        badge: "Per km",
      })
    ),

    opts.zone === "outside" &&
      React.createElement(
        "div",
        { style: { marginBottom: 12 } },
        React.createElement(
          "label",
          {
            style: {
              display: "block",
              color: W4,
              fontSize: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 6,
            },
          },
          "Distance from Harare (km)"
        ),
        React.createElement("input", {
          type: "number",
          min: 0,
          step: 1,
          className: quotePage ? "quote-zone-input" : undefined,
          value: opts.distanceKm > 0 ? opts.distanceKm : quote.km || "",
          onChange: (e) => setKm(e.target.value),
          placeholder: quote.km ? "Suggested: " + quote.km : "e.g. 280",
          style: quotePage
            ? undefined
            : {
                width: "100%",
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,.15)",
                background: "rgba(0,0,0,.3)",
                color: W10,
                fontSize: 16,
                fontFamily: "inherit",
              },
        })
      ),

    quote.feePending
      ? React.createElement(PendingTotalStrip, {
          productTotal: productTotal || 0,
          locationLabel: quote.locationLabel,
          perKm: OUTSIDE_DELIVERY_PER_KM_USD,
        })
      : React.createElement(TotalStrip, {
          productTotal: productTotal || 0,
          deliveryFee: quote.fee,
          grand,
          deliveryLabel: quote.label,
          installIncluded: quote.zone === "harare",
        })
  );
}

function ZoneCard({ active, onClick, title, price, detail, badge, subdetail, quotePage }) {
  const gold = quotePage ? "var(--quote-gold)" : G;
  return React.createElement(
    "button",
    {
      type: "button",
      onClick,
      className: quotePage ? "quote-zone-btn" + (active ? " quote-zone-btn--active" : "") : undefined,
      style: quotePage
        ? { display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", textAlign: "left" }
        : {
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            width: "100%",
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid " + (active ? BORDER_FOCUS : BORDER),
            background: active
              ? "linear-gradient(135deg, rgba(232,197,71,.12), rgba(232,197,71,.04))"
              : "rgba(0,0,0,.2)",
            cursor: "pointer",
            textAlign: "left",
            fontFamily: "inherit",
          },
    },
    React.createElement(
      "div",
      {
        className: quotePage ? "quote-zone-radio" : undefined,
        style: {
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: "2px solid " + (active ? gold : quotePage ? "var(--border)" : "rgba(255,255,255,.25)"),
          flexShrink: 0,
          marginTop: 2,
          ...ci,
        },
      },
      active && React.createElement("div", { style: { width: 8, height: 8, borderRadius: "50%", background: gold } })
    ),
    React.createElement(
      "div",
      { style: { flex: 1, minWidth: 0 } },
      React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" } },
        React.createElement("span", { style: { color: W10, fontSize: 13, fontWeight: 700 } }, title),
        React.createElement(
          "span",
          {
            style: {
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: active ? "#0a0800" : W4,
              background: active ? GRAD_GOLD : SURFACE_STRONG,
              padding: "2px 8px",
              borderRadius: 20,
            },
          },
          badge
        )
      ),
      React.createElement("p", { style: { color: gold, fontSize: 15, fontWeight: 700, margin: "0 0 4px" } }, price),
      React.createElement("p", { style: { color: W4, fontSize: 11, margin: 0, lineHeight: 1.4 } }, detail),
      subdetail &&
        React.createElement(
          "p",
          {
            style: {
              color: W6,
              fontSize: 10,
              margin: "8px 0 0",
              lineHeight: 1.45,
              paddingTop: 8,
              borderTop: "1px solid var(--border)",
            },
          },
          subdetail
        )
    )
  );
}

function PendingTotalStrip({ productTotal, locationLabel, perKm }) {
  return React.createElement(
    "div",
    {
      style: {
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(91,156,245,.35)",
        background: "rgba(91,156,245,.08)",
      },
    },
    React.createElement(
      "div",
      { style: { padding: "12px 14px" } },
      React.createElement(LineItem, { label: "Package (Harare install incl.)", value: "$" + productTotal.toLocaleString() }),
      React.createElement(LineItem, {
        label: "Delivery outside Harare",
        value: "Enter km × $" + perKm,
        accent: true,
      }),
      locationLabel &&
        React.createElement(
          "p",
          { style: { color: W6, fontSize: 11, margin: "8px 0 0" } },
          React.createElement("strong", { style: { color: W8 } }, "Area: "),
          locationLabel
        )
    ),
    React.createElement(
      "div",
      { style: { padding: "10px 14px", borderTop: "1px solid var(--border)", background: "var(--surface-inset)" } },
      React.createElement("p", { style: { color: G, fontSize: 18, fontWeight: 800, margin: 0 } }, "$" + productTotal.toLocaleString()),
      React.createElement("p", { style: { color: W4, fontSize: 10, margin: "6px 0 0" } }, "+ delivery km (add distance above)")
    )
  );
}

function TotalStrip({ productTotal, deliveryFee, grand, deliveryLabel, installIncluded }) {
  return React.createElement(
    "div",
    {
      style: {
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(232,197,71,.25)",
      },
    },
    React.createElement(
      "div",
      { style: { padding: "10px 14px", background: "rgba(0,0,0,.25)" } },
      React.createElement(LineItem, {
        label: "Package",
        value: "$" + productTotal.toLocaleString(),
        sub: installIncluded ? "incl. Harare install" : "",
      }),
      deliveryFee > 0
        ? React.createElement(LineItem, {
            label: deliveryLabel || "Delivery",
            value: "+$" + deliveryFee.toLocaleString(),
            accent: true,
          })
        : React.createElement(LineItem, {
            label: "Harare installation",
            value: "Included",
            accent: true,
          })
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 14px",
          background: "linear-gradient(90deg, rgba(232,197,71,.2), rgba(61,214,140,.12))",
        },
      },
      React.createElement("span", { style: { color: W8, fontSize: 12, fontWeight: 600 } }, "Quotation total"),
      React.createElement(
        "span",
        {
          style: {
            fontSize: 20,
            fontWeight: 800,
            background: GRAD_GOLD,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          },
        },
        "$" + grand.toLocaleString()
      )
    )
  );
}

function LineItem({ label, value, accent, sub }) {
  return React.createElement(
    "div",
    { style: { marginBottom: 6 } },
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: accent ? W8 : W6,
        },
      },
      React.createElement("span", null, label),
      React.createElement("span", { style: accent ? { color: G, fontWeight: 600 } : {} }, value)
    ),
    sub && React.createElement("p", { style: { color: W4, fontSize: 10, margin: "2px 0 0" } }, sub)
  );
}
