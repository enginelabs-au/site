"use client";

import { useEffect } from "react";

/**
 * Adds the `snap-y-proximity` class to <html> while the homepage is mounted,
 * so document-level scroll snaps to chapters. Removed on unmount, so other
 * routes scroll normally.
 *
 * `proximity` (not `mandatory`) is deliberate: macOS trackpad inertia fights
 * mandatory snap. Proximity gives the chapter rhythm without hijacking small
 * scrolls. Reduced-motion users are opted out via the CSS media query in
 * globals.css (`.snap-y-proximity` becomes `scroll-snap-type: none`).
 */
export default function HomeScrollSnap() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("snap-y-proximity");
    return () => {
      root.classList.remove("snap-y-proximity");
    };
  }, []);
  return null;
}
