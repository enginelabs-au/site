"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Routes that render their own full-screen chrome (no site header/footer). */
const BARE_ROUTES = ["/pitch"];

export default function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname && BARE_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`))) {
    return null;
  }
  return <>{children}</>;
}
