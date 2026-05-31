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
  ".quote-delivery-card .quote-zone-input{width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--quote-input-border);background:var(--quote-input-bg);color:var(--text-primary);font-size:16px;font-family:inherit}" +
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
  "[data-theme=\"light\"] .client-modal-btn-primary--ready{color:#1D1D1F}";
