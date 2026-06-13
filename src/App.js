import React, { useState, useEffect, useMemo } from "react";
import { BG, GRAD_HERO, CARD, W4 } from "./tokens.js";
import { PROPS, paymentAssistWhatsAppUrl } from "./data.js";
import { size, sizeFromPackage } from "./sizing.js";
import { submitLead } from "./api.js";
import { applyPreset } from "./prefills.js";
import { getItemsForProperty } from "./items.js";
import { newCustomItem, countActiveCustom, customItemsToLoadEntries, isCustomItemActive } from "./custom-items.js";
import { scrollToTop } from "./scroll.js";
import { useMobileKeyboard } from "./use-mobile-keyboard.js";
import {
  getDeliveryQuote,
  applyAddressToDeliveryOpts,
  quoteGrandTotal,
  isHarareAddress,
  getOutsideLocationLabel,
  estimateKmFromAddress,
} from "./delivery.js";
import { ZapIco, BatIco, PanIco } from "./icons.js";
import { useCount, ClientModal, Particles, ErrorBoundary } from "./components.js";
import { PdfDownloadBanner } from "./PdfDownloadBanner.js";
import { HomeScreen, BuildingScreen, ResultScreen, ProductsScreen } from "./screens.js";
import { globalStyles, BottomNav, ThemeToggle, BrandSunMark } from "./ui.js";
import { getStoredTheme, applyTheme, toggleTheme } from "./theme.js";
import { BUILD } from "./build.js";
import { SUPPORT_PHONE } from "./strings.js";
import { PACKAGES } from "./packages.js";
import { isRestrictedCustomLabel } from "./restricted-appliances.js";
import { initStageSounds, playStageSound } from "./stage-sounds.js";

export default function App() {
  const [nav, setNav] = useState("home");
  const [propType, setPropType] = useState(null);
  const [qtys, setQtys] = useState({});
  const [hrs, setHrs] = useState({});
  const [sizing, setSizing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pdfJob, setPdfJob] = useState(null);
  const [leadError, setLeadError] = useState("");
  const [customItems, setCustomItems] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState(() => PACKAGES[0]?.id || null);
  const [deliveryOpts, setDeliveryOpts] = useState({
    enabled: true,
    zone: "harare",
    locationLabel: "",
    distanceKm: 0,
  });
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [theme, setTheme] = useState(() => getStoredTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useMobileKeyboard();

  useEffect(() => {
    function unlock() {
      initStageSounds();
    }
    window.addEventListener("pointerdown", unlock, { once: true, passive: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  const propInfo = PROPS.find((p) => p.value === propType) || null;

  function pickProp(v) {
    const { qtys: q } = applyPreset(v);
    setPropType(v);
    setQtys(q);
    setHrs({});
    setCustomItems([]);
    setSizing(null);
    setNav("size");
    playStageSound("property");
    requestAnimationFrame(() => scrollToTop());
  }

  function setQty(id, val) {
    setQtys((p) => ({ ...p, [id]: Math.max(0, Math.round(val)) }));
  }

  function mergeSeedIntoList(list, seed) {
    const label = String(seed?.label || "").trim();
    if (!label || isRestrictedCustomLabel(label)) return list;
    const key = label.toLowerCase();
    const existing = list.find((c) => String(c.label || "").trim().toLowerCase() === key);
    if (existing) {
      return list.map((c) =>
        c.id === existing.id
          ? { ...c, qty: Math.max(1, (c.qty || 0) + Math.max(1, Math.round(seed.qty || 1))) }
          : c
      );
    }
    return [...list, newCustomItem({ ...seed, label, qty: Math.max(1, Math.round(seed.qty || 1)) })];
  }

  function addCustomFromSeed(seed) {
    setCustomItems((list) => mergeSeedIntoList(list, seed));
  }

  function addCustomBulk(seeds) {
    if (!seeds?.length) return;
    setCustomItems((list) => {
      let next = list;
      for (const seed of seeds) next = mergeSeedIntoList(next, seed);
      return next;
    });
  }

  function updateCustomItem(id, field, value) {
    setCustomItems((list) =>
      list.map((c) => {
        if (c.id !== id) return c;
        if (field === "label") {
          const label = String(value);
          if (isRestrictedCustomLabel(label)) return { ...c, label, qty: 0 };
          return { ...c, label };
        }
        if (field === "qty") return { ...c, qty: Math.max(0, Math.round(Number(value) || 0)) };
        if (field === "w") return { ...c, w: Math.max(1, Number(value) || 1) };
        if (field === "dh") return { ...c, dh: Math.max(0, Number(value) || 0) };
        if (field === "iconKey") return { ...c, iconKey: value || "other" };
        return c;
      })
    );
  }

  function patchCustomItem(id, patch) {
    setCustomItems((list) => list.map((c) => (c.id !== id ? c : { ...c, ...patch })));
  }

  function removeCustomItem(id) {
    setCustomItems((list) => list.filter((c) => c.id !== id));
  }

  function buildList() {
    if (!propType) return [];
    const list = [];
    for (const it of getItemsForProperty(propType)) {
      const q = qtys[it.id] || 0;
      if (q > 0) {
        list.push({
          id: it.id,
          label: q > 1 ? it.label + " ×" + q : it.label,
          iconKey: it.iconKey,
          w: it.w * q,
          h: hrs[it.id] !== undefined ? hrs[it.id] : it.dh,
        });
      }
    }
    return list.concat(customItemsToLoadEntries(customItems));
  }

  const catalogActive = propType
    ? getItemsForProperty(propType).filter((it) => (qtys[it.id] || 0) > 0).length
    : 0;
  const customActive = countActiveCustom(customItems);
  const totalActive = catalogActive + customActive;

  const appList = buildList();
  let livePeak = 0;
  let liveDailyWh = 0;
  for (const a of appList) {
    livePeak += a.w;
    liveDailyWh += a.w * a.h;
  }
  const liveKey = useMemo(
    () => appList.map((a) => String(a.id || a.label) + ":" + a.w + ":" + a.h).join("|"),
    [appList]
  );
  const liveSizing = useMemo(() => (totalActive > 0 ? size(appList) : null), [totalActive, liveKey]);

  const isCustomQuote = !!(sizing && sizing.fit && sizing.fit.customQuote);
  const selectedPackage = PACKAGES.find((p) => p.id === selectedPackageId) || null;
  const productsProductTotal = selectedPackage?.price || 0;
  const productsDeliveryQuote = getDeliveryQuote(deliveryOpts);
  const productsGrandTotal = quoteGrandTotal(productsProductTotal, productsDeliveryQuote);
  const deliveryQuote = sizing && !isCustomQuote ? getDeliveryQuote(deliveryOpts) : getDeliveryQuote({ enabled: false });
  const grandTotal = sizing && !isCustomQuote ? quoteGrandTotal(sizing.tot, deliveryQuote) : 0;
  const countTotal = useCount(grandTotal);

  useEffect(() => {
    scrollToTop();
  }, [nav]);

  function goResult() {
    const list = buildList();
    if (totalActive === 0) return;
    const sz2 = size(list);
    sz2.appList = list;
    if (sz2.pkg?.id) setSelectedPackageId(sz2.pkg.id);
    setSizing(sz2);
    setNav("quote");
    playStageSound("sized");
    requestAnimationFrame(() => scrollToTop());
  }

  function reset() {
    setPropType(null);
    setQtys({});
    setHrs({});
    setCustomItems([]);
    setSelectedPackageId(PACKAGES[0]?.id || null);
    setMarketingOptIn(false);
    setDeliveryOpts({ enabled: true, zone: "harare", locationLabel: "", distanceKm: 0 });
    setSizing(null);
    setNav("home");
    requestAnimationFrame(() => scrollToTop());
  }

  function goPackageQuote() {
    const pkgId = selectedPackageId || PACKAGES[0]?.id;
    if (!pkgId) return;
    const sz = sizeFromPackage(pkgId);
    if (!sz) return;
    setSizing(sz);
    setNav("quote");
    playStageSound("package");
    requestAnimationFrame(() => scrollToTop());
  }

  function openQuoteModal() {
    playStageSound("checkout");
    setShowModal(true);
  }

  function dismissPdfJob() {
    setPdfJob(null);
  }

  function goHomeFromPdfJob() {
    setShowModal(false);
    setLeadError("");
    setNav("home");
    requestAnimationFrame(() => scrollToTop());
  }

  function handlePrint(client) {
    if (!sizing) return;
    const custom = !!(sizing.fit && sizing.fit.customQuote);
    setLeadError("");
    setShowModal(false);
    setPdfJob({
      phase: "active",
      message: custom
        ? "Preparing your custom quote PDF — you can go home while we finish."
        : "Downloading your quote in the background — browse freely or tap Back to Home.",
    });

    (async () => {
      const liveDelivery = custom ? getDeliveryQuote({ enabled: false }) : getDeliveryQuote(deliveryOpts);
      let pdfDelivery = liveDelivery;
      if (!custom && liveDelivery.enabled) {
        const addr = (client.address || "").trim();
        const loc = getOutsideLocationLabel(addr) || deliveryOpts.locationLabel || addr;
        const km =
          deliveryOpts.distanceKm > 0
            ? deliveryOpts.distanceKm
            : estimateKmFromAddress(addr) || estimateKmFromAddress(loc) || 0;
        pdfDelivery = getDeliveryQuote({
          ...deliveryOpts,
          enabled: true,
          locationLabel: loc || deliveryOpts.locationLabel || addr,
          distanceKm: km || deliveryOpts.distanceKm,
        });
      }
      const pdfGrand = custom ? null : quoteGrandTotal(sizing.tot, pdfDelivery);

      try {
        setPdfJob((j) =>
          j?.phase === "active" ? { phase: "active", message: "Saving your details…" } : j
        );

        const leadResult = await submitLead({
          ...client,
          propertyType: propType,
          propertyLabel: propInfo ? propInfo.label : "",
          customQuote: custom,
          quoteTotal: custom ? null : sizing.tot,
          quoteGrandTotal: custom ? null : pdfGrand,
          deliveryInstall: pdfDelivery.enabled
            ? {
                enabled: true,
                zone: pdfDelivery.zone,
                fee: pdfDelivery.fee,
                feePending: !!pdfDelivery.feePending,
                locationLabel: pdfDelivery.locationLabel || "",
                km: pdfDelivery.km || 0,
              }
            : { enabled: false },
          peakW: sizing.pW,
          dailyWh: sizing.dWh,
          customAccessories: customItems.filter(isCustomItemActive).map((c) => ({
            label: String(c.label).trim(),
            watts: c.w,
            hoursPerDay: c.dh,
            qty: c.qty,
          })),
          marketingOptIn: !!marketingOptIn,
          submittedAt: new Date().toISOString(),
        });

        setPdfJob((j) =>
          j?.phase === "active" ? { phase: "active", message: "Generating PDF — check Downloads when ready…" } : j
        );

        const { downloadQuotePdf } = await import("./pdf.js?v=" + BUILD);
        const result = await downloadQuotePdf(
          client,
          sizing,
          sizing.appList,
          propInfo ? propInfo.label : "",
          pdfDelivery
        );

        const waUrl = paymentAssistWhatsAppUrl(
          client,
          sizing,
          propInfo ? propInfo.label : "",
          pdfDelivery,
          pdfGrand,
          custom
        );
        const waWin = window.open(waUrl, "_blank", "noopener,noreferrer");

        let msg =
          result?.mode === "print"
            ? "Print window opened — choose Save as PDF if your device did not download automatically."
            : "Quote saved — check your Downloads folder.";
        if (leadResult?.offline) msg += " Details saved on this device (server busy).";
        if (waWin) msg += " WhatsApp opened for payment help.";
        else msg += " Allow pop-ups to open WhatsApp, or message " + SUPPORT_PHONE + ".";

        setPdfJob({ phase: "done", message: msg });
        playStageSound("complete");
        setTimeout(() => {
          setPdfJob((j) => (j?.phase === "done" ? null : j));
        }, 14000);
      } catch (e) {
        setPdfJob({
          phase: "error",
          message: e.message || "Could not finish your quote. Try again from the quote screen.",
        });
      }
    })();
  }

  function selectNav(id) {
    if (id === "size" && !propType) return;
    if (id === "quote" && !sizing) return;
    setNav(id);
    scrollToTop();
  }

  const specs = sizing
    ? isCustomQuote
      ? [
          { label: "Peak load", val: sizing.pW.toLocaleString() + "W simultaneous", custom: true, Ico: ZapIco },
          { label: "Daily energy", val: sizing.dWh.toLocaleString() + " Wh/day", custom: true, Ico: PanIco },
          {
            label: "Estimated inverter",
            val: "~" + (sizing.kvaReq || sizing.kva) + " kVA+ required",
            custom: true,
            Ico: ZapIco,
          },
          {
            label: "Estimated battery",
            val: "~" + Math.round((sizing.fit.requiredBatteryWh || 0) / 1000) + " kWh+ usable",
            custom: true,
            Ico: BatIco,
          },
        ]
      : sizing.pkg
        ? [
            {
              label: "Solar package",
              val: sizing.pkg.name,
              tot: sizing.pkg.price,
              qty: 1,
              Ico: ZapIco,
            },
          ]
        : [
            { label: "Inverter", val: sizing.inv.brand + " " + sizing.inv.name, tot: sizing.inv.price, qty: 1, Ico: ZapIco },
            { label: "Batteries", val: sizing.bat.brand + " " + sizing.bat.name, tot: sizing.bat.price * sizing.bc, qty: sizing.bc, Ico: BatIco },
            { label: "Panels", val: sizing.pan.brand + " " + sizing.pan.name, tot: sizing.pan.price * sizing.pc, qty: sizing.pc, Ico: PanIco },
          ]
    : [];

  let main = null;
  if (nav === "home") {
    main = React.createElement(HomeScreen, {
      onPickProp: pickProp,
      onViewProducts: () => {
        setNav("products");
        scrollToTop();
      },
    });
  } else if (nav === "products") {
    main = React.createElement(ProductsScreen, {
      selectedId: selectedPackageId,
      onSelectPackage: setSelectedPackageId,
      productTotal: productsProductTotal,
      onContinueToQuote: goPackageQuote,
      onStartSizing: () => {
        setNav(propType ? "size" : "home");
        scrollToTop();
      },
      themeToggle: React.createElement(ThemeToggle, {
        theme,
        onToggle: () => setTheme((t) => toggleTheme(t)),
        compact: true,
        inline: true,
      }),
    });
  } else if (nav === "size") {
    main = propType
      ? React.createElement(BuildingScreen, {
          propType,
          propInfo,
          qtys,
          setQty,
          customItems,
          onAddCustomFromSeed: addCustomFromSeed,
          onAddCustomBulk: addCustomBulk,
          onUpdateCustom: updateCustomItem,
          onPatchCustom: patchCustomItem,
          onRemoveCustom: removeCustomItem,
          catalogActive,
          totalActive,
          livePeak,
          liveDailyWh,
          liveSizing,
          onCalculate: goResult,
          onChangeProperty: () => {
            setNav("home");
            scrollToTop();
          },
        })
      : React.createElement(
          "p",
          { style: { color: W4, fontSize: 14, textAlign: "center", padding: "24px 0" } },
          "Choose a property type on Home first."
        );
  } else if (nav === "quote" && sizing) {
    main = React.createElement(ResultScreen, {
      sizing,
      isCustomQuote,
      productTotal: isCustomQuote ? 0 : sizing.tot,
      deliveryOpts,
      onDeliveryChange: setDeliveryOpts,
      onLocationResolved: (address, meta) => {
        setDeliveryOpts((o) => {
          const had = (o.locationLabel || "").trim().length >= 3;
          const next = { ...o, ...applyAddressToDeliveryOpts(address, o, meta || {}) };
          if (!had && (next.locationLabel || "").trim().length >= 3) {
            playStageSound("install");
          }
          return next;
        });
      },
      deliveryQuote,
      grandTotal,
      setShowModal: openQuoteModal,
      reset,
      themeToggle: React.createElement(ThemeToggle, {
        theme,
        onToggle: () => setTheme((t) => toggleTheme(t)),
        compact: true,
        inline: true,
      }),
    });
  }

  return React.createElement(
    "div",
    {
      className:
        "app-shell" +
        (nav === "home" ? " app-shell--home" : "") +
        (nav === "size" ? " app-shell--sizer" : "") +
        (nav === "products" ? " app-shell--products" : "") +
        (nav === "quote" ? " app-shell--quote" : ""),
      style: {
        background: BG,
        backgroundImage: GRAD_HERO,
      },
    },
    React.createElement("style", null, globalStyles),
    nav === "home" && React.createElement(Particles, null),
    React.createElement(
      "main",
      {
        className:
          (nav === "home" ? "home-main-card" : "") +
          (nav === "size" ? " main-card--sizer" : "") +
          (nav === "products" ? " main-card--products" : "") +
          (nav === "quote" ? " main-card--quote" : "") +
          (nav !== "home" && nav !== "size" && nav !== "products" && nav !== "quote" ? " app-main-card" : ""),
        style: {
          ...CARD,
          width: "100%",
          maxWidth: "min(560px, 100%)",
          zIndex: 1,
          overflow: nav === "size" || nav === "quote" || nav === "products" ? "hidden" : "visible",
        },
      },
      nav !== "home" &&
        React.createElement("div", { style: { height: 3, background: "linear-gradient(90deg,#C9A227,#E8C547,#3DD68C)", borderRadius: "20px 20px 0 0", flexShrink: 0 } }),
      React.createElement(
        "div",
        {
          className:
            (nav === "home" ? "home-main-inner" : "") +
            (nav === "size" ? " main-inner--sizer" : "") +
            (nav === "quote" ? " main-inner--quote" : "") +
            (nav === "products" ? " main-inner--products" : ""),
          style: {
            padding:
              nav === "home" || nav === "size" || nav === "quote" || nav === "products"
                ? undefined
                : "clamp(20px, 5vw, 28px)",
          },
        },
        nav === "home" &&
          React.createElement(ThemeToggle, {
            theme,
            onToggle: () => setTheme((t) => toggleTheme(t)),
            compact: true,
            inline: true,
            className: "home-theme-slot",
          }),
        nav === "size" &&
          propType &&
          React.createElement(
            "div",
            { className: "sizer-page-header" },
            React.createElement(BrandSunMark, { size: 24, showLabel: true, centered: true }),
            React.createElement(ThemeToggle, {
              theme,
              onToggle: () => setTheme((t) => toggleTheme(t)),
              compact: true,
              inline: true,
            })
          ),
        nav !== "home" &&
          nav !== "size" &&
          nav !== "products" &&
          nav !== "quote" &&
          React.createElement(
            "div",
            { className: "screen-header" },
            React.createElement(ThemeToggle, {
              theme,
              onToggle: () => setTheme((t) => toggleTheme(t)),
              compact: true,
              inline: true,
            })
          ),
        nav === "size" &&
          !propType &&
          React.createElement(
            "div",
            { className: "screen-header" },
            React.createElement(ThemeToggle, {
              theme,
              onToggle: () => setTheme((t) => toggleTheme(t)),
              compact: true,
              inline: true,
            })
          ),
        React.createElement(ErrorBoundary, null, main)
      )
    ),
    showModal &&
      sizing &&
      React.createElement(ClientModal, {
        onClose: () => {
          setShowModal(false);
          setLeadError("");
        },
        onDone: handlePrint,
        error: leadError,
        deliveryOpts,
        onDeliveryChange: setDeliveryOpts,
        productTotal: sizing ? (isCustomQuote ? 0 : sizing.tot) : 0,
        customQuote: isCustomQuote,
        locationLabel: deliveryOpts.locationLabel || "",
        marketingOptIn,
        onMarketingOptInChange: setMarketingOptIn,
      }),
    React.createElement(PdfDownloadBanner, {
      job: pdfJob,
      onHome: goHomeFromPdfJob,
      onDismiss: dismissPdfJob,
    }),
    React.createElement(BottomNav, {
      active: nav,
      onSelect: selectNav,
      canSize: !!propType,
      canQuote: !!sizing,
    })
  );
}
