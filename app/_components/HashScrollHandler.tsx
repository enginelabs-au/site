"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToContactSend } from "@/app/_lib/scroll-to-contact";
import { scrollToHashElement } from "@/app/_lib/scroll-to-hash";

/** Scroll to `#send` or other in-page section hashes after navigation. */
export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (!hash) return;

    if (hash === "#send") {
      const run = () => scrollToContactSend("instant");
      run();
      const t = window.setTimeout(run, 100);
      return () => window.clearTimeout(t);
    }

    const run = () => scrollToHashElement(hash, "instant");
    run();
    const t = window.setTimeout(run, 100);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
