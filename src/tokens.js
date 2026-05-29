/** Design tokens — SolarApp × Energi Tech */
export const G = "#E8C547";
export const GD = "#C9A227";
export const G_DIM = "rgba(232,197,71,.15)";
export const M = "#3DD68C";
export const M_DIM = "rgba(61,214,140,.12)";
export const ACCENT = "#5B9CF5";
export const EM = "#0F1F17";
export const JD = "#1A3328";
export const BG = "#040608";
export const BG_MESH =
  "radial-gradient(ellipse 120% 80% at 50% -30%, rgba(232,197,71,.14), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 20%, rgba(61,214,140,.08), transparent), radial-gradient(ellipse 50% 30% at 0% 80%, rgba(91,156,245,.05), transparent)";
export const SURFACE = "rgba(255,255,255,.04)";
export const SURFACE_HOVER = "rgba(255,255,255,.07)";
export const BORDER = "rgba(255,255,255,.08)";
export const BORDER_FOCUS = "rgba(232,197,71,.45)";
export const GF = "rgba(232,197,71,.1)";
export const GBO = "rgba(232,197,71,.25)";
export const W4 = "rgba(255,255,255,.45)";
export const W6 = "rgba(255,255,255,.65)";
export const W8 = "rgba(255,255,255,.88)";
export const W10 = "#F8FAFC";
export const DANGER = "#F87171";
export const WARN = "#FB923C";

export const FONT_UI = "'Outfit', system-ui, -apple-system, sans-serif";
export const FONT_DISPLAY = "'Cormorant Garamond', Georgia, serif";

export const GRAD_GOLD = "linear-gradient(135deg, #C9A227 0%, #E8C547 50%, #F5E6A8 100%)";
export const GRAD_GREEN = "linear-gradient(135deg, #1A5C40 0%, #3DD68C 100%)";
export const GRAD_HERO = BG_MESH;

export const CARD = {
  background: "linear-gradient(165deg, rgba(14,22,18,.92) 0%, rgba(8,12,10,.88) 100%)",
  border: "1px solid rgba(255,255,255,.09)",
  borderRadius: 22,
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  boxShadow:
    "0 8px 40px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.04) inset, 0 1px 0 rgba(232,197,71,.08) inset",
};

export const CARD_ELEVATED = {
  ...CARD,
  boxShadow:
    "0 12px 48px rgba(0,0,0,.5), 0 0 0 1px rgba(232,197,71,.12) inset, 0 0 60px rgba(232,197,71,.04)",
};

export const ci = { display: "flex", alignItems: "center", justifyContent: "center" };
