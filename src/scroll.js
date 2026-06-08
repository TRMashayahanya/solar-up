/** Smooth scroll to top when changing wizard phase. */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const main = document.querySelector("main");
  if (main) main.scrollTop = 0;
  const quoteScroll = document.querySelector(".quote-page__scroll");
  if (quoteScroll) quoteScroll.scrollTop = 0;
}

/** Keep focused fields visible above the mobile keyboard within scroll containers. */
export function scrollFieldIntoView(el, { padding = 12 } = {}) {
  if (!el || typeof el.getBoundingClientRect !== "function") return;

  const scrollRoot =
    el.closest(".quote-page__scroll") ||
    el.closest(".main-card--products") ||
    el.closest(".client-modal-panel") ||
    document.querySelector("main");

  requestAnimationFrame(() => {
    const elRect = el.getBoundingClientRect();
    const root = scrollRoot && scrollRoot.scrollHeight > scrollRoot.clientHeight ? scrollRoot : null;

    if (root) {
      const rootRect = root.getBoundingClientRect();
      if (elRect.top < rootRect.top + padding) {
        root.scrollTop += elRect.top - rootRect.top - padding;
      } else if (elRect.bottom > rootRect.bottom - padding) {
        root.scrollTop += elRect.bottom - rootRect.bottom + padding;
      }
      return;
    }

    el.scrollIntoView({ block: "center", behavior: "smooth" });
  });
}
