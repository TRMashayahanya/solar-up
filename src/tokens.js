/** Design tokens — SolarApp × Energi Tech (theme-aware via CSS variables) */
export const G = "#E8C547";
export const GD = "#C9A227";
/** Theme-aware gold for quote branding (readable in light & dark). */
export const QUOTE_GOLD = "var(--quote-gold)";
export const G_DIM = "var(--gold-dim)";
export const M = "#3DD68C";
export const M_DIM = "var(--green-dim)";
export const ACCENT = "#5B9CF5";
export const EM = "#0F1F17";
export const JD = "#1A3328";
export const BG = "var(--bg)";
export const BG_MESH = "var(--bg-hero)";
export const SURFACE = "var(--surface)";
export const SURFACE_HOVER = "var(--surface-hover)";
export const SURFACE_STRONG = "var(--surface-strong)";
export const SURFACE_INSET = "var(--surface-inset)";
export const ROW_BG = "var(--row-bg)";
export const ROW_BG_ON = "var(--row-bg-on)";
export const CHIP_BG = "var(--chip-bg)";
export const PANEL_BG = "var(--panel-bg)";
export const PANEL_BORDER = "var(--panel-border)";
export const BORDER = "var(--border)";
export const BORDER_FOCUS = "var(--border-focus)";
export const GF = "var(--gold-dim)";
export const GBO = "rgba(232,197,71,.25)";
export const W4 = "var(--text-muted)";
export const W6 = "var(--text-body)";
export const W8 = "var(--text-secondary)";
export const W10 = "var(--text-primary)";
export const DANGER = "#F87171";
export const WARN = "#FB923C";

export const FONT_UI = "'Outfit', system-ui, -apple-system, sans-serif";
export const FONT_DISPLAY = "'Cormorant Garamond', Georgia, serif";

export const GRAD_GOLD = "linear-gradient(135deg, #C9A227 0%, #E8C547 50%, #F5E6A8 100%)";
export const GRAD_GREEN = "linear-gradient(135deg, #1A5C40 0%, #3DD68C 100%)";
export const GRAD_HERO = BG_MESH;

export const CARD = {
  background: "var(--card-bg)",
  border: "var(--card-border)",
  borderRadius: 22,
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  boxShadow: "var(--card-shadow)",
};

export const CARD_ELEVATED = {
  ...CARD,
  boxShadow: "var(--card-shadow)",
};

export const ci = { display: "flex", alignItems: "center", justifyContent: "center" };
