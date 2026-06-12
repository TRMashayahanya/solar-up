/** Smooth scroll to top when changing wizard phase. */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const main = document.querySelector("main");
  if (main) main.scrollTop = 0;
  const quoteScroll = document.querySelector(".quote-page__stage") || document.querySelector(".quote-page__scroll");
  if (quoteScroll) quoteScroll.scrollTop = 0;
}

function visibleViewport() {
  const vv = window.visualViewport;
  if (!vv) {
    return { top: 0, bottom: window.innerHeight, height: window.innerHeight };
  }
  return {
    top: vv.offsetTop || 0,
    bottom: vv.offsetTop + vv.height,
    height: vv.height,
  };
}

/** Keep focused fields visible above the mobile keyboard within scroll containers. */
export function scrollFieldIntoView(el, { padding = 12, reserveBelow = 0 } = {}) {
  if (!el || typeof el.getBoundingClientRect !== "function") return;

  const scrollRoot =
    el.closest(".quote-page__stage") ||
    el.closest(".quote-page__scroll") ||
    el.closest(".main-card--products") ||
    el.closest(".client-modal-panel") ||
    document.querySelector("main");

  function run() {
    const { top: visTop, bottom: visBottom } = visibleViewport();
    const elRect = el.getBoundingClientRect();
    const suggest = el.closest(".location-pin-wrap")?.querySelector(".location-suggest-list");
    const suggestH =
      suggest && suggest.offsetParent !== null ? suggest.getBoundingClientRect().height : 0;
    const bottomEdge = elRect.bottom + suggestH + reserveBelow;
    const root = scrollRoot && scrollRoot.scrollHeight > scrollRoot.clientHeight ? scrollRoot : null;

    if (root) {
      const rootRect = root.getBoundingClientRect();
      const safeTop = Math.max(rootRect.top, visTop) + padding;
      const safeBottom = Math.min(rootRect.bottom, visBottom) - padding;

      if (elRect.top < safeTop) {
        root.scrollTop += elRect.top - safeTop;
      } else if (bottomEdge > safeBottom) {
        root.scrollTop += bottomEdge - safeBottom;
      }
      return;
    }

    if (elRect.top < visTop + padding) {
      el.scrollIntoView({ block: "start", behavior: "smooth" });
    } else if (bottomEdge > visBottom - padding) {
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  requestAnimationFrame(() => requestAnimationFrame(run));
}
