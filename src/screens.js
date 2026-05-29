import React from "react";
import { G, M, W4, W6, W8, W10, FONT_DISPLAY, CARD, G_DIM, M_DIM, ci } from "./tokens.js";
import {
  PROPS,
  productWhatsAppMessage,
} from "./data.js";
import { PACKAGES, PACKAGE_PRICE_NOTE } from "./packages.js";
import { getGroupedItemsForProperty } from "./items.js";
import { getBuildingCopy, getOtherAccessoriesCopy } from "./copy.js";
import { RESTRICTED_SHORT_NOTE } from "./restricted-appliances.js";
import {
  StepIndicator,
  PageTitle,
  PowerQuestMeter,
  EcoQuoteFootprint,
  ApplianceRow,
  BtnPrimary,
  BtnGhost,
  ItemGroupHeader,
  EmptyHint,
  ProductCard,
  HomeBrand,
} from "./ui.js";
import { ZapIco, PrtIco, RetIco, ArrRIco } from "./icons.js";
import { CustomAccessoriesPanel } from "./custom-accessories-panel.js";
import { DeliveryInstallOption } from "./DeliveryInstallOption.js";

export function HomeScreen({ onPickProp, onViewProducts }) {
  return React.createElement(
    "div",
    { className: "animate-rise home-screen" },
    React.createElement(HomeBrand, null),
    React.createElement(
      "div",
      { className: "home-body" },
      React.createElement(
        "section",
        { className: "home-section", "aria-label": "Property type" },
        React.createElement(
          "header",
          { className: "home-section-head" },
          React.createElement("p", { className: "home-section-label" }, "Where will this system go?"),
          React.createElement(
            "p",
            { className: "home-section-hint" },
            "Select your property — we'll tailor the appliance list and sizing."
          )
        ),
        React.createElement(
          "div",
          { className: "home-prop-grid" },
          PROPS.map((pr) =>
            React.createElement(
              "button",
              {
                key: pr.value,
                type: "button",
                className: "home-prop-tile",
                style: { "--prop-accent": pr.color },
                onClick: () => onPickProp(pr.value),
              },
              React.createElement(
                "div",
                { className: "home-prop-top" },
                React.createElement(
                  "div",
                  {
                    className: "home-prop-icon",
                    style: { background: pr.color + "18", border: "1px solid " + pr.color + "35" },
                  },
                  React.createElement(pr.Icon, { s: 18, c: pr.color })
                ),
                React.createElement(
                  "div",
                  { style: { minWidth: 0, flex: 1 } },
                  React.createElement("p", { className: "home-prop-label" }, pr.label),
                  React.createElement("p", { className: "home-prop-sub" }, pr.sub)
                ),
                React.createElement(
                  "span",
                  { className: "home-prop-arrow", "aria-hidden": true },
                  React.createElement(ArrRIco, { s: 14, c: "rgba(255,255,255,.45)" })
                )
              )
            )
          )
        ),
        onViewProducts &&
          React.createElement(
            "button",
            { type: "button", className: "home-packages-link", onClick: onViewProducts },
            "Browse fixed package tiers"
          )
      )
    ),
    React.createElement("p", { className: "home-footer-note" }, "0773757018 · Harare install included on packages")
  );
}

export function ProductsScreen({ onStartSizing }) {
  const items = PACKAGES.map((pkg) => ({
    brand: "Energi Tech",
    name: pkg.name,
    spec: pkg.kva + " kVA · " + pkg.panelCount + "×" + pkg.panelW + "W · Harare install incl.",
    price: pkg.price,
    tag: "5–7 yr warranty",
    Ico: ZapIco,
    category: "package",
  }));

  return React.createElement(
    "div",
    { className: "animate-rise" },
    React.createElement(StepIndicator, { step: 0, total: 2, label: "" }),
    React.createElement(PageTitle, {
      title: "Affordable packages",
      subtitle: "USD · installation included in Harare.",
    }),
    React.createElement(
      "p",
      {
        style: {
          color: W6,
          fontSize: 12,
          lineHeight: 1.5,
          marginBottom: 14,
          padding: "10px 12px",
          background: G_DIM,
          border: "1px solid rgba(232,197,71,.2)",
          borderRadius: 10,
        },
      },
      PACKAGE_PRICE_NOTE
    ),
    React.createElement(
      "p",
      { style: { color: W4, fontSize: 11, marginBottom: 12, letterSpacing: "0.06em", textTransform: "uppercase" } },
      items.length + " packages"
    ),
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 } },
      items.map((p) =>
        React.createElement(ProductCard, {
          key: p.name + p.price,
          ...p,
          waMessage: productWhatsAppMessage(p.brand, p.name, p.price, p.category, "packages"),
        })
      )
    ),
    React.createElement(
      "div",
      {
        style: {
          padding: "14px 16px",
          background: M_DIM,
          border: "1px solid rgba(61,214,140,.25)",
          borderRadius: 14,
          marginBottom: 16,
        },
      },
      React.createElement("p", { style: { color: W6, fontSize: 12, margin: 0 } }, "Free sizer matches products to your load.")
    ),
    onStartSizing &&
      React.createElement(BtnPrimary, {
        onClick: onStartSizing,
        full: true,
        icon: React.createElement(ZapIco, { s: 16, c: "#0a0800" }),
        children: "Size my system",
      })
  );
}

export function BuildingScreen({
  propType,
  propInfo,
  qtys,
  setQty,
  customItems,
  onAddCustomFromSeed,
  onAddCustomBulk,
  onUpdateCustom,
  onPatchCustom,
  onRemoveCustom,
  customActive,
  totalActive,
  livePeak,
  liveDailyWh,
  liveSizing,
  onCalculate,
  onChangeProperty,
}) {
  const groups = getGroupedItemsForProperty(propType);
  const buildingCopy = getBuildingCopy(propType);
  const otherCopy = getOtherAccessoriesCopy(propType);

  return React.createElement(
    "div",
    { className: "animate-rise sizer-screen" },
    React.createElement(StepIndicator, { step: 1, total: 2, label: "Load" }),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          marginBottom: 8,
          flexWrap: "wrap",
        },
      },
      propInfo &&
        React.createElement(
          "div",
          {
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              background: G_DIM,
              borderRadius: 20,
            },
          },
          React.createElement(propInfo.Icon, { s: 12, c: propInfo.color }),
          React.createElement("span", { style: { color: W8, fontSize: 11, fontWeight: 600 } }, propInfo.label)
        ),
      onChangeProperty &&
        React.createElement(
          "button",
          {
            type: "button",
            onClick: onChangeProperty,
            style: {
              background: "transparent",
              border: "none",
              padding: "4px 0",
              color: W4,
              fontSize: 11,
              cursor: "pointer",
              fontFamily: "inherit",
              textDecoration: "underline",
            },
          },
          "Change"
        )
    ),
    (livePeak > 0 || liveDailyWh > 0) &&
      React.createElement(PowerQuestMeter, {
        sizingLike: liveSizing,
        peakW: livePeak,
        dailyWh: Math.round(liveDailyWh),
      }),
    React.createElement(
      "h2",
      {
        style: {
          fontFamily: FONT_DISPLAY,
          fontSize: "1.15rem",
          fontWeight: 700,
          color: W10,
          marginBottom: 6,
          lineHeight: 1.2,
        },
      },
      buildingCopy.title
    ),
    React.createElement(
      "p",
      { style: { color: W4, fontSize: 10, marginBottom: 8, lineHeight: 1.45 } },
      buildingCopy.subtitle
    ),
    React.createElement(
      "p",
      {
        style: {
          color: W4,
          fontSize: 10,
          marginBottom: 10,
          padding: "6px 10px",
          background: "rgba(255,255,255,.03)",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,.06)",
        },
      },
      RESTRICTED_SHORT_NOTE
    ),
    groups.length === 0
      ? React.createElement(EmptyHint, { text: "No items for this type." })
      : React.createElement(
          "div",
          { className: "sizer-scroll" },
          groups.map((group, gi) =>
            React.createElement(
              "div",
              { key: group.catId, style: { marginBottom: gi < groups.length - 1 ? 10 : 0 } },
              React.createElement(ItemGroupHeader, {
                label: group.label,
                hint: group.hint,
                color: group.color,
                iconKey: group.iconKey,
                first: gi === 0,
              }),
              React.createElement(
                "div",
                { style: { display: "flex", flexDirection: "column", gap: 8 } },
                group.items.map((item) => {
                  const q = qtys[item.id] || 0;
                  const rowItem = item.tailoredHint ? { ...item, sub: item.tailoredHint } : item;
                  return React.createElement(ApplianceRow, {
                    key: item.id,
                    item: rowItem,
                    q,
                    onDec: () => setQty(item.id, q - 1),
                    onInc: () => setQty(item.id, q + 1),
                  });
                })
              )
            )
          ),
          React.createElement(CustomAccessoriesPanel, {
            items: customItems,
            onAddFromSeed: onAddCustomFromSeed,
            onAddBulk: onAddCustomBulk,
            onChange: onUpdateCustom,
            onPatch: onPatchCustom,
            onRemove: onRemoveCustom,
            copy: otherCopy,
            propType,
            qtys,
            propLabel: propInfo?.label,
          })
        ),
    React.createElement(
      "div",
      { className: "sticky-actions sizer-calculate" },
      React.createElement(
        "p",
        { style: { color: W4, fontSize: 11, textAlign: "center", margin: "0 0 10px" } },
        totalActive + " active" + (customActive > 0 ? " · " + customActive + " custom" : "")
      ),
      React.createElement(BtnPrimary, {
        onClick: onCalculate,
        disabled: totalActive === 0,
        full: true,
        icon: React.createElement(ZapIco, { s: 16, c: "#0a0800" }),
        children: "Calculate",
      })
    )
  );
}

export function ResultScreen({
  sizing,
  propInfo,
  specs,
  isCustomQuote,
  countTotal,
  productTotal,
  deliveryOpts,
  onDeliveryChange,
  deliveryQuote,
  grandTotal,
  setShowModal,
  reset,
}) {
  const custom = !!isCustomQuote;
  const pkg = sizing?.pkg;
  const heroTitle = custom ? "Tailored to your load" : pkg?.name || sizing.kva + " kVA";
  const heroSub = custom
    ? "Custom system — we'll size inverter, battery & panels to match"
    : pkg
      ? pkg.kva + " kVA · Harare install included"
      : "Recommended system";

  return React.createElement(
    "div",
    { className: "animate-rise", style: { paddingBottom: 8 } },
    React.createElement(StepIndicator, { step: 2, total: 2, label: "Done" }),
    React.createElement(
      "div",
      {
        style: {
          ...CARD,
          padding: "18px 16px",
          marginBottom: 14,
          background: custom
            ? "linear-gradient(145deg, rgba(40,20,20,.95), rgba(20,12,12,.9))"
            : "linear-gradient(145deg, rgba(15,31,23,.95), rgba(26,51,40,.6))",
          border: "1px solid " + (custom ? "rgba(248,113,113,.25)" : "rgba(232,197,71,.2)"),
        },
      },
      React.createElement(
        "p",
        { style: { color: W4, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 } },
        custom ? "Custom quote" : "Recommended package"
      ),
      React.createElement(
        "h2",
        { style: { fontFamily: FONT_DISPLAY, fontSize: "clamp(1.5rem, 5vw, 2rem)", fontWeight: 700, color: W10, marginBottom: 6, lineHeight: 1.15 } },
        heroTitle
      ),
      React.createElement("p", { style: { color: W6, fontSize: 12, marginBottom: 12, lineHeight: 1.45 } }, heroSub),
      React.createElement(
        "div",
        { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12 } },
        React.createElement(
          "div",
          null,
          React.createElement("p", { style: { color: W4, fontSize: 11, margin: 0 } }, sizing.pW.toLocaleString() + "W peak"),
          React.createElement("p", { style: { color: W4, fontSize: 11, margin: "2px 0 0" } }, sizing.dWh.toLocaleString() + " Wh/day")
        ),
        React.createElement(
          "div",
          { style: { textAlign: "right" } },
          React.createElement(
            "p",
            {
              style: {
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(1.75rem, 5vw, 2.25rem)",
                fontWeight: 700,
                color: custom ? W8 : G,
                lineHeight: 1,
                margin: 0,
              },
            },
            custom ? "Custom" : "$" + countTotal.toLocaleString()
          ),
          !custom &&
            React.createElement(
              "p",
              { style: { color: W4, fontSize: 10, marginTop: 4 } },
              deliveryQuote?.enabled && !deliveryQuote.feePending ? "USD incl. delivery" : "USD · package"
            )
        )
      )
    ),
    !custom &&
      React.createElement(DeliveryInstallOption, {
        opts: deliveryOpts || { enabled: true, zone: "harare" },
        onChange: onDeliveryChange,
        productTotal: productTotal || sizing.tot,
      }),
    !custom &&
      sizing.solarCoverage != null &&
      React.createElement(
        "div",
        {
          style: {
            padding: "10px 12px",
            marginBottom: 12,
            background: M_DIM,
            border: "1px solid rgba(61,214,140,.25)",
            borderRadius: 12,
            textAlign: "center",
          },
        },
        React.createElement("p", { style: { color: M, fontSize: 13, fontWeight: 600, margin: 0 } }, sizing.solarCoverage + "% solar cover")
      ),
    React.createElement(EcoQuoteFootprint, { dWh: sizing.dWh, dailyGenWh: sizing.dailyGenWh }),
    specs.length > 0 &&
      React.createElement(
        "div",
        { style: { ...CARD, padding: 0, overflow: "hidden", marginBottom: 12 } },
        specs.map((r, i) =>
          React.createElement(
            "div",
            {
              key: r.label,
              style: {
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderBottom: i < specs.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none",
              },
            },
            React.createElement("div", { style: { width: 34, height: 34, borderRadius: 10, background: G_DIM, ...ci } }, React.createElement(r.Ico, { s: 15, c: G })),
            React.createElement(
              "div",
              { style: { flex: 1, minWidth: 0 } },
              React.createElement("p", { style: { color: W4, fontSize: 10, textTransform: "uppercase", marginBottom: 2 } }, r.label),
              React.createElement("p", { style: { color: W10, fontSize: 13, fontWeight: 500 } }, r.val)
            ),
            r.tot != null &&
              !custom &&
              React.createElement("p", { style: { color: G, fontSize: 14, fontWeight: 700 } }, "$" + r.tot.toLocaleString())
          )
        )
      ),
    React.createElement(
      "div",
      { className: "sticky-actions" },
      React.createElement(BtnPrimary, {
        onClick: () => setShowModal(true),
        full: true,
        icon: React.createElement(PrtIco, { s: 16, c: "#0a0800" }),
        children: custom ? "Request custom PDF quote" : "Get PDF quote",
      }),
      React.createElement(BtnGhost, {
        onClick: reset,
        full: true,
        icon: React.createElement(RetIco, { s: 14, c: W4 }),
        children: "Start over",
      })
    )
  );
}
