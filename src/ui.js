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
  SURFACE_STRONG,
  ROW_BG,
  ROW_BG_ON,
  CHIP_BG,
  ci,
} from "./tokens.js";
import { themeCss } from "./theme.js";
import { MinIco, PlsIco, ArrLIco, ArrRIco, ChatIco, NavHomeIco, NavCatalogIco, NavSizeIco, NavQuoteIco, SunIco, LeafIco, XcoIco, MoonIco, BulbIco } from "./icons.js";
import { ApplianceIcon, CategoryIcon, IconTile } from "./appliance-icons.js";
export { ApplianceIcon, CategoryIcon, IconTile };
import { loadValueInsights } from "./loadValue.js";
import { productWhatsAppMessage, whatsAppChatUrl } from "./data.js";
import { environmentalImpact } from "./environment.js";
import { computePowerQuestState } from "./power-quest.js";
export { computePowerQuestState } from "./power-quest.js";
import { playPackageUnlockSound } from "./stage-sounds.js";

export const globalStyles =
  themeCss +
  "*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;margin:0}" +
  "html{-webkit-text-size-adjust:100%}html,body{background:var(--bg);background-image:var(--bg-hero);font-family:" +
  FONT_UI +
  ";color:var(--text-primary);scroll-behavior:smooth;-webkit-font-smoothing:antialiased;min-height:100%;width:100%;max-width:100vw;overflow-x:hidden}" +
  "body{padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)}" +
  "input,select,textarea{font-size:16px}" +
  "button{font-family:inherit;cursor:pointer}" +
  "button:disabled{cursor:not-allowed;opacity:.45}" +
  "input,textarea{font-family:inherit}" +
  "::-webkit-scrollbar{width:5px;height:5px}" +
  "::-webkit-scrollbar-thumb{background:var(--scrollbar);border-radius:4px}" +
  "@keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}" +
  "@keyframes packageIn{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}" +
  "@keyframes packageSelect{0%{transform:translateY(0) scale(1)}40%{transform:translateY(-2px) scale(1.01)}100%{transform:translateY(-1px) scale(1)}}" +
  "@keyframes packageAccentIn{from{opacity:0;transform:scaleY(.4)}to{opacity:1;transform:scaleY(1)}}" +
  "@keyframes packageBadgePop{from{opacity:0;transform:translateY(4px) scale(.92)}to{opacity:1;transform:translateY(0) scale(1)}}" +
  "@keyframes packageRing{0%,100%{box-shadow:0 8px 28px rgba(232,197,71,.08),0 0 0 1px rgba(232,197,71,.12),inset 0 1px 0 rgba(255,255,255,.06)}50%{box-shadow:0 12px 36px rgba(232,197,71,.14),0 0 0 1px rgba(232,197,71,.22),0 0 0 4px rgba(232,197,71,.08)}}" +
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
  ".power-quest--bar{position:sticky;top:0;z-index:80;padding:6px 10px;margin:0 0 6px;border-radius:12px;background:var(--pq-bar-bg);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid var(--border);box-shadow:0 4px 20px rgba(0,0,0,.12)}" +
  ".pq-bar-row{display:flex;align-items:center;gap:8px}" +
  ".pq-bar-main{flex:1;min-width:0}" +
  ".pq-bar-main--solo{width:100%}" +
  ".pq-bar-top{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:5px;flex-wrap:wrap}" +
  ".pq-bar-title{color:var(--text-primary);font-size:12px;font-weight:700;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-0.02em}" +
  ".pq-bar-stats{color:var(--text-muted);font-size:10px;font-weight:500;white-space:nowrap;flex-shrink:0;font-variant-numeric:tabular-nums}" +
  ".pq-bar-track{position:relative;height:6px;border-radius:999px;background:var(--pq-track-bg);overflow:hidden}" +
  ".pq-dots-row{display:flex;gap:3px;margin-top:6px;padding:0 1px}" +
  ".pq-dots-row .pq-dot-wrap{flex:1;min-width:0;display:flex;justify-content:center}" +
  ".pq-sun-wrap--sm{width:32px;height:32px;border-radius:10px;display:grid;place-items:center;flex-shrink:0;background:var(--surface);border:1px solid rgba(232,197,71,.18)}" +
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
  ".ambient-particles{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:.85}" +
  "[data-theme=\"light\"] .ambient-particles{opacity:.55}" +
  ".brand-header-sun{display:inline-flex;align-items:center;justify-content:center;overflow:visible;background:transparent;border:none;box-shadow:none;padding:0}" +
  ".brand-header-sun .home-brand-sun{display:inline-flex;filter:drop-shadow(0 0 10px rgba(232,197,71,.35))}" +
  ".quote-page-header-icon.brand-header-sun,.products-page-header-icon.brand-header-sun{width:auto;height:auto;border:none;background:transparent;box-shadow:none;padding:2px}" +
  "@media (prefers-reduced-motion:reduce){.home-marquee-track{animation:none;overflow-x:auto}.home-brand-sun{animation:none}.brand-header-sun .home-brand-sun{animation:none}.ambient-particles{display:none}}" +
  ".animate-rise{animation:rise .5s cubic-bezier(.22,1,.36,1) both}" +
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
  ".home-section-label{font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin:0}" +
  ".home-section-hint{font-size:12px;color:var(--text-subtle);margin:0;line-height:1.4;letter-spacing:-0.01em}" +
  ".home-brand{text-align:center;padding:clamp(8px,2vw,12px) 0 0}" +
  ".home-brand-lockup{display:inline-flex;align-items:center;gap:clamp(12px,3vw,16px);margin-bottom:clamp(10px,2.5vw,14px)}" +
  ".home-brand-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;background:none;border:none;box-shadow:none;border-radius:0;padding:0}" +
  ".home-brand-sun{display:inline-flex;background:none;overflow:visible;animation:homeSunSpin 20s linear infinite;filter:drop-shadow(0 0 14px rgba(232,197,71,.4))}" +
  ".home-brand-sun svg{display:block;background:transparent}" +
  ".home-brand-text{text-align:left}" +
  ".home-brand-mark{font-family:" + FONT_DISPLAY + ";font-size:clamp(1.75rem,6vw,2rem);font-weight:700;line-height:1;margin:0;letter-spacing:0.02em;background:linear-gradient(135deg,#C9A227,#E8C547,#F5E6A8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}" +
  ".home-brand-by{font-size:10px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:rgba(232,197,71,.8);margin:6px 0 0}" +
  ".home-brand-tag{font-size:clamp(13px,3.4vw,14px);color:var(--text-muted);margin:0;line-height:1.5;max-width:32ch;margin-left:auto;margin-right:auto;letter-spacing:-0.01em}" +
  ".home-install-wrap{max-width:320px;margin:clamp(10px,2.5vw,14px) auto 0}" +
  ".home-install-cta{display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:12px 16px;border-radius:14px;" +
  "font-size:13px;font-weight:700;font-family:inherit;text-decoration:none;cursor:pointer;color:#0a0800;" +
  "background:linear-gradient(135deg,#C9A227,#E8C547);border:1px solid rgba(232,197,71,.5);box-shadow:0 4px 20px rgba(232,197,71,.2);transition:transform .15s,box-shadow .15s}" +
  ".home-install-cta:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 24px rgba(232,197,71,.28)}" +
  ".home-install-cta:active:not(:disabled){transform:translateY(0)}" +
  ".home-install-cta:disabled{opacity:.92;cursor:wait}" +
  ".home-install-cta--busy .home-install-spinner{width:15px;height:15px;border:2px solid rgba(10,8,0,.2);border-top-color:#0a0800;border-radius:50%;animation:homeInstallSpin .7s linear infinite}" +
  "@keyframes homeInstallSpin{to{transform:rotate(360deg)}}" +
  ".home-install-status{margin-top:10px;padding:13px 14px;border-radius:14px;text-align:left;background:var(--surface);border:1px solid var(--border)}" +
  ".home-install-status--done{border-color:rgba(61,214,140,.35);background:rgba(61,214,140,.08)}" +
  ".home-install-status--error{border-color:rgba(248,113,113,.3);background:rgba(248,113,113,.06)}" +
  ".home-install-progress-row{display:flex;align-items:center;gap:10px;margin-bottom:8px}" +
  ".home-install-progress{flex:1;height:6px;border-radius:999px;background:var(--surface-inset);overflow:hidden}" +
  ".home-install-pct{flex-shrink:0;font-size:10px;font-weight:700;color:var(--quote-gold,#E8C547);min-width:34px;text-align:right;font-variant-numeric:tabular-nums}" +
  ".home-install-progress-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#C9A227,#3DD68C);transition:width .35s ease}" +
  ".home-install-progress-fill--pulse{width:48%!important;animation:homeInstallPulse 1.1s ease-in-out infinite}" +
  "@keyframes homeInstallPulse{0%,100%{transform:translateX(-10%);opacity:.7}50%{transform:translateX(140%);opacity:1}}" +
  ".home-install-status-msg{margin:0 0 8px;font-size:11px;line-height:1.45;color:var(--text-body);font-weight:500}" +
  ".home-install-status--done .home-install-status-msg{color:#3DD68C;font-weight:600}" +
  ".home-install-hint{margin-top:4px;padding-top:8px;border-top:1px solid var(--border)}" +
  ".home-install-hint-title{margin:0 0 4px;font-size:12px;font-weight:700;color:var(--text-primary)}" +
  ".home-install-hint-body{margin:0;font-size:11px;line-height:1.45;color:var(--text-body)}" +
  ".home-install-hint-copy{margin-top:10px;padding:8px 12px;border-radius:10px;border:1px solid rgba(232,197,71,.35);background:rgba(232,197,71,.1);color:var(--quote-gold,#E8C547);font-size:11px;font-weight:600;font-family:inherit;cursor:pointer;width:100%}" +
  ".home-install-hint-msg{margin:8px 0 0;padding:0 4px;font-size:10px;line-height:1.4;color:var(--text-muted);text-align:center}" +
  ".ios-install-guide{margin-top:10px;padding:14px;border-radius:16px;background:var(--surface);border:1px solid var(--border)}" +
  ".ios-install-preview{display:flex;align-items:center;justify-content:center;margin-bottom:14px;padding:16px 12px;border-radius:14px;background:var(--surface-inset);border:1px solid var(--border)}" +
  ".ios-install-preview--sun{background:transparent;border:none;padding:8px 0 12px}" +
  ".ios-install-preview-icon{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}" +
  ".ios-install-safari-note{margin:0 0 12px;font-size:11px;line-height:1.45;color:var(--text-body)}" +
  ".ios-install-steps{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px}" +
  ".ios-install-steps li{display:grid;grid-template-columns:28px 1fr;gap:10px;align-items:start;font-size:12px;line-height:1.45;color:var(--text-body)}" +
  ".ios-install-step-num{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:12px;font-weight:700;color:#E8C547;background:rgba(232,197,71,.12);border:1px solid rgba(232,197,71,.35)}" +
  ".ios-install-open-safari{margin-top:12px;width:100%;padding:11px 14px;border:none;border-radius:12px;background:linear-gradient(135deg,#C9A227,#E8C547);color:#0a0800;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer}" +
  ".home-steps{display:flex;justify-content:center;gap:clamp(6px,2vw,10px);flex-wrap:wrap;margin-top:clamp(14px,3.5vw,18px)}" +
  ".home-step-pill{padding:6px 12px;border-radius:999px;font-size:11px;font-weight:500;color:var(--text-body);background:var(--surface);border:1px solid var(--border);letter-spacing:-0.01em}" +
  ".home-step-pill span{color:rgba(232,197,71,.85);font-weight:600;margin-right:4px}" +
  ".home-prop-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(8px,2vw,10px)}" +
  ".home-prop-tile{position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:14px 14px 13px;min-height:88px;border-radius:16px;background:var(--tile-bg);border:var(--tile-border);cursor:pointer;font-family:inherit;text-align:left;width:100%;overflow:hidden;transition:background .2s,border-color .2s,transform .2s,box-shadow .2s}" +
  ".home-prop-tile::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--prop-accent, rgba(232,197,71,.5));opacity:.85;border-radius:16px 0 0 16px}" +
  ".home-prop-tile:hover{background:var(--tile-hover-bg);border-color:rgba(232,197,71,.25);transform:translateY(-2px);box-shadow:var(--tile-hover-shadow)}" +
  ".home-prop-tile:active{transform:translateY(0)}" +
  ".home-prop-top{display:flex;align-items:center;gap:10px;width:100%}" +
  ".home-prop-icon{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;flex-shrink:0}" +
  ".home-prop-label{color:var(--text-primary);font-size:14px;font-weight:600;margin:0;line-height:1.2;letter-spacing:-0.02em}" +
  ".home-prop-sub{color:var(--text-muted);font-size:11px;margin:3px 0 0;line-height:1.25}" +
  ".home-prop-arrow{margin-left:auto;opacity:.35;flex-shrink:0}" +
  ".home-prop-tile:hover .home-prop-arrow{opacity:.7}" +
  ".home-packages-link{display:block;width:100%;margin-top:4px;padding:12px;border-radius:14px;border:1px solid var(--border);background:transparent;color:var(--text-muted);font-size:12px;font-weight:500;font-family:inherit;cursor:pointer;text-align:center;transition:background .15s,border-color .15s,color .15s}" +
  ".home-packages-link:hover{background:var(--surface);border-color:var(--border-strong);color:var(--text-secondary)}" +
  ".home-main-card{background:var(--home-card-bg)!important;border:var(--home-card-border)!important;box-shadow:var(--home-card-shadow)!important;border-radius:clamp(20px,4.5vw,24px)!important;backdrop-filter:blur(28px)!important;-webkit-backdrop-filter:blur(28px)!important;overflow:hidden!important}" +
  ".home-main-card::before{content:'';display:block;height:3px;background:linear-gradient(90deg,#C9A227,#E8C547,#3DD68C);opacity:.9}" +
  ".home-main-inner{padding:clamp(18px,4.5vw,24px) clamp(18px,4.5vw,22px) clamp(20px,5vw,26px)!important;position:relative}" +
  ".home-footer-note{text-align:center;font-size:10px;color:var(--text-faint);margin-top:clamp(14px,3.5vw,18px);letter-spacing:0.06em}" +
  ".btn-ghost{transition:background .15s,border-color .15s,color .15s}" +
  ".btn-ghost:hover:not(:disabled){background:var(--surface-hover)!important;border-color:rgba(232,197,71,.25)!important;color:var(--text-secondary)!important}" +
  ".app-shell{width:100%;max-width:100vw;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;position:relative;min-height:100dvh}" +
  ".app-shell{padding:max(12px,env(safe-area-inset-top)) max(12px,env(safe-area-inset-left)) calc(108px + env(safe-area-inset-bottom,0px)) max(12px,env(safe-area-inset-right))}" +
  ".app-shell--home{justify-content:center;padding-bottom:calc(92px + env(safe-area-inset-bottom,0px))!important;padding-top:max(14px,env(safe-area-inset-top))!important;padding-left:max(12px,env(safe-area-inset-left))!important;padding-right:max(12px,env(safe-area-inset-right))!important}" +
  ".app-shell--sizer{padding:max(8px,env(safe-area-inset-top)) max(10px,env(safe-area-inset-left)) calc(84px + env(safe-area-inset-bottom,0px)) max(10px,env(safe-area-inset-right));min-height:100dvh;box-sizing:border-box}" +
  ".app-shell--sizer>main,.main-card--sizer{flex:1;min-height:0;display:flex;flex-direction:column;width:100%;max-width:min(560px,100%)}" +
  ".app-shell--quote{padding:max(8px,env(safe-area-inset-top)) max(10px,env(safe-area-inset-left)) max(8px,env(safe-area-inset-bottom,0px)) max(10px,env(safe-area-inset-right));min-height:100dvh;box-sizing:border-box;display:flex;flex-direction:column;align-items:stretch}" +
  ".app-shell--quote>main.main-card--quote{flex:1;min-height:0;display:flex;flex-direction:column;padding:0 max(8px,env(safe-area-inset-left)) 0 max(8px,env(safe-area-inset-right))!important;max-height:calc(var(--vvh,100dvh) - 72px - env(safe-area-inset-top) - env(safe-area-inset-bottom,0px));overflow:hidden;width:100%;max-width:min(560px,100%);align-self:center;box-sizing:border-box}" +
  ".main-card--quote .main-inner--quote,.main-card--quote>div:last-child{flex:1;min-height:0;display:flex;flex-direction:column;padding:0}" +
  ".app-main-card{width:100%;max-width:min(560px,100%);min-width:0;padding:clamp(16px,4vw,28px)}" +
  ".main-inner--sizer{flex:1;min-height:0;display:flex;flex-direction:column;padding:12px 14px 10px!important;overflow:hidden}" +
  ".app-shell--sizer .sizer-screen{flex:1;min-height:0;display:flex;flex-direction:column}" +
  ".app-shell--sizer .sizer-scroll{flex:1;min-height:0;overflow-y:auto;-webkit-overflow-scrolling:touch}" +
  ".bottom-nav{position:fixed;left:50%;transform:translateX(-50%);bottom:max(12px,env(safe-area-inset-bottom));width:min(560px,calc(100% - 20px));z-index:9990;display:flex;justify-content:space-around;align-items:center;padding:10px 6px;background:var(--nav-bg);border:var(--nav-border);border-radius:20px;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:var(--nav-shadow);transition:transform .22s ease,opacity .22s ease}" +
  ".bottom-nav-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 4px;border:none;border-radius:14px;background:transparent;cursor:pointer;font-family:inherit;min-width:0}" +
  ".bottom-nav-btn[aria-current=\"page\"]{background:var(--nav-active-bg)}" +
  ".bottom-nav-btn:disabled{cursor:not-allowed;opacity:0.35}" +
  ".bottom-nav-label{font-size:9px;font-weight:500;letter-spacing:0.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}" +
  ".bottom-nav-btn[aria-current=\"page\"] .bottom-nav-label{font-weight:700}" +
  "@media (max-width:420px){.bottom-nav{width:calc(100% - 16px);padding:8px 4px;border-radius:18px}.bottom-nav-label{font-size:9px}.bottom-nav-btn{padding:5px 2px;gap:2px}}" +
  "@media (max-width:380px){.main-inner--sizer{padding:10px 10px 8px!important}.sizer-page-header{padding:0 38px;min-height:34px;margin-bottom:6px}.brand-sun-mark-title{font-size:14px}.brand-sun-mark{gap:6px}.sizer-accordion-trigger{padding:7px 8px;gap:6px}.sizer-accordion-label{font-size:11px}.sizer-accordion-hint{font-size:8px}.appliance-row{padding:6px 8px;gap:6px}.appliance-row-label{font-size:11px}.qty-stepper--compact button{width:26px!important;height:26px!important}.home-prop-tile{padding:11px 10px 10px;min-height:76px;gap:8px}.home-prop-icon{width:36px;height:36px}.home-prop-label{font-size:13px}.home-main-inner{padding:clamp(14px,4vw,22px) clamp(12px,3.5vw,18px) clamp(16px,4vw,22px)!important}.pq-bar-title{font-size:11px!important}.pq-bar-stats{font-size:9px!important}.sizer-footer .btn-primary{padding:11px 14px;font-size:13px}}" +
  "@media (max-width:340px){.home-prop-grid{grid-template-columns:1fr;gap:6px}.home-prop-top{gap:8px}.sizer-page-header{padding:0 34px}.sizer-prop-bar{flex-direction:column;gap:4px}.sizer-scroll .power-quest--bar .pq-bar-top{flex-direction:column;align-items:center;gap:2px}.pq-bar-top{flex-wrap:wrap;justify-content:center;gap:4px}}" +
  "@media (min-width:768px){.app-shell--home,.app-shell--sizer{padding-left:max(20px,env(safe-area-inset-left))!important;padding-right:max(20px,env(safe-area-inset-right))!important}}" +
  ".sticky-actions{position:sticky;z-index:100;bottom:calc(76px + env(safe-area-inset-bottom, 0px));padding:16px 0 8px;margin-top:12px;background:var(--sticky-bg)}" +
  ".prop-card{transition:all .25s cubic-bezier(.22,1,.36,1)}" +
  ".prop-card:hover{border-color:rgba(232,197,71,.5)!important;background:linear-gradient(145deg,rgba(232,197,71,.08),rgba(255,255,255,.02))!important;box-shadow:0 8px 32px rgba(0,0,0,.3),0 0 0 1px rgba(232,197,71,.18)}" +
  ".section-body{animation:fadeIn .3s ease both}" +
  ".areas-scroll{-webkit-overflow-scrolling:touch;scrollbar-gutter:stable}" +
  ".gold-shimmer{background-size:200% auto;animation:shimmer 4s linear infinite}" +
  ".sizer-screen{display:flex;flex-direction:column;min-height:0;flex:1}" +
  ".sizer-scroll{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;min-height:0;padding-bottom:2px;scrollbar-gutter:stable}" +
  ".sizer-scroll .power-quest--bar{margin:0 0 4px;padding:5px 8px;border-radius:10px}" +
  ".sizer-scroll .pq-bar-top{margin-bottom:4px}" +
  ".sizer-scroll .pq-dots-row{margin-top:4px}" +
  ".sizer-scroll .power-quest--bar .pq-bar-top{justify-content:center;align-items:center;gap:4px}" +
  ".sizer-scroll .power-quest--bar .pq-bar-title{text-align:center;max-width:100%}" +
  ".sizer-scroll .power-quest--bar .pq-bar-stats{text-align:center}" +
  ".brand-sun-mark{display:flex;align-items:center;gap:8px;min-width:0}" +
  ".brand-sun-mark--centered{justify-content:center;margin:0 auto}" +
  ".brand-sun-mark-icon{flex-shrink:0}" +
  ".brand-sun-mark-text{display:flex;flex-direction:column;gap:1px;min-width:0}" +
  ".brand-sun-mark--centered .brand-sun-mark-text{align-items:center;text-align:center}" +
  ".brand-sun-mark-title{font-family:" + FONT_DISPLAY + ";font-size:15px;font-weight:700;line-height:1;margin:0;letter-spacing:0.02em;background:linear-gradient(135deg,#C9A227,#E8C547,#F5E6A8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}" +
  ".brand-sun-mark-by{font-size:8px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(232,197,71,.75);line-height:1}" +
  ".sizer-page-header{position:relative;display:flex;justify-content:center;align-items:center;min-height:38px;margin-bottom:8px;padding:0 44px;flex-shrink:0}" +
  ".sizer-page-header .theme-toggle-wrap{position:absolute;right:0;top:50%;transform:translateY(-50%)}" +
  ".products-page-header{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:2px 2px 10px;flex-shrink:0}" +
  ".products-page-header-brand{display:flex;align-items:center;gap:10px;min-width:0}" +
  ".products-page-header-icon{width:36px;height:36px;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;background:var(--gold-dim);border:1px solid rgba(232,197,71,.22);box-shadow:0 2px 10px rgba(0,0,0,.05);overflow:visible}" +
  ".products-page-header-copy{display:flex;flex-direction:column;gap:2px;min-width:0}" +
  ".products-page-header-title{font-family:" + FONT_DISPLAY + ";font-size:1.2rem;font-weight:700;margin:0;line-height:1.05;color:var(--quote-title,var(--text-primary))}" +
  ".products-page-header-title em{color:var(--quote-gold,#C9A227);font-style:normal}" +
  ".products-page-header-tag{font-size:10px;font-weight:600;color:var(--text-muted);letter-spacing:.03em}" +
  ".products-page-header-end{display:flex;align-items:center;gap:8px;flex-shrink:0}" +
  ".products-page-header-mark{font-size:9px;font-weight:700;color:var(--text-muted);letter-spacing:.1em;text-transform:uppercase;padding:5px 8px;border-radius:999px;background:var(--surface-inset);border:1px solid var(--border);white-space:nowrap}" +
  ".products-list-eyebrow{font-size:9px;font-weight:600;color:var(--text-muted);letter-spacing:.1em;text-transform:uppercase;margin:0 0 8px;padding:0 2px;line-height:1.3}" +
  ".products-list-eyebrow em{font-style:normal;color:var(--green-accent);font-weight:700;letter-spacing:.06em;text-transform:none}" +
  ".products-screen{position:relative;display:flex;flex-direction:column;flex:1;min-height:0;min-width:0;gap:0}" +
  ".products-screen::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 90% 42% at 50% -4%,rgba(232,197,71,.06),transparent 58%);z-index:0}" +
  ".products-list-scroll{position:relative;z-index:1;flex:1;min-height:0;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;scroll-behavior:smooth;padding:2px 2px 4px;mask-image:linear-gradient(180deg,#000 calc(100% - 28px),transparent 100%);-webkit-mask-image:linear-gradient(180deg,#000 calc(100% - 28px),transparent 100%)}" +
  ".products-list{display:flex;flex-direction:column;gap:8px;padding-bottom:6px}" +
  ".package-row{position:relative;display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;align-items:center;column-gap:11px;row-gap:3px;width:100%;padding:11px 13px 11px 15px;border-radius:16px;border:1px solid var(--border);background:var(--card-bg);cursor:pointer;font-family:inherit;text-align:left;overflow:hidden;transition:border-color .32s cubic-bezier(.22,1,.36,1),box-shadow .32s cubic-bezier(.22,1,.36,1),background .28s ease,transform .26s cubic-bezier(.22,1,.36,1),opacity .5s cubic-bezier(.22,1,.36,1)}" +
  ".package-row--reveal{opacity:0;transform:translateY(14px)}" +
  ".package-row--reveal.package-row--in-view{opacity:1;transform:translateY(0)}" +
  ".package-row:hover:not(.package-row--selected){border-color:var(--border-focus);transform:translateY(-1px)}" +
  ".package-row:active:not(.package-row--selected){transform:scale(.993)}" +
  ".package-row-accent{position:absolute;left:0;top:10px;bottom:10px;width:2.5px;border-radius:0 2px 2px 0;background:linear-gradient(180deg,var(--quote-gold,#C9A227),rgba(232,197,71,.3));opacity:0;transform:scaleY(.45);transition:opacity .28s ease,transform .32s cubic-bezier(.22,1,.36,1)}" +
  ".package-row--selected .package-row-accent{opacity:1;transform:scaleY(1);animation:packageAccentIn .35s cubic-bezier(.22,1,.36,1) both}" +
  ".package-row--selected{border-color:rgba(232,197,71,.34);background:linear-gradient(128deg,rgba(232,197,71,.1) 0%,rgba(232,197,71,.025) 38%,var(--card-bg) 100%);transform:translateY(-1px);animation:packageSelect .42s cubic-bezier(.22,1,.36,1),packageRing 2.2s ease-in-out 1}" +
  ".package-row-radio{grid-row:1/span 2;align-self:center;width:20px;height:20px;border-radius:50%;border:1.5px solid var(--border);display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;font-size:10px;font-weight:700;color:var(--quote-gold,#C9A227);transition:border-color .28s ease,background .28s ease,transform .28s cubic-bezier(.22,1,.36,1)}" +
  ".package-row--selected .package-row-radio{border-color:var(--quote-gold,#C9A227);background:rgba(232,197,71,.12);transform:scale(1.04)}" +
  ".package-row-radio-check{line-height:1}" +
  ".package-row-top{grid-column:2;display:flex;align-items:baseline;justify-content:space-between;gap:10px;min-width:0}" +
  ".package-row-title-row{display:flex;align-items:center;flex-wrap:wrap;gap:5px 7px;min-width:0;flex:1}" +
  ".package-row-name{font-size:13px;font-weight:600;color:var(--text-primary);line-height:1.2;letter-spacing:-.02em}" +
  ".package-row-badge{font-size:8px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;padding:2px 6px;border-radius:999px;color:var(--quote-gold,#C9A227);background:rgba(232,197,71,.1);border:1px solid rgba(232,197,71,.2);animation:packageBadgePop .32s cubic-bezier(.22,1,.36,1) both;flex-shrink:0}" +
  ".package-row-meta{grid-column:2;display:flex;align-items:center;flex-wrap:wrap;gap:5px}" +
  ".package-row-kva{font-size:9px;font-weight:700;color:var(--text-secondary);padding:2px 6px;border-radius:5px;background:var(--surface-inset);border:1px solid var(--border);letter-spacing:.02em}" +
  ".package-row--selected .package-row-kva{border-color:rgba(232,197,71,.22);background:rgba(232,197,71,.07);color:var(--quote-gold,#C9A227)}" +
  ".package-row-spec{font-size:10px;color:var(--text-muted);line-height:1.25}" +
  ".package-row-price{font-family:" + FONT_DISPLAY + ";font-size:1.05rem;font-weight:700;color:var(--quote-gold,#C9A227);font-variant-numeric:tabular-nums;line-height:1;flex-shrink:0;transition:transform .28s cubic-bezier(.22,1,.36,1)}" +
  ".package-row--selected .package-row-price{transform:scale(1.03)}" +
  ".products-checkout-bar{position:relative;z-index:2;flex-shrink:0;margin-top:auto;padding:6px 4px calc(52px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;gap:5px;border-top:1px solid var(--border);background:linear-gradient(180deg,transparent 0%,var(--card-bg) 16%);backdrop-filter:blur(14px) saturate(1.12);-webkit-backdrop-filter:blur(14px) saturate(1.12);box-shadow:0 -6px 22px rgba(0,0,0,.04)}" +
  ".products-checkout-accent{height:1px;margin:0 18px 1px;border-radius:1px;background:linear-gradient(90deg,transparent,var(--quote-gold,#C9A227),transparent);opacity:.55}" +
  ".products-checkout-hint{margin:0;padding:0 4px;font-size:10px;color:var(--text-muted);line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}" +
  ".products-checkout-cta{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;min-height:42px;padding:10px 14px;border:none;border-radius:12px;font-family:inherit;font-size:14px;font-weight:600;color:#0a0800;cursor:pointer;background:" + GRAD_GOLD + ";box-shadow:0 5px 16px rgba(201,162,39,.22);transition:transform .18s ease,opacity .18s ease}" +
  ".products-checkout-cta--idle{opacity:.5;cursor:not-allowed}" +
  ".products-checkout-cta:disabled{opacity:.45;cursor:not-allowed}" +
  ".products-checkout-cta:not(:disabled):active{transform:scale(.985)}" +
  ".products-checkout-cta-main{display:inline-flex;align-items:center;gap:7px;min-width:0}" +
  ".products-checkout-cta-price{font-family:" + FONT_DISPLAY + ";font-size:1.1rem;font-weight:700;font-variant-numeric:tabular-nums;flex-shrink:0;line-height:1}" +
  ".products-secondary-link{display:inline-flex;align-items:center;justify-content:center;gap:4px;padding:0 4px;border:none;background:transparent;color:var(--text-faint);font-size:10px;cursor:pointer;font-family:inherit;margin:0 auto;transition:color .2s ease}" +
  ".products-secondary-link:hover{color:var(--text-muted)}" +
  "[data-theme=\"light\"] .products-checkout-bar{background:linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(252,250,245,.95) 22%);box-shadow:0 -8px 28px rgba(15,20,18,.04)}" +
  "[data-theme=\"light\"] .package-row--selected{box-shadow:0 8px 24px rgba(15,20,18,.06),0 0 0 1px rgba(201,162,39,.14)}" +
  "@media (prefers-reduced-motion:reduce){.package-row--reveal{opacity:1;transform:none}.package-row--selected,.package-row-badge,.package-row--selected .package-row-accent{animation:none!important}.package-row:hover,.package-row--selected{transform:none}}" +
  ".main-card--products{display:flex!important;flex-direction:column!important;flex:1!important;min-height:0!important;padding:0 max(8px,env(safe-area-inset-left)) 0 max(8px,env(safe-area-inset-right))!important;max-height:calc(var(--vvh,100dvh) - 72px - env(safe-area-inset-top) - env(safe-area-inset-bottom,0px));overflow:hidden!important;box-sizing:border-box!important}" +
  ".main-inner--products{display:flex;flex-direction:column;flex:1;min-height:0;padding:0 2px}" +
  ".app-shell--products{padding-bottom:max(8px,env(safe-area-inset-bottom,0px))}" +
  ".delivery-mode-picker{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:8px}" +
  ".delivery-mode-picker--compact{gap:5px;margin-bottom:6px}" +
  ".delivery-mode-btn{display:flex;flex-direction:column;align-items:center;gap:1px;padding:8px 6px;border-radius:10px;border:1px solid var(--border);background:var(--surface);cursor:pointer;font-family:inherit;transition:border-color .2s,background .2s}" +
  ".delivery-mode-btn:hover{border-color:var(--border-focus)}" +
  ".delivery-mode-btn--active{border-color:rgba(232,197,71,.45);background:var(--gold-dim);box-shadow:0 0 0 1px rgba(232,197,71,.12)}" +
  ".delivery-mode-btn-label{font-size:11px;font-weight:700;color:var(--text-primary);line-height:1.2}" +
  ".delivery-mode-btn-sub{font-size:8px;font-weight:600;color:var(--text-muted);letter-spacing:.02em;line-height:1.2}" +
  ".quote-delivery-help--muted{font-style:italic}" +
  ".quote-delivery-card--products{margin-bottom:0!important}" +
  ".product-card{display:grid;grid-template-columns:auto 1fr auto auto;align-items:center;gap:10px;padding:12px 14px;border-radius:14px;background:var(--card-bg);border:1px solid var(--border);transition:border-color .2s,transform .2s,box-shadow .2s;min-width:0;cursor:pointer;text-align:left;width:100%;font-family:inherit}" +
  ".product-card:hover{border-color:var(--border-focus)}" +
  ".product-card--selected{border-color:rgba(232,197,71,.45);background:linear-gradient(165deg,rgba(232,197,71,.08) 0%,var(--card-bg) 60%);box-shadow:0 4px 20px rgba(0,0,0,.06),0 0 0 1px rgba(232,197,71,.12)}" +
  ".product-card-icon{width:44px;height:44px;border-radius:12px;background:var(--gold-dim);border:1px solid rgba(232,197,71,.25);display:flex;align-items:center;justify-content:center;flex-shrink:0}" +
  ".product-card-body{min-width:0}" +
  ".product-card-brand{color:var(--text-muted);font-size:9px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 2px;line-height:1.2}" +
  ".product-card-name{color:var(--text-primary);font-size:13px;font-weight:600;margin:0 0 3px;line-height:1.25;letter-spacing:-0.02em}" +
  ".product-card-spec{color:var(--text-muted);font-size:11px;margin:0;line-height:1.3}" +
  ".product-card-spec--powers{margin-top:3px;font-size:10px;color:var(--text-secondary);line-height:1.35}" +
  ".product-card-price{text-align:right;min-width:52px;flex-shrink:0}" +
  ".product-card-price-val{color:var(--quote-gold,#C9A227);font-size:16px;font-weight:700;margin:0;line-height:1}" +
  ".product-card-tag{font-size:9px;color:var(--text-muted);background:var(--surface);padding:2px 8px;border-radius:10px;margin-top:4px;display:inline-block;border:1px solid var(--border)}" +
  ".product-card-wa{width:40px;height:40px;border-radius:11px;background:linear-gradient(135deg,#1A5C40,#3DD68C);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 16px rgba(61,214,140,.25);text-decoration:none}" +
  "@media (max-width:400px){.product-card{grid-template-columns:44px 1fr auto;grid-template-rows:auto auto;gap:8px 10px;padding:11px 12px}.product-card-price{grid-column:3;grid-row:1;align-self:start}.product-card-wa{grid-column:3;grid-row:2;justify-self:end;width:36px;height:36px}.product-card-body{grid-column:2;grid-row:1 / span 2;align-self:center}}" +
  "@media (max-width:380px){.products-page-header{padding:2px 0 8px}.products-page-header-mark{display:none}.package-row{padding:10px 12px 10px 14px;column-gap:10px}.products-page-header-title{font-size:1.08rem}.products-checkout-cta-price{font-size:1.02rem}.products-checkout-cta{min-height:40px;padding:9px 12px}.products-checkout-cta{flex-wrap:wrap;row-gap:4px;justify-content:center}.products-checkout-cta-main{flex:1 1 100%;justify-content:center;min-width:0;font-size:13px}.products-checkout-hint{font-size:9px;white-space:normal;line-height:1.3}}" +
  "@media (max-width:430px){.products-list-scroll{padding-bottom:4px}.package-row-top{flex-wrap:wrap;gap:4px 8px}.package-row-price{margin-left:auto}.home-install-wrap{max-width:100%}.home-brand-title{font-size:clamp(1.5rem,8vw,1.85rem)!important}}" +
  "@media (max-width:340px){.quote-flow-step-label{display:none}.quote-flow-step{justify-content:center}.quote-flow-steps-line{max-width:18px}.products-checkout-cta-main{font-size:12px}.bottom-nav-label{font-size:8px}}" +
  ".screen-header{display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-bottom:8px;flex-shrink:0;min-height:34px}" +
  ".home-theme-slot{position:absolute;top:0;right:0;z-index:2}" +
  ".sizer-header-outside{flex-shrink:0;margin-bottom:2px}" +
  ".sizer-step{margin-bottom:6px!important;gap:4px!important}" +
  ".sizer-step>div{height:2px!important}" +
  ".sizer-prop-bar{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:4px;flex-wrap:wrap}" +
  ".sizer-prop-chip{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;background:var(--gold-dim);border-radius:999px;border:1px solid rgba(232,197,71,.18)}" +
  ".sizer-prop-chip-label{color:var(--text-secondary);font-size:10px;font-weight:600;letter-spacing:-0.01em}" +
  ".sizer-change-prop{background:transparent;border:none;padding:2px 0;color:var(--text-muted);font-size:10px;cursor:pointer;font-family:inherit;text-decoration:underline;text-underline-offset:2px}" +
  ".sizer-change-prop:hover{color:var(--text-secondary)}" +
  ".sizer-footer{flex-shrink:0;padding:8px 0 0;margin-top:2px;border-top:1px solid var(--border);background:var(--sticky-bg)}" +
  ".sizer-footer .btn-primary{padding:12px 16px;border-radius:11px;font-size:14px}" +
  ".sizer-accordion-list{display:flex;flex-direction:column;gap:5px}" +
  ".sizer-accordion{border:1px solid var(--border);border-radius:11px;background:var(--card-bg);overflow:hidden;transition:border-color .2s,box-shadow .2s}" +
  ".sizer-accordion.is-open{border-color:var(--border-focus);box-shadow:0 2px 10px rgba(0,0,0,.05)}" +
  ".sizer-accordion-trigger{width:100%;display:flex;align-items:center;gap:7px;padding:8px 10px;border:none;background:transparent;cursor:pointer;font-family:inherit;text-align:left}" +
  ".sizer-accordion-trigger:hover{background:var(--surface-hover)}" +
  ".sizer-accordion-text{flex:1;min-width:0;display:flex;flex-direction:column;gap:0}" +
  ".sizer-accordion-label{color:var(--text-primary);font-size:12px;font-weight:600;margin:0;line-height:1.2;letter-spacing:-0.02em}" +
  ".sizer-accordion-hint{color:var(--text-muted);font-size:9px;margin:0;line-height:1.25;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
  ".sizer-accordion-badge{flex-shrink:0;font-size:9px;font-weight:700;padding:1px 6px;border-radius:999px;background:var(--gold-dim);color:var(--quote-gold,#C9A227);border:1px solid rgba(232,197,71,.22)}" +
  ".sizer-accordion-chevron{flex-shrink:0;width:6px;height:6px;margin-left:2px;border-right:2px solid var(--text-muted);border-bottom:2px solid var(--text-muted);transform:rotate(45deg);transition:transform .2s ease}" +
  ".sizer-accordion.is-open .sizer-accordion-chevron{transform:rotate(-135deg);margin-top:1px}" +
  ".sizer-accordion-panel{padding:0 6px 6px;display:flex;flex-direction:column;gap:4px;animation:sizerPanelIn .2s ease both}" +
  ".custom-panel--embedded{padding:0!important}" +
  ".custom-panel--embedded .custom-section{margin-bottom:6px!important}" +
  ".custom-panel--embedded .custom-input-wrap{margin-bottom:6px!important}" +
  ".custom-panel--embedded .custom-chip-row{gap:5px!important}" +
  "@keyframes sizerPanelIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}" +
  ".sizer-accordion-panel .appliance-row{padding:7px 8px;gap:6px;border-radius:9px}" +
  ".appliance-row{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:8px;padding:8px 10px;border-radius:10px;transition:background .15s,border-color .15s}" +
  ".appliance-row.is-on{background:var(--row-bg-on);border:1px solid rgba(232,197,71,.25)}" +
  ".appliance-row.is-off{background:var(--row-bg);border:1px solid var(--border)}" +
  ".appliance-row-label{color:var(--text-secondary);font-size:12px;font-weight:500;margin:0 0 2px;line-height:1.25}" +
  ".appliance-row.is-on .appliance-row-label{color:var(--text-primary);font-weight:600}" +
  ".appliance-row-sub{color:var(--text-muted);font-size:9px;margin:0}" +
  ".qty-stepper--compact{padding:1px;border-radius:8px}" +
  ".qty-stepper--compact button{width:28px!important;height:28px!important}" +
  ".qty-stepper--compact span{font-size:14px!important;min-width:24px!important}";

export function StepIndicator({ step, total, compact }) {
  if (!total || total < 2) return null;
  const sm = !!compact;
  return React.createElement(
    "div",
    {
      className: sm ? "sizer-step" : undefined,
      style: { display: "flex", gap: sm ? 4 : 5, marginBottom: sm ? 6 : 12 },
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
          height: sm ? 2 : 3,
          borderRadius: 2,
          background: i <= step ? GRAD_GOLD : "var(--border)",
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
        background: "var(--surface)",
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

/** Compact rotating sun — quote/products headers. */
export function BrandHeaderSun({ size = 17, className }) {
  return React.createElement(
    "span",
    {
      className: "brand-header-sun" + (className ? " " + className : ""),
      "aria-hidden": true,
    },
    React.createElement(
      "span",
      { className: "home-brand-sun" },
      React.createElement(SunIco, { s: size, c: G })
    )
  );
}

export function BrandSunMark({ size = 24, showLabel = true, centered, className }) {
  const cls =
    "brand-sun-mark" +
    (centered ? " brand-sun-mark--centered" : "") +
    (className ? " " + className : "");
  return React.createElement(
    "div",
    {
      className: cls,
      "aria-label": showLabel ? "SolarApp" : "SolarApp sun logo",
    },
    React.createElement(
      "span",
      { className: "home-brand-sun brand-sun-mark-icon", "aria-hidden": true },
      React.createElement(SunIco, { s: size, c: G })
    ),
    showLabel &&
      React.createElement(
        "div",
        { className: "brand-sun-mark-text" },
        React.createElement("span", { className: "brand-sun-mark-title" }, "SolarApp"),
        React.createElement("span", { className: "brand-sun-mark-by" }, "Energi Tech")
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
    { v: eco.co2Tonnes + "t", l: "CO₂ vs grid per year" },
    { v: String(eco.trees), l: "Tree equivalent" },
    { v: eco.carKm >= 1000 ? Math.round(eco.carKm / 1000) + "k km" : eco.carKm + " km", l: "Car off-road" },
  ];
  return React.createElement(
    "div",
    { className: "eco-quote-strip" },
    React.createElement(
      "div",
      { className: "eco-quote-strip-head" },
      React.createElement(LeafIco, { s: 11, c: "var(--green-accent)" }),
      React.createElement("span", { className: "eco-quote-strip-title" }, "Green impact")
    ),
    items.map((it) =>
      React.createElement(
        "div",
        { key: it.l },
        React.createElement("p", { className: "eco-quote-strip-val" }, it.v),
        React.createElement("p", { className: "eco-quote-strip-lbl" }, it.l)
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
    if (prev === null) {
      prevTier.current = tierKey;
      return;
    }
    if (prev === tierKey) return;

    const wasCharge = prev.indexOf("charge:") === 0;
    const isPackage = tierKey.indexOf("package:") === 0;
    const prevPkgIdx =
      prev.indexOf("package:") === 0 ? parseInt(prev.split(":")[1], 10) || 0 : -1;
    const nextPkgIdx =
      tierKey.indexOf("package:") === 0 ? parseInt(tierKey.split(":")[1], 10) || 0 : -1;

    const firstUnlock = wasCharge && isPackage;
    const tierUp = isPackage && prevPkgIdx >= 0 && nextPkgIdx > prevPkgIdx;

    if (firstUnlock || tierUp) {
      setUnlockFlash(true);
      playPackageUnlockSound(nextPkgIdx);
      const t = setTimeout(() => setUnlockFlash(false), 1100);
      prevTier.current = tierKey;
      return () => clearTimeout(t);
    }

    prevTier.current = tierKey;
  }, [tierKey]);

  const runwayPct = Math.round(emptyZoneFrac * 100);

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
      (unlockFlash && i === litIndex ? " pq-dot--pop" : "");
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

  return React.createElement(
    "div",
    { className: "power-quest power-quest--bar", role: "status", "aria-live": "polite" },
    React.createElement(
      "div",
      { className: "pq-bar-main pq-bar-main--solo" },
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
  );
}

export function QtyStepper({ value, onDec, onInc, max, compact }) {
  const on = value > 0;
  const sm = compact === true;
  return React.createElement(
    "div",
    {
      className: sm ? "qty-stepper--compact" : undefined,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 2,
        background: on ? G_DIM : SURFACE_STRONG,
        border: "1px solid " + (on ? BORDER_FOCUS : BORDER),
        borderRadius: sm ? 8 : 10,
        padding: sm ? 1 : 2,
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

export function ApplianceRow({ item, q, onDec, onInc, compact }) {
  const on = q > 0;
  const sm = compact !== false;
  const iconSize = sm ? 34 : 40;
  return React.createElement(
    "div",
    {
      className: "appliance-row " + (on ? "is-on" : "is-off"),
    },
    React.createElement(
      IconTile,
      { size: iconSize, color: on ? G : W6, active: on },
      React.createElement(ApplianceIcon, { iconKey: item.iconKey, s: sm ? 16 : 18, c: on ? G : W6 })
    ),
    React.createElement(
      "div",
      { style: { minWidth: 0 } },
      React.createElement("p", { className: "appliance-row-label" }, item.label),
      on && React.createElement("p", { className: "appliance-row-sub" }, item.sub || item.w + "W")
    ),
    React.createElement(QtyStepper, { value: q, onDec, onInc, compact: sm })
  );
}

export const SIZER_CUSTOM_AREA_ID = "__custom__";

export function SizerAreaAccordion({ areaId, label, hint, color, iconKey, isOpen, onSelect, activeCount, children }) {
  const col = color || G;
  return React.createElement(
    "div",
    { className: "sizer-accordion" + (isOpen ? " is-open" : "") },
    React.createElement(
      "button",
      {
        type: "button",
        className: "sizer-accordion-trigger",
        "aria-expanded": isOpen,
        onClick: () => onSelect(areaId),
      },
      React.createElement(IconTile, { size: 24, color: col }, React.createElement(CategoryIcon, { iconKey: iconKey, s: 12, c: col })),
      React.createElement(
        "span",
        { className: "sizer-accordion-text" },
        React.createElement("span", { className: "sizer-accordion-label" }, label),
        hint && React.createElement("span", { className: "sizer-accordion-hint" }, hint)
      ),
      activeCount > 0 &&
        React.createElement("span", { className: "sizer-accordion-badge" }, activeCount),
      React.createElement("span", { className: "sizer-accordion-chevron", "aria-hidden": true })
    ),
    isOpen && React.createElement("div", { className: "sizer-accordion-panel" }, children)
  );
}

export function ThemeToggle({ theme, onToggle, compact, inline, className }) {
  const light = theme === "light";
  const label = light ? "Dark" : "Light";
  const wrapClass =
    "theme-toggle-wrap" +
    (inline ? " theme-toggle-wrap--inline" : "") +
    (className ? " " + className : "");
  const btnClass = "theme-toggle" + (compact ? " theme-toggle--compact" : "");
  return React.createElement(
    "div",
    { className: wrapClass },
    React.createElement(
      "button",
      {
        type: "button",
        className: btnClass,
        "aria-label": light ? "Switch to dark mode" : "Switch to light mode",
        title: (compact ? label + " mode" : light ? "Dark mode" : "Light mode"),
        onClick: onToggle,
      },
      React.createElement(
        "span",
        { className: "theme-toggle-icon", "aria-hidden": true },
        light ? React.createElement(MoonIco, { s: 14, c: G }) : React.createElement(BulbIco, { s: 14, c: G })
      ),
      !compact && React.createElement("span", { className: "theme-toggle-label" }, label)
    )
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
    { "aria-label": "Main", className: "bottom-nav" },
    tabs.map((t) => {
      const on = active === t.id;
      const dis = t.disabled;
      const col = dis ? "var(--nav-disabled)" : on ? G : "var(--nav-inactive)";
      return React.createElement(
        "button",
        {
          key: t.id,
          type: "button",
          className: "bottom-nav-btn",
          "aria-label": t.label,
          "aria-current": on ? "page" : undefined,
          disabled: dis,
          onClick: () => !dis && onSelect(t.id),
        },
        React.createElement(t.Ico, { s: 22, c: col }),
        React.createElement("span", { className: "bottom-nav-label", style: { color: col } }, t.label)
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

export function ProductCard({ brand, name, spec, price, tag, Ico, waMessage, selected, onSelect, powers }) {
  const msg = waMessage || productWhatsAppMessage(brand, name, price);
  const waHref = whatsAppChatUrl(msg);

  function onCardClick(e) {
    if (e.target.closest("a")) return;
    onSelect && onSelect();
  }

  return React.createElement(
    "div",
    {
      className: "product-card card-hover" + (selected ? " product-card--selected" : ""),
      onClick: onCardClick,
      role: onSelect ? "button" : undefined,
      tabIndex: onSelect ? 0 : undefined,
      onKeyDown: onSelect
        ? (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect();
            }
          }
        : undefined,
      "aria-pressed": onSelect ? !!selected : undefined,
    },
    React.createElement(
      "div",
      { className: "product-card-icon" },
      Ico ? React.createElement(Ico, { s: 20, c: G }) : React.createElement(SunIco, { s: 20, c: G })
    ),
    React.createElement(
      "div",
      { className: "product-card-body" },
      React.createElement("p", { className: "product-card-brand" }, brand),
      React.createElement("p", { className: "product-card-name" }, name),
      React.createElement("p", { className: "product-card-spec" }, spec),
      selected && powers?.length > 0 &&
        React.createElement(
          "p",
          { className: "product-card-spec product-card-spec--powers" },
          powers.slice(0, 3).join(" · ")
        )
    ),
    React.createElement(
      "div",
      { className: "product-card-price" },
      React.createElement("p", { className: "product-card-price-val" }, "$" + price),
      tag && React.createElement("span", { className: "product-card-tag" }, selected ? "Selected" : tag)
    ),
    React.createElement(
      "a",
      {
        href: waHref,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "product-card-wa",
        "aria-label": "WhatsApp Energi Tech about " + name,
        title: "Chat on WhatsApp",
        onClick: (e) => e.stopPropagation(),
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

export function BtnPrimary({ children, onClick, disabled, full, icon, className }) {
  return React.createElement(
    "button",
    {
      type: "button",
      className: "btn-primary" + (className ? " " + className : ""),
      onClick,
      disabled,
      style: {
        width: full ? "100%" : undefined,
        flex: full ? undefined : 1,
        padding: "14px 20px",
        background: disabled ? "var(--border)" : GRAD_GOLD,
        opacity: disabled ? 0.55 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
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
