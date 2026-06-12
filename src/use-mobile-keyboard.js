import { useEffect } from "react";

const KEYBOARD_THRESHOLD = 100;

/** Tracks visual viewport shrink (mobile keyboard) and sets CSS vars on <html>. */
export function useMobileKeyboard() {
  useEffect(() => {
    const root = document.documentElement;
    let layoutHeight = window.innerHeight;
    let layoutWidth = window.innerWidth;

    function setKeyboard(open, vh, offset) {
      root.style.setProperty("--vvh", Math.round(vh) + "px");
      root.style.setProperty("--keyboard-offset", Math.round(offset) + "px");
      if (open) root.dataset.keyboardOpen = "1";
      else delete root.dataset.keyboardOpen;
    }

    function resetLayoutBaseline() {
      layoutHeight = window.innerHeight;
      layoutWidth = window.innerWidth;
    }

    function update() {
      const vv = window.visualViewport;
      if (!vv) {
        setKeyboard(false, window.innerHeight, 0);
        return;
      }

      const vh = vv.height;
      const top = vv.offsetTop || 0;
      const offset = Math.max(0, window.innerHeight - vh - top);
      const innerH = window.innerHeight;
      const innerW = window.innerWidth;

      // Viewport resize (rotation, responsive breakpoints) — not a keyboard.
      if (
        Math.abs(innerW - layoutWidth) > 48 ||
        (offset <= 20 && Math.abs(innerH - layoutHeight) > KEYBOARD_THRESHOLD)
      ) {
        resetLayoutBaseline();
        setKeyboard(false, vh, offset);
        return;
      }

      const keyboardOpen =
        offset > KEYBOARD_THRESHOLD || vh < layoutHeight - KEYBOARD_THRESHOLD;

      setKeyboard(keyboardOpen, vh, offset);

      if (!keyboardOpen) resetLayoutBaseline();
    }

    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", update);
      vv.addEventListener("scroll", update);
    }
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", () => {
      resetLayoutBaseline();
      setTimeout(update, 120);
    });
    update();

    return () => {
      if (vv) {
        vv.removeEventListener("resize", update);
        vv.removeEventListener("scroll", update);
      }
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      delete root.dataset.keyboardOpen;
      root.style.removeProperty("--vvh");
      root.style.removeProperty("--keyboard-offset");
    };
  }, []);
}
