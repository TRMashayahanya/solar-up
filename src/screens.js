import React, { useState, useRef, useEffect } from "react";
import { G, W4, W6, W8, W10, FONT_DISPLAY, CARD, G_DIM, ci } from "./tokens.js";
import {
  PROPS,
  productWhatsAppMessage,
} from "./data.js";
import { PACKAGES } from "./packages.js";
import { getGroupedItemsForProperty } from "./items.js";
import { getOtherAccessoriesCopy } from "./copy.js";
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
import { HomeInstallCta } from "./home-install-cta.js";

export function HomeScreen({ onPickProp, onViewProducts }) {
  return React.createElement(
    "div",
    { className: "animate-rise home-screen" },
    React.createElement(HomeBrand, null),
    React.createElement(HomeInstallCta, null),
    React.createElement(
      "div",
      { className: "home-body" },
      React.createElement(
        "section",
        { className: "home-section", "aria-label": "Property type" },
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
            "Browse packages"
          )
      )
    ),
    React.createElement("p", { className: "home-footer-note" }, "Energi Tech · 0773757018")
  );
}

export function ProductsScreen({ onStartSizing }) {
  const items = PACKAGES.map((pkg) => ({
    brand: "Energi Tech",
    name: pkg.name,
    spec: pkg.kva + " kVA · " + pkg.panelCount + "×" + pkg.panelW + "W",
    price: pkg.price,
    tag: "5–7 yr warranty",
    Ico: ZapIco,
    category: "package",
  }));

  return React.createElement(
    "div",
    { className: "animate-rise" },
    React.createElement(PageTitle, { title: "Packages" }),
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 } },
      items.map((p) =>
        React.createElement(ProductCard, {
          key: p.name + p.price,
          ...p,
          waMessage: productWhatsAppMessage(p.brand, p.name, p.price, p.category, "packages"),
        })
      )
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
  totalActive,
  livePeak,
  liveDailyWh,
  liveSizing,
  onCalculate,
  onChangeProperty,
}) {
  const groups = getGroupedItemsForProperty(propType);
  const otherCopy = getOtherAccessoriesCopy(propType);
  const scrollRef = useRef(null);
  const endRef = useRef(null);
  const [readyToCalculate, setReadyToCalculate] = useState(false);

  useEffect(() => {
    const root = scrollRef.current;
    const target = endRef.current;
    if (!root || !target) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setReadyToCalculate(true);
      },
      { root, rootMargin: "0px 0px 24px 0px", threshold: 0 }
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, [groups.length, customItems.length, totalActive]);

  const showCalculate = totalActive > 0 && readyToCalculate;

  return React.createElement(
    "div",
    { className: "animate-rise sizer-screen" },
    React.createElement(
      "div",
      { className: "sizer-header-outside" },
      React.createElement(StepIndicator, { step: 1, total: 2 }),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginTop: 6,
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
            "Change property"
          )
      )
    ),
    React.createElement(
      "div",
      { className: "sizer-scroll", ref: scrollRef },
      (livePeak > 0 || liveDailyWh > 0) &&
        React.createElement(PowerQuestMeter, {
          sizingLike: liveSizing,
          peakW: livePeak,
          dailyWh: Math.round(liveDailyWh),
        }),
      groups.length === 0
        ? React.createElement(EmptyHint, { text: "No items for this type." })
        : groups.map((group, gi) =>
            React.createElement(
              "div",
              { key: group.catId, style: { marginBottom: gi < groups.length - 1 ? 10 : 0 } },
              React.createElement(ItemGroupHeader, {
                label: group.label,
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
      }),
      React.createElement("div", { ref: endRef, className: "sizer-end-sentinel", "aria-hidden": true }),
      showCalculate &&
        React.createElement(
          "div",
          { className: "sizer-calculate-end" },
          React.createElement(BtnPrimary, {
            onClick: onCalculate,
            full: true,
            icon: React.createElement(ZapIco, { s: 16, c: "#0a0800" }),
            children: "Calculate my system",
          })
        )
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
  const heroTitle = custom ? "Custom quote" : pkg?.name || sizing.kva + " kVA";
  const heroSub = custom ? null : pkg ? sizing.kva + " kVA" : null;

  return React.createElement(
    "div",
    { className: "animate-rise", style: { paddingBottom: 8 } },
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
        "h2",
        { style: { fontFamily: FONT_DISPLAY, fontSize: "clamp(1.5rem, 5vw, 2rem)", fontWeight: 700, color: W10, marginBottom: heroSub ? 4 : 12, lineHeight: 1.15 } },
        heroTitle
      ),
      heroSub &&
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
