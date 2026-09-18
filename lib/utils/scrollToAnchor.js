/**
 * Smooth-scrolls to an in-page anchor through Lenis when it is running, and
 * falls back to the native behaviour otherwise. Returns true when it handled
 * the navigation so callers know whether to preventDefault.
 */
export function scrollToAnchor(href) {
  if (!href || !href.startsWith('#')) return false;
  const el = document.querySelector(href);
  if (!el) return false;
  if (typeof window !== 'undefined' && window.__lenis) {
    // No extra offset: the sections already carry scroll-margin-top in
    // globals.css, which Lenis honours. Adding -80 here stacked the two and
    // left a ~168px gap above every heading.
    window.__lenis.scrollTo(el, { duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
  return true;
}

/** Click handler for anchor links. */
export function handleAnchorClick(e, href) {
  if (scrollToAnchor(href)) e.preventDefault();
}
