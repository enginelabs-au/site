"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function HomeScrollHint() {
  return (
    <Link
      href="#brief"
      aria-label="Scroll to Control Centre"
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
    >
      <ChevronDown className="h-5 w-5 animate-bounce" strokeWidth={1.75} aria-hidden />
    </Link>
  );
}
