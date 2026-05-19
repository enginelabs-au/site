"use client";

import { useEffect, useState } from "react";

const BAR_HEIGHT_PX = 3;

/** Thin horizontal progress bar fixed above the header; fills as the user scrolls down. */
export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const root = document.documentElement;
      const scrollable = root.scrollHeight - root.clientHeight;
      const next =
        scrollable > 0 ? (root.scrollTop / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, next)));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 bg-border/50"
      style={{ height: BAR_HEIGHT_PX }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className="h-full bg-brand transition-[width] duration-150 ease-out motion-reduce:transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export const SCROLL_PROGRESS_BAR_HEIGHT = BAR_HEIGHT_PX;
