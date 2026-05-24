import React from "react";
import { G, W4, W6, W8, W10, G_DIM, GRAD_GOLD, CARD, ci } from "./tokens.js";
import { VanIco, LocIco } from "./icons.js";
import {
  DELIVERY_INSTALL_HARARE_USD,
  OUTSIDE_DEALER_ADVISORY,
  getDeliveryQuote,
} from "./delivery.js";

export function DeliveryInstallOption({ opts, onChange, productTotal, variant = "card" }) {
  const quote = getDeliveryQuote(opts);
  const grand = (productTotal || 0) + quote.fee;
  const compact = variant === "modal";

  function setEnabled(enabled) {
    onChange({ ...opts, enabled });
  }

  function setZone(zone) {
    onChange({ ...opts, zone, enabled: true });
  }

  return React.createElement(
    "div",
    {
      style: {
        ...CARD,
        padding: compact ? "14px 16px" : "18px 20px",
        marginBottom: compact ? 14 : 12,
        border: opts.enabled ? "1px solid rgba(232,197,71,.45)" : "1px solid rgba(255,255,255,.1)",
        background: opts.enabled
          ? "linear-gradient(165deg, rgba(232,197,71,.1) 0%, rgba(8,12,10,.95) 55%)"
          : "linear-gradient(165deg, rgba(255,255,255,.04) 0%, rgba(8,12,10,.92) 100%)",
        boxShadow: opts.enabled ? "0 8px 32px rgba(232,197,71,.12)" : "none",
      },
    },
    React.createElement(
      "div",
      { style: { display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 } },
      React.createElement(
        "div",
        {
          style: {
            width: compact ? 40 : 44,
            height: compact ? 40 : 44,
            borderRadius: 12,
            background: opts.enabled ? G_DIM : "rgba(255,255,255,.06)",
            border: "1px solid " + (opts.enabled ? "rgba(232,197,71,.35)" : "rgba(255,255,255,.08)"),
            ...ci,
            flexShrink: 0,
          },
        },
        React.createElement(VanIco, { s: compact ? 20 : 22, c: opts.enabled ? G : W6 })
      ),
      React.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.createElement(
          "p",
          {
            style: {
              color: W10,
              fontSize: compact ? 13 : 15,
              fontWeight: 700,
              margin: "0 0 4px",
              letterSpacing: "-0.01em",
            },
          },
          "Delivery & installation"
        ),
        React.createElement(
          "p",
          { style: { color: W4, fontSize: compact ? 11 : 12, margin: 0, lineHeight: 1.45 } },
          compact
            ? "Choose whether to include this on your printed quotation."
            : "Optional add-on — include on your final quotation if you want us to deliver and install."
        )
      )
    ),

    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginBottom: opts.enabled ? 14 : 0,
        },
      },
      React.createElement(ChoicePill, {
        active: !opts.enabled,
        onClick: () => setEnabled(false),
        title: "Products only",
        sub: "Supply quote",
        price: "$" + (productTotal || 0).toLocaleString(),
      }),
      React.createElement(ChoicePill, {
        active: !!opts.enabled,
        onClick: () => setEnabled(true),
        title: "Include delivery",
        sub: "On your quotation",
        price: "from $" + DELIVERY_INSTALL_HARARE_USD,
        accent: true,
      })
    ),

    opts.enabled &&
      React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "p",
          {
            style: {
              color: W4,
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              margin: "0 0 8px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            },
          },
          React.createElement(LocIco, { s: 12, c: G }),
          "Delivery area"
        ),
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 } },
          React.createElement(ZoneCard, {
            active: opts.zone !== "outside",
            onClick: () => setZone("harare"),
            title: "Harare",
            price: "$" + DELIVERY_INSTALL_HARARE_USD,
            detail: "Delivery & professional install",
            badge: "Standard",
          }),
          React.createElement(ZoneCard, {
            active: opts.zone === "outside",
            onClick: () => setZone("outside"),
            title: "Outside Harare",
            price: quote.locationLabel ? quote.locationLabel : "Dealer quote",
            detail: OUTSIDE_DEALER_ADVISORY,
            badge: "By location",
            subdetail:
              quote.locationLabel
                ? "Location noted: " + quote.locationLabel + " — final fee on your quotation after dealer review."
                : "Enter your city/area in your details — the dealer will confirm travel & install cost.",
          })
        ),
        quote.feePending
          ? React.createElement(PendingTotalStrip, {
              productTotal: productTotal || 0,
              locationLabel: quote.locationLabel,
            })
          : React.createElement(TotalStrip, {
              productTotal: productTotal || 0,
              deliveryFee: quote.fee,
              grand,
              deliveryLabel: quote.label,
            })
      ),

    !opts.enabled &&
      !compact &&
      React.createElement(
        "p",
        {
          style: {
            margin: 0,
            padding: "10px 12px",
            borderRadius: 10,
            background: "rgba(255,255,255,.03)",
            border: "1px dashed rgba(255,255,255,.12)",
            color: W4,
            fontSize: 11,
            lineHeight: 1.45,
            textAlign: "center",
          },
        },
        "You can add delivery when you download your PDF quote."
      )
  );
}

function ChoicePill({ active, onClick, title, sub, price, accent }) {
  return React.createElement(
    "button",
    {
      type: "button",
      onClick,
      style: {
        border: "1px solid " + (active ? (accent ? "rgba(232,197,71,.55)" : "rgba(255,255,255,.25)") : "rgba(255,255,255,.1)"),
        borderRadius: 12,
        padding: "12px 10px",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "inherit",
        background: active
          ? accent
            ? "linear-gradient(145deg, rgba(232,197,71,.18), rgba(232,197,71,.06))"
            : "rgba(255,255,255,.08)"
          : "rgba(0,0,0,.25)",
        boxShadow: active && accent ? "0 4px 16px rgba(232,197,71,.15)" : "none",
        transition: "border-color .15s, background .15s",
      },
    },
    React.createElement(
      "p",
      { style: { color: active ? W10 : W6, fontSize: 12, fontWeight: 700, margin: "0 0 2px" } },
      title
    ),
    React.createElement("p", { style: { color: W4, fontSize: 10, margin: "0 0 6px" } }, sub),
    React.createElement(
      "p",
      {
        style: {
          color: active && accent ? G : W8,
          fontSize: 13,
          fontWeight: 700,
          margin: 0,
        },
      },
      price
    )
  );
}

function PendingTotalStrip({ productTotal, locationLabel }) {
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
      React.createElement(LineItem, { label: "Products (on quotation)", value: "$" + productTotal.toLocaleString() }),
      React.createElement(LineItem, {
        label: "Delivery & install (outside Harare)",
        value: "Dealer to advise",
        accent: true,
      }),
      locationLabel &&
        React.createElement(
          "p",
          { style: { color: W6, fontSize: 11, margin: "8px 0 0", lineHeight: 1.45 } },
          React.createElement("strong", { style: { color: W8 } }, "Area: "),
          locationLabel
        ),
      React.createElement(
        "p",
        { style: { color: W4, fontSize: 11, margin: "10px 0 0", lineHeight: 1.5 } },
        OUTSIDE_DEALER_ADVISORY
      )
    ),
    React.createElement(
      "div",
      {
        style: {
          padding: "10px 14px",
          borderTop: "1px solid rgba(255,255,255,.08)",
          background: "rgba(0,0,0,.2)",
        },
      },
      React.createElement(
        "p",
        { style: { color: W4, fontSize: 10, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.08em" } },
        "Quotation total (products)"
      ),
      React.createElement(
        "p",
        { style: { color: G, fontSize: 20, fontWeight: 800, margin: 0 } },
        "$" + productTotal.toLocaleString()
      ),
      React.createElement(
        "p",
        { style: { color: W4, fontSize: 10, margin: "6px 0 0" } },
        "+ delivery & install (confirmed by dealer)"
      )
    )
  );
}

function ZoneCard({ active, onClick, title, price, detail, badge, subdetail }) {
  return React.createElement(
    "button",
    {
      type: "button",
      onClick,
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        width: "100%",
        padding: "12px 14px",
        borderRadius: 12,
        border: "1px solid " + (active ? "rgba(232,197,71,.5)" : "rgba(255,255,255,.1)"),
        background: active
          ? "linear-gradient(135deg, rgba(232,197,71,.12), rgba(232,197,71,.04))"
          : "rgba(0,0,0,.2)",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "inherit",
        position: "relative",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: "2px solid " + (active ? G : "rgba(255,255,255,.25)"),
          flexShrink: 0,
          marginTop: 2,
          ...ci,
        },
      },
      active &&
        React.createElement("div", {
          style: { width: 8, height: 8, borderRadius: "50%", background: G },
        })
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
              background: active ? GRAD_GOLD : "rgba(255,255,255,.08)",
              padding: "2px 8px",
              borderRadius: 20,
            },
          },
          badge
        )
      ),
      React.createElement("p", { style: { color: G, fontSize: 15, fontWeight: 700, margin: "0 0 4px" } }, price),
      React.createElement("p", { style: { color: W4, fontSize: 11, margin: 0, lineHeight: 1.4 } }, detail),
      subdetail &&
        React.createElement(
          "p",
          {
            style: {
              color: active ? W6 : W4,
              fontSize: 10,
              margin: "8px 0 0",
              lineHeight: 1.45,
              paddingTop: 8,
              borderTop: "1px solid rgba(255,255,255,.08)",
            },
          },
          subdetail
        )
    )
  );
}

function TotalStrip({ productTotal, deliveryFee, grand, deliveryLabel }) {
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
      React.createElement(LineItem, { label: "Products", value: "$" + productTotal.toLocaleString() }),
      React.createElement(LineItem, {
        label: deliveryLabel || "Delivery & install",
        value: "+$" + deliveryFee.toLocaleString(),
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

function LineItem({ label, value, accent }) {
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
        color: accent ? W8 : W6,
        marginBottom: 4,
      },
    },
    React.createElement("span", null, label),
    React.createElement("span", { style: accent ? { color: G, fontWeight: 600 } : {} }, value)
  );
}
