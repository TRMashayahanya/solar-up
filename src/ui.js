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
import { computePowerQuestState } from "./power-quest.js";
export { computePowerQuestState } from "./power-quest.js";

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
  "@keyframes pqEnter{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}" +
  "@keyframes pqSunPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}" +
  "@keyframes pqSunBreathe{0%,100%{filter:drop-shadow(0 0 8px rgba(232,197,71,.25))}50%{filter:drop-shadow(0 0 20px rgba(232,197,71,.55))}}" +
  "@keyframes pqFillShine{0%{background-position:200% 50%}100%{background-position:-200% 50%}}" +
  "@keyframes pqDotPop{0%{transform:scale(.5);opacity:0}70%{transform:scale(1.2)}100%{transform:scale(1);opacity:1}}" +
  "@keyframes pqTierPulse{0%,100%{box-shadow:0 0 0 0 rgba(232,197,71,0)}50%{box-shadow:0 0 0 6px rgba(232,197,71,.2)}}" +
  ".power-quest{animation:pqEnter .35s cubic-bezier(.22,1,.36,1) both}" +
  ".power-quest--bar{position:sticky;top:0;z-index:80;padding:8px 10px;margin:0 0 6px;border-radius:12px;background:rgba(10,16,13,.94);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.08);box-shadow:0 4px 20px rgba(0,0,0,.35)}" +
  ".pq-bar-row{display:flex;align-items:center;gap:8px}" +
  ".pq-bar-main{flex:1;min-width:0}" +
  ".pq-bar-top{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:5px}" +
  ".pq-bar-title{color:#F8FAFC;font-size:12px;font-weight:700;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-0.02em}" +
  ".pq-bar-stats{color:rgba(255,255,255,.45);font-size:10px;font-weight:500;white-space:nowrap;flex-shrink:0;font-variant-numeric:tabular-nums}" +
  ".pq-bar-track{position:relative;height:6px;border-radius:999px;background:rgba(0,0,0,.45);overflow:hidden}" +
  ".pq-dots-row{display:flex;gap:3px;margin-top:6px;padding:0 1px}" +
  ".pq-dots-row .pq-dot-wrap{flex:1;min-width:0;display:flex;justify-content:center}" +
  ".pq-sun-wrap--sm{width:32px;height:32px;border-radius:10px;display:grid;place-items:center;flex-shrink:0;background:rgba(255,255,255,.04);border:1px solid rgba(232,197,71,.18)}" +
  ".pq-sun-wrap{animation:pqSunBreathe 2.8s ease-in-out infinite}" +
  ".pq-sun-wrap--pulse{animation:pqSunPulse .6s cubic-bezier(.34,1.56,.64,1) 2}" +
  ".pq-fill{height:100%;border-radius:999px;transition:width .75s cubic-bezier(.34,1.2,.64,1);will-change:width}" +
  ".pq-fill--charge{background:linear-gradient(90deg,#8B6914,#C9A227,#E8C547,#C9A227);background-size:220% 100%;animation:pqFillShine 2.4s linear infinite;box-shadow:0 0 16px rgba(232,197,71,.35)}" +
  ".pq-fill--package{background:linear-gradient(90deg,#C9A227,#E8C547,#5EE4A0,#3DD68C);background-size:200% 100%;animation:pqFillShine 3s linear infinite;box-shadow:0 0 18px rgba(61,214,140,.3)}" +
  ".pq-fill--boss{background:linear-gradient(90deg,#DC2626,#F97316,#FBBF24);background-size:200% 100%;animation:pqFillShine 2s linear infinite;box-shadow:0 0 18px rgba(248,113,113,.35)}" +
  ".pq-dot{transition:transform .35s cubic-bezier(.34,1.56,.64,1),background .3s ease,box-shadow .3s ease}" +
  ".pq-dot--active{animation:pqTierPulse 2s ease-in-out infinite}" +
  ".pq-dot--pop{animation:pqDotPop .45s cubic-bezier(.34,1.56,.64,1) both}" +
  ".pq-track-glow{position:relative}" +
  ".pq-track-glow::after{content:'';position:absolute;inset:-1px;border-radius:999px;padding:1px;background:linear-gradient(90deg,rgba(232,197,71,.25),rgba(61,214,140,.15),rgba(232,197,71,.1));-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;opacity:.6}" +
  "@keyframes homeSunSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}" +
  "@keyframes homeMarqueeScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}" +
  ".home-marquee-wrap{position:relative;overflow:hidden;height:36px;margin-bottom:10px;border-radius:10px;" +
  "background:linear-gradient(90deg,rgba(15,31,23,.9),rgba(8,12,10,.95));" +
  "border:1px solid rgba(232,197,71,.18);box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}" +
  ".home-marquee-wrap::before,.home-marquee-wrap::after{content:'';position:absolute;top:0;bottom:0;width:28px;z-index:2;pointer-events:none}" +
  ".home-marquee-wrap::before{left:0;background:linear-gradient(90deg,rgba(8,12,10,.95),transparent)}" +
  ".home-marquee-wrap::after{right:0;background:linear-gradient(270deg,rgba(8,12,10,.95),transparent)}" +
  ".home-marquee-track{display:flex;width:max-content;animation:homeMarqueeScroll 32s linear infinite;will-change:transform}" +
  ".home-marquee-wrap:hover .home-marquee-track{animation-play-state:paused}" +
  ".home-marquee-set{display:flex;align-items:center;gap:8px;padding:0 6px;flex-shrink:0}" +
  ".home-marquee-pill{flex-shrink:0;padding:4px 11px;border-radius:999px;font-size:10px;font-weight:600;" +
  "letter-spacing:.04em;white-space:nowrap;color:rgba(255,255,255,.82);" +
  "background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1)}" +
  ".home-marquee-pill--accent{color:#E8C547;background:rgba(232,197,71,.12);border-color:rgba(232,197,71,.35)}" +
  ".home-marquee-pill--green{color:#3DD68C;background:rgba(61,214,140,.1);border-color:rgba(61,214,140,.3)}" +
  "@media (prefers-reduced-motion:reduce){.home-marquee-track{animation:none;overflow-x:auto}.home-brand-sun{animation:none}}" +
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
  ".home-screen{display:flex;flex-direction:column;gap:0;min-height:0}" +
  ".home-body{display:flex;flex-direction:column;gap:clamp(16px,4vw,20px);padding-top:clamp(20px,5vw,28px)}" +
  ".home-section{display:flex;flex-direction:column;gap:clamp(10px,2.5vw,12px)}" +
  ".home-section-head{display:flex;flex-direction:column;gap:3px}" +
  ".home-section-label{font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,.45);margin:0}" +
  ".home-section-hint{font-size:12px;color:rgba(255,255,255,.35);margin:0;line-height:1.4;letter-spacing:-0.01em}" +
  ".home-brand{text-align:center;padding:clamp(8px,2vw,12px) 0 0}" +
  ".home-brand-lockup{display:inline-flex;align-items:center;gap:clamp(12px,3vw,16px);margin-bottom:clamp(10px,2.5vw,14px)}" +
  ".home-brand-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;background:none;border:none;box-shadow:none;border-radius:0;padding:0}" +
  ".home-brand-sun{display:inline-flex;background:none;overflow:visible;animation:homeSunSpin 20s linear infinite;filter:drop-shadow(0 0 14px rgba(232,197,71,.4))}" +
  ".home-brand-sun svg{display:block;background:transparent}" +
  ".home-brand-text{text-align:left}" +
  ".home-brand-mark{font-family:" + FONT_DISPLAY + ";font-size:clamp(1.75rem,6vw,2rem);font-weight:700;line-height:1;margin:0;letter-spacing:0.02em;background:linear-gradient(135deg,#C9A227,#E8C547,#F5E6A8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}" +
  ".home-brand-by{font-size:10px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:rgba(232,197,71,.8);margin:6px 0 0}" +
  ".home-brand-tag{font-size:clamp(13px,3.4vw,14px);color:rgba(255,255,255,.55);margin:0;line-height:1.5;max-width:32ch;margin-left:auto;margin-right:auto;letter-spacing:-0.01em}" +
  ".home-install-cta{display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;max-width:280px;margin:clamp(10px,2.5vw,14px) auto 0;padding:11px 16px;border-radius:14px;" +
  "font-size:13px;font-weight:600;font-family:inherit;text-decoration:none;cursor:pointer;color:#0a0800;" +
  "background:linear-gradient(135deg,#C9A227,#E8C547);border:1px solid rgba(232,197,71,.5);box-shadow:0 4px 20px rgba(232,197,71,.2);transition:transform .15s,box-shadow .15s}" +
  ".home-install-cta:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(232,197,71,.28)}" +
  ".home-install-cta:active{transform:translateY(0)}" +
  ".home-steps{display:flex;justify-content:center;gap:clamp(6px,2vw,10px);flex-wrap:wrap;margin-top:clamp(14px,3.5vw,18px)}" +
  ".home-step-pill{padding:6px 12px;border-radius:999px;font-size:11px;font-weight:500;color:rgba(255,255,255,.5);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);letter-spacing:-0.01em}" +
  ".home-step-pill span{color:rgba(232,197,71,.85);font-weight:600;margin-right:4px}" +
  ".home-prop-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(8px,2vw,10px)}" +
  ".home-prop-tile{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:14px 14px 13px;min-height:88px;border-radius:16px;background:linear-gradient(160deg,rgba(255,255,255,.045),rgba(255,255,255,.015));border:1px solid rgba(255,255,255,.08);cursor:pointer;font-family:inherit;text-align:left;width:100%;overflow:hidden;transition:background .2s,border-color .2s,transform .2s,box-shadow .2s}" +
  ".home-prop-tile::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--prop-accent, rgba(232,197,71,.5));opacity:.85;border-radius:16px 0 0 16px}" +
  ".home-prop-tile:hover{background:linear-gradient(160deg,rgba(232,197,71,.08),rgba(255,255,255,.03));border-color:rgba(232,197,71,.25);transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,0,0,.25)}" +
  ".home-prop-tile:active{transform:translateY(0)}" +
  ".home-prop-top{display:flex;align-items:center;gap:10px;width:100%}" +
  ".home-prop-icon{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;flex-shrink:0}" +
  ".home-prop-label{color:#F8FAFC;font-size:14px;font-weight:600;margin:0;line-height:1.2;letter-spacing:-0.02em}" +
  ".home-prop-sub{color:rgba(255,255,255,.42);font-size:11px;margin:3px 0 0;line-height:1.25}" +
  ".home-prop-arrow{margin-left:auto;opacity:.35;flex-shrink:0}" +
  ".home-prop-tile:hover .home-prop-arrow{opacity:.7}" +
  ".home-packages-link{display:block;width:100%;margin-top:4px;padding:12px;border-radius:14px;border:1px solid rgba(255,255,255,.08);background:transparent;color:rgba(255,255,255,.55);font-size:12px;font-weight:500;font-family:inherit;cursor:pointer;text-align:center;transition:background .15s,border-color .15s,color .15s}" +
  ".home-packages-link:hover{background:rgba(255,255,255,.04);border-color:rgba(255,255,255,.14);color:rgba(255,255,255,.85)}" +
  ".home-main-card{background:linear-gradient(180deg,rgba(14,20,17,.9),rgba(8,12,10,.94))!important;border:1px solid rgba(255,255,255,.08)!important;box-shadow:0 20px 56px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.06)!important;border-radius:clamp(20px,4.5vw,24px)!important;backdrop-filter:blur(28px)!important;-webkit-backdrop-filter:blur(28px)!important;overflow:hidden!important}" +
  ".home-main-card::before{content:'';display:block;height:3px;background:linear-gradient(90deg,#C9A227,#E8C547,#3DD68C);opacity:.9}" +
  ".home-main-inner{padding:clamp(18px,4.5vw,24px) clamp(18px,4.5vw,22px) clamp(20px,5vw,26px)!important}" +
  ".app-shell--home{justify-content:center;min-height:100dvh;padding-top:max(14px,env(safe-area-inset-top))!important;padding-left:max(16px,env(safe-area-inset-left))!important;padding-right:max(16px,env(safe-area-inset-right))!important}" +
  ".home-footer-note{text-align:center;font-size:10px;color:rgba(255,255,255,.25);margin-top:clamp(14px,3.5vw,18px);letter-spacing:0.06em}" +
  ".btn-ghost{transition:background .15s,border-color .15s,color .15s}" +
  ".btn-ghost:hover:not(:disabled){background:rgba(255,255,255,.07)!important;border-color:rgba(232,197,71,.25)!important;color:rgba(255,255,255,.85)!important}" +
  ".app-shell{padding-bottom:calc(108px + env(safe-area-inset-bottom, 0px))}" +
  ".app-shell--home{padding-bottom:calc(92px + env(safe-area-inset-bottom, 0px))}" +
  ".sticky-actions{position:sticky;z-index:100;bottom:calc(76px + env(safe-area-inset-bottom, 0px));padding:16px 0 8px;margin-top:12px;background:linear-gradient(180deg,transparent 0%,rgba(8,12,10,.88) 26%,rgba(8,12,10,.98) 100%)}" +
  ".prop-card{transition:all .25s cubic-bezier(.22,1,.36,1)}" +
  ".prop-card:hover{border-color:rgba(232,197,71,.5)!important;background:linear-gradient(145deg,rgba(232,197,71,.08),rgba(255,255,255,.02))!important;box-shadow:0 8px 32px rgba(0,0,0,.3),0 0 0 1px rgba(232,197,71,.18)}" +
  ".section-body{animation:fadeIn .3s ease both}" +
  ".areas-scroll{-webkit-overflow-scrolling:touch;scrollbar-gutter:stable}" +
  ".gold-shimmer{background-size:200% auto;animation:shimmer 4s linear infinite}" +
  ".sizer-screen{display:flex;flex-direction:column;min-height:0;flex:1}" +
  ".sizer-scroll{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;min-height:0;max-height:min(calc(100dvh - 168px),640px);padding-bottom:8px}" +
  ".sizer-header-outside{flex-shrink:0;margin-bottom:6px}" +
  ".sizer-end-sentinel{height:1px;width:100%;pointer-events:none;visibility:hidden}" +
  ".sizer-calculate-end{padding:14px 0 10px;margin-top:4px;border-top:1px solid rgba(255,255,255,.08);animation:pqEnter .35s cubic-bezier(.22,1,.36,1) both}";

export function StepIndicator({ step, total }) {
  if (!total || total < 2) return null;
  return React.createElement(
    "div",
    {
      style: { display: "flex", gap: 5, marginBottom: 12 },
      role: "progressbar",
      "aria-valuenow": step + 1,
      "aria-valuemin": 1,
      "aria-valuemax": total,
    },
    Array.from({ length: total }, (_, i) =>
      React.createElement("div", {
        key: i,
        style: {
          flex: 1,
          height: 3,
          borderRadius: 2,
          background: i <= step ? GRAD_GOLD : "rgba(255,255,255,.08)",
          transition: "background .35s ease",
        },
      })
    )
  );
}

export function PageTitle({ title, subtitle }) {
  return React.createElement(
    "div",
    { style: { marginBottom: subtitle ? 12 : 10 } },
    React.createElement(
      "h1",
      {
        style: {
          fontFamily: FONT_DISPLAY,
          fontSize: "clamp(1.2rem, 4vw, 1.4rem)",
          fontWeight: 700,
          color: W10,
          lineHeight: 1.2,
          marginBottom: subtitle ? 4 : 0,
        },
      },
      title
    ),
    subtitle &&
      React.createElement("p", { style: { color: W4, fontSize: 12, lineHeight: 1.35, margin: 0 } }, subtitle)
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

const HOME_MARQUEE_ITEMS = [
  { text: "Energi Tech · Zimbabwe", accent: true },
  { text: "SolarApp — free sizing", accent: true },
  { text: "Tailored appliance lists" },
  { text: "PDF quote in minutes" },
  { text: "Homes · shops · farms" },
  { text: "Load shedding ready" },
  { text: "Eco-friendly impact" },
  { text: "Property → load → quote" },
  { text: "Zimbabwean prefills", green: true },
  { text: "WhatsApp support" },
];

export function HomeMarquee({ items }) {
  const pills = items && items.length ? items : HOME_MARQUEE_ITEMS;
  const renderSet = (keyPrefix) =>
    React.createElement(
      "div",
      { className: "home-marquee-set", key: keyPrefix },
      pills.map((item, i) =>
        React.createElement(
          "span",
          {
            key: keyPrefix + i,
            className:
              "home-marquee-pill" +
              (item.accent ? " home-marquee-pill--accent" : "") +
              (item.green ? " home-marquee-pill--green" : ""),
          },
          item.text
        )
      )
    );

  return React.createElement(
    "div",
    { className: "home-marquee-wrap", role: "marquee", "aria-label": "SolarApp highlights" },
    React.createElement(
      "div",
      { className: "home-marquee-track" },
      renderSet("a"),
      renderSet("b")
    )
  );
}

export function HomeBrand() {
  return React.createElement(
    "header",
    { className: "home-brand" },
    React.createElement(
      "div",
      { className: "home-brand-lockup" },
      React.createElement(
        "div",
        { className: "home-brand-icon", "aria-hidden": true },
        React.createElement(
          "span",
          { className: "home-brand-sun" },
          React.createElement(SunIco, { s: 28, c: G })
        )
      ),
      React.createElement(
        "div",
        { className: "home-brand-text" },
        React.createElement("h1", { className: "home-brand-mark" }, "SolarApp"),
        React.createElement("p", { className: "home-brand-by" }, "Energi Tech")
      )
    ),
    React.createElement(
      "p",
      { className: "home-brand-tag" },
      "Free solar sizing for Zimbabwe"
    )
  );
}

/** Compact eco summary — shown on quote screen & PDF only. */
export function EcoQuoteFootprint({ dWh, dailyGenWh }) {
  if (!dWh && !dailyGenWh) return null;
  const eco = environmentalImpact(dWh, dailyGenWh || 0);
  const items = [
    { v: eco.co2Tonnes + "t", l: "CO₂ vs grid/yr" },
    { v: String(eco.trees), l: "Trees eq." },
    { v: eco.carKm >= 1000 ? Math.round(eco.carKm / 1000) + "k km" : eco.carKm + " km", l: "Car off-road" },
  ];
  return React.createElement(
    "div",
    {
      style: {
        marginBottom: 12,
        padding: "10px 8px",
        borderRadius: 10,
        background: "linear-gradient(90deg, rgba(61,214,140,.1), rgba(15,31,23,.4))",
        border: "1px solid rgba(61,214,140,.22)",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 4,
        textAlign: "center",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          gridColumn: "1 / -1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginBottom: 2,
        },
      },
      React.createElement(LeafIco, { s: 11, c: M }),
      React.createElement("span", { style: { color: M, fontSize: 10, fontWeight: 600 } }, "Green impact")
    ),
    items.map((it) =>
      React.createElement(
        "div",
        { key: it.l },
        React.createElement("p", { style: { color: W10, fontSize: 15, fontWeight: 700, margin: 0, lineHeight: 1.1 } }, it.v),
        React.createElement("p", { style: { color: W4, fontSize: 9, margin: "2px 0 0" } }, it.l)
      )
    )
  );
}

/** @deprecated Use EcoQuoteFootprint on quote; LoadMeter no longer includes eco. */
export function EcoImpactStrip(props) {
  return React.createElement(EcoQuoteFootprint, props);
}

/** Live load on sizer — minimal inline stats only. */
export function LoadMeter({ pW, dWh, applianceCount, dailyGenWh, minimal }) {
  if (!pW && !dWh) return null;
  const kwhDay = dWh > 0 ? (dWh / 1000).toFixed(1) : "0";
  if (minimal) {
    return React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 11,
          color: W6,
          flexShrink: 0,
        },
      },
      React.createElement(
        "span",
        null,
        React.createElement("strong", { style: { color: G, fontWeight: 700 } }, (pW || 0).toLocaleString()),
        " W"
      ),
      React.createElement("span", { style: { color: W4 } }, "·"),
      React.createElement(
        "span",
        null,
        React.createElement("strong", { style: { color: M, fontWeight: 700 } }, kwhDay),
        " kWh"
      )
    );
  }
  const v = loadValueInsights(pW, dWh, applianceCount, dailyGenWh);
  return React.createElement(
    "div",
    {
      style: {
        ...CARD,
        padding: 12,
        marginBottom: 12,
        background: "rgba(255,255,255,.03)",
        border: "1px solid rgba(255,255,255,.08)",
      },
    },
    React.createElement(
      "div",
      { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } },
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
    )
  );
}

function clamp01(x) {
  return Math.max(0, Math.min(1, Number(x) || 0));
}

function fmtWh(dWh) {
  if (!dWh) return "0 Wh/day";
  if (dWh >= 1000) return (dWh / 1000).toFixed(dWh >= 10000 ? 0 : 1) + " kWh/day";
  return Math.round(dWh) + " Wh/day";
}

/** Game-style package progress while building a load */
export function PowerQuestMeter({ sizingLike, peakW, dailyWh }) {
  const st = computePowerQuestState(sizingLike, peakW, dailyWh);
  const {
    pkgs,
    custom,
    qualified,
    qualifyingPct,
    litIndex,
    fillPct,
    emptyZoneFrac,
    tierKey,
    firstPkg,
    activePkg,
  } = st;

  const prevTier = React.useRef(null);
  const [unlockFlash, setUnlockFlash] = React.useState(false);

  React.useEffect(() => {
    const prev = prevTier.current;
    if (prev !== null && prev !== tierKey && prev.indexOf("charge:") === 0 && tierKey.indexOf("package:") === 0) {
      setUnlockFlash(true);
      const t = setTimeout(() => setUnlockFlash(false), 1100);
      prevTier.current = tierKey;
      return () => clearTimeout(t);
    }
    prevTier.current = tierKey;
  }, [tierKey]);

  const runwayPct = Math.round(emptyZoneFrac * 100);
  const sunWarmth = custom ? 1 : Math.min(1, fillPct / 100);
  const sunColor = custom ? "rgba(248,113,113,.95)" : "rgba(232,197,71," + (0.25 + sunWarmth * 0.75) + ")";

  const pkgName = activePkg?.name || firstPkg.name;
  const headline = custom
    ? "Custom system needed"
    : unlockFlash
      ? "Package unlocked"
      : qualified
        ? pkgName
        : "Building your load";

  const fillClass = "pq-fill pq-fill--" + (custom ? "boss" : qualified ? "package" : "charge");

  const tierDots = pkgs.map((p, i) => {
    const unlocked = custom ? true : qualified && litIndex >= 0 && i <= litIndex;
    const active = !custom && litIndex === i;
    const dotClass =
      "pq-dot" +
      (active ? " pq-dot--active" : "") +
      (unlockFlash && i === 0 ? " pq-dot--pop" : "");
    return React.createElement(
      "div",
      { key: p.id, className: "pq-dot-wrap", style: { opacity: unlocked || active ? 1 : 0.3 } },
      React.createElement("span", {
        className: dotClass,
        style: {
          display: "block",
          width: active ? 7 : 5,
          height: active ? 7 : 5,
          borderRadius: 999,
          background: active ? G : unlocked ? "rgba(232,197,71,.85)" : "rgba(255,255,255,.12)",
          boxShadow: active ? "0 0 8px rgba(232,197,71,.35)" : "none",
        },
        title: p.kva + " kVA",
      })
    );
  });

  const sunWrapClass = "pq-sun-wrap pq-sun-wrap--sm" + (unlockFlash ? " pq-sun-wrap--pulse" : "");

  return React.createElement(
    "div",
    { className: "power-quest power-quest--bar", role: "status", "aria-live": "polite" },
    React.createElement(
      "div",
      { className: "pq-bar-row" },
      React.createElement(
        "div",
        { className: sunWrapClass },
        React.createElement(SunIco, { s: 18, c: sunColor })
      ),
      React.createElement(
        "div",
        { className: "pq-bar-main" },
        React.createElement(
          "div",
          { className: "pq-bar-top" },
          React.createElement("p", { className: "pq-bar-title" }, headline),
          React.createElement(
            "span",
            { className: "pq-bar-stats" },
            (peakW || 0).toLocaleString() + "W · " + fmtWh(dailyWh)
          )
        ),
        React.createElement(
          "div",
          { className: "pq-bar-track pq-track-glow" },
          !custom &&
            React.createElement("div", {
              style: {
                position: "absolute",
                left: runwayPct + "%",
                top: 0,
                bottom: 0,
                width: 1,
                background: "rgba(232,197,71,.35)",
                zIndex: 1,
              },
            }),
          React.createElement("div", { className: fillClass, style: { width: fillPct + "%", height: "100%" } })
        ),
        React.createElement("div", { className: "pq-dots-row" }, tierDots)
      )
    )
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
    { id: "size", Ico: NavSizeIco, label: "Sizer", disabled: !canSize },
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

export function ItemGroupHeader({ label, color, iconKey, first }) {
  const col = color || G;
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: first ? "2px 0 6px" : "10px 0 6px",
        marginTop: first ? 0 : 4,
        borderTop: first ? "none" : "1px solid rgba(255,255,255,.06)",
      },
    },
    React.createElement(IconTile, { size: 28, color: col }, React.createElement(CategoryIcon, { iconKey: iconKey, s: 14, c: col })),
    React.createElement("p", { style: { color: W10, fontSize: 12, fontWeight: 600, margin: 0, letterSpacing: "-0.01em" } }, label)
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
            letterSpacing: "0.08em",
            background: GRAD_GOLD,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          },
        },
        "SolarApp"
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
          "Free solar sizing · Zimbabwe"
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
