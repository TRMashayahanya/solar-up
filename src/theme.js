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
  ".quote-page::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 90% 50% at 50% -10%,rgba(232,197,71,.07),transparent 55%);z-index:0}" +
  ".quote-page input,.quote-page textarea,.quote-page .location-suggest-item,.quote-page .delivery-mode-btn{-webkit-user-select:text;user-select:text;-webkit-touch-callout:default}" +
  ".quote-page--compact{flex:1;min-height:0;display:flex;flex-direction:column;padding:0;width:100%;height:100%}" +
  ".quote-page--compact .quote-page__content{position:relative;z-index:2;flex:1;min-height:0;display:flex;flex-direction:column;gap:0;padding:0 2px;overflow:hidden;width:100%}" +
  ".quote-page__mast{flex-shrink:0;display:grid;grid-template-columns:1fr auto;grid-template-rows:auto auto;align-items:center;column-gap:8px;row-gap:0;padding:2px 2px 10px}" +
  ".quote-page__mast .quote-page-header{grid-column:1;grid-row:1;padding:0;margin:0}" +
  ".quote-page__mast .quote-page-header-end{grid-column:2;grid-row:1}" +
  ".quote-page__mast .quote-flow-steps{grid-column:1/-1;grid-row:2;padding:4px 0 0}" +
  ".quote-page__scroll{position:relative;z-index:1;flex:1;min-height:0;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;scroll-behavior:smooth;display:flex;flex-direction:column;gap:clamp(8px,1.6vh,12px);padding:2px 2px 4px;scrollbar-gutter:stable}" +
  ".quote-page--needs-install .quote-page__scroll{justify-content:stretch}" +
  ".quote-page--needs-install .quote-install-section--premium{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;justify-content:center}" +
  ".quote-page--ready .quote-page__scroll{flex:0 0 auto;min-height:unset;overflow:visible;gap:10px;justify-content:flex-start;padding-bottom:2px;animation:quoteReadyScrollSettle .52s cubic-bezier(.22,1,.36,1) both}" +
  ".quote-page--ready .quote-package-card{flex-shrink:0;animation:quoteReadyCardIn .54s cubic-bezier(.22,1,.36,1) both}" +
  ".quote-page--ready .quote-install-section{flex:0 0 auto;justify-content:flex-start;animation:quoteReadyCardIn .54s cubic-bezier(.22,1,.36,1) .06s both}" +
  ".quote-install-benefit{flex:0 0 auto;margin:6px 0 0;padding:9px 12px;border-radius:11px;border:1px solid rgba(61,214,140,.2);background:rgba(61,214,140,.06);font-size:10px;font-weight:600;line-height:1.35;color:var(--text-body);text-align:center}" +
  ".quote-install-benefit em{font-style:normal;color:var(--green-accent);font-weight:700}" +
  ".quote-page-header{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0;flex-shrink:0}" +
  ".quote-page-header-brand{display:flex;align-items:center;gap:10px;min-width:0}" +
  ".quote-page-header-icon{width:auto;height:auto;border:none;background:transparent;box-shadow:none;overflow:visible;padding:2px}" +
  ".quote-page-header-copy{display:flex;flex-direction:column;gap:1px;min-width:0}" +
  ".quote-page-header-title{font-family:" + "'Cormorant Garamond',Georgia,serif" + ";font-size:1.22rem;font-weight:700;margin:0;line-height:1.05;color:var(--quote-title)}" +
  ".quote-page-header-title em{color:var(--quote-gold);font-style:normal}" +
  ".quote-page-header-tag{font-size:10px;font-weight:600;color:var(--text-muted);letter-spacing:.03em}" +
  ".quote-page-header-end{display:flex;align-items:center;gap:8px;flex-shrink:0}" +
  ".quote-page-header-ref{font-size:9px;font-weight:700;color:var(--text-muted);letter-spacing:.08em;font-variant-numeric:tabular-nums;white-space:nowrap;padding:5px 8px;border-radius:999px;background:var(--surface-inset);border:1px solid var(--border)}" +
  ".quote-flow-steps{display:flex;align-items:center;justify-content:space-between;gap:0;padding:0 2px;flex-shrink:0;width:100%}" +
  ".quote-flow-step{display:flex;flex-direction:row;align-items:center;gap:5px;min-width:0;flex:1;justify-content:center}" +
  ".quote-flow-step-num{width:20px;height:20px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;border:1.5px solid var(--border);color:var(--text-muted);background:var(--surface);transition:border-color .2s,background .2s,color .2s,box-shadow .2s;flex-shrink:0}" +
  ".quote-flow-step-label{font-size:9px;font-weight:600;color:var(--text-muted);letter-spacing:.02em;line-height:1.1;text-align:left;white-space:nowrap}" +
  ".quote-flow-step--active .quote-flow-step-num{border-color:var(--quote-gold);background:var(--gold-dim);color:var(--quote-gold);box-shadow:0 0 0 3px rgba(232,197,71,.14)}" +
  ".quote-flow-step--active .quote-flow-step-label{color:var(--text-primary);font-weight:700}" +
  ".quote-flow-step--done .quote-flow-step-num{border-color:rgba(61,214,140,.45);background:rgba(61,214,140,.1);color:var(--green-accent);font-size:11px}" +
  ".quote-flow-step--done .quote-flow-step-label{color:var(--text-body)}" +
  ".quote-flow-steps-line{flex:1;min-width:12px;max-width:40px;height:2px;border-radius:1px;background:var(--border);margin:0 4px;align-self:center;transition:background .2s}" +
  ".quote-flow-steps-line--on{background:linear-gradient(90deg,rgba(61,214,140,.35),var(--quote-gold))}" +
  ".quote-package-card{position:relative;margin:0;border-radius:18px;background:var(--quote-hero-bg);border:1px solid var(--quote-hero-border);box-shadow:var(--card-shadow);flex-shrink:0;overflow:hidden;width:100%}" +
  ".quote-package-card--strip{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:8px;padding:9px 12px;border-radius:14px;background:var(--quote-hero-bg);border:1px solid var(--quote-hero-border);box-shadow:var(--card-shadow)}" +
  ".quote-package-strip-label{font-size:8px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--quote-hero-eyebrow);white-space:nowrap}" +
  ".quote-package-strip-copy{min-width:0;display:flex;flex-direction:column;gap:1px}" +
  ".quote-package-strip-name{font-family:" + "'Cormorant Garamond',Georgia,serif" + ";font-size:clamp(.95rem,3.2vw,1.05rem);font-weight:700;margin:0;line-height:1.1;color:var(--quote-hero-fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
  ".quote-package-strip-meta{font-size:10px;color:var(--quote-hero-muted);margin:0;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
  ".quote-package-strip-price{font-family:" + "'Cormorant Garamond',Georgia,serif" + ";font-size:1.05rem;font-weight:700;color:var(--quote-gold);line-height:1;font-variant-numeric:tabular-nums;flex-shrink:0}" +
  ".quote-package-card--slim .quote-package-card-inner{padding:12px 14px 11px}" +
  ".quote-package-card--slim .quote-package-name{font-size:clamp(1.05rem,3.6vw,1.22rem)}" +
  ".quote-package-card--slim .quote-package-includes{margin-top:4px;font-size:10px}" +
  ".quote-package-card--custom{background:var(--quote-hero-custom-bg);border-color:var(--quote-hero-custom-border)}" +
  ".quote-package-card-accent{position:absolute;top:0;left:16px;right:16px;height:2px;border-radius:0 0 2px 2px;background:linear-gradient(90deg,transparent,var(--quote-gold),transparent);opacity:.85}" +
  ".quote-package-card-inner{padding:16px 16px 14px}" +
  ".quote-package-eyebrow{display:inline-block;font-size:9px;font-weight:700;color:var(--quote-hero-eyebrow);letter-spacing:.14em;text-transform:uppercase;margin:0 0 8px}" +
  ".quote-package-name{font-family:" + "'Cormorant Garamond',Georgia,serif" + ";font-size:clamp(1.2rem,4.2vw,1.42rem);font-weight:700;margin:0;line-height:1.1;color:var(--quote-hero-fg);letter-spacing:-.01em}" +
  ".quote-package-includes{font-size:11px;color:var(--quote-hero-muted);margin:6px 0 0;line-height:1.4}" +
  ".quote-package-stats{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}" +
  ".quote-stat-pill{display:flex;flex-direction:column;gap:1px;padding:8px 11px;border-radius:12px;background:rgba(255,255,255,.06);border:1px solid var(--quote-hero-stat-border);min-width:72px}" +
  "[data-theme=\"light\"] .quote-stat-pill{background:rgba(255,255,255,.72);border-color:rgba(15,20,18,.08)}" +
  ".quote-stat-pill-value{font-size:13px;font-weight:700;color:var(--quote-hero-fg);line-height:1.1;font-variant-numeric:tabular-nums}" +
  ".quote-stat-pill-label{font-size:9px;font-weight:600;color:var(--quote-hero-muted);text-transform:uppercase;letter-spacing:.06em}" +
  ".quote-eco-ribbon{margin:8px 0 0;padding:10px 12px;border-radius:10px;background:rgba(61,214,140,.08);border:1px solid rgba(61,214,140,.18);text-align:left}" +
  ".quote-eco-ribbon-head{display:flex;align-items:center;gap:6px;margin-bottom:4px}" +
  ".quote-eco-ribbon-head svg{flex-shrink:0;color:var(--green-accent)}" +
  ".quote-eco-ribbon-title{font-size:11px;font-weight:700;color:var(--green-accent);letter-spacing:.02em}" +
  ".quote-eco-ribbon-text{font-size:clamp(10px,2.3vw,11px);line-height:1.45;color:var(--text-body);margin:0}" +
  "[data-theme=\"light\"] .quote-eco-ribbon{background:rgba(45,160,100,.07);border-color:rgba(26,122,74,.14)}" +
  ".quote-install-section{position:relative;padding:14px 16px;border-radius:18px;background:var(--quote-delivery-bg);border:1px solid var(--quote-delivery-border);box-shadow:var(--card-shadow);display:flex;flex-direction:column;gap:12px;overflow:visible;width:100%;box-sizing:border-box}" +
  ".quote-install-section::before{content:'';position:absolute;top:0;left:18px;right:18px;height:2px;border-radius:0 0 2px 2px;background:linear-gradient(90deg,transparent,rgba(61,214,140,.55),transparent);opacity:.9;pointer-events:none}" +
  ".quote-install-head{display:flex;align-items:flex-start;gap:10px}" +
  ".quote-install-head-icon{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:12px;flex-shrink:0;background:rgba(232,197,71,.1);border:1px solid rgba(232,197,71,.2);color:var(--quote-gold)}" +
  ".quote-install-head-copy{flex:1;min-width:0}" +
  ".quote-install-radius-badge{flex-shrink:0;font-size:10px;font-weight:700;color:var(--quote-gold);padding:6px 9px;border-radius:999px;background:rgba(232,197,71,.1);border:1px solid rgba(232,197,71,.22);letter-spacing:.02em;white-space:nowrap}" +
  ".quote-install-radius-badge--qualified{color:var(--green-accent);background:rgba(61,214,140,.12);border-color:rgba(61,214,140,.32);box-shadow:0 0 0 1px rgba(61,214,140,.1)}" +
  ".quote-install-eyebrow{font-size:9px;font-weight:700;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin:0 0 3px}" +
  ".quote-install-title{font-family:" + "'Cormorant Garamond',Georgia,serif" + ";font-size:clamp(1rem,3.2vw,1.12rem);font-weight:700;color:var(--text-primary);margin:0;line-height:1.15;letter-spacing:-.01em}" +
  ".quote-install-sub{font-size:11px;color:var(--text-muted);margin:3px 0 0;line-height:1.35}" +
  ".quote-install-lead{font-family:" + "'Cormorant Garamond',Georgia,serif" + ";font-size:clamp(.98rem,3vw,1.08rem);font-weight:600;color:var(--text-primary);margin:0;line-height:1.25}" +
  ".quote-install-status{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;margin:0;padding:9px 11px;border-radius:12px;line-height:1.35}" +
  ".quote-install-status-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}" +
  ".quote-install-status--included{color:var(--green-accent);background:rgba(61,214,140,.08);border:1px solid rgba(61,214,140,.18)}" +
  ".quote-install-status--included .quote-install-status-dot{background:var(--green-accent);box-shadow:0 0 0 3px rgba(61,214,140,.15)}" +
  ".quote-install-status--delivery{color:var(--quote-gold);background:rgba(232,197,71,.08);border:1px solid rgba(232,197,71,.2)}" +
  ".quote-install-status--delivery .quote-install-status-dot{background:var(--quote-gold);box-shadow:0 0 0 3px rgba(232,197,71,.12)}" +
  ".quote-install-status--pending{color:var(--text-body);background:var(--surface-inset);border:1px solid var(--border)}" +
  ".quote-install-status--pending .quote-install-status-dot{background:var(--text-muted);box-shadow:0 0 0 3px rgba(128,128,128,.1)}" +
  ".quote-install-status-text{min-width:0}" +
  ".quote-install-section--premium{padding:10px 14px 11px;gap:7px;border-radius:18px}" +
  ".quote-install-section--confirmed{padding-top:8px;gap:6px}" +
  ".quote-install-section--confirmed .quote-install-head--compact{margin-bottom:0}" +
  ".quote-install-section--confirmed .quote-install-sub{display:none}" +
  ".quote-page--needs-install .quote-install-sub,.quote-page--needs-install .quote-loc-field-hint{display:none}" +
  ".quote-page--ready .quote-install-status{padding:7px 10px;font-size:10px}" +
  ".quote-page--ready .quote-install-confirmed{padding:10px 12px;gap:10px}" +
  ".quote-install-head--compact{display:grid;grid-template-columns:auto 1fr;align-items:center;column-gap:10px;row-gap:5px;margin:0}" +
  ".quote-install-head--compact .quote-install-head-icon{grid-row:1/span 2;width:32px;height:32px;border-radius:10px}" +
  ".quote-install-head--compact .quote-install-head-copy{grid-column:2;min-width:0}" +
  ".quote-install-head--compact .quote-install-radius-badge{grid-column:1/-1;justify-self:start;margin:0}" +
  ".quote-install-head--compact .quote-install-title{font-size:clamp(.98rem,3vw,1.08rem)}" +
  ".quote-install-confirmed{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px;padding:12px 14px;border-radius:16px;background:linear-gradient(135deg,rgba(61,214,140,.09) 0%,rgba(61,214,140,.02) 55%,var(--card-bg) 100%);border:1px solid rgba(61,214,140,.22);animation:locInputPick .45s cubic-bezier(.22,1,.36,1) both}" +
  ".quote-install-confirmed-pin{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:11px;background:rgba(61,214,140,.12);border:1px solid rgba(61,214,140,.22);color:var(--green-accent);flex-shrink:0}" +
  ".quote-install-confirmed-copy{min-width:0;display:flex;flex-direction:column;gap:2px}" +
  ".quote-install-confirmed-eyebrow{font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--green-accent);line-height:1.2}" +
  ".quote-install-confirmed-name{font-size:14px;font-weight:600;color:var(--text-primary);line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
  ".quote-install-confirmed-sub{font-size:10px;color:var(--text-muted);line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
  ".quote-install-confirmed-change{flex-shrink:0;padding:6px 11px;border-radius:999px;border:1px solid var(--border);background:var(--surface-inset);color:var(--text-body);font-size:11px;font-weight:600;font-family:inherit;cursor:pointer;transition:border-color .2s ease,background .2s ease,color .2s ease}" +
  ".quote-install-confirmed-change:hover{border-color:rgba(232,197,71,.35);background:rgba(232,197,71,.08);color:var(--text-primary)}" +
  ".quote-install-confirmed-qualify{font-size:10px;font-weight:700;color:var(--green-accent);line-height:1.25}" +
  ".quote-install-confirmed--qualified{border-color:rgba(61,214,140,.32);box-shadow:0 0 0 1px rgba(61,214,140,.12),0 8px 24px rgba(61,214,140,.08)}" +
  ".quote-install-status--qualified{padding-left:10px;box-shadow:0 0 0 1px rgba(61,214,140,.12),0 6px 20px rgba(61,214,140,.08)}" +
  ".quote-install-status-check{flex-shrink:0;font-size:11px;font-weight:800;color:var(--green-accent);line-height:1}" +
  ".quote-install-status--qualified .quote-install-status-dot{box-shadow:0 0 0 4px rgba(61,214,140,.18)}" +
  "[data-theme=\"light\"] .quote-install-confirmed{background:linear-gradient(135deg,rgba(45,160,100,.08) 0%,rgba(252,250,245,.95) 100%);border-color:rgba(26,122,74,.18)}" +
  ".quote-loc-field{display:flex;flex-direction:column;gap:6px;flex-shrink:0}" +
  ".quote-loc-input-slot{position:relative;height:48px;flex-shrink:0;overflow:visible}" +
  ".quote-loc-input-slot .location-field-stack{height:48px;min-height:48px;max-height:48px;overflow:visible}" +
  ".quote-loc-input-slot .location-pin-wrap--minimal{position:absolute;inset:0;height:48px}" +
  ".quote-loc-field-label{font-size:10px;font-weight:600;color:var(--text-muted);letter-spacing:.08em;text-transform:uppercase;margin:0;padding:0 2px}" +
  ".quote-loc-field-hint{margin:0;padding:0 2px;font-size:10px;color:var(--text-faint);line-height:1.35;text-align:left}" +
  ".quote-loc-field-hint-em{color:var(--quote-gold);font-weight:600}" +
  ".quote-loc-quick{display:flex;flex-direction:column;gap:8px;margin:4px 0 0}" +
  ".quote-loc-quick-label{font-size:9px;font-weight:700;letter-spacing:.11em;text-transform:uppercase;color:var(--text-muted);padding:0 2px}" +
  ".quote-loc-quick-track{display:flex;gap:8px;overflow-x:auto;padding:2px 2px 6px;margin:0 -2px;-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity;scrollbar-width:none}" +
  ".quote-loc-quick-track::-webkit-scrollbar{display:none}" +
  ".quote-loc-quick-card{flex:0 0 auto;min-width:108px;max-width:140px;padding:10px 12px;border-radius:14px;border:1px solid rgba(232,197,71,.18);background:linear-gradient(165deg,rgba(232,197,71,.08) 0%,var(--surface-inset) 55%);color:var(--text-primary);font-family:inherit;text-align:left;cursor:pointer;scroll-snap-align:start;transition:border-color .22s ease,background .22s ease,transform .15s ease,box-shadow .22s ease;display:flex;flex-direction:column;gap:4px}" +
  ".quote-loc-quick-card:hover{border-color:rgba(232,197,71,.38);background:linear-gradient(165deg,rgba(232,197,71,.12) 0%,rgba(232,197,71,.04) 100%);box-shadow:0 4px 16px rgba(0,0,0,.12);transform:translateY(-1px)}" +
  ".quote-loc-quick-card:active{transform:scale(.98)}" +
  ".quote-loc-quick-card--on{border-color:rgba(61,214,140,.45);background:linear-gradient(165deg,rgba(61,214,140,.14) 0%,rgba(61,214,140,.04) 100%);box-shadow:0 0 0 1px rgba(61,214,140,.2),0 4px 14px rgba(61,214,140,.08)}" +
  ".quote-loc-quick-card-name{font-size:12px;font-weight:600;line-height:1.2;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
  ".quote-loc-quick-card-meta{font-size:9px;font-weight:600;color:var(--text-muted);line-height:1.2}" +
  ".quote-loc-quick-card-meta--included{color:var(--green-accent)}" +
  "[data-theme=\"light\"] .quote-loc-quick-card{background:linear-gradient(165deg,rgba(252,250,245,.98) 0%,rgba(245,240,230,.9) 100%);border-color:rgba(160,128,32,.16)}" +
  "[data-theme=\"light\"] .quote-loc-quick-card--on{background:linear-gradient(165deg,rgba(45,160,100,.1) 0%,rgba(252,250,245,.95) 100%)}" +
  ".location-field-stack--premium{position:relative;z-index:1}" +
  ".location-suggest-backdrop{position:fixed;inset:0;z-index:10050;background:rgba(0,0,0,.22);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);animation:locBackdropIn .22s ease both;pointer-events:none}" +
  ".location-suggest-backdrop--interactive{pointer-events:auto;cursor:default}" +
  "[data-theme=\"light\"] .location-suggest-backdrop{background:rgba(15,20,18,.12)}" +
  "@keyframes locBackdropIn{from{opacity:0}to{opacity:1}}" +
  ".location-search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);z-index:2;display:inline-flex;color:var(--text-muted);opacity:.65;pointer-events:none}" +
  ".location-pin-wrap--premium.location-pin-wrap--open .location-search-icon{color:var(--quote-gold);opacity:.9}" +
  ".location-pin-wrap--premium .quote-zone-input--search{padding-left:38px!important}" +
  ".location-pin-wrap--premium .quote-zone-input--premium{width:100%!important;color:var(--text-primary)!important;caret-color:var(--text-primary);-webkit-text-fill-color:currentColor;font-family:inherit;outline:none;-webkit-appearance:none;appearance:none;border-radius:14px!important;padding:13px 58px 13px 14px!important;transition:border-color .25s ease,box-shadow .25s ease,background .2s ease;border:1px solid rgba(232,197,71,.22)!important;background:var(--quote-input-bg,var(--surface-inset))!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.04)}" +
  "[data-theme=\"light\"] .location-pin-wrap--premium .quote-zone-input--premium{border-color:rgba(160,128,32,.2)!important;background:rgba(255,255,255,.92)!important}" +
  ".location-pin-wrap--premium.location-pin-wrap--open .quote-zone-input--premium{border-color:rgba(232,197,71,.5)!important;box-shadow:0 0 0 3px rgba(232,197,71,.14),0 2px 12px rgba(0,0,0,.08)!important;border-bottom-left-radius:0!important;border-bottom-right-radius:0!important}" +
  ".location-pin-wrap--premium.location-pin-wrap--smart.location-pin-wrap--open .quote-zone-input--premium{border-bottom-left-radius:0!important;border-bottom-right-radius:0!important}" +
  ".location-pin-wrap--premium .location-map-pin{right:4px;width:auto;min-width:52px;height:36px;padding:0 8px;gap:4px;border-radius:10px;background:linear-gradient(145deg,rgba(232,197,71,.18),rgba(232,197,71,.06));border:1px solid rgba(232,197,71,.35);box-shadow:0 2px 8px rgba(201,162,39,.15);flex-direction:row}" +
  ".location-map-pin-label{font-size:9px;font-weight:700;letter-spacing:.06em;color:var(--quote-gold);line-height:1}" +
  ".location-pin-wrap--premium .location-map-pin:hover:not(:disabled){background:linear-gradient(145deg,rgba(232,197,71,.28),rgba(232,197,71,.1));box-shadow:0 4px 14px rgba(201,162,39,.22)}" +
  ".location-pin-wrap--premium.location-pin-wrap--picked .quote-zone-input--premium{border-color:rgba(61,214,140,.45)!important;box-shadow:0 0 0 3px rgba(61,214,140,.14)!important;animation:locInputPick .5s cubic-bezier(.22,1,.36,1) both}" +
  "@keyframes locInputPick{0%{box-shadow:0 0 0 0 rgba(61,214,140,.35)}50%{box-shadow:0 0 0 5px rgba(61,214,140,.18)}100%{box-shadow:0 0 0 3px rgba(61,214,140,.14)}}" +
  "@keyframes locSuggestIn{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}" +
  "@keyframes locSuggestRowIn{from{opacity:0;transform:translateX(-4px)}to{opacity:1;transform:translateX(0)}}" +
  ".quote-zone-input--loc,.quote-loc-input-slot .quote-zone-input--loc,.location-pin-wrap--minimal .quote-zone-input--loc,.location-pin-wrap--minimal .quote-zone-input--premium{position:relative;z-index:2;width:100%!important;height:48px!important;min-height:48px!important;max-height:48px!important;box-sizing:border-box!important;border-radius:14px!important;padding:14px 52px 14px 38px!important;border:1px solid rgba(232,197,71,.28)!important;background-color:var(--quote-input-bg,rgba(0,0,0,.35))!important;background-image:none!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.06)!important;font-size:16px!important;line-height:1.25!important;color:var(--text-primary)!important;caret-color:var(--text-primary)!important;-webkit-text-fill-color:var(--text-primary)!important;opacity:1!important;font-family:inherit;font-weight:500;outline:none;-webkit-appearance:none;appearance:none;overflow:hidden!important;text-overflow:ellipsis;white-space:nowrap;transition:border-color .2s ease,box-shadow .2s ease}" +
  "[data-theme=\"light\"] .quote-zone-input--loc,[data-theme=\"light\"] .quote-loc-input-slot .quote-zone-input--loc,[data-theme=\"light\"] .location-pin-wrap--minimal .quote-zone-input--loc,[data-theme=\"light\"] .location-pin-wrap--minimal .quote-zone-input--premium{background-color:#fff!important;border-color:rgba(160,128,32,.24)!important;color:var(--text-primary)!important;-webkit-text-fill-color:var(--text-primary)!important;caret-color:var(--text-primary)!important}" +
  ".quote-zone-input--loc::placeholder,.location-pin-wrap--minimal .quote-zone-input--loc::placeholder,.location-pin-wrap--minimal .quote-zone-input--premium::placeholder{color:var(--text-muted)!important;opacity:1!important;-webkit-text-fill-color:var(--text-muted)!important;font-weight:400}" +
  ".quote-zone-input--loc:focus,.quote-zone-input--loc:focus-visible,.location-pin-wrap--minimal .quote-zone-input--loc:focus,.location-pin-wrap--minimal .quote-zone-input--premium:focus,.location-pin-wrap--minimal .quote-zone-input--premium:focus-visible{color:var(--text-primary)!important;-webkit-text-fill-color:var(--text-primary)!important;opacity:1!important;border-color:rgba(232,197,71,.45)!important;box-shadow:0 0 0 2px rgba(232,197,71,.14)!important}" +
  ".quote-zone-input--loc:-webkit-autofill,.location-pin-wrap--minimal .quote-zone-input--loc:-webkit-autofill,.location-pin-wrap--minimal .quote-zone-input--premium:-webkit-autofill{-webkit-text-fill-color:var(--text-primary)!important;caret-color:var(--text-primary)!important;-webkit-box-shadow:0 0 0 1000px var(--quote-input-bg,rgba(0,0,0,.35)) inset!important;transition:background-color 9999s ease-out 0s}" +
  ".location-pin-wrap--minimal .location-search-icon{z-index:3;pointer-events:none;color:var(--text-muted);opacity:.75;left:11px}" +
  ".location-pin-wrap--minimal.location-pin-wrap--smart .quote-zone-input--with-pin{border-radius:14px!important;border-bottom-left-radius:14px!important;border-bottom-right-radius:14px!important}" +
  ".location-pin-wrap--minimal:focus-within .quote-zone-input--loc,.location-pin-wrap--minimal:focus-within .quote-zone-input--premium{border-color:rgba(232,197,71,.42)!important;box-shadow:0 0 0 2px rgba(232,197,71,.12)!important}" +
  ".location-pin-wrap--minimal .location-map-pin{right:4px;top:50%;transform:translateY(-50%);z-index:3;width:auto;min-width:48px;height:34px;padding:0 7px;gap:3px;border-radius:9px;flex-direction:row}" +
  ".location-suggest-list--minimal{padding:3px 0!important;border-radius:12px!important;border:1px solid var(--border)!important;background:var(--card-bg)!important;box-shadow:0 6px 24px rgba(0,0,0,.1)!important;animation:locSuggestIn .18s cubic-bezier(.22,1,.36,1) both;overflow:hidden;z-index:10061!important;-webkit-overflow-scrolling:touch;pointer-events:auto}" +
  "[data-theme=\"light\"] .location-suggest-list--minimal{box-shadow:0 6px 20px rgba(15,20,18,.06)!important}" +
  ".location-suggest-item--minimal{display:block;width:100%;padding:10px 14px;border:none;border-radius:0;background:transparent;font-family:inherit;font-size:13px;font-weight:500;text-align:left;cursor:pointer;transition:background .12s ease;color:var(--text-primary)}" +
  ".location-suggest-item--minimal .location-suggest-label{font-size:13px;font-weight:500;line-height:1.25;color:inherit}" +
  ".location-suggest-item--minimal.location-suggest-item--active,.location-suggest-item--minimal:hover{background:rgba(232,197,71,.08)}" +
  ".location-suggest-list--minimal>li+li{border-top:1px solid rgba(128,128,128,.12)}" +
  ".location-suggest-list--minimal>li{list-style:none;margin:0;padding:0}" +
  ".quote-loc-input-slot .location-pin-hint{display:none}" +
  ".location-suggest-list--premium{padding:6px 6px 10px!important;border-radius:0 0 18px 18px!important;border:1px solid rgba(232,197,71,.28)!important;border-top:none!important;background:var(--card-bg)!important;box-shadow:0 20px 48px rgba(0,0,0,.24),0 0 0 1px rgba(232,197,71,.1)!important;animation:locSuggestIn .3s cubic-bezier(.22,1,.36,1) both;transform-origin:top center;overflow-x:hidden;overflow-y:auto;z-index:10061!important;-webkit-overflow-scrolling:touch;scroll-behavior:smooth;overscroll-behavior:contain}" +
  "[data-theme=\"light\"] .location-suggest-list--premium{box-shadow:0 16px 40px rgba(15,20,18,.1),0 0 0 1px rgba(160,128,32,.1)!important}" +
  ".location-suggest-list-head{padding:10px 14px 9px;font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--quote-gold);list-style:none;border-bottom:1px solid rgba(232,197,71,.12);margin:0 4px 4px;background:linear-gradient(180deg,rgba(232,197,71,.06),transparent)}" +
  ".location-suggest-row{list-style:none;animation:locSuggestRowIn .32s cubic-bezier(.22,1,.36,1) both}" +
  ".location-suggest-item--premium{position:relative;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;padding:11px 12px;border-radius:13px;margin:0 5px 3px;transition:background .2s ease,transform .15s ease,box-shadow .2s ease}" +
  ".location-suggest-item--premium::before{content:'';position:absolute;left:0;top:8px;bottom:8px;width:2px;border-radius:0 2px 2px 0;background:var(--quote-gold);opacity:0;transform:scaleY(.5);transition:opacity .2s ease,transform .2s ease}" +
  ".location-suggest-item--premium.location-suggest-item--active::before,.location-suggest-item--premium:hover::before{opacity:1;transform:scaleY(1)}" +
  ".location-suggest-item--premium.location-suggest-item--active,.location-suggest-item--premium:hover{background:rgba(232,197,71,.09);box-shadow:0 2px 10px rgba(0,0,0,.04)}" +
  ".location-suggest-item--premium.location-suggest-item--picked{background:rgba(61,214,140,.08);box-shadow:0 0 0 1px rgba(61,214,140,.18)}" +
  ".location-suggest-item--premium:active{transform:scale(.992)}" +
  ".location-suggest-pin{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:10px;background:rgba(232,197,71,.1);border:1px solid rgba(232,197,71,.18);color:var(--quote-gold);flex-shrink:0}" +
  ".location-suggest-item--picked .location-suggest-pin{background:rgba(61,214,140,.12);border-color:rgba(61,214,140,.25);color:var(--green-accent)}" +
  ".location-suggest-check{font-size:12px;font-weight:700;line-height:1}" +
  ".location-suggest-body{display:flex;flex-direction:column;gap:2px;min-width:0;text-align:left}" +
  ".location-suggest-item--premium .location-suggest-label{font-size:13px;font-weight:600;line-height:1.2;color:var(--text-primary)}" +
  ".location-suggest-secondary{font-size:10px;color:var(--text-muted);line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
  ".location-suggest-meta{font-size:10px;color:var(--text-muted);line-height:1.2}" +
  ".location-suggest-meta--included{color:var(--green-accent);font-weight:600}" +
  ".location-suggest-meta--delivery{color:var(--quote-gold);font-weight:600}" +
  ".location-suggest-item--premium .location-suggest-km{font-size:10px;font-weight:700;padding:4px 8px;border-radius:999px;background:var(--surface-inset);border:1px solid var(--border);white-space:nowrap;color:var(--text-secondary)}" +
  ".location-suggest-km--included{color:var(--green-accent)!important;border-color:rgba(61,214,140,.25)!important;background:rgba(61,214,140,.08)!important}" +
  ".location-suggest-km--delivery{color:var(--quote-gold)!important;border-color:rgba(232,197,71,.28)!important;background:rgba(232,197,71,.08)!important}" +
  ".location-suggest-item--loading{display:flex;align-items:center;gap:8px;padding:12px 14px!important}" +
  ".location-suggest-loading-dot{width:6px;height:6px;border-radius:50%;background:var(--quote-gold);animation:locLoadPulse 1s ease-in-out infinite}" +
  "@keyframes locLoadPulse{0%,100%{opacity:.35;transform:scale(.85)}50%{opacity:1;transform:scale(1)}}" +
  "@keyframes quoteReadyScrollSettle{from{opacity:0;transform:translateY(12px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}" +
  "@keyframes quoteReadyCardIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}" +
  "@keyframes quoteReadyDockCenter{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}" +
  "@keyframes quoteReadyPanelIn{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}" +
  "@keyframes quoteReadyHintIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}" +
  "@keyframes quoteReadyCtaIn{from{opacity:0;transform:translateY(22px) scale(.93);box-shadow:0 0 0 rgba(201,162,39,0)}to{opacity:1;transform:translateY(0) scale(1);box-shadow:0 10px 32px rgba(201,162,39,.3)}}" +
  "@keyframes quoteReadyCtaGlow{0%,100%{box-shadow:0 10px 32px rgba(201,162,39,.24)}50%{box-shadow:0 16px 42px rgba(201,162,39,.38),0 0 0 5px rgba(232,197,71,.1)}}" +
  ".quote-install-section--slim{padding:12px 14px;gap:10px}" +
  ".quote-install-section--slim .quote-install-area-label{margin:0 0 2px}" +
  ".quote-zone-input--premium{width:100%;color:var(--text-primary)!important;caret-color:var(--text-primary);-webkit-text-fill-color:currentColor;font-family:inherit;outline:none;border-radius:14px!important;padding:12px 52px 12px 14px!important;font-size:16px!important;background:var(--quote-input-bg)!important;border-color:var(--quote-input-border)!important;box-shadow:0 1px 2px rgba(0,0,0,.04) inset}" +
  ".quote-install-section .quote-zone-input::placeholder{color:var(--text-faint);opacity:1}" +
  ".quote-install-section .location-pin-wrap{margin:0}" +
  ".quote-install-section .location-map-pin{border-radius:12px!important}" +
  "[data-theme=\"light\"] .quote-install-status--included{background:rgba(45,160,100,.07);border-color:rgba(26,122,74,.14)}" +
  "[data-theme=\"light\"] .quote-install-status--delivery{background:rgba(201,162,39,.08);border-color:rgba(160,128,32,.16)}" +
  "[data-theme=\"light\"] .quote-install-section{box-shadow:0 8px 32px rgba(15,20,18,.06),0 0 0 1px rgba(160,128,32,.08)}" +
  "[data-theme=\"light\"] .quote-checkout-bar,[data-theme=\"light\"] .quote-checkout-dock{background:linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(252,250,245,.96) 28%);box-shadow:0 -8px 28px rgba(15,20,18,.05)}" +
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
  ".quote-checkout-dock{position:relative;z-index:2;flex-shrink:0;margin-top:auto;padding:6px 4px calc(48px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;gap:5px;border-top:1px solid var(--border);background:linear-gradient(180deg,transparent 0%,var(--card-bg) 16%);backdrop-filter:blur(14px) saturate(1.12);-webkit-backdrop-filter:blur(14px) saturate(1.12);box-shadow:0 -6px 22px rgba(0,0,0,.04);width:100%;box-sizing:border-box;transition:padding .55s cubic-bezier(.22,1,.36,1),background .55s ease,border-color .55s ease,box-shadow .55s ease}" +
  ".quote-checkout-bar,.quote-checkout-dock{position:relative;flex-shrink:0;margin-top:auto}" +
  ".quote-page--ready .quote-checkout-dock{flex:1 1 auto;display:flex;flex-direction:column;justify-content:center;align-items:stretch;min-height:0;margin-top:0;padding:clamp(14px,4.5vh,36px) 8px calc(48px + env(safe-area-inset-bottom,0px));border-top:none;background:transparent;box-shadow:none;backdrop-filter:none;-webkit-backdrop-filter:none;animation:quoteReadyDockCenter .68s cubic-bezier(.22,1,.36,1) both}" +
  ".quote-page--ready .quote-checkout-dock::before{content:'';position:absolute;inset:clamp(2px,1.5vh,12px) 6px clamp(40px,10vh,72px);border-radius:22px;background:linear-gradient(165deg,rgba(232,197,71,.06) 0%,rgba(61,214,140,.04) 42%,var(--card-bg) 100%);border:1px solid rgba(232,197,71,.16);box-shadow:0 14px 44px rgba(15,20,18,.07),inset 0 1px 0 rgba(255,255,255,.5);pointer-events:none;z-index:0;opacity:0;animation:quoteReadyPanelIn .72s cubic-bezier(.22,1,.36,1) .1s both}" +
  ".quote-page--ready .quote-checkout-dock-accent,.quote-page--ready .quote-checkout-dock-hint,.quote-page--ready .quote-checkout-dock-cta,.quote-page--ready .quote-page-reset{position:relative;z-index:1}" +
  ".quote-page--ready .quote-checkout-dock-hint{font-size:11px;animation:quoteReadyHintIn .56s cubic-bezier(.22,1,.36,1) .2s both}" +
  ".quote-page--ready .quote-checkout-dock-cta:not(:disabled){min-height:48px;padding:12px 16px;font-size:15px;animation:quoteReadyCtaIn .78s cubic-bezier(.22,1,.36,1) .24s both,quoteReadyCtaGlow 2.8s ease-in-out 1.05s 2}" +
  ".quote-page--ready .quote-checkout-dock-cta-price{font-size:1.22rem}" +
  ".quote-page--ready .quote-page-reset{animation:quoteReadyHintIn .5s cubic-bezier(.22,1,.36,1) .36s both}" +
  ".quote-checkout-dock-accent{height:1px;margin:0 14px 1px;border-radius:1px;background:linear-gradient(90deg,transparent,var(--quote-gold),transparent);opacity:.55}" +
  ".quote-checkout-bar-accent{height:1px;margin:0 14px 1px;border-radius:1px;background:linear-gradient(90deg,transparent,var(--quote-gold),transparent);opacity:.55}" +
  ".quote-checkout-dock-hint{margin:0;padding:0 4px;font-size:10px;color:var(--text-muted);line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}" +
  ".quote-checkout-dock-hint--qualified{color:var(--green-accent);font-weight:700}" +
  ".quote-checkout-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 2px;min-height:28px}" +
  ".quote-checkout-hint{font-size:10px;color:var(--text-muted);line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0}" +
  ".quote-checkout-hint--qualified{color:var(--green-accent);font-weight:700}" +
  ".quote-checkout-amount{font-family:" + "'Cormorant Garamond',Georgia,serif" + ";font-size:1.28rem;font-weight:700;color:var(--quote-gold);line-height:1;font-variant-numeric:tabular-nums;flex-shrink:0}" +
  ".quote-checkout-dock-cta{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;min-height:42px;padding:10px 14px;border:none;border-radius:12px;font-family:inherit;font-size:14px;font-weight:700;color:#0a0800;cursor:pointer;background:linear-gradient(135deg,#C9A227,#E8C547);box-shadow:0 5px 16px rgba(201,162,39,.22);transition:transform .15s ease,opacity .15s ease}" +
  ".quote-checkout-dock-cta--idle,.quote-checkout-dock-cta:disabled{opacity:.48;cursor:not-allowed;box-shadow:none}" +
  ".quote-checkout-dock-cta:not(:disabled):active{transform:scale(.985)}" +
  ".quote-checkout-dock-cta-main{display:inline-flex;align-items:center;gap:7px;min-width:0}" +
  ".quote-checkout-dock-cta-price{font-family:" + "'Cormorant Garamond',Georgia,serif" + ";font-size:1.12rem;font-weight:700;font-variant-numeric:tabular-nums;flex-shrink:0;line-height:1}" +
  ".quote-checkout-cta{min-height:42px!important;border-radius:12px!important;box-shadow:0 5px 18px rgba(201,162,39,.24)!important;font-size:14px!important;padding:10px 14px!important}" +
  ".quote-checkout-cta:active{transform:scale(.985)}" +
  ".quote-page-reset{display:inline-flex;align-items:center;justify-content:center;gap:4px;padding:0;border:none;background:transparent;color:var(--text-faint);font-size:9px;cursor:pointer;font-family:inherit;margin:0 auto;line-height:1.2}" +
  ".quote-page-reset:hover{color:var(--text-muted)}" +
  ".quote-install-area-label{font-size:10px;font-weight:600;color:var(--text-muted);letter-spacing:.06em;text-transform:uppercase;margin:0}" +
  ".quote-marketing-opt-in{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:12px;border:1px solid var(--border);background:var(--surface-inset);cursor:pointer;text-align:left;-webkit-user-select:none;user-select:none}" +
  ".quote-marketing-opt-in--compact{padding:8px 10px;border-radius:11px;background:transparent;border-color:transparent}" +
  ".quote-marketing-opt-in input[type=checkbox]{margin:2px 0 0;flex-shrink:0;width:17px;height:17px;accent-color:var(--quote-gold,#C9A227);cursor:pointer}" +
  ".quote-marketing-opt-in-label{font-size:11px;line-height:1.4;color:var(--text-muted);-webkit-user-select:none;user-select:none}" +
  ".client-modal-marketing{margin:0 0 12px;padding:8px 10px;border-radius:11px;background:var(--surface-inset);border:1px solid var(--border)}" +
  ".client-modal-brand-sun{flex-shrink:0}" +
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
  ".client-modal-delivery-snippet--qualified{border-color:rgba(61,214,140,.28);background:rgba(61,214,140,.06);box-shadow:0 0 0 1px rgba(61,214,140,.08)}" +
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
  ".quote-page .location-pin-wrap--fixed-suggest .location-suggest-list--minimal{position:fixed;top:calc(var(--loc-suggest-top,auto) + 4px);left:var(--loc-suggest-left,12px);width:var(--loc-suggest-width,calc(100% - 24px));max-width:calc(100vw - 24px);z-index:10060;margin:0;max-height:var(--loc-suggest-max-h,min(168px,calc(var(--vvh,100dvh) * 0.28)));overflow-y:auto;-webkit-overflow-scrolling:touch}" +
  ".quote-page .location-pin-wrap--fixed-suggest.location-pin-wrap--premium .location-suggest-list{position:fixed;top:var(--loc-suggest-top,auto);left:var(--loc-suggest-left,12px);width:var(--loc-suggest-width,calc(100% - 24px));max-width:calc(100vw - 24px);z-index:10060;margin-top:-1px;max-height:var(--loc-suggest-max-h,min(280px,calc(var(--vvh,100dvh) * 0.46)));overflow-y:auto;-webkit-overflow-scrolling:touch}" +
  ".quote-page .location-pin-wrap--fixed-suggest .location-suggest-list:not(.location-suggest-list--premium){position:fixed;top:var(--loc-suggest-top,auto);left:var(--loc-suggest-left,12px);width:var(--loc-suggest-width,calc(100% - 24px));max-width:calc(100vw - 24px);z-index:10060;border-radius:0 0 12px 12px;border-top:none;max-height:var(--loc-suggest-max-h,min(168px,calc(var(--vvh,100dvh) * 0.34)));overflow-y:auto;box-shadow:0 14px 36px rgba(0,0,0,.24);-webkit-overflow-scrolling:touch}" +
  "html[data-loc-suggest-open=\"1\"] .quote-checkout-total-note{opacity:0;height:0;margin:0;overflow:hidden}" +
  "html[data-loc-suggest-open=\"1\"] .quote-page__scroll{scroll-padding-bottom:12px}" +
  ".quote-page .location-pin-wrap--fixed-suggest .location-suggest-list--busy:not(.location-suggest-list--premium){position:fixed;top:var(--loc-suggest-top,auto);left:var(--loc-suggest-left,12px);width:var(--loc-suggest-width,calc(100% - 24px));z-index:10060}" +
  ".quote-page .location-pin-wrap--fixed-suggest.location-pin-wrap--premium .location-suggest-list--busy{position:fixed;top:var(--loc-suggest-top,auto);left:var(--loc-suggest-left,12px);width:var(--loc-suggest-width,calc(100% - 24px));z-index:10060;margin-top:-1px;border-radius:0 0 16px 16px!important;border-top:none!important}" +
  "html[data-quote-location-focus=\"1\"] .quote-loc-field-hint{display:none}" +
  "html[data-quote-location-focus=\"1\"] .quote-loc-field-label{font-size:11px;margin-bottom:2px}" +
  "@media (prefers-reduced-motion:reduce){.location-suggest-list--premium,.location-suggest-row,.location-suggest-backdrop{animation:none!important}.location-suggest-loading-dot{animation:none;opacity:.7}.quote-page--ready .quote-page__scroll,.quote-page--ready .quote-package-card,.quote-page--ready .quote-install-section,.quote-page--ready .quote-checkout-dock,.quote-page--ready .quote-checkout-dock::before,.quote-page--ready .quote-checkout-dock-hint,.quote-page--ready .quote-checkout-dock-cta:not(:disabled),.quote-page--ready .quote-page-reset{animation:none!important;transform:none!important;opacity:1!important}}" +
  ".quote-page .location-pin-hint{font-size:10px;line-height:1.4;color:var(--text-muted);margin:4px 0 0;padding:0 2px}" +
  "html[data-quote-location-focus=\"1\"] .quote-page--compact .quote-package-card--strip{display:none}" +
  "html[data-quote-location-focus=\"1\"] .quote-page--compact .quote-package-card:not(.quote-package-card--strip){display:none}" +
  "html[data-quote-location-focus=\"1\"] .quote-page-header-ref{display:none}" +
  "html[data-quote-location-focus=\"1\"] .quote-install-head .quote-install-sub,html[data-quote-location-focus=\"1\"] .quote-install-head .quote-install-radius-badge{display:none}" +
  "html[data-quote-location-focus=\"1\"] .quote-install-head--compact{align-items:center;margin-bottom:2px}" +
  "html[data-quote-location-focus=\"1\"] .quote-install-head--compact .quote-install-title{font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:var(--text-muted);font-family:inherit;font-weight:700}" +
  "html[data-quote-location-focus=\"1\"] .quote-install-head--compact .quote-install-head-icon{width:26px;height:26px;border-radius:8px}" +
  "html[data-quote-location-focus=\"1\"] .quote-install-confirmed{display:none}" +
  "html[data-quote-location-focus=\"1\"] .quote-install-status{display:none}" +
  "html[data-quote-location-focus=\"1\"] .quote-loc-quick{display:none}" +
  "html[data-quote-location-focus=\"1\"] .quote-install-section--premium{flex:none!important;min-height:unset!important;justify-content:flex-start!important;gap:10px;padding:14px 15px 12px!important}" +
  "html[data-quote-location-focus=\"1\"] .quote-page__scroll{scroll-padding-bottom:calc(40px + env(safe-area-inset-bottom,0px))}" +
  "html[data-quote-location-focus=\"1\"] .quote-page .location-pin-hint{display:none}" +
  "html[data-keyboard-open=\"1\"]{scroll-behavior:auto}" +
  "html[data-keyboard-open=\"1\"] .bottom-nav{transform:translate(-50%,calc(100% + 28px));opacity:0;pointer-events:none;transition:transform .22s ease,opacity .22s ease}" +
  "html[data-keyboard-open=\"1\"] .app-shell--quote{padding-bottom:max(4px,env(safe-area-inset-bottom))}" +
  "html[data-keyboard-open=\"1\"] .app-shell--products{padding-bottom:max(6px,env(safe-area-inset-bottom))}" +
  "html[data-keyboard-open=\"1\"] .main-card--quote{max-height:calc(var(--vvh,100dvh) - env(safe-area-inset-top) - 4px)!important}" +
  "html[data-keyboard-open=\"1\"] .main-card--products{max-height:calc(var(--vvh,100dvh) - env(safe-area-inset-top) - 8px)!important}" +
  "html[data-keyboard-open=\"1\"] .quote-page--ready .quote-checkout-dock{flex:0 0 auto;justify-content:flex-start;padding:6px 4px max(6px,env(safe-area-inset-bottom));border-top:1px solid var(--border);background:linear-gradient(180deg,transparent 0%,var(--card-bg) 16%);animation:none!important}" +
  "html[data-keyboard-open=\"1\"] .quote-page--ready .quote-checkout-dock::before{display:none}" +
  "html[data-keyboard-open=\"1\"] .quote-page--ready .quote-checkout-dock-cta:not(:disabled){animation:none!important;min-height:42px;padding:10px 14px;font-size:14px}" +
  "html[data-keyboard-open=\"1\"] .quote-checkout-dock-cta,html[data-keyboard-open=\"1\"] .quote-checkout-cta{display:none}" +
  "html[data-keyboard-open=\"1\"] .quote-page-reset{display:none}" +
  "html[data-keyboard-open=\"1\"] .quote-checkout-bar,html[data-keyboard-open=\"1\"] .quote-checkout-dock{padding-bottom:max(6px,env(safe-area-inset-bottom))}" +
  "html[data-keyboard-open=\"1\"] .quote-flow-steps{display:none}" +
  "html[data-keyboard-open=\"1\"] .quote-page-header{margin-bottom:0}" +
  "html[data-keyboard-open=\"1\"] .quote-package-card{display:none}" +
  "html[data-keyboard-open=\"1\"] .quote-package-card--strip{display:none}" +
  "html[data-keyboard-open=\"1\"] .quote-install-head .quote-install-sub,html[data-keyboard-open=\"1\"] .quote-install-head .quote-install-radius-badge{display:none}" +
  "html[data-keyboard-open=\"1\"] .quote-install-head--compact .quote-install-title{font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:var(--text-muted);font-family:inherit;font-weight:700}" +
  "html[data-keyboard-open=\"1\"] .quote-install-status{display:none}" +
  "html[data-keyboard-open=\"1\"] .quote-loc-quick{display:none}" +
  "html[data-keyboard-open=\"1\"] .quote-page-header-ref{display:none}" +
  "html[data-keyboard-open=\"1\"] .quote-page .location-pin-hint{display:none}" +
  "html[data-keyboard-open=\"1\"] .quote-install-section{flex:1 1 auto;min-height:max(148px,calc(var(--vvh,100dvh) - 88px));justify-content:space-between}" +
  "html[data-quote-location-focus=\"1\"] .quote-install-section--premium{min-height:unset!important}" +
  "html[data-keyboard-open=\"1\"] .quote-install-section .location-field-stack{flex:0 0 auto}" +
  "html[data-keyboard-open=\"1\"] .quote-install-section .quote-install-area-label{flex-shrink:0}" +
  "html[data-keyboard-open=\"1\"] .quote-checkout-bar,html[data-keyboard-open=\"1\"] .quote-checkout-dock{position:sticky;bottom:0;z-index:14;border-top:1px solid var(--border);box-shadow:0 -6px 20px rgba(0,0,0,.08)}" +
  "html[data-quote-location-focus=\"1\"] .quote-loc-input-slot{height:48px!important;min-height:48px!important;max-height:48px!important}" +
  "html[data-keyboard-open=\"1\"] .quote-delivery-card--compact .location-map-panel{display:none}" +
  "html[data-keyboard-open=\"1\"] .client-modal-overlay{align-items:flex-start;padding-top:max(8px,env(safe-area-inset-top))}" +
  "html[data-keyboard-open=\"1\"] .client-modal-panel{max-height:calc(var(--vvh,100dvh) - max(16px,env(safe-area-inset-top)) - 8px)}" +
  "html[data-keyboard-open=\"1\"] .pdf-download-banner{display:none}" +
  "@media (min-width:560px){.quote-page__scroll{display:grid;grid-template-columns:minmax(0,.94fr) minmax(0,1.06fr);grid-template-rows:1fr;align-items:stretch;gap:10px;padding:2px 2px 4px}.quote-page__scroll>.quote-package-card--strip{align-self:stretch;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:6px;padding:12px 14px;min-height:100%}.quote-page__scroll>.quote-package-card--strip .quote-package-strip-copy{width:100%}.quote-page__scroll>.quote-package-card--slim{align-self:stretch;min-height:100%;display:flex;flex-direction:column;justify-content:center}.quote-page__scroll>.quote-install-section{align-self:stretch;justify-content:center;min-height:100%}.quote-page--ready .quote-page__scroll{grid-template-rows:auto;align-items:start}.quote-page--ready .quote-page__scroll>.quote-package-card--slim,.quote-page--ready .quote-page__scroll>.quote-install-section{min-height:unset;align-self:start}}" +
  "@media (min-width:768px){.quote-page__scroll{gap:12px;padding:4px 4px 6px}.quote-install-section--premium{padding:14px 16px 12px}.quote-flow-step{max-width:none}.quote-page-header-title{font-size:1.28rem}.quote-checkout-dock-cta{min-height:44px}}" +
  "@media (max-width:380px){.quote-page-header-title{font-size:1.08rem}.quote-package-name{font-size:1.12rem}.quote-checkout-total-amount{font-size:1.55rem}.quote-delivery-card--compact{padding:9px 10px!important}.delivery-mode-btn{padding:7px 4px}.delivery-mode-btn-label{font-size:10px}.quote-zone-input{font-size:16px!important}.quote-install-radius-badge{display:none}.quote-package-card--strip{padding:8px 10px}.quote-flow-step-label{font-size:8px}.quote-checkout-dock{padding-bottom:calc(40px + env(safe-area-inset-bottom,0px))}}";
