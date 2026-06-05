import React, { useState, useEffect } from "react";
import { G, W4, W6, W8, W10, FONT_DISPLAY, CARD, G_DIM, ci } from "./tokens.js";
import {
  PROPS,
  productWhatsAppMessage,
} from "./data.js";
import { PACKAGES, PACKAGE_PRICE_NOTE } from "./packages.js";
import { getGroupedItemsForProperty } from "./items.js";
import { getOtherAccessoriesCopy } from "./copy.js";
import {
  StepIndicator,
  PowerQuestMeter,
  ApplianceRow,
  BtnPrimary,
  EmptyHint,
  ProductCard,
  HomeBrand,
  SizerAreaAccordion,
  SIZER_CUSTOM_AREA_ID,
} from "./ui.js";
import { countActiveCustom } from "./custom-items.js";
import { ZapIco, PrtIco, RetIco, ArrRIco } from "./icons.js";
import { CustomAccessoriesPanel } from "./custom-accessories-panel.js";
import { DeliveryInstallOption } from "./DeliveryInstallOption.js";
import { HomeInstallCta } from "./home-install-cta.js";
import { QuotePageHeader, QuotePackageCard, useQuotePreviewRef } from "./quote-page.js";

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
                  React.createElement(ArrRIco, { s: 14, c: W4 })
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
    { className: "animate-rise products-screen" },
    React.createElement(
      "div",
      { className: "products-list" },
      items.map((p) =>
        React.createElement(ProductCard, {
          key: p.name + p.price,
          ...p,
          waMessage: productWhatsAppMessage(p.brand, p.name, p.price, p.category, "packages"),
        })
      )
    ),
    React.createElement(
      "p",
      { className: "products-footnote" },
      PACKAGE_PRICE_NOTE.split(".")[0] + "."
    ),
    onStartSizing &&
      React.createElement(
        "div",
        { className: "products-cta" },
        React.createElement(BtnPrimary, {
          onClick: onStartSizing,
          full: true,
          icon: React.createElement(ZapIco, { s: 16, c: "#0a0800" }),
          children: "Size my system",
        })
      )
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
  const [openArea, setOpenArea] = useState(() => groups[0]?.catId || SIZER_CUSTOM_AREA_ID);

  useEffect(() => {
    if (groups.length) setOpenArea(groups[0].catId);
    else setOpenArea(SIZER_CUSTOM_AREA_ID);
  }, [propType]);

  function selectArea(areaId) {
    setOpenArea((prev) => (prev === areaId ? null : areaId));
  }

  function groupActiveCount(group) {
    return group.items.reduce((n, it) => n + ((qtys[it.id] || 0) > 0 ? 1 : 0), 0);
  }

  const customActive = countActiveCustom(customItems);

  return React.createElement(
    "div",
    { className: "animate-rise sizer-screen" },
    React.createElement(
      "div",
      { className: "sizer-header-outside" },
      React.createElement(StepIndicator, { step: 1, total: 2, compact: true }),
      React.createElement(
        "div",
        { className: "sizer-prop-bar" },
        propInfo &&
          React.createElement(
            "div",
            { className: "sizer-prop-chip" },
            React.createElement(propInfo.Icon, { s: 11, c: propInfo.color }),
            React.createElement("span", { className: "sizer-prop-chip-label" }, propInfo.label)
          ),
        onChangeProperty &&
          React.createElement(
            "button",
            { type: "button", className: "sizer-change-prop", onClick: onChangeProperty },
            "Change property"
          )
      )
    ),
    React.createElement(
      "div",
      { className: "sizer-scroll" },
      (livePeak > 0 || liveDailyWh > 0) &&
        React.createElement(PowerQuestMeter, {
          sizingLike: liveSizing,
          peakW: livePeak,
          dailyWh: Math.round(liveDailyWh),
        }),
      groups.length === 0
        ? React.createElement(EmptyHint, { text: "No items for this type." })
        : React.createElement(
            "div",
            { className: "sizer-accordion-list" },
            groups.map((group) =>
              React.createElement(
                SizerAreaAccordion,
                {
                  key: group.catId,
                  areaId: group.catId,
                  label: group.label,
                  hint: group.hint,
                  color: group.color,
                  iconKey: group.iconKey,
                  isOpen: openArea === group.catId,
                  onSelect: selectArea,
                  activeCount: groupActiveCount(group),
                },
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
            ),
            React.createElement(
              SizerAreaAccordion,
              {
                areaId: SIZER_CUSTOM_AREA_ID,
                label: otherCopy.label || "Add more items",
                hint: otherCopy.hint || "Tap to add custom items",
                color: G,
                iconKey: "accessories",
                isOpen: openArea === SIZER_CUSTOM_AREA_ID,
                onSelect: selectArea,
                activeCount: customActive,
              },
              React.createElement(CustomAccessoriesPanel, {
                embedded: true,
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
            )
          )
    ),
    totalActive > 0 &&
      React.createElement(
        "div",
        { className: "sizer-footer" },
        React.createElement(BtnPrimary, {
          onClick: onCalculate,
          full: true,
          icon: React.createElement(ZapIco, { s: 16, c: "#0a0800" }),
          children: "Calculate my system",
        })
      )
  );
}

export function ResultScreen({
  sizing,
  isCustomQuote,
  productTotal,
  deliveryOpts,
  onDeliveryChange,
  onLocationResolved,
  deliveryQuote,
  grandTotal,
  setShowModal,
  reset,
  themeToggle,
}) {
  const custom = !!isCustomQuote;
  const pkg = sizing?.pkg;
  const previewRef = useQuotePreviewRef();
  const heroTitle = custom ? "Custom quote" : pkg?.name || sizing.kva + " kVA";
  const includesLine = custom
    ? "Sized to your load"
    : pkg
      ? sizing.kva + " kVA · Harare install included"
      : null;
  const displayTotal = grandTotal != null ? grandTotal : sizing.tot;
  const priceLabel = custom ? "On request" : "$" + displayTotal.toLocaleString();
  const priceSub =
    !custom &&
    (deliveryQuote?.enabled && !deliveryQuote.feePending ? "incl. delivery" : "Harare install incl.");

  return React.createElement(
    "div",
    { className: "animate-rise quote-page quote-page--compact", style: { flex: 1, minHeight: 0, width: "100%" } },
    React.createElement(
      "div",
      { className: "quote-page__content" },
      React.createElement(QuotePageHeader, { previewRef, custom, themeToggle }),
      React.createElement(QuotePackageCard, {
        custom,
        title: heroTitle,
        includesLine,
        peakW: sizing.pW,
        dailyWh: sizing.dWh,
        priceLabel,
        priceSub,
        dWh: sizing.dWh,
        dailyGenWh: sizing.dailyGenWh,
      }),
      !custom &&
        React.createElement(DeliveryInstallOption, {
          variant: "quote",
          opts: deliveryOpts || { enabled: true, zone: "harare" },
          onChange: onDeliveryChange,
          onLocationResolved,
          productTotal: productTotal || sizing.tot,
        }),
      React.createElement(
        "footer",
        { className: "quote-page-footer" },
        React.createElement(BtnPrimary, {
          onClick: () => setShowModal(true),
          full: true,
          icon: React.createElement(PrtIco, { s: 16, c: "#0a0800" }),
          children: custom ? "Request PDF quote" : "Get PDF quote",
        }),
        React.createElement(
          "button",
          { type: "button", className: "quote-page-reset", onClick: reset },
          React.createElement(RetIco, { s: 12, c: "currentColor" }),
          "Start over"
        )
      )
    )
  );
}
