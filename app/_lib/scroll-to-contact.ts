/** Sticky header (h-14) + scroll progress bar (3px) + small gap. */
export const CONTACT_SCROLL_OFFSET_PX = 56 + 3 + 20;

/**
 * Scroll so the contact block sits just below the sticky chrome, with the full
 * section visible when it fits in the viewport.
 */
export function scrollToContactSend(behavior: ScrollBehavior = "smooth") {
  const target =
    document.querySelector<HTMLElement>("[data-contact-section]") ??
    document.getElementById("send");
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const scrollTop = window.scrollY;
  const available = window.innerHeight - CONTACT_SCROLL_OFFSET_PX;

  let top = scrollTop + rect.top - CONTACT_SCROLL_OFFSET_PX;

  if (rect.height <= available) {
    const bottom = scrollTop + rect.bottom;
    const maxTop = bottom - window.innerHeight;
    if (top > maxTop) top = Math.max(0, maxTop);
  }

  window.scrollTo({ top: Math.max(0, top), behavior });
}
