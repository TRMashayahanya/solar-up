import { useEffect } from "react";

const KEYBOARD_THRESHOLD = 100;

/** Tracks visual viewport shrink (mobile keyboard) and sets CSS vars on <html>. */
export function useMobileKeyboard() {
  useEffect(() => {
    const root = document.documentElement;
    let layoutHeight = window.innerHeight;

    function setKeyboard(open, vh, offset) {
      root.style.setProperty("--vvh", Math.round(vh) + "px");
      root.style.setProperty("--keyboard-offset", Math.round(offset) + "px");
      if (open) root.dataset.keyboardOpen = "1";
      else delete root.dataset.keyboardOpen;
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
      const keyboardOpen = offset > KEYBOARD_THRESHOLD || vh < layoutHeight - KEYBOARD_THRESHOLD;

      setKeyboard(keyboardOpen, vh, offset);

      if (!keyboardOpen) layoutHeight = window.innerHeight;
    }

    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", update);
      vv.addEventListener("scroll", update);
    }
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", () => {
      layoutHeight = window.innerHeight;
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
