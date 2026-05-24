/** Smooth scroll to top when changing wizard phase. */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const main = document.querySelector("main");
  if (main) main.scrollTop = 0;
}
