import React from "react";
import {
  G,
  GD,
  M,
  M_DIM,
  G_DIM,
  W4,
  W6,
  W8,
  W10,
  FONT_UI,
  FONT_DISPLAY,
  GRAD_GOLD,
  GRAD_GREEN,
  GRAD_HERO,
  CARD,
  CARD_ELEVATED,
  BORDER,
  BORDER_FOCUS,
  ci,
} from "./tokens.js";
import { MinIco, PlsIco, ArrLIco, ArrRIco, ChatIco, NavHomeIco, NavCatalogIco, NavSizeIco, NavQuoteIco, SunIco, LeafIco, XcoIco } from "./icons.js";
import { ApplianceIcon, CategoryIcon, IconTile } from "./appliance-icons.js";
export { ApplianceIcon, CategoryIcon, IconTile };
import { loadValueInsights } from "./loadValue.js";
import { productWhatsAppMessage, whatsAppChatUrl } from "./data.js";
import { environmentalImpact } from "./environment.js";

export const globalStyles =
  "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');" +
  "*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;margin:0}" +
  "html{-webkit-text-size-adjust:100%}html,body{background:#040608;font-family:" +
  FONT_UI +
  ";color:#F8FAFC;scroll-behavior:smooth;-webkit-font-smoothing:antialiased;min-height:100%}" +
  "body{padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)}" +
  "input,select,textarea{font-size:16px}" +
  "button{font-family:inherit;cursor:pointer}" +
  "button:disabled{cursor:not-allowed;opacity:.45}" +
  "input,textarea{font-family:inherit}" +
  "::-webkit-scrollbar{width:5px;height:5px}" +
  "::-webkit-scrollbar-thumb{background:rgba(232,197,71,.2);border-radius:4px}" +
  "@keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}" +
  "@keyframes fadeIn{from{opacity:0}to{opacity:1}}" +
  "@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}" +
  "@keyframes shimmer{0%{background-position:0% 50%}100%{background-position:200% 50%}}" +
  ".animate-rise{animation:rise .45s cubic-bezier(.22,1,.36,1) both}" +
  ".card-hover{transition:border-color .25s,box-shadow .25s,transform .25s}" +
  ".card-hover:hover{border-color:rgba(232,197,71,.45)!important;transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,.35),0 0 0 1px rgba(232,197,71,.12)}" +
  ".btn-primary{transition:transform .15s,box-shadow .2s,filter .15s}" +
  ".btn-primary:hover:not(:disabled){transform:translateY(-1px);filter:brightness(1.08);box-shadow:0 10px 36px rgba(232,197,71,.4)!important}" +
  ".btn-primary:active:not(:disabled){transform:translateY(0)}" +
  ".btn-wa:hover{transform:translateY(-1px);filter:brightness(1.06)}" +
  ".btn-wa:active{transform:translateY(0)}" +
  ".home-prop-card{text-align:left;width:100%;cursor:pointer;font-family:inherit}" +
  ".home-prop-card:hover{border-color:rgba(232,197,71,.4)!important}" +
  ".btn-ghost{transition:background .15s,border-color .15s,color .15s}" +
  ".btn-ghost:hover:not(:disabled){background:rgba(255,255,255,.07)!important;border-color:rgba(232,197,71,.25)!important;color:rgba(255,255,255,.85)!important}" +
  ".app-shell{padding-bottom:calc(108px + env(safe-area-inset-bottom, 0px))}" +
  ".sticky-actions{position:sticky;z-index:100;bottom:calc(76px + env(safe-area-inset-bottom, 0px));padding:16px 0 8px;margin-top:12px;background:linear-gradient(180deg,transparent 0%,rgba(8,12,10,.88) 26%,rgba(8,12,10,.98) 100%)}" +
  ".prop-card{transition:all .25s cubic-bezier(.22,1,.36,1)}" +
  ".prop-card:hover{border-color:rgba(232,197,71,.5)!important;background:linear-gradient(145deg,rgba(232,197,71,.08),rgba(255,255,255,.02))!important;box-shadow:0 8px 32px rgba(0,0,0,.3),0 0 0 1px rgba(232,197,71,.18)}" +
  ".section-body{animation:fadeIn .3s ease both}" +
  ".areas-scroll{-webkit-overflow-scrolling:touch;scrollbar-gutter:stable}" +
  ".gold-shimmer{background-size:200% auto;animation:shimmer 4s linear infinite}";

export function StepIndicator({ step, total, label }) {
  return React.createElement(
    "div",
    { style: { marginBottom: 20 } },
    React.createElement(
      "div",
      { style: { display: "flex", gap: 6, marginBottom: 10 } },
      Array.from({ length: total }, (_, i) =>
        React.createElement("div", {
          key: i,
          style: {
            flex: 1,
            height: 3,
            borderRadius: 2,
            background: i < step ? GRAD_GOLD : i === step ? "rgba(232,197,71,.5)" : "rgba(255,255,255,.08)",
            transition: "background .35s ease",
          },
        })
      )
    ),
    React.createElement(
      "p",
      {
        style: {
          color: G,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: 4,
        },
      },
      "Step " + step + " of " + total + (label ? " · " + label : "")
    )
  );
}

export function PageTitle({ title, subtitle }) {
  return React.createElement(
    "div",
    { style: { marginBottom: 16 } },
    React.createElement(
      "h1",
      {
        style: {
          fontFamily: FONT_DISPLAY,
          fontSize: "clamp(1.35rem, 4vw, 1.6rem)",
          fontWeight: 700,
          color: W10,
          lineHeight: 1.2,
          marginBottom: subtitle ? 6 : 0,
        },
      },
      title
    ),
    subtitle &&
      React.createElement("p", { style: { color: W4, fontSize: 13, lineHeight: 1.45, margin: 0 } }, subtitle)
  );
}

export function StatCard({ label, value, sub, accent }) {
  const col = accent || G;
  return React.createElement(
    "div",
    {
      style: {
        flex: 1,
        minWidth: 0,
        padding: "14px 16px",
        background: "rgba(255,255,255,.03)",
        border: "1px solid " + BORDER,
        borderRadius: 14,
      },
    },
    React.createElement(
      "p",
      { style: { color: W4, fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 } },
      label
    ),
    React.createElement("p", { style: { color: col, fontSize: 22, fontWeight: 700, lineHeight: 1, marginBottom: sub ? 4 : 0 } }, value),
    sub && React.createElement("p", { style: { color: W4, fontSize: 11, margin: 0 } }, sub)
  );
}

export function EcoImpactStrip({ dWh, dailyGenWh }) {
  if (!dWh && !dailyGenWh) return null;
  const eco = environmentalImpact(dWh, dailyGenWh || 0);
  return React.createElement(
    "div",
    {
      style: {
        marginTop: 12,
        padding: "12px 14px",
        background: "linear-gradient(90deg, rgba(61,214,140,.12), rgba(34,197,94,.06))",
        border: "1px solid rgba(61,214,140,.28)",
        borderRadius: 12,
      },
    },
    React.createElement(
      "div",
      { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 } },
      React.createElement(LeafIco, { s: 16, c: M }),
      React.createElement("p", { style: { color: M, fontSize: 12, fontWeight: 700, margin: 0 } }, "Less pollution")
    ),
    React.createElement(
      "p",
      { style: { color: W6, fontSize: 12, lineHeight: 1.5, margin: 0 } },
      "About ",
      React.createElement("strong", { style: { color: W10 } }, eco.co2KgYear.toLocaleString() + " kg"),
      " less CO₂ per year vs grid · like ",
      eco.trees,
      " trees · ",
      eco.carKm.toLocaleString(),
      " km car emissions avoided"
    )
  );
}

export function LoadMeter({ pW, dWh, applianceCount, dailyGenWh }) {
  if (!pW && !dWh) return null;
  const v = loadValueInsights(pW, dWh, applianceCount, dailyGenWh);
  return React.createElement(
    "div",
    {
      style: {
        ...CARD,
        padding: 14,
        marginBottom: 14,
        background: "linear-gradient(135deg, rgba(61,214,140,.08), rgba(232,197,71,.05))",
        border: "1px solid rgba(61,214,140,.2)",
      },
    },
    React.createElement(
      "div",
      { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
      React.createElement(StatCard, {
        label: v.peakLabel,
        value: (pW || 0).toLocaleString() + " W",
        sub: v.peakSub,
        accent: G,
      }),
      React.createElement(StatCard, {
        label: v.dailyLabel,
        value: (dWh || 0).toLocaleString() + " Wh",
        sub: v.dailySub,
        accent: M,
      })
    ),
    v.valueLine &&
      React.createElement("p", { style: { color: W4, fontSize: 11, margin: "10px 0 0" } }, v.valueLine),
    React.createElement(EcoImpactStrip, { dWh, dailyGenWh })
  );
}

export function QtyStepper({ value, onDec, onInc, max }) {
  const on = value > 0;
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 2,
        background: on ? G_DIM : "rgba(255,255,255,.04)",
        border: "1px solid " + (on ? BORDER_FOCUS : BORDER),
        borderRadius: 10,
        padding: 2,
      },
    },
    React.createElement(
      "button",
      {
        type: "button",
        "aria-label": "Decrease",
        onClick: onDec,
        disabled: value <= 0,
        style: {
          width: 32,
          height: 32,
          borderRadius: 8,
          border: "none",
          background: "transparent",
          color: on ? G : W4,
          ...ci,
        },
      },
      React.createElement(MinIco, { s: 14, c: "currentColor" })
    ),
    React.createElement(
      "span",
      {
        style: {
          minWidth: 28,
          textAlign: "center",
          fontSize: 15,
          fontWeight: 700,
          color: on ? G : W6,
          fontVariantNumeric: "tabular-nums",
        },
      },
      value
    ),
    React.createElement(
      "button",
      {
        type: "button",
        "aria-label": "Increase",
        onClick: onInc,
        disabled: max != null && value >= max,
        style: {
          width: 32,
          height: 32,
          borderRadius: 8,
          border: "none",
          background: GRAD_GOLD,
          color: "#0a0800",
          ...ci,
        },
      },
      React.createElement(PlsIco, { s: 14, c: "#0a0800" })
    )
  );
}

export function ApplianceRow({ item, q, onDec, onInc }) {
  const on = q > 0;
  return React.createElement(
    "div",
    {
      className: on ? "" : "",
      style: {
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        background: on ? "rgba(232,197,71,.06)" : "rgba(255,255,255,.02)",
        border: "1px solid " + (on ? "rgba(232,197,71,.25)" : BORDER),
        borderRadius: 12,
        transition: "background .15s, border-color .15s",
      },
    },
    React.createElement(
      IconTile,
      { size: 40, color: on ? G : W6, active: on },
      React.createElement(ApplianceIcon, { iconKey: item.iconKey, s: 18, c: on ? G : W6 })
    ),
    React.createElement(
      "div",
      { style: { minWidth: 0 } },
      React.createElement(
        "p",
        {
          style: {
            color: on ? W10 : W8,
            fontSize: 13,
            fontWeight: on ? 600 : 500,
            marginBottom: 3,
            lineHeight: 1.3,
          },
        },
        item.label
      ),
      on &&
        React.createElement("p", { style: { color: W4, fontSize: 10, margin: 0 } }, item.sub || item.w + "W")
    ),
    React.createElement(QtyStepper, { value: q, onDec, onInc })
  );
}

export function BottomNav({ active, onSelect, canSize, canQuote }) {
  const tabs = [
    { id: "home", Ico: NavHomeIco, label: "Home" },
    { id: "products", Ico: NavCatalogIco, label: "Products" },
    { id: "size", Ico: NavSizeIco, label: "Items", disabled: !canSize },
    { id: "quote", Ico: NavQuoteIco, label: "Quote", disabled: !canQuote },
  ];
  return React.createElement(
    "nav",
    {
      "aria-label": "Main",
      style: {
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "max(12px, env(safe-area-inset-bottom))",
        width: "min(560px, calc(100% - 24px))",
        zIndex: 9990,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 8px",
        background: "linear-gradient(180deg, rgba(8,12,10,.92), rgba(6,10,8,.98))",
        border: "1px solid rgba(255,255,255,.1)",
        borderRadius: 20,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 -8px 40px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.06)",
      },
    },
    tabs.map((t) => {
      const on = active === t.id;
      const dis = t.disabled;
      const col = dis ? "rgba(255,255,255,.2)" : on ? G : W6;
      return React.createElement(
        "button",
        {
          key: t.id,
          type: "button",
          "aria-label": t.label,
          disabled: dis,
          onClick: () => !dis && onSelect(t.id),
          style: {
            flex: 1,
            border: "none",
            background: on ? "rgba(232,197,71,.12)" : "transparent",
            borderRadius: 14,
            padding: "8px 4px",
            cursor: dis ? "not-allowed" : "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            opacity: dis ? 0.35 : 1,
          },
        },
        React.createElement(t.Ico, { s: 22, c: col }),
        React.createElement("span", { style: { fontSize: 9, fontWeight: on ? 700 : 500, color: col } }, t.label)
      );
    })
  );
}

export function HomeTabBar({ active, onSelect }) {
  const tabs = [
    { id: "size", label: "Size" },
    { id: "products", label: "Products" },
  ];
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        gap: 6,
        padding: 4,
        background: "rgba(255,255,255,.04)",
        border: "1px solid " + BORDER,
        borderRadius: 14,
        marginBottom: 20,
      },
    },
    tabs.map((t) => {
      const on = active === t.id;
      return React.createElement(
        "button",
        {
          key: t.id,
          type: "button",
          onClick: () => onSelect(t.id),
          style: {
            flex: 1,
            padding: "11px 12px",
            borderRadius: 10,
            border: "none",
            background: on ? GRAD_GOLD : "transparent",
            color: on ? "#0a0800" : W6,
            fontSize: 12,
            fontWeight: on ? 700 : 500,
            transition: "all .2s ease",
          },
        },
        t.label
      );
    })
  );
}

export function AreaContextBanner({ text }) {
  if (!text) return null;
  return React.createElement(
    "div",
    {
      style: {
        marginBottom: 12,
        padding: "12px 14px",
        background: "linear-gradient(90deg, rgba(232,197,71,.1), rgba(61,214,140,.06))",
        border: "1px solid rgba(232,197,71,.22)",
        borderRadius: 12,
        borderLeft: "3px solid " + G,
      },
    },
    React.createElement(
      "p",
      { style: { color: W6, fontSize: 12, lineHeight: 1.55, margin: 0 } },
      React.createElement("span", { style: { color: G, fontWeight: 600 } }, "Tip · "),
      text
    )
  );
}

export function ProductCard({ brand, name, spec, price, tag, Ico, waMessage }) {
  const msg = waMessage || productWhatsAppMessage(brand, name, price);
  const waHref = whatsAppChatUrl(msg);
  return React.createElement(
    "div",
    {
      style: {
        ...CARD,
        padding: "14px 16px",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto auto",
        alignItems: "center",
        gap: 10,
        transition: "border-color .2s, transform .2s",
      },
      className: "card-hover",
    },
    React.createElement(
      "div",
      {
        style: {
          width: 44,
          height: 44,
          borderRadius: 12,
          background: G_DIM,
          border: "1px solid rgba(232,197,71,.25)",
          ...ci,
        },
      },
      Ico ? React.createElement(Ico, { s: 20, c: G }) : React.createElement(SunIco, { s: 20, c: G })
    ),
    React.createElement(
      "div",
      { style: { minWidth: 0 } },
      React.createElement("p", { style: { color: W4, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 } }, brand),
      React.createElement("p", { style: { color: W10, fontSize: 13, fontWeight: 600, marginBottom: 3 } }, name),
      React.createElement("p", { style: { color: W4, fontSize: 11 } }, spec)
    ),
    React.createElement(
      "div",
      { style: { textAlign: "right", minWidth: 52 } },
      React.createElement("p", { style: { color: G, fontSize: 16, fontWeight: 700 } }, "$" + price),
      tag &&
        React.createElement(
          "span",
          {
            style: {
              fontSize: 9,
              color: W4,
              background: "rgba(255,255,255,.05)",
              padding: "2px 8px",
              borderRadius: 10,
              marginTop: 4,
              display: "inline-block",
            },
          },
          tag
        )
    ),
    React.createElement(
      "a",
      {
        href: waHref,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": "WhatsApp Energi Tech about " + name,
        title: "Chat on WhatsApp",
        style: {
          width: 40,
          height: 40,
          borderRadius: 11,
          background: "linear-gradient(135deg, #1A5C40, #3DD68C)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 4px 16px rgba(61,214,140,.3)",
          textDecoration: "none",
        },
      },
      React.createElement(ChatIco, { s: 18, c: "#fff" })
    )
  );
}

export function SectionAccordion({ cat, open, onToggle, activeCount, children }) {
  return React.createElement(
    "div",
    {
      style: {
        border: "1px solid " + BORDER,
        borderRadius: 14,
        overflow: "hidden",
        background: "rgba(255,255,255,.02)",
      },
    },
    React.createElement(
      "button",
      {
        type: "button",
        onClick: onToggle,
        "aria-expanded": open,
        style: {
          width: "100%",
          padding: "14px 16px",
          background: open ? cat.color + "14" : "transparent",
          border: "none",
          borderBottom: open ? "1px solid " + BORDER : "none",
          display: "flex",
          alignItems: "center",
          gap: 12,
          textAlign: "left",
        },
      },
      React.createElement(
        IconTile,
        { size: 40, color: cat.color },
        React.createElement(CategoryIcon, { iconKey: cat.iconKey || cat.id, s: 18, c: cat.color })
      ),
      React.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.createElement("p", { style: { color: W10, fontSize: 14, fontWeight: 600, margin: 0 } }, cat.q)
      ),
      React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 8, flexShrink: 0 } },
        React.createElement(
          "span",
          {
            style: {
              fontSize: 11,
              fontWeight: 600,
              color: activeCount > 0 ? M : W4,
              background: activeCount > 0 ? M_DIM : "rgba(255,255,255,.05)",
              padding: "4px 10px",
              borderRadius: 20,
            },
          },
          activeCount > 0 ? activeCount + " active" : "none"
        ),
        React.createElement(
          "span",
          {
            style: {
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(255,255,255,.06)",
              color: W6,
              fontSize: 16,
              fontWeight: 300,
              ...ci,
            },
          },
          open ? "−" : "+"
        )
      )
    ),
    open &&
      React.createElement(
        "div",
        { className: "section-body", style: { padding: 12, display: "flex", flexDirection: "column", gap: 8 } },
        children
      )
  );
}

export function BtnPrimary({ children, onClick, disabled, full, icon }) {
  return React.createElement(
    "button",
    {
      type: "button",
      className: "btn-primary",
      onClick,
      disabled,
      style: {
        width: full ? "100%" : undefined,
        flex: full ? undefined : 1,
        padding: "14px 20px",
        background: GRAD_GOLD,
        border: "none",
        borderRadius: 12,
        color: "#0a0800",
        fontSize: 14,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        boxShadow: "0 4px 20px rgba(232,197,71,.25)",
      },
    },
    icon,
    children
  );
}

export function BtnWhatsApp({ href, label, sublabel, full }) {
  return React.createElement(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "btn-wa",
      "aria-label": label || "Chat on WhatsApp",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: full ? "100%" : undefined,
        padding: sublabel ? "14px 18px" : "15px 20px",
        background: GRAD_GREEN,
        border: "1px solid rgba(61,214,140,.45)",
        borderRadius: 14,
        color: "#fff",
        fontSize: 14,
        fontWeight: 700,
        textDecoration: "none",
        boxShadow: "0 8px 28px rgba(61,214,140,.35)",
        transition: "transform .15s, filter .15s",
      },
    },
    React.createElement(ChatIco, { s: 20, c: "#fff" }),
    React.createElement(
      "span",
      { style: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 } },
      React.createElement("span", null, label || "WhatsApp Energi Tech"),
      sublabel &&
        React.createElement("span", { style: { fontSize: 11, fontWeight: 500, opacity: 0.9 } }, sublabel)
    )
  );
}

export function ItemGroupHeader({ label, hint, color, iconKey, first }) {
  const col = color || G;
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: first ? "4px 4px 8px" : "14px 4px 8px",
        marginTop: first ? 0 : 8,
        borderTop: first ? "none" : "1px solid rgba(255,255,255,.06)",
      },
    },
    React.createElement(
      IconTile,
      { size: 32, color: col },
      React.createElement(CategoryIcon, { iconKey: iconKey, s: 15, c: col })
    ),
    React.createElement(
      "div",
      { style: { minWidth: 0 } },
      React.createElement(
        "p",
        {
          style: {
            color: W10,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            margin: 0,
          },
        },
        label
      ),
      hint &&
        React.createElement("p", { style: { color: W4, fontSize: 11, margin: "4px 0 0", lineHeight: 1.4 } }, hint)
    )
  );
}

export function BtnGhost({ children, onClick, icon, full }) {
  return React.createElement(
    "button",
    {
      type: "button",
      className: "btn-ghost",
      onClick,
      style: {
        width: full ? "100%" : undefined,
        padding: "14px 18px",
        background: "transparent",
        border: "1px solid " + BORDER,
        borderRadius: 12,
        color: W6,
        fontSize: 14,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      },
    },
    icon,
    children
  );
}

export function AreaNavPills({ cats, activeId, onSelect, qtys }) {
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        gap: 8,
        overflowX: "auto",
        paddingBottom: 4,
        marginBottom: 14,
        WebkitOverflowScrolling: "touch",
      },
    },
    cats.map((c) => {
      const n = c.items.filter((it) => (qtys[it.id] || 0) > 0).length;
      const active = activeId === c.id;
      return React.createElement(
        "button",
        {
          key: c.id,
          type: "button",
          onClick: () => onSelect(c.id),
          style: {
            flexShrink: 0,
            padding: "8px 14px",
            borderRadius: 20,
            border: "1px solid " + (active ? BORDER_FOCUS : BORDER),
            background: active ? G_DIM : "rgba(255,255,255,.03)",
            color: active ? G : W6,
            fontSize: 12,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 6,
          },
        },
        React.createElement("span", null, c.icon),
        c.q,
        n > 0 &&
          React.createElement("span", {
            style: {
              fontSize: 10,
              background: M_DIM,
              color: M,
              padding: "2px 6px",
              borderRadius: 10,
            },
          }, n)
      );
    })
  );
}

export function EmptyHint({ text }) {
  return React.createElement(
    "p",
    {
      style: {
        textAlign: "center",
        color: W4,
        fontSize: 13,
        padding: "24px 16px",
        lineHeight: 1.5,
      },
    },
    text
  );
}

export function BrandHeader({ compact }) {
  return React.createElement(
    "header",
    {
      style: {
        textAlign: "center",
        marginBottom: compact ? 12 : 22,
        zIndex: 1,
        width: "100%",
        maxWidth: 560,
      },
    },
    React.createElement(
      "div",
      {
        style: {
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          marginBottom: 6,
          padding: compact ? "10px 20px" : "12px 24px",
          background: "linear-gradient(145deg, rgba(255,255,255,.05), rgba(255,255,255,.02))",
          border: "1px solid rgba(232,197,71,.2)",
          borderRadius: 40,
          boxShadow: "0 4px 24px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.06)",
        },
      },
      React.createElement(
        "span",
        {
          className: "gold-shimmer",
          style: {
            fontFamily: FONT_DISPLAY,
            fontSize: compact ? 22 : 26,
            fontWeight: 700,
            letterSpacing: "0.22em",
            background: GRAD_GOLD,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          },
        },
        "SOLAR UP"
      ),
      !compact &&
        React.createElement(
          "span",
          {
            style: {
              fontSize: 9,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: G,
              fontWeight: 600,
              opacity: 0.85,
            },
          },
          "Premium solar sizing"
        )
    ),
    React.createElement(
      "p",
      { style: { fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: W4, fontWeight: 500 } },
      "Powered by ",
      React.createElement("span", { style: { color: G, fontWeight: 600 } }, "Energi Tech")
    )
  );
}
