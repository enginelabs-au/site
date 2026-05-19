import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Horizontal scroll for tables or other content wider than the viewport.
 * Uses a minmax(0,1fr) grid so the inner scroller gets a bounded width on mobile.
 */
export default function TableScroll({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid w-full min-w-0 grid-cols-[minmax(0,1fr)]", className)}>
      <div className="min-w-0 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
        {children}
      </div>
    </div>
  );
}
