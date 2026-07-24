// Fallback fade-out for browsers without cross-document view transitions.
if (!("startViewTransition" in document) || !CSS.supports("view-transition-name", "x")) {
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    if (a.target === "_blank" || a.hasAttribute("download")) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;              // external
    if (url.pathname === location.pathname && url.hash) return; // same-page anchor
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    const page = document.querySelector(".page-fade");
    if (!page) { location.href = url.href; return; }
    page.classList.add("is-leaving");
    page.addEventListener("animationend", () => (location.href = url.href), { once: true });
    setTimeout(() => (location.href = url.href), 350); // safety net
  });
}