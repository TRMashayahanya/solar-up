import React, { useState, useEffect } from "react";
import { BG, GRAD_HERO, CARD, W4 } from "./tokens.js";
import { PROPS } from "./data.js";
import { size } from "./sizing.js";
import { downloadQuotePdf } from "./pdf.js";
import { submitLead } from "./api.js";
import { applyPreset } from "./prefills.js";
import { getItemsForProperty } from "./items.js";
import { newCustomItem, countActiveCustom, customItemsToLoadEntries, isCustomItemActive } from "./custom-items.js";
import { scrollToTop } from "./scroll.js";
import { getDeliveryQuote, quoteGrandTotal, isHarareAddress, getOutsideLocationLabel } from "./delivery.js";
import { ZapIco, BatIco, PanIco } from "./icons.js";
import { useCount, ClientModal, Particles, ErrorBoundary } from "./components.js";
import { HomeScreen, BuildingScreen, ResultScreen, ProductsScreen } from "./screens.js";
import { globalStyles, BrandHeader, BottomNav } from "./ui.js";
import { InstallHint } from "./install-hint.js";

export default function App() {
  const [nav, setNav] = useState("home");
  const [propType, setPropType] = useState(null);
  const [qtys, setQtys] = useState({});
  const [hrs, setHrs] = useState({});
  const [sizing, setSizing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [customItems, setCustomItems] = useState([]);
  const [deliveryOpts, setDeliveryOpts] = useState({ enabled: false, zone: "harare", locationLabel: "" });

  const propInfo = PROPS.find((p) => p.value === propType) || null;

  function pickProp(v) {
    const { qtys: q } = applyPreset(v);
    setPropType(v);
    setQtys(q);
    setHrs({});
    setCustomItems([]);
    setSizing(null);
    setNav("size");
    requestAnimationFrame(() => scrollToTop());
  }

  function setQty(id, val) {
    setQtys((p) => ({ ...p, [id]: Math.max(0, Math.round(val)) }));
  }

  function mergeSeedIntoList(list, seed) {
    const label = String(seed?.label || "").trim();
    if (!label) return list;
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
        if (field === "label") return { ...c, label: value };
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

  const deliveryQuote = sizing ? getDeliveryQuote(deliveryOpts) : getDeliveryQuote({ enabled: false });
  const grandTotal = sizing ? quoteGrandTotal(sizing.tot, deliveryQuote) : 0;
  const countTotal = useCount(grandTotal);

  useEffect(() => {
    scrollToTop();
  }, [nav]);

  function goResult() {
    const list = buildList();
    if (totalActive === 0) return;
    const sz2 = size(list);
    sz2.appList = list;
    setSizing(sz2);
    setNav("quote");
    requestAnimationFrame(() => scrollToTop());
  }

  function reset() {
    setPropType(null);
    setQtys({});
    setHrs({});
    setCustomItems([]);
    setDeliveryOpts({ enabled: false, zone: "harare", locationLabel: "" });
    setSizing(null);
    setNav("home");
    requestAnimationFrame(() => scrollToTop());
  }

  async function handlePrint(client) {
    if (!sizing) return;
    setPdfBusy(true);
    setLeadError("");

    const liveDelivery = getDeliveryQuote(deliveryOpts);
    let pdfDelivery = liveDelivery;
    if (liveDelivery.enabled && liveDelivery.zone === "outside") {
      const loc = getOutsideLocationLabel(client.address) || deliveryOpts.locationLabel || "";
      pdfDelivery = getDeliveryQuote({ enabled: true, zone: "outside", locationLabel: loc });
    }
    const pdfGrand = quoteGrandTotal(sizing.tot, pdfDelivery);

    try {
      const leadResult = await submitLead({
        ...client,
        propertyType: propType,
        propertyLabel: propInfo ? propInfo.label : "",
        quoteTotal: sizing.tot,
        quoteGrandTotal: pdfGrand,
        deliveryInstall: pdfDelivery.enabled
          ? {
              enabled: true,
              zone: pdfDelivery.zone,
              fee: pdfDelivery.fee,
              feePending: !!pdfDelivery.feePending,
              locationLabel: pdfDelivery.locationLabel || "",
              base: pdfDelivery.base,
              extra: pdfDelivery.extra,
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
        submittedAt: new Date().toISOString(),
      });

      const result = await downloadQuotePdf(
        client,
        sizing,
        sizing.appList,
        propInfo ? propInfo.label : "",
        pdfDelivery
      );
      setShowModal(false);
      if (leadResult?.offline) {
        setLeadError("Quote ready — details saved locally (server unavailable).");
        setTimeout(() => setLeadError(""), 5000);
      } else if (result?.mode === "print") {
        setLeadError("PDF opened for printing (direct download blocked in browser).");
        setTimeout(() => setLeadError(""), 5000);
      }
    } catch (e) {
      setLeadError(e.message || "Could not generate your quote. Please try again.");
    } finally {
      setPdfBusy(false);
    }
  }

  function selectNav(id) {
    if (id === "size" && !propType) return;
    if (id === "quote" && !sizing) return;
    setNav(id);
    scrollToTop();
  }

  const specs = sizing
    ? [
        { label: "Inverter", val: sizing.inv.brand + " " + sizing.inv.name, tot: sizing.inv.price, qty: 1, Ico: ZapIco },
        { label: "Batteries", val: sizing.bat.brand + " " + sizing.bat.name, tot: sizing.bat.price * sizing.bc, qty: sizing.bc, Ico: BatIco },
        { label: "Panels", val: sizing.pan.brand + " " + sizing.pan.name, tot: sizing.pan.price * sizing.pc, qty: sizing.pc, Ico: PanIco },
      ]
    : [];

  let main = null;
  if (nav === "home") {
    main = React.createElement(HomeScreen, { onPickProp: pickProp });
  } else if (nav === "products") {
    main = React.createElement(ProductsScreen, {
      onStartSizing: () => {
        setNav(propType ? "size" : "home");
        scrollToTop();
      },
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
          customActive,
          totalActive,
          livePeak,
          liveDailyWh,
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
      propInfo,
      specs,
      countTotal,
      productTotal: sizing.tot,
      deliveryOpts,
      onDeliveryChange: setDeliveryOpts,
      deliveryQuote,
      grandTotal,
      setShowModal,
      reset,
    });
  }

  return React.createElement(
    "div",
    {
      className: "app-shell",
      style: {
        minHeight: "100vh",
        background: BG,
        backgroundImage: GRAD_HERO,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "max(16px, env(safe-area-inset-top)) 16px max(100px, env(safe-area-inset-bottom))",
        position: "relative",
      },
    },
    React.createElement("style", null, globalStyles),
    React.createElement(Particles, null),
    React.createElement(BrandHeader, { compact: nav === "size" || nav === "quote" }),
    React.createElement(
      "main",
      {
        style: {
          ...CARD,
          width: "100%",
          maxWidth: 560,
          zIndex: 1,
          overflow: "visible",
        },
      },
      React.createElement("div", { style: { height: 3, background: "linear-gradient(90deg,#C9A227,#E8C547,#3DD68C)", borderRadius: "20px 20px 0 0" } }),
      React.createElement(
        "div",
        { style: { padding: "clamp(20px, 5vw, 28px)" } },
        React.createElement(ErrorBoundary, null, main)
      )
    ),
    React.createElement(
      "p",
      { style: { marginTop: 16, color: "rgba(255,255,255,.2)", fontSize: 11, zIndex: 1 } },
      "0773757018 · Energi Tech"
    ),
    showModal &&
      sizing &&
      React.createElement(ClientModal, {
        onClose: () => {
          setShowModal(false);
          setLeadError("");
        },
        onDone: handlePrint,
        busy: pdfBusy,
        error: leadError,
        deliveryOpts,
        onDeliveryChange: setDeliveryOpts,
        productTotal: sizing ? sizing.tot : 0,
        onAddressBlur: (address) => {
          const detected = isHarareAddress(address);
          const locationLabel = getOutsideLocationLabel(address);
          if (detected === true) {
            setDeliveryOpts((o) => ({ ...o, zone: "harare", locationLabel: "" }));
          } else if (detected === false) {
            setDeliveryOpts((o) => ({
              ...o,
              zone: "outside",
              locationLabel: locationLabel || o.locationLabel || "",
            }));
          } else if (locationLabel) {
            setDeliveryOpts((o) => ({ ...o, locationLabel }));
          }
        },
      }),
    React.createElement(BottomNav, {
      active: nav,
      onSelect: selectNav,
      canSize: !!propType,
      canQuote: !!sizing,
    }),
    React.createElement(InstallHint, null)
  );
}
