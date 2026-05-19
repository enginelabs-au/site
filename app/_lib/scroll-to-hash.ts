/** Sticky header (h-14) + scroll progress bar (3px) + small gap — matches section scroll-mt-16. */
export const HASH_SCROLL_OFFSET_PX = 56 + 3 + 20;

export function scrollToHashElement(
  hash: string,
  behavior: ScrollBehavior = "smooth",
) {
  const id = hash.replace(/^#/, "");
  if (!id) return;

  const target = document.getElementById(id);
  if (!target) return;

  const top =
    target.getBoundingClientRect().top + window.scrollY - HASH_SCROLL_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, top), behavior });
}
