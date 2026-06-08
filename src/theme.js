/** Theme — dark default, optional light mode. Applied via `data-theme` on `<html>`. */

export const THEME_STORAGE_KEY = "solarapp-theme";

export function getStoredTheme() {
  try {
    const t = localStorage.getItem(THEME_STORAGE_KEY);
    if (t === "light" || t === "dark") return t;
  } catch (_) {
    /* private browsing */
  }
  return "dark";
}

export function applyTheme(theme) {
  const mode = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = mode;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", mode === "light" ? "#FAFAF9" : "#040608");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch (_) {
    /* ignore */
  }
}

export function toggleTheme(current) {
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);
  return next;
}

export const themeCss =
  ":root,[data-theme=\"dark\"]" +
  "{" +
  "--bg:#040608;" +
  "--bg-hero:radial-gradient(ellipse 120% 80% at 50% -30%, rgba(232,197,71,.14), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 20%, rgba(61,214,140,.08), transparent), radial-gradient(ellipse 50% 30% at 0% 80%, rgba(91,156,245,.05), transparent);" +
  "--text-primary:#F8FAFC;" +
  "--text-secondary:rgba(255,255,255,.88);" +
  "--text-body:rgba(255,255,255,.7);" +
  "--text-muted:rgba(255,255,255,.55);" +
  "--text-subtle:rgba(255,255,255,.42);" +
  "--text-faint:rgba(255,255,255,.32);" +
  "--surface:rgba(255,255,255,.04);" +
  "--surface-hover:rgba(255,255,255,.07);" +
  "--surface-strong:rgba(255,255,255,.06);" +
  "--surface-inset:rgba(255,255,255,.03);" +
  "--row-bg:rgba(255,255,255,.02);" +
  "--row-bg-on:rgba(232,197,71,.06);" +
  "--chip-bg:rgba(255,255,255,.06);" +
  "--border:rgba(255,255,255,.08);" +
  "--border-strong:rgba(255,255,255,.12);" +
  "--border-focus:rgba(232,197,71,.45);" +
  "--gold-dim:rgba(232,197,71,.15);" +
  "--green-dim:rgba(61,214,140,.12);" +
  "--card-bg:linear-gradient(165deg, rgba(14,22,18,.92) 0%, rgba(8,12,10,.88) 100%);" +
  "--card-border:1px solid rgba(255,255,255,.09);" +
  "--card-shadow:0 8px 40px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.04) inset, 0 1px 0 rgba(232,197,71,.08) inset;" +
  "--nav-bg:linear-gradient(180deg, rgba(8,12,10,.92), rgba(6,10,8,.98));" +
  "--nav-border:1px solid rgba(255,255,255,.1);" +
  "--nav-shadow:0 -8px 40px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.06);" +
  "--nav-inactive:rgba(255,255,255,.65);" +
  "--nav-disabled:rgba(255,255,255,.28);" +
  "--nav-active-bg:rgba(232,197,71,.12);" +
  "--home-card-bg:linear-gradient(180deg,rgba(14,20,17,.9),rgba(8,12,10,.94));" +
  "--home-card-border:1px solid rgba(255,255,255,.08);" +
  "--home-card-shadow:0 20px 56px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.06);" +
  "--tile-bg:linear-gradient(160deg,rgba(255,255,255,.045),rgba(255,255,255,.015));" +
  "--tile-border:1px solid rgba(255,255,255,.08);" +
  "--tile-hover-bg:linear-gradient(160deg,rgba(232,197,71,.08),rgba(255,255,255,.03));" +
  "--tile-hover-shadow:0 12px 32px rgba(0,0,0,.25);" +
  "--pq-bar-bg:rgba(10,16,13,.94);" +
  "--pq-track-bg:rgba(0,0,0,.45);" +
  "--sticky-bg:linear-gradient(180deg,transparent 0%,rgba(8,12,10,.88) 26%,rgba(8,12,10,.98) 100%);" +
  "--modal-overlay:rgba(0,0,0,.88);" +
  "--modal-bg:linear-gradient(145deg,#0A1208,#050A05);" +
  "--input-bg:rgba(255,255,255,.05);" +
  "--input-text:#fff;" +
  "--panel-bg:rgba(255,255,255,.025);" +
  "--panel-border:1px solid rgba(255,255,255,.08);" +
  "--toggle-bg:rgba(12,18,15,.75);" +
  "--toggle-border:rgba(255,255,255,.14);" +
  "--toggle-label:rgba(255,255,255,.82);" +
  "--scrollbar:rgba(232,197,71,.2);" +
  "--quote-gold:#E8C547;" +
  "--quote-title:#F8FAFC;" +
  "--quote-hero-bg:linear-gradient(145deg,rgba(15,31,23,.97),rgba(26,51,40,.88));" +
  "--quote-hero-custom-bg:linear-gradient(145deg,rgba(50,22,22,.97),rgba(28,14,14,.9));" +
  "--quote-hero-fg:#F8FAFC;" +
  "--quote-hero-muted:rgba(255,255,255,.72);" +
  "--quote-hero-accent:#E8C547;" +
  "--quote-hero-custom-accent:#FCA5A5;" +
  "--quote-hero-border:rgba(232,197,71,.22);" +
  "--quote-hero-custom-border:rgba(248,113,113,.28);" +
  "--quote-hero-stat-border:rgba(255,255,255,.1);" +
  "--quote-hero-eyebrow:rgba(232,197,71,.85);" +
  "--quote-spec-price:#E8C547;" +
  "--quote-delivery-bg:linear-gradient(165deg,rgba(232,197,71,.08) 0%,rgba(8,12,10,.95) 55%);" +
  "--quote-delivery-border:rgba(232,197,71,.35);" +
  "--quote-zone-idle:rgba(0,0,0,.2);" +
  "--quote-input-bg:rgba(0,0,0,.3);" +
  "--quote-input-border:rgba(255,255,255,.15);" +
  "--quote-brand-accent:linear-gradient(180deg,#C9A227,#E8C547);" +
  "--quote-wm-opacity:.09;" +
  "--green-accent:#3DD68C;" +
  "}" +
  "[data-theme=\"light\"]" +
  "{" +
  "--bg:#FAFAF9;" +
  "--bg-hero:radial-gradient(ellipse 120% 80% at 50% -20%, rgba(232,197,71,.22), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 10%, rgba(61,214,140,.14), transparent), radial-gradient(ellipse 50% 30% at 0% 90%, rgba(91,156,245,.1), transparent);" +
  "--text-primary:#0F1412;" +
  "--text-secondary:#1A2420;" +
  "--text-body:#2A3530;" +
  "--text-muted:#3D4A44;" +
  "--text-subtle:#52605A;" +
  "--text-faint:#6B7872;" +
  "--surface:rgba(15,20,18,.05);" +
  "--surface-hover:rgba(15,20,18,.08);" +
  "--surface-strong:rgba(15,20,18,.07);" +
  "--surface-inset:rgba(15,20,18,.04);" +
  "--row-bg:rgba(15,20,18,.03);" +
  "--row-bg-on:rgba(232,197,71,.14);" +
  "--chip-bg:rgba(15,20,18,.06);" +
  "--border:rgba(15,20,18,.12);" +
  "--border-strong:rgba(15,20,18,.18);" +
  "--border-focus:rgba(160,128,32,.65);" +
  "--gold-dim:rgba(232,197,71,.28);" +
  "--green-dim:rgba(45,160,100,.18);" +
  "--card-bg:linear-gradient(165deg, #FFFFFF 0%, #FAFAF8 100%);" +
  "--card-border:1px solid rgba(15,20,18,.08);" +
  "--card-shadow:0 4px 20px rgba(15,20,18,.07), 0 0 0 1px rgba(255,255,255,.95) inset;" +
  "--nav-bg:linear-gradient(180deg, rgba(255,255,255,.97), rgba(248,246,241,.99));" +
  "--nav-border:1px solid rgba(15,20,18,.12);" +
  "--nav-shadow:0 -8px 28px rgba(15,20,18,.12), inset 0 1px 0 rgba(255,255,255,.95);" +
  "--nav-inactive:#4A5650;" +
  "--nav-disabled:#9AA39E;" +
  "--nav-active-bg:rgba(232,197,71,.28);" +
  "--home-card-bg:linear-gradient(180deg,#FFFFFF,#FAF8F4);" +
  "--home-card-border:1px solid rgba(15,20,18,.1);" +
  "--home-card-shadow:0 20px 44px rgba(15,20,18,.1), inset 0 1px 0 rgba(255,255,255,.95);" +
  "--tile-bg:linear-gradient(160deg,#FFFFFF,#F6F4EE);" +
  "--tile-border:1px solid rgba(15,20,18,.1);" +
  "--tile-hover-bg:linear-gradient(160deg,rgba(232,197,71,.16),#FFFFFF);" +
  "--tile-hover-shadow:0 12px 24px rgba(15,20,18,.12);" +
  "--pq-bar-bg:rgba(255,255,255,.96);" +
  "--pq-track-bg:rgba(15,20,18,.1);" +
  "--sticky-bg:linear-gradient(180deg,transparent 0%,rgba(244,242,236,.9) 26%,rgba(244,242,236,.98) 100%);" +
  "--modal-overlay:rgba(15,20,18,.5);" +
  "--modal-bg:linear-gradient(145deg,#FFFFFF,#F0EDE6);" +
  "--input-bg:rgba(15,20,18,.05);" +
  "--input-text:#0F1412;" +
  "--panel-bg:rgba(15,20,18,.03);" +
  "--panel-border:1px solid rgba(15,20,18,.1);" +
  "--toggle-bg:rgba(255,255,255,.92);" +
  "--toggle-border:rgba(15,20,18,.14);" +
  "--toggle-label:#2A3530;" +
  "--scrollbar:rgba(160,128,32,.4);" +
  "--quote-gold:#8B6914;" +
  "--quote-title:#1D1D1F;" +
  "--quote-hero-bg:linear-gradient(165deg,#FFFFFF 0%,#FAF8F4 45%,#F3EFE6 100%);" +
  "--quote-hero-custom-bg:linear-gradient(165deg,#FFFFFF 0%,#FDF6F6 48%,#F8EDED 100%);" +
  "--quote-hero-fg:#1D1D1F;" +
  "--quote-hero-muted:#5C6570;" +
  "--quote-hero-accent:#7A5C12;" +
  "--quote-hero-custom-accent:#B91C1C;" +
  "--quote-hero-border:rgba(160,128,32,.2);" +
  "--quote-hero-custom-border:rgba(185,28,28,.18);" +
  "--quote-hero-stat-border:rgba(15,20,18,.08);" +
  "--quote-hero-eyebrow:#8B6914;" +
  "--quote-spec-price:#8B6914;" +
  "--quote-delivery-bg:linear-gradient(165deg,rgba(250,248,240,.98) 0%,#FFFFFF 58%);" +
  "--quote-delivery-border:rgba(160,128,32,.22);" +
  "--quote-zone-idle:rgba(15,20,18,.04);" +
  "--quote-input-bg:#FFFFFF;" +
  "--quote-input-border:rgba(15,20,18,.14);" +
  "--quote-brand-accent:linear-gradient(180deg,#A67C00,#C9A227);" +
  "--quote-wm-opacity:.05;" +
  "--green-accent:#1A7A4A;" +
  "}" +
  ".theme-toggle-wrap{position:relative;z-index:2;flex-shrink:0}" +
  ".theme-toggle-wrap--inline{pointer-events:auto}" +
  ".theme-toggle{display:inline-flex;align-items:center;gap:7px;padding:7px 12px 7px 10px;border-radius:999px;" +
  "background:var(--toggle-bg);border:1px solid var(--toggle-border);color:var(--toggle-label);" +
  "font-size:11px;font-weight:600;font-family:inherit;letter-spacing:0.02em;cursor:pointer;" +
  "backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 2px 12px rgba(0,0,0,.15);transition:background .2s,border-color .2s,transform .15s,box-shadow .2s}" +
  ".theme-toggle--compact{padding:5px;border-radius:10px;gap:0}" +
  ".theme-toggle--compact .theme-toggle-icon{width:28px;height:28px;border-radius:8px}" +
  ".theme-toggle:hover{transform:translateY(-1px);border-color:var(--border-focus);box-shadow:0 4px 16px rgba(0,0,0,.18)}" +
  ".theme-toggle:active{transform:translateY(0)}" +
  ".theme-toggle-icon{display:flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:8px;background:var(--gold-dim);flex-shrink:0}" +
  ".theme-toggle-label{color:var(--toggle-label);line-height:1}" +
  "[data-theme=\"light\"] .home-brand-sun,[data-theme=\"light\"] .brand-sun-mark-icon{filter:drop-shadow(0 0 8px rgba(201,162,39,.28))}" +
  "[data-theme=\"light\"] .brand-sun-mark-by{color:rgba(160,128,32,.85)}" +
  "[data-theme=\"light\"] .home-section-label{color:var(--text-muted)}" +
  "[data-theme=\"light\"] .home-section-hint{color:var(--text-subtle)}" +
  "[data-theme=\"light\"] .home-step-pill{color:var(--text-body);background:var(--surface);border-color:var(--border)}" +
  "[data-theme=\"light\"] .home-marquee-wrap{background:linear-gradient(90deg,rgba(255,255,255,.95),rgba(248,246,241,.98));border-color:rgba(15,20,18,.1)}" +
  "[data-theme=\"light\"] .home-marquee-wrap::before{background:linear-gradient(90deg,rgba(244,242,236,.98),transparent)}" +
  "[data-theme=\"light\"] .home-marquee-wrap::after{background:linear-gradient(270deg,rgba(244,242,236,.98),transparent)}" +
  "[data-theme=\"light\"] .home-marquee-pill{color:var(--text-body);background:var(--chip-bg);border-color:var(--border)}" +
  "[data-theme=\"light\"] .prop-card:hover{background:var(--tile-hover-bg)!important;box-shadow:0 8px 24px rgba(15,20,18,.1),0 0 0 1px rgba(232,197,71,.2)!important}" +
  "[data-theme=\"light\"] .card-hover:hover{box-shadow:0 12px 28px rgba(15,20,18,.12),0 0 0 1px rgba(232,197,71,.2)!important}" +
  "[data-theme=\"light\"] .load-meter-box{background:var(--surface);border-color:var(--border)}" +
  "[data-theme=\"light\"] .pq-dot{background:rgba(15,20,18,.15)!important}" +
  "[data-theme=\"light\"] .pq-dot--active,[data-theme=\"light\"] .pq-dot--pop{background:rgba(201,162,39,.85)!important}" +
  "[data-theme=\"light\"] .btn-ghost{color:var(--text-body)!important}" +
  "[data-theme=\"light\"] .home-prop-arrow{opacity:.45}" +
  "[data-theme=\"light\"] .home-prop-tile:hover .home-prop-arrow{opacity:.75}" +
  ".quote-page{position:relative;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}" +
  ".quote-page input,.quote-page textarea,.quote-page .location-suggest-item,.quote-page .delivery-mode-btn{-webkit-user-select:text;user-select:text;-webkit-touch-callout:default}" +
  ".quote-page--compact{flex:1;min-height:0;display:flex;flex-direction:column;padding:0}" +
  ".quote-page--compact .quote-page__content{position:relative;z-index:2;flex:1;min-height:0;display:flex;flex-direction:column;gap:clamp(6px,1.2vh,10px);padding:0 2px;overflow:hidden}" +
  ".quote-page__scroll{flex:1;min-height:0;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;display:flex;flex-direction:column;gap:clamp(6px,1.2vh,10px);padding-bottom:2px;scrollbar-gutter:stable}" +
  ".quote-page-header{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:0 2px 4px;flex-shrink:0}" +
  ".quote-page-header-brand{display:flex;align-items:center;gap:8px}" +
  ".quote-page-header-title{font-family:" + "'Cormorant Garamond',Georgia,serif" + ";font-size:1.2rem;font-weight:700;margin:0;line-height:1;color:var(--quote-title)}" +
  ".quote-page-header-title em{color:var(--quote-gold);font-style:normal}" +
  ".quote-page-header-end{display:flex;align-items:center;gap:8px;flex-shrink:0}" +
  ".quote-page-header-ref{font-size:10px;font-weight:600;color:var(--text-muted);letter-spacing:.04em;font-variant-numeric:tabular-nums;white-space:nowrap}" +
  ".quote-package-card{margin:0;padding:14px 16px;border-radius:14px;background:var(--quote-hero-bg);border:1px solid var(--quote-hero-border);box-shadow:var(--card-shadow);flex-shrink:0}" +
  ".quote-package-card--custom{background:var(--quote-hero-custom-bg);border-color:var(--quote-hero-custom-border)}" +
  ".quote-package-card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}" +
  ".quote-package-card-main{min-width:0;flex:1}" +
  ".quote-package-name{font-family:" + "'Cormorant Garamond',Georgia,serif" + ";font-size:clamp(1.15rem,4vw,1.35rem);font-weight:700;margin:0;line-height:1.12;color:var(--quote-hero-fg)}" +
  ".quote-package-includes{font-size:11px;color:var(--quote-hero-muted);margin:4px 0 0;line-height:1.35}" +
  ".quote-package-price-block{text-align:right;flex-shrink:0}" +
  ".quote-package-price{font-family:" + "'Cormorant Garamond',Georgia,serif" + ";font-size:clamp(1.45rem,4.5vw,1.65rem);font-weight:700;color:var(--quote-hero-accent);margin:0;line-height:1}" +
  ".quote-package-card--custom .quote-package-price{color:var(--quote-hero-custom-accent)}" +
  ".quote-package-price-sub{font-size:9px;color:var(--quote-hero-muted);margin:3px 0 0;text-transform:uppercase;letter-spacing:.06em}" +
  ".quote-package-load{font-size:clamp(9px,2.2vw,10px);color:var(--quote-hero-muted);margin:8px 0 0;padding-top:8px;border-top:1px solid var(--quote-hero-stat-border);line-height:1.4}" +
  ".quote-eco-ribbon{margin:8px 0 0;padding:10px 12px;border-radius:10px;background:rgba(61,214,140,.08);border:1px solid rgba(61,214,140,.18);text-align:left}" +
  ".quote-eco-ribbon-head{display:flex;align-items:center;gap:6px;margin-bottom:4px}" +
  ".quote-eco-ribbon-head svg{flex-shrink:0;color:var(--green-accent)}" +
  ".quote-eco-ribbon-title{font-size:11px;font-weight:700;color:var(--green-accent);letter-spacing:.02em}" +
  ".quote-eco-ribbon-text{font-size:clamp(10px,2.3vw,11px);line-height:1.45;color:var(--text-body);margin:0}" +
  "[data-theme=\"light\"] .quote-eco-ribbon{background:rgba(45,160,100,.07);border-color:rgba(26,122,74,.14)}" +
  ".quote-install-section{padding:12px 14px;border-radius:14px;background:var(--quote-delivery-bg);border:1px solid var(--quote-delivery-border);box-shadow:var(--card-shadow);display:flex;flex-direction:column;gap:10px}" +
  ".quote-install-benefit{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:12px;background:rgba(61,214,140,.08);border:1px solid rgba(61,214,140,.2)}" +
  ".quote-install-benefit-icon{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:10px;flex-shrink:0;background:rgba(61,214,140,.12);color:var(--green-accent)}" +
  ".quote-install-benefit-body{min-width:0}" +
  ".quote-install-benefit-title{font-size:13px;font-weight:700;color:var(--text-primary);margin:0 0 3px;line-height:1.25}" +
  ".quote-install-benefit-text{font-size:11px;color:var(--text-secondary);margin:0;line-height:1.4}" +
  ".quote-install-zone-toggle{display:grid;grid-template-columns:1fr 1fr;gap:6px}" +
  ".quote-install-zone-btn{padding:8px 10px;border-radius:10px;border:1px solid var(--border);background:var(--surface);color:var(--text-muted);font-size:12px;font-weight:600;font-family:inherit;cursor:pointer;transition:border-color .15s,background .15s,color .15s}" +
  ".quote-install-zone-btn--active{border-color:rgba(232,197,71,.45);background:var(--gold-dim);color:var(--text-primary);box-shadow:0 0 0 1px rgba(232,197,71,.1)}" +
  ".quote-install-outside-hint{font-size:10px;color:var(--text-muted);margin:0;line-height:1.4}" +
  ".quote-install-area-label{font-size:10px;font-weight:600;color:var(--text-muted);letter-spacing:.04em;margin:0}" +
  ".quote-install-area-optional{font-weight:500;color:var(--text-faint)}" +
  ".quote-install-section .location-pin-wrap{margin:0}" +
  ".quote-install-section .quote-total-bar{margin-top:2px;padding-top:10px;border-top:1px solid var(--border)}" +
  "[data-theme=\"light\"] .quote-install-benefit{background:rgba(45,160,100,.07);border-color:rgba(26,122,74,.16)}" +
  "[data-theme=\"light\"] .quote-install-section{box-shadow:0 6px 28px rgba(15,20,18,.06),0 0 0 1px rgba(160,128,32,.1)}" +
  ".quote-delivery-card--compact{padding:clamp(10px,2vw,12px) clamp(12px,2.5vw,14px)!important;margin:0!important;border-radius:14px!important;min-height:0;display:flex;flex-direction:column;overflow:hidden}" +
  ".quote-delivery-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px;flex-shrink:0;flex-wrap:wrap}" +
  ".quote-delivery-compact-title{font-size:11px;font-weight:700;color:var(--text-primary);margin:0;letter-spacing:.02em}" +
  ".quote-delivery-zone-badge{font-size:9px;font-weight:600;padding:4px 8px;border-radius:999px;background:var(--surface-inset);border:1px solid var(--border);color:var(--text-muted);white-space:nowrap}" +
  ".quote-delivery-zone-badge--harare{border-color:rgba(61,214,140,.25);color:var(--green-accent);background:rgba(61,214,140,.08)}" +
  ".quote-delivery-help{font-size:10px;color:var(--text-muted);margin:0 0 8px;line-height:1.4;flex-shrink:0}" +
  ".pac-container{z-index:10050!important;border-radius:0 0 10px 10px!important;font-family:inherit!important;box-shadow:0 8px 24px rgba(0,0,0,.2)!important}" +
  ".pac-item{padding:10px 12px!important;font-size:13px!important;cursor:pointer!important}" +
  ".pac-item-query{font-size:13px!important}" +
  ".quote-zone-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;flex-shrink:0}" +
  ".quote-zone-chip{display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:10px 12px;border-radius:11px;border:1px solid var(--border);background:var(--quote-zone-idle);cursor:pointer;font-family:inherit;text-align:left;transition:border-color .15s,background .15s}" +
  ".quote-zone-chip--active{border-color:var(--border-focus);background:var(--gold-dim);box-shadow:0 0 0 1px rgba(232,197,71,.15)}" +
  ".quote-zone-chip-title{font-size:13px;font-weight:700;color:var(--text-primary);line-height:1.2}" +
  ".quote-zone-chip-sub{font-size:10px;color:var(--text-muted);line-height:1.2}" +
  ".quote-delivery-card--compact .location-pin-wrap{flex-shrink:0;margin-bottom:0}" +
  ".quote-delivery-card--compact .quote-zone-input{font-size:15px;padding:9px 48px 9px 11px}" +
  ".quote-delivery-card--compact .location-map-pin{width:36px;height:36px;right:4px}" +
  ".quote-total-bar{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:auto;padding-top:10px;border-top:1px solid var(--border);flex-shrink:0}" +
  ".quote-total-bar--pending .quote-total-bar-amount{opacity:.85}" +
  ".quote-total-bar-meta{min-width:0}" +
  ".quote-total-bar-label{display:block;font-size:11px;font-weight:600;color:var(--text-body);line-height:1.2}" +
  ".quote-total-bar-note{display:block;font-size:10px;color:var(--text-muted);margin-top:2px;line-height:1.3}" +
  ".quote-total-bar-amount{font-size:1.25rem;font-weight:800;color:var(--quote-gold);font-variant-numeric:tabular-nums;flex-shrink:0}" +
  ".location-field-stack{display:flex;flex-direction:column;gap:6px;min-height:0;flex:1}" +
  ".location-map-panel{flex:1;min-height:0;display:flex;flex-direction:column;border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--surface-inset)}" +
  ".location-map-canvas{width:100%;flex:1;min-height:clamp(72px,14vh,120px);max-height:22vh;background:var(--surface)}" +
  ".location-map-canvas--idle{min-height:clamp(64px,12vh,100px)}" +
  ".location-map-iframe{width:100%;flex:1;min-height:clamp(72px,14vh,120px);max-height:22vh;border:0;display:block}" +
  ".location-map-caption{flex-shrink:0;margin:0;padding:5px 8px;font-size:9px;color:var(--text-faint);text-align:center;line-height:1.3}" +
  ".quote-delivery-card--compact .location-field-stack{flex:1;min-height:0}" +
  ".quote-page-footer{flex-shrink:0;margin-top:0;padding-bottom:calc(68px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;gap:clamp(5px,1vh,8px);align-items:stretch;transition:opacity .2s ease,transform .2s ease}" +
  ".quote-marketing-opt-in{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:12px;border:1px solid var(--border);background:var(--surface-inset);cursor:pointer;text-align:left;-webkit-user-select:none;user-select:none}" +
  ".quote-marketing-opt-in input[type=checkbox]{margin:2px 0 0;flex-shrink:0;width:18px;height:18px;accent-color:var(--quote-gold,#C9A227);cursor:pointer}" +
  ".quote-marketing-opt-in-label{font-size:12px;line-height:1.45;color:var(--text-body);-webkit-user-select:none;user-select:none}" +
  ".quote-page-reset{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:6px 8px;border:none;background:transparent;color:var(--text-muted);font-size:12px;cursor:pointer;font-family:inherit;margin:0 auto}" +
  ".quote-page-reset:hover{color:var(--text-body)}" +
  ".quote-page__content{position:relative;z-index:2;display:flex;flex-direction:column;gap:0}" +
  ".quote-wm-shield{position:absolute;inset:0;z-index:1;pointer-events:none;overflow:hidden;border-radius:inherit}" +
  ".quote-wm-grid{position:absolute;inset:-40%;display:flex;flex-wrap:wrap;gap:36px 56px;align-content:center;justify-content:center;transform:rotate(-24deg);opacity:var(--quote-wm-opacity)}" +
  ".quote-wm-tile{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted);white-space:nowrap;user-select:none}" +
  ".quote-wm-ref{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:600;color:var(--text-faint);letter-spacing:.06em;white-space:nowrap;user-select:none;padding:4px 10px;border-radius:999px;background:var(--surface-strong)}" +
  ".quote-brand-bar{position:relative;margin-bottom:14px;padding:16px 16px 16px 20px;border-radius:16px;background:var(--card-bg);border:var(--card-border);box-shadow:var(--card-shadow);overflow:hidden}" +
  ".quote-brand-bar::before{content:'';position:absolute;left:0;top:10px;bottom:10px;width:3px;border-radius:0 3px 3px 0;background:var(--quote-brand-accent)}" +
  ".quote-brand-bar-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px}" +
  ".quote-gold-icon{display:inline-flex;align-items:center;justify-content:center;color:var(--quote-gold);flex-shrink:0}" +
  ".quote-brand-bar-lockup{display:flex;align-items:center;gap:10px}" +
  ".quote-brand-bar-title{font-family:" + "'Cormorant Garamond',Georgia,serif" + ";font-size:1.5rem;font-weight:700;margin:0;line-height:1.05;color:var(--quote-title);letter-spacing:.02em}" +
  ".quote-brand-bar-title em{color:var(--quote-gold);font-style:normal}" +
  ".quote-brand-bar-sub{font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--text-muted);margin:4px 0 0}" +
  ".quote-brand-bar-ref{text-align:right;flex-shrink:0;padding:6px 10px;border-radius:10px;background:var(--surface);border:1px solid var(--border)}" +
  ".quote-brand-bar-ref-label{font-size:9px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);margin:0}" +
  ".quote-brand-bar-ref-id{font-size:13px;font-weight:700;color:var(--text-primary);margin:2px 0 0;font-variant-numeric:tabular-nums}" +
  ".quote-brand-bar-note{display:flex;align-items:flex-start;gap:8px;font-size:11px;line-height:1.5;color:var(--text-body);margin:0;padding:11px 12px;border-radius:11px;background:var(--gold-dim);border:1px solid rgba(232,197,71,.22)}" +
  ".quote-hero-card{margin-bottom:14px;padding:20px 18px;border-radius:16px;background:var(--quote-hero-bg);border:1px solid var(--quote-hero-border);color:var(--quote-hero-fg);box-shadow:var(--card-shadow);user-select:none;-webkit-user-select:none}" +
  ".quote-hero-card--custom{background:var(--quote-hero-custom-bg);border-color:var(--quote-hero-custom-border)}" +
  ".quote-hero-card-head{display:flex;justify-content:space-between;align-items:flex-end;gap:14px;flex-wrap:wrap}" +
  ".quote-hero-card-left{min-width:0;flex:1}" +
  ".quote-hero-eyebrow{font-size:9px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--quote-hero-eyebrow);margin:0 0 6px}" +
  ".quote-hero-title{font-family:" + "'Cormorant Garamond',Georgia,serif" + ";font-size:clamp(1.35rem,4.5vw,1.75rem);font-weight:700;margin:0;line-height:1.12;color:var(--quote-hero-fg)}" +
  ".quote-hero-sub{font-size:12px;color:var(--quote-hero-muted);margin:6px 0 0;line-height:1.45}" +
  ".quote-hero-card-price{text-align:right;flex-shrink:0}" +
  ".quote-hero-price{font-family:" + "'Cormorant Garamond',Georgia,serif" + ";font-size:clamp(1.6rem,5vw,2rem);font-weight:700;color:var(--quote-hero-accent);margin:0;line-height:1}" +
  ".quote-hero-card--custom .quote-hero-price{color:var(--quote-hero-custom-accent)}" +
  ".quote-hero-price-sub{font-size:10px;color:var(--quote-hero-muted);margin:4px 0 0}" +
  ".quote-hero-stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px;padding-top:12px;border-top:1px solid var(--quote-hero-stat-border)}" +
  ".quote-hero-stat-val{font-size:14px;font-weight:700;color:var(--quote-hero-accent);margin:0;line-height:1.2;font-variant-numeric:tabular-nums}" +
  ".quote-hero-stat-lbl{font-size:10px;color:var(--quote-hero-muted);margin:3px 0 0}" +
  ".quote-spec-table{margin-bottom:14px;border-radius:16px;overflow:hidden;background:var(--card-bg);border:var(--card-border);box-shadow:var(--card-shadow);user-select:none;-webkit-user-select:none}" +
  ".quote-spec-table-title{font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted);margin:0;padding:12px 14px 8px;border-bottom:1px solid var(--border)}" +
  ".quote-spec-row{display:flex;align-items:center;gap:12px;padding:12px 14px}" +
  ".quote-spec-row--border{border-bottom:1px solid var(--border)}" +
  ".quote-spec-icon{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;flex-shrink:0;background:var(--gold-dim)!important}" +
  ".quote-spec-main{flex:1;min-width:0}" +
  ".quote-spec-label{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--text-muted);margin:0 0 3px}" +
  ".quote-spec-val{font-size:13px;font-weight:500;color:var(--text-primary);margin:0;line-height:1.35}" +
  ".quote-spec-price{font-size:14px;font-weight:700;color:var(--quote-spec-price);flex-shrink:0;margin:0;font-variant-numeric:tabular-nums}" +
  ".quote-delivery-card{padding:18px 20px!important;margin-bottom:12px;border-radius:16px!important;background:var(--quote-delivery-bg)!important;border:1px solid var(--quote-delivery-border)!important;box-shadow:var(--card-shadow)!important}" +
  ".quote-delivery-card .quote-zone-btn{display:flex;align-items:flex-start;gap:12px;width:100%;padding:12px 14px;border-radius:12px;border:1px solid var(--border);background:var(--quote-zone-idle);cursor:pointer;text-align:left;font-family:inherit}" +
  ".quote-delivery-card .quote-zone-btn--active{border-color:var(--border-focus);background:var(--gold-dim)}" +
  ".quote-delivery-card .quote-zone-radio{border:2px solid var(--border);border-radius:50%}" +
  ".quote-delivery-card .quote-zone-btn--active .quote-zone-radio{border-color:var(--quote-gold)}" +
  ".quote-delivery-card .quote-zone-input{width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--quote-input-border);background:var(--quote-input-bg);color:var(--text-primary);font-size:16px;font-family:inherit;box-sizing:border-box}" +
  ".quote-delivery-card .quote-zone-input--with-pin{padding:10px 52px 10px 12px}" +
  ".quote-delivery-location-label{display:flex;align-items:center;gap:6px;font-size:9.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted);margin:0 0 6px}" +
  ".quote-delivery-location-label .quote-gold-icon{display:inline-flex;color:var(--quote-gold)}" +
  ".quote-delivery-card .location-pin-wrap{position:relative;margin-bottom:4px}" +
  ".location-pin-wrap{position:relative}" +
  ".location-pin-input{width:100%;padding:10px 52px 10px 12px;border-radius:10px;border:1px solid var(--quote-input-border,rgba(255,255,255,.15));background:var(--quote-input-bg,rgba(0,0,0,.3));color:var(--text-primary);font-size:16px;font-family:inherit;box-sizing:border-box}" +
  ".location-map-pin{position:absolute;right:5px;top:50%;transform:translateY(-50%);z-index:2;width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:10px;border:1.5px solid rgba(232,197,71,.55);background:var(--gold-dim);color:var(--quote-gold,#C9A227);cursor:pointer;font-family:inherit;padding:0;flex-shrink:0;box-shadow:0 1px 6px rgba(0,0,0,.12);transition:background .15s,border-color .15s,transform .15s,box-shadow .15s}" +
  "[data-theme=\"light\"] .location-map-pin{border-color:rgba(201,162,39,.65);box-shadow:0 1px 8px rgba(15,20,18,.08)}" +
  ".location-map-pin:hover:not(:disabled){border-color:var(--border-focus);box-shadow:0 2px 10px rgba(232,197,71,.2);transform:translateY(-50%) scale(1.03)}" +
  ".location-map-pin:active:not(:disabled){transform:translateY(-50%) scale(0.98)}" +
  ".location-map-pin:disabled{opacity:.65;cursor:wait}" +
  ".location-map-pin.is-busy{background:var(--surface)}" +
  ".location-map-pin-spinner{width:16px;height:16px;border-radius:50%;border:2px solid rgba(232,197,71,.25);border-top-color:var(--quote-gold,#C9A227);animation:clientModalSpin .7s linear infinite}" +
  ".location-pin-hint{font-size:10px;color:var(--text-muted);margin:-2px 0 8px;line-height:1.35;padding:0 2px;text-align:right}" +
  ".location-pin-wrap--smart .location-pin-input,.location-pin-wrap--smart .quote-zone-input--with-pin{border-bottom-left-radius:0;border-bottom-right-radius:0}" +
  ".location-suggest-list{position:absolute;left:0;right:0;top:100%;z-index:12;margin:0;padding:4px 0;list-style:none;border-radius:0 0 10px 10px;border:1px solid var(--quote-input-border,var(--border));border-top:none;background:var(--quote-input-bg,var(--modal-bg));box-shadow:0 8px 20px rgba(0,0,0,.18);max-height:200px;overflow-y:auto}" +
  ".location-suggest-item{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;padding:9px 12px;border:none;background:transparent;color:var(--text-primary);font-size:13px;font-family:inherit;text-align:left;cursor:pointer}" +
  ".location-suggest-item:hover,.location-suggest-item--active{background:var(--gold-dim)}" +
  ".location-suggest-item--muted{cursor:default;color:var(--text-muted);font-size:12px}" +
  ".location-suggest-label{flex:1;min-width:0;line-height:1.35}" +
  ".location-suggest-km{flex-shrink:0;font-size:10px;font-weight:600;color:var(--quote-gold);letter-spacing:.02em}" +
  ".location-suggest-tag{flex-shrink:0;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;padding:2px 6px;border-radius:6px;background:rgba(232,197,71,.12);color:var(--quote-gold)}" +
  ".eco-quote-strip{margin-bottom:12px;padding:12px 14px;border-radius:14px;background:var(--green-dim);border:1px solid rgba(61,214,140,.22);display:grid;grid-template-columns:repeat(3,1fr);gap:6px;text-align:center;user-select:none;-webkit-user-select:none;box-shadow:var(--card-shadow)}" +
  ".eco-quote-strip-head{grid-column:1/-1;display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:2px}" +
  ".eco-quote-strip-title{font-size:10px;font-weight:600;color:var(--green-accent)}" +
  ".eco-quote-strip-val{font-size:15px;font-weight:700;color:var(--text-primary);margin:0;line-height:1.1}" +
  ".eco-quote-strip-lbl{font-size:9px;color:var(--text-muted);margin:2px 0 0}" +
  "[data-theme=\"light\"] .quote-page .quote-brand-bar{box-shadow:0 4px 24px rgba(15,20,18,.06),0 0 0 1px rgba(15,20,18,.06)}" +
  "[data-theme=\"light\"] .quote-page .quote-brand-bar-note{color:var(--text-secondary);border-color:rgba(160,128,32,.18);background:rgba(250,248,240,.9)}" +
  "[data-theme=\"light\"] .quote-page .quote-hero-card{box-shadow:0 10px 36px rgba(15,20,18,.07),0 0 0 1px rgba(15,20,18,.05),inset 0 1px 0 rgba(255,255,255,.95)}" +
  "[data-theme=\"light\"] .quote-page .quote-spec-table{box-shadow:0 6px 28px rgba(15,20,18,.06),0 0 0 1px rgba(15,20,18,.05)}" +
  "[data-theme=\"light\"] .quote-page .quote-spec-row:hover{background:rgba(250,248,240,.65)}" +
  "[data-theme=\"light\"] .quote-page .eco-quote-strip{background:linear-gradient(135deg,rgba(45,160,100,.1),rgba(255,255,255,.95));border-color:rgba(26,122,74,.18);box-shadow:0 4px 20px rgba(15,20,18,.04)}" +
  "[data-theme=\"light\"] .quote-page .quote-delivery-card{box-shadow:0 6px 28px rgba(15,20,18,.06),0 0 0 1px rgba(160,128,32,.12)!important}" +
  "[data-theme=\"light\"] .quote-page .quote-wm-ref{background:rgba(255,255,255,.85);color:var(--text-muted);border:1px solid var(--border)}" +
  ".client-modal-overlay{position:fixed;inset:0;background:var(--modal-overlay);display:flex;align-items:center;justify-content:center;z-index:9998;padding:16px}" +
  ".client-modal-panel{width:100%;max-width:440px;max-height:90vh;overflow-y:auto;padding:clamp(22px,5vw,28px);border-radius:22px;background:var(--modal-bg);border:1px solid var(--border-strong);box-shadow:var(--card-shadow)}" +
  "[data-theme=\"light\"] .client-modal-panel{box-shadow:0 24px 64px rgba(15,20,18,.14),0 0 0 1px rgba(15,20,18,.06)}" +
  ".client-modal-brand{display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid var(--border)}" +
  ".client-modal-brand::before{content:none}" +
  ".client-modal-head{display:flex;align-items:flex-start;gap:10px;margin-bottom:6px}" +
  ".client-modal-eyebrow{font-size:9px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--text-muted);margin:0 0 4px}" +
  ".client-modal-title{font-family:" + "'Cormorant Garamond',Georgia,serif" + ";font-size:1.35rem;font-weight:700;margin:0;line-height:1.1;color:var(--quote-title)}" +
  ".client-modal-title em{color:var(--quote-gold);font-style:normal}" +
  ".client-modal-sub{font-size:12px;color:var(--text-body);margin:0 0 14px;line-height:1.45}" +
  ".client-modal-label{display:flex;align-items:center;gap:6px;font-size:9.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);margin-bottom:4px}" +
  ".client-modal-input{width:100%;background:var(--input-bg);border:1px solid var(--border);border-radius:10px;padding:10px 13px;color:var(--input-text);font-size:13px;font-family:inherit;outline:none;margin-bottom:10px;box-sizing:border-box}" +
  ".client-modal-address-wrap{position:relative;margin-bottom:10px}" +
  ".client-modal-address-wrap .client-modal-input--with-pin{margin-bottom:0;padding:10px 52px 10px 13px}" +
  ".client-modal-delivery-snippet{margin:4px 0 12px;padding:12px 14px;border-radius:12px;border:1px solid var(--border);background:var(--surface-inset)}" +
  ".client-modal-delivery-snippet-label{font-size:9px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);margin:0 0 6px}" +
  ".client-modal-delivery-snippet-zone{font-size:12px;color:var(--text-body);margin:0 0 4px;line-height:1.35}" +
  ".client-modal-delivery-snippet-total{font-size:17px;font-weight:800;color:var(--quote-gold);margin:0 0 6px}" +
  ".client-modal-delivery-snippet-hint{font-size:10px;color:var(--text-faint);margin:0;line-height:1.35}" +
  "@keyframes clientModalSpin{to{transform:rotate(360deg)}}" +
  ".client-modal-input:focus{border-color:var(--border-focus);box-shadow:0 0 0 2px var(--gold-dim)}" +
  ".client-modal-input::placeholder{color:var(--text-faint)}" +
  ".client-modal-error{color:#F87171;font-size:12px;margin:0 0 12px;line-height:1.4}" +
  ".client-modal-actions{display:flex;gap:10px}" +
  ".client-modal-btn-cancel{flex:1;padding:13px;background:transparent;border:1px solid var(--border);border-radius:12px;color:var(--text-body);font-size:13px;cursor:pointer;font-family:inherit}" +
  ".client-modal-btn-cancel:disabled{cursor:wait;opacity:.6}" +
  ".client-modal-btn-primary{flex:2;padding:13px;border:none;border-radius:12px;font-size:13px;font-weight:700;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:8px}" +
  ".client-modal-btn-primary--ready{background:linear-gradient(135deg,#C9A227,#E8C547);color:#0a0800;cursor:pointer}" +
  ".client-modal-btn-primary--idle{background:var(--surface-strong);color:var(--text-muted);cursor:not-allowed}" +
  ".client-modal-btn-primary:disabled{opacity:.7;cursor:wait}" +
  "[data-theme=\"light\"] .client-modal-panel .quote-delivery-card{margin-bottom:14px}" +
  "[data-theme=\"light\"] .client-modal-btn-primary--ready{color:#1D1D1F}" +
  ".pdf-download-banner{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(76px + env(safe-area-inset-bottom));width:min(560px,calc(100% - 20px));z-index:9985;padding:0 4px;pointer-events:none}" +
  ".pdf-download-banner-inner{pointer-events:auto;display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:16px;background:var(--nav-bg);border:var(--nav-border);box-shadow:var(--nav-shadow);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}" +
  ".pdf-download-banner--error .pdf-download-banner-inner{border-color:rgba(248,113,113,.45);background:rgba(40,12,12,.92)}" +
  "[data-theme=\"light\"] .pdf-download-banner--error .pdf-download-banner-inner{background:#FFF5F5;border-color:rgba(220,38,38,.35)}" +
  ".pdf-download-spinner{width:22px;height:22px;border:2px solid var(--border);border-top-color:var(--quote-gold);border-radius:50%;flex-shrink:0;animation:pdf-spin .75s linear infinite}" +
  "@keyframes pdf-spin{to{transform:rotate(360deg)}}" +
  ".pdf-download-banner-text{flex:1;min-width:0}" +
  ".pdf-download-banner-title{font-size:12px;font-weight:700;margin:0 0 2px;color:var(--text-primary)}" +
  ".pdf-download-banner-msg{font-size:11px;margin:0;color:var(--text-body);line-height:1.4}" +
  ".pdf-download-banner-actions{display:flex;flex-direction:column;gap:6px;flex-shrink:0}" +
  ".pdf-download-btn-home{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:10px 14px;border:none;border-radius:12px;background:linear-gradient(135deg,#C9A227,#E8C547);color:#0a0800;font-size:12px;font-weight:700;font-family:inherit;cursor:pointer;white-space:nowrap}" +
  "[data-theme=\"light\"] .pdf-download-btn-home{color:#1D1D1F}" +
  ".pdf-download-btn-dismiss{padding:6px 10px;border:none;border-radius:8px;background:transparent;color:var(--text-muted);font-size:10px;font-family:inherit;cursor:pointer;text-decoration:underline}" +
  "@media (max-width:420px){.pdf-download-banner{width:calc(100% - 12px);bottom:calc(70px + env(safe-area-inset-bottom))}.pdf-download-banner-inner{flex-wrap:wrap}.pdf-download-banner-actions{flex-direction:row;width:100%;justify-content:stretch}.pdf-download-btn-home{flex:1}}" +
  "html[data-keyboard-open=\"1\"]{scroll-behavior:auto}" +
  "html[data-keyboard-open=\"1\"] .bottom-nav{transform:translate(-50%,calc(100% + 28px));opacity:0;pointer-events:none;transition:transform .22s ease,opacity .22s ease}" +
  "html[data-keyboard-open=\"1\"] .app-shell--quote{padding-bottom:max(6px,env(safe-area-inset-bottom))}" +
  "html[data-keyboard-open=\"1\"] .app-shell--products{padding-bottom:max(6px,env(safe-area-inset-bottom))}" +
  "html[data-keyboard-open=\"1\"] .main-card--quote{max-height:calc(var(--vvh,100dvh) - env(safe-area-inset-top) - 8px)!important}" +
  "html[data-keyboard-open=\"1\"] .main-card--products{max-height:calc(var(--vvh,100dvh) - env(safe-area-inset-top) - 8px)!important}" +
  "html[data-keyboard-open=\"1\"] .quote-page-footer{display:none}" +
  "html[data-keyboard-open=\"1\"] .quote-package-card{padding:10px 12px}" +
  "html[data-keyboard-open=\"1\"] .quote-package-load,html[data-keyboard-open=\"1\"] .quote-eco-ribbon{display:none}" +
  "html[data-keyboard-open=\"1\"] .quote-install-benefit-text,html[data-keyboard-open=\"1\"] .quote-install-outside-hint{display:none}" +
  "html[data-keyboard-open=\"1\"] .quote-install-benefit{padding:8px 10px}" +
  "html[data-keyboard-open=\"1\"] .quote-delivery-card--compact .location-map-panel{display:none}" +
  "html[data-keyboard-open=\"1\"] .quote-delivery-card--compact .quote-total-bar{margin-top:8px;padding-top:8px}" +
  "html[data-keyboard-open=\"1\"] .client-modal-overlay{align-items:flex-start;padding-top:max(8px,env(safe-area-inset-top))}" +
  "html[data-keyboard-open=\"1\"] .client-modal-panel{max-height:calc(var(--vvh,100dvh) - max(16px,env(safe-area-inset-top)) - 8px)}" +
  "html[data-keyboard-open=\"1\"] .pdf-download-banner{display:none}" +
  "@media (max-width:380px){.quote-page-header-title{font-size:1.05rem}.quote-package-name{font-size:1.05rem}.quote-package-price{font-size:1.35rem}.quote-delivery-card--compact{padding:9px 10px!important}.delivery-mode-btn{padding:7px 4px}.delivery-mode-btn-label{font-size:10px}.quote-zone-input{font-size:16px!important}}";
