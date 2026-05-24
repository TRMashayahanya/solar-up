import React, { useState } from "react";
import { G, M, W4, W6, W8, W10, FONT_DISPLAY, GRAD_GOLD, GRAD_GREEN, CARD, G_DIM, M_DIM, ci } from "./tokens.js";
import {
  INVS,
  BATS,
  PANS,
  PROPS,
  productWhatsAppMessage,
  homeWhatsAppUrl,
  quoteWhatsAppUrl,
  itemsWhatsAppUrl,
} from "./data.js";
import { getGroupedItemsForProperty, getPropertyItemSummary } from "./items.js";
import { getBuildingCopy, getHomeCopy, getOtherAccessoriesCopy } from "./copy.js";
import { isCustomItemActive } from "./custom-items.js";
import {
  StepIndicator,
  PageTitle,
  LoadMeter,
  ApplianceRow,
  BtnPrimary,
  BtnGhost,
  BtnWhatsApp,
  ItemGroupHeader,
  EmptyHint,
  ProductCard,
  EcoImpactStrip,
} from "./ui.js";
import { ZapIco, BatIco, PanIco, ChatIco, PrtIco, RetIco, ShldIco, ArrLIco } from "./icons.js";
import { CustomAccessoriesPanel } from "./custom-accessories-panel.js";
import { DeliveryInstallOption } from "./DeliveryInstallOption.js";

export function HomeScreen({ onPickProp }) {
  const home = getHomeCopy(null);

  return React.createElement(
    "div",
    { className: "animate-rise home-screen" },
    React.createElement(
      "div",
      {
        style: {
          position: "relative",
          padding: "22px 20px 20px",
          marginBottom: 22,
          borderRadius: 18,
          background: "linear-gradient(145deg, rgba(15,31,23,.85), rgba(8,12,10,.95))",
          border: "1px solid rgba(232,197,71,.22)",
          boxShadow: "0 16px 48px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.06)",
          overflow: "hidden",
        },
      },
      React.createElement("div", {
        style: {
          position: "absolute",
          top: -40,
          right: -30,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,197,71,.2), transparent 70%)",
          pointerEvents: "none",
        },
      }),
      React.createElement(
        "p",
        {
          style: {
            color: G,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 8,
          },
        },
        "Energi Tech · Zimbabwe"
      ),
      React.createElement(
        "h1",
        {
          style: {
            fontFamily: FONT_DISPLAY,
            fontSize: "clamp(28px, 7vw, 36px)",
            fontWeight: 700,
            color: W10,
            lineHeight: 1.15,
            marginBottom: 10,
          },
        },
        "Size your solar in minutes"
      ),
      React.createElement(
        "p",
        { style: { color: W6, fontSize: 14, lineHeight: 1.55, marginBottom: 16, maxWidth: 420 } },
        home.tagline
      ),
      React.createElement(
        "div",
        { style: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 } },
        ["Free sizer", "PDF quote", "Tailored lists"].map((chip) =>
          React.createElement(
            "span",
            {
              key: chip,
              style: {
                padding: "6px 12px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 600,
                color: W8,
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
              },
            },
            chip
          )
        )
      )
    ),
    React.createElement(
      "p",
      {
        style: {
          color: W4,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 12,
        },
      },
      "Choose property type"
    ),
    React.createElement(
      "p",
      { style: { color: W6, fontSize: 13, marginBottom: 14, lineHeight: 1.5 } },
      home.steps
    ),
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 10 } },
      PROPS.map((pr) => {
        const sum = getPropertyItemSummary(pr.value);
        const hint = getHomeCopy(pr.value).tagline;
        return React.createElement(
          "button",
          {
            key: pr.value,
            type: "button",
            className: "home-prop-card card-hover",
            onClick: () => onPickProp(pr.value),
            style: {
              display: "grid",
              gridTemplateColumns: "4px auto 1fr auto",
              alignItems: "center",
              gap: 14,
              padding: "14px 14px 14px 0",
              background: "rgba(255,255,255,.03)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 16,
              overflow: "hidden",
            },
          },
          React.createElement("div", {
            style: {
              alignSelf: "stretch",
              background: "linear-gradient(180deg, " + pr.color + ", " + pr.color + "88)",
              borderRadius: "16px 0 0 16px",
              minHeight: "100%",
            },
          }),
          React.createElement(
            "div",
            {
              style: {
                width: 48,
                height: 48,
                borderRadius: 14,
                background: pr.color + "18",
                border: "1px solid " + pr.color + "40",
                ...ci,
                marginLeft: 2,
              },
            },
            React.createElement(pr.Icon, { s: 24, c: pr.color })
          ),
          React.createElement(
            "div",
            { style: { minWidth: 0, textAlign: "left" } },
            React.createElement(
              "p",
              { style: { color: W10, fontSize: 15, fontWeight: 700, marginBottom: 3 } },
              pr.label
            ),
            React.createElement("p", { style: { color: W4, fontSize: 12, marginBottom: 6 } }, pr.sub),
            React.createElement(
              "p",
              { style: { color: W6, fontSize: 11, lineHeight: 1.4, margin: 0 } },
              hint
            )
          ),
          React.createElement(
            "div",
            { style: { textAlign: "right", paddingRight: 4, flexShrink: 0 } },
            React.createElement(
              "span",
              {
                style: {
                  display: "inline-block",
                  padding: "5px 10px",
                  borderRadius: 20,
                  background: G_DIM,
                  color: G,
                  fontSize: 11,
                  fontWeight: 700,
                },
              },
              sum.itemCount + " items"
            )
          )
        );
      })
    ),
    React.createElement(
      "div",
      {
        style: {
          marginTop: 20,
          padding: "12px 14px",
          background: M_DIM,
          border: "1px solid rgba(61,214,140,.2)",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          gap: 10,
        },
      },
      React.createElement(ShldIco, { s: 18, c: M }),
      React.createElement(
        "p",
        { style: { color: W4, fontSize: 12, lineHeight: 1.5, margin: 0 } },
        "Each property opens a ",
        React.createElement("strong", { style: { color: W8 } }, "tailored appliance list"),
        " — only what fits that building type."
      )
    ),
    React.createElement(
      "div",
      { style: { marginTop: 24, paddingTop: 8 } },
      React.createElement(BtnWhatsApp, {
        href: homeWhatsAppUrl(),
        label: "Chat on WhatsApp",
        full: true,
      })
    )
  );
}

export function ProductsScreen({ onStartSizing }) {
  const [tab, setTab] = useState("inverters");
  const groups = {
    inverters: {
      label: "Inverters",
      Ico: ZapIco,
      items: INVS.map((i) => ({
        brand: i.brand,
        name: i.name,
        spec: i.kva + " kVA · Sumry hybrid",
        price: i.price,
        tag: "5yr warranty",
        Ico: ZapIco,
        category: "inverter",
      })),
    },
    batteries: {
      label: "Batteries",
      Ico: BatIco,
      items: BATS.map((b) => ({
        brand: b.brand,
        name: b.name,
        spec: b.v + "V · " + (b.wh / 1000).toFixed(1) + " kWh usable class",
        price: b.price,
        tag: "Per unit",
        Ico: BatIco,
        category: "battery",
      })),
    },
    panels: {
      label: "Panels",
      Ico: PanIco,
      items: PANS.map((p) => ({
        brand: p.brand,
        name: p.name,
        spec: p.w + "W mono · Tier-1 module",
        price: p.price,
        tag: "Per panel",
        Ico: PanIco,
        category: "solar panel",
      })),
    },
  };
  const g = groups[tab];

  return React.createElement(
    "div",
    { className: "animate-rise" },
    React.createElement(StepIndicator, { step: 0, total: 2, label: "" }),
    React.createElement(PageTitle, {
      title: "Products",
      subtitle: "USD prices · tap WhatsApp to chat.",
    }),
    React.createElement(
      "div",
      { style: { display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" } },
      Object.keys(groups).map((k) =>
        React.createElement(
          "button",
          {
            key: k,
            type: "button",
            onClick: () => setTab(k),
            style: {
              padding: "8px 14px",
              borderRadius: 20,
              border: "1px solid " + (tab === k ? "rgba(232,197,71,.45)" : "rgba(255,255,255,.08)"),
              background: tab === k ? G_DIM : "rgba(255,255,255,.03)",
              color: tab === k ? G : W6,
              fontSize: 12,
              fontWeight: 600,
            },
          },
          groups[k].label
        )
      )
    ),
    React.createElement(
      "p",
      { style: { color: W4, fontSize: 11, marginBottom: 12, letterSpacing: "0.06em", textTransform: "uppercase" } },
      g.label + " · " + g.items.length + " SKUs"
    ),
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 } },
      g.items.map((p) =>
        React.createElement(ProductCard, {
          key: p.name + p.price,
          ...p,
          waMessage: productWhatsAppMessage(p.brand, p.name, p.price, p.category, tab),
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
  catalogActive,
  customActive,
  totalActive,
  livePeak,
  liveDailyWh,
  onCalculate,
  onChangeProperty,
}) {
  const groups = getGroupedItemsForProperty(propType);
  const buildingCopy = getBuildingCopy(propType);
  const otherCopy = getOtherAccessoriesCopy(propType);
  const allItems = groups.flatMap((g) => g.items);
  const sum = getPropertyItemSummary(propType);
  const customNames = (customItems || []).filter(isCustomItemActive).map((c) => String(c.label).trim());

  return React.createElement(
    "div",
    { className: "animate-rise", style: { paddingBottom: 16 } },
    React.createElement(StepIndicator, { step: 2, total: 2, label: "" }),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          marginBottom: 12,
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
              padding: "6px 12px",
              background: G_DIM,
              borderRadius: 20,
            },
          },
          React.createElement(propInfo.Icon, { s: 14, c: propInfo.color }),
          React.createElement("span", { style: { color: W8, fontSize: 12, fontWeight: 600 } }, propInfo.label)
        ),
      onChangeProperty &&
        React.createElement(
          "button",
          {
            type: "button",
            onClick: onChangeProperty,
            style: {
              background: "transparent",
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: 20,
              padding: "6px 12px",
              color: W4,
              fontSize: 11,
              cursor: "pointer",
              fontFamily: "inherit",
            },
          },
          "Change type"
        )
    ),
    React.createElement(PageTitle, { title: buildingCopy.title, subtitle: buildingCopy.subtitle }),
    React.createElement(
      "p",
      {
        style: {
          color: W4,
          fontSize: 11,
          margin: "-8px 0 12px",
          padding: "8px 12px",
          background: "rgba(255,255,255,.03)",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,.06)",
        },
      },
      sum.groupCount + " sections · " + sum.itemCount + " appliances for " + (propInfo ? propInfo.label.toLowerCase() : "this property")
    ),
    React.createElement(LoadMeter, {
      pW: livePeak,
      dWh: Math.round(liveDailyWh),
      applianceCount: totalActive,
    }),
    groups.length === 0
      ? React.createElement(EmptyHint, { text: "No items for this type." })
      : React.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 4,
              maxHeight: "min(52vh, 480px)",
              overflowY: "auto",
              marginBottom: 8,
              paddingRight: 2,
            },
          },
          groups.map((group, gi) =>
            React.createElement(
              "div",
              { key: group.catId, style: gi === 0 ? { marginTop: 0 } : undefined },
              React.createElement(ItemGroupHeader, {
                label: group.label,
                hint: group.hint,
                color: group.color,
                iconKey: group.iconKey,
                first: gi === 0,
              }),
              React.createElement(
                "div",
                { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 4 } },
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
    React.createElement(
      "div",
      { className: "sticky-actions" },
      React.createElement(
        "p",
        { style: { color: W4, fontSize: 11, textAlign: "center", margin: "0 0 12px" } },
        totalActive +
          " active" +
          (customActive > 0 && catalogActive > 0
            ? " (" + catalogActive + " listed, " + customActive + " custom)"
            : customActive > 0
              ? " (" + customActive + " custom)"
              : "")
      ),
      React.createElement(BtnPrimary, {
        onClick: onCalculate,
        disabled: totalActive === 0,
        full: true,
        icon: React.createElement(ZapIco, { s: 16, c: "#0a0800" }),
        children: "Calculate",
      }),
      React.createElement(
        "div",
        { style: { marginTop: 12 } },
        React.createElement(BtnWhatsApp, {
          href: itemsWhatsAppUrl(
            propInfo ? propInfo.label : "",
            livePeak,
            Math.round(liveDailyWh),
            totalActive,
            customNames
          ),
          label: "WhatsApp about my list",
          full: true,
        })
      )
    )
  );
}

export function ResultScreen({
  sizing,
  propInfo,
  specs,
  countTotal,
  productTotal,
  deliveryOpts,
  onDeliveryChange,
  deliveryQuote,
  grandTotal,
  setShowModal,
  reset,
}) {
  return React.createElement(
    "div",
    { className: "animate-rise", style: { paddingBottom: 8 } },
    React.createElement(StepIndicator, { step: 2, total: 2, label: "Done" }),
    React.createElement(
      "div",
      { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 } },
      React.createElement(
        "p",
        { style: { color: G, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" } },
        "Your system"
      ),
      propInfo &&
        React.createElement(
          "div",
          { style: { display: "flex", alignItems: "center", gap: 6, background: G_DIM, border: "1px solid rgba(232,197,71,.25)", borderRadius: 20, padding: "6px 12px" } },
          React.createElement(propInfo.Icon, { s: 14, c: propInfo.color }),
          React.createElement("span", { style: { color: W8, fontSize: 12, fontWeight: 500 } }, propInfo.label)
        )
    ),

    React.createElement(
      "div",
      {
        style: {
          ...CARD,
          padding: "20px 22px",
          marginBottom: 16,
          background: "linear-gradient(145deg, rgba(15,31,23,.95), rgba(26,51,40,.6))",
          border: "1px solid rgba(232,197,71,.2)",
        },
      },
      React.createElement(
        "div",
        { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 16 } },
        React.createElement(
          "div",
          null,
          React.createElement("p", { style: { color: W4, fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 } }, "Recommended"),
          React.createElement(
            "h2",
            { style: { fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 6vw, 2.5rem)", fontWeight: 700, color: W10, lineHeight: 1, marginBottom: 6 } },
            sizing.kva + " kVA"
          ),
          React.createElement(
            "p",
            { style: { color: W4, fontSize: 12 } },
            deliveryQuote?.enabled
              ? deliveryQuote.feePending
                ? "Products on quote · delivery cost from dealer (your location)"
                : "Products + delivery & install"
              : "Products only · add delivery below if needed"
          )
        ),
        React.createElement(
          "div",
          { style: { textAlign: "right" } },
          React.createElement(
            "p",
            {
              style: {
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(2rem, 5vw, 2.75rem)",
                fontWeight: 700,
                background: GRAD_GOLD,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1,
              },
            },
            "$" + countTotal.toLocaleString()
          ),
          React.createElement(
            "p",
            { style: { color: W4, fontSize: 11, marginTop: 4 } },
            deliveryQuote?.enabled
              ? deliveryQuote.feePending
                ? "USD products (+ dealer delivery quote)"
                : "USD incl. delivery"
              : "USD products"
          )
        )
      ),
      React.createElement(
        "div",
        { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 } },
        [
          { Ico: ZapIco, v: sizing.kva + " kVA", l: "Inverter" },
          { Ico: BatIco, v: sizing.bc + "×", l: "Batteries" },
          { Ico: PanIco, v: sizing.pc + "×" + sizing.pan.w + "W", l: "Panels" },
          { Ico: ShldIco, v: "~" + sizing.bk + "h", l: "Backup" },
        ].map((it) =>
          React.createElement(
            "div",
            { key: it.l, style: { textAlign: "center", padding: "10px 6px", background: "rgba(255,255,255,.04)", borderRadius: 10 } },
            React.createElement("div", { style: { ...ci, marginBottom: 4 } }, React.createElement(it.Ico, { s: 14, c: G })),
            React.createElement("p", { style: { color: W10, fontSize: 12, fontWeight: 700 } }, it.v),
            React.createElement("p", { style: { color: W4, fontSize: 9 } }, it.l)
          )
        )
      )
    ),

    React.createElement(DeliveryInstallOption, {
      opts: deliveryOpts || { enabled: false, zone: "harare" },
      onChange: onDeliveryChange,
      productTotal: productTotal || sizing.tot,
    }),

    sizing.solarCoverage != null &&
      React.createElement(
        "div",
        {
          style: {
            ...CARD,
            padding: "14px 16px",
            marginBottom: 12,
            background: M_DIM,
            border: "1px solid rgba(61,214,140,.25)",
            textAlign: "center",
          },
        },
        React.createElement(
          "div",
          { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 4 } },
          React.createElement(PanIco, { s: 16, c: M }),
          React.createElement("p", { style: { color: M, fontSize: 14, fontWeight: 600, margin: 0 } }, sizing.solarCoverage + "% solar cover")
        ),
        React.createElement(
          "p",
          { style: { color: W4, fontSize: 12 } },
          (sizing.dailyGenWh || 0).toLocaleString() + " Wh gen · " + sizing.dWh.toLocaleString() + " Wh need"
        )
      ),

    React.createElement(EcoImpactStrip, { dWh: sizing.dWh, dailyGenWh: sizing.dailyGenWh }),

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
              padding: "14px 16px",
              borderBottom: i < specs.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none",
            },
          },
          React.createElement("div", { style: { width: 36, height: 36, borderRadius: 10, background: G_DIM, ...ci } }, React.createElement(r.Ico, { s: 16, c: G })),
          React.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.createElement("p", { style: { color: W4, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 } }, r.label),
            React.createElement("p", { style: { color: W10, fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, r.val)
          ),
          React.createElement(
            "div",
            { style: { textAlign: "right" } },
            React.createElement("p", { style: { color: G, fontSize: 14, fontWeight: 700 } }, "$" + r.tot.toLocaleString()),
            React.createElement("p", { style: { color: W4, fontSize: 10 } }, "×" + r.qty)
          )
        )
      )
    ),

    React.createElement(
      "div",
      { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 } },
      [
        ["Daily", sizing.dWh + " Wh"],
        ["Peak", sizing.pW + " W"],
        ["Battery", sizing.sWh + " Wh"],
      ].map(([l, v]) =>
        React.createElement(
          "div",
          { key: l, style: { padding: "12px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, textAlign: "center" } },
          React.createElement("p", { style: { color: W10, fontSize: 14, fontWeight: 700 } }, v),
          React.createElement("p", { style: { color: W4, fontSize: 10, marginTop: 2 } }, l)
        )
      )
    ),

    React.createElement(
      "div",
      { className: "sticky-actions" },
      React.createElement(
        "div",
        { style: { display: "flex", gap: 10, marginBottom: 10 } },
        React.createElement(
          "a",
          {
            href: quoteWhatsAppUrl(sizing, propInfo ? propInfo.label : "", deliveryQuote),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "btn-primary",
            style: {
              flex: 1,
              padding: 14,
              background: GRAD_GREEN,
              borderRadius: 12,
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 20px rgba(61,214,140,.25)",
            },
          },
          React.createElement(ChatIco, { s: 16, c: "#fff" }),
          "Order on WhatsApp"
        ),
        React.createElement(BtnPrimary, {
          onClick: () => setShowModal(true),
          icon: React.createElement(PrtIco, { s: 16, c: "#0a0800" }),
          children: "Get PDF quote",
        })
      ),
      React.createElement(BtnGhost, {
        onClick: reset,
        full: true,
        icon: React.createElement(RetIco, { s: 14, c: W4 }),
        children: "Start over",
      })
    )
  );
}
