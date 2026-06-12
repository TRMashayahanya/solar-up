import React, { useState, useEffect } from "react";
import { G, W4, W6, W8, W10, FONT_DISPLAY, CARD, G_DIM, ci } from "./tokens.js";
import { PROPS } from "./data.js";
import { PACKAGES, OUTSIDE_DELIVERY_FREE_KM } from "./packages.js";
import { getGroupedItemsForProperty } from "./items.js";
import { getOtherAccessoriesCopy } from "./copy.js";
import {
  StepIndicator,
  PowerQuestMeter,
  ApplianceRow,
  BtnPrimary,
  EmptyHint,
  HomeBrand,
  SizerAreaAccordion,
  SIZER_CUSTOM_AREA_ID,
} from "./ui.js";
import { countActiveCustom } from "./custom-items.js";
import { ZapIco, PrtIco, RetIco, ArrRIco } from "./icons.js";
import { CustomAccessoriesPanel } from "./custom-accessories-panel.js";
import { DeliveryInstallOption } from "./DeliveryInstallOption.js";
import { installationRadiusBadge, isWithinFreeDeliveryRadius } from "./delivery.js";
import { HomeInstallCta } from "./home-install-cta.js";
import { ProductsCheckoutBar, PackageRow, ProductsPageHeader } from "./products-page.js";
import { SUPPORT_PHONE } from "./strings.js";
import {
  QuotePageHeader,
  QuoteFlowSteps,
  QuotePackageCard,
  QuoteCheckoutBar,
  quoteDeliveryNote,
} from "./quote-page.js";

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
    React.createElement("p", { className: "home-footer-note" }, "Energi Tech · " + SUPPORT_PHONE)
  );
}

export function ProductsScreen({
  selectedId,
  onSelectPackage,
  productTotal,
  onContinueToQuote,
  onStartSizing,
  themeToggle,
}) {
  const selected = PACKAGES.find((p) => p.id === selectedId) || null;

  return React.createElement(
    "div",
    { className: "products-screen animate-rise" },
    React.createElement(ProductsPageHeader, { themeToggle }),
    React.createElement(
      "p",
      { className: "products-list-eyebrow" },
      "Tap to select · ",
      React.createElement("em", null, installationRadiusBadge())
    ),
    React.createElement(
      "div",
      { className: "products-list-scroll" },
      React.createElement(
        "div",
        { className: "products-list", role: "list" },
        PACKAGES.map((pkg, i) =>
          React.createElement(PackageRow, {
            key: pkg.id,
            pkg,
            index: i,
            selected: selectedId === pkg.id,
            onSelect: () => onSelectPackage && onSelectPackage(pkg.id),
          })
        )
      )
    ),
    React.createElement(ProductsCheckoutBar, {
      selected,
      total: productTotal || selected?.price || 0,
      onContinue: onContinueToQuote,
      onStartSizing,
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
  const heroTitle = custom ? "Custom quote" : pkg?.name || sizing.kva + " kVA";
  const includesLine = custom
    ? "Sized to your load"
    : pkg
      ? sizing.kva + " kVA · " + sizing.pc + " panels"
      : null;
  const displayTotal = grandTotal != null ? grandTotal : sizing.tot;
  const deliveryNote = !custom ? quoteDeliveryNote(deliveryQuote) : null;
  const hasLocation = !!(deliveryQuote?.locationLabel || deliveryQuote?.km > 0);
  const installationQualified =
    !custom &&
    hasLocation &&
    (deliveryQuote?.fee || 0) <= 0 &&
    (deliveryQuote?.km > 0
      ? isWithinFreeDeliveryRadius(deliveryQuote.km)
      : deliveryQuote?.zone !== "outside");
  const quoteStep = custom ? 2 : hasLocation ? 3 : 2;

  const needsInstall = !custom && !hasLocation;
  const priceLabel = custom ? null : "$" + (displayTotal || 0).toLocaleString();

  return React.createElement(
    "div",
    {
      className:
        "animate-rise quote-page quote-page--compact" +
        (needsInstall ? " quote-page--needs-install" : " quote-page--ready"),
      style: { flex: 1, minHeight: 0, width: "100%" },
    },
      React.createElement(
        "div",
        { className: "quote-page__content" },
        React.createElement(
          "header",
          { className: "quote-page__mast" },
          React.createElement(QuotePageHeader, { custom, themeToggle }),
          !custom && React.createElement(QuoteFlowSteps, { activeStep: quoteStep })
        ),
        React.createElement(
          "div",
          { className: "quote-page__scroll" },
          React.createElement(QuotePackageCard, {
            custom,
            title: heroTitle,
            includesLine,
            variant: needsInstall ? "strip" : "slim",
            priceLabel: needsInstall ? priceLabel : null,
          }),
          !custom &&
            React.createElement(DeliveryInstallOption, {
              variant: "quote",
              opts: deliveryOpts || { enabled: true, zone: "harare" },
              onChange: onDeliveryChange,
              onLocationResolved,
              productTotal: productTotal || sizing.tot,
            })
        ),
        React.createElement(QuoteCheckoutBar, {
          grandTotal: displayTotal,
          deliveryNote,
          custom,
          locationReady: custom || hasLocation,
          installationQualified,
          onSubmit: () => setShowModal(true),
          onReset: reset,
        })
      )
  );
}
