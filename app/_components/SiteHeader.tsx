"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/app/_components/ThemeToggle";

const SECTION_NAV_LINKS = [
  { href: "/#engines", id: "engines", label: "Engines" },
  { href: "/#methodology", id: "methodology", label: "Methodology" },
  { href: "/#pricing", id: "pricing", label: "Pricing" },
] as const;

const CONTACT_LINK = { href: "/#send", id: "send", label: "Contact" } as const;

/**
 * GitHub-style top bar.
 * - Thin solid bar, single-pixel hairline underneath, no shadow, no rounding.
 * - Wordmark only (no tree mark) — small, semibold, tight tracking.
 * - Nav items at 13px text, ink-2 colour. Active section gets a 2px brand
 *   underline directly under the label (matches GitHub's tab indicator).
 * - Active-section state is driven by an IntersectionObserver running on the
 *   homepage's four section IDs only.
 */
export default function SiteHeader({ barOffset = 0 }: { barOffset?: number }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!isHome) {
      setActiveId(null);
      return;
    }
    const ids = [...SECTION_NAV_LINKS, CONTACT_LINK].map((l) => l.id);
    const observed = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (observed.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    observed.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header
      className="sticky z-30 border-b border-border bg-background"
      style={{ top: barOffset }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-4 md:px-6">
        <Link
          href="/"
          className="text-[0.875rem] font-semibold tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          Engine Labs
        </Link>

        <nav
          aria-label="Primary"
          className="hidden h-full items-center md:flex"
        >
          {SECTION_NAV_LINKS.map((link) => {
            const active = isHome && activeId === link.id;
            return (
              <NavItem key={link.id} link={link} active={active} />
            );
          })}
          <NavItem
            link={CONTACT_LINK}
            active={isHome && activeId === CONTACT_LINK.id}
          />
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href="/control-centre"
            className="inline-flex items-center justify-center rounded-md border border-brand-strong/30 bg-brand px-3 py-1.5 text-[0.8125rem] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Open the Control Centre
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-paper text-foreground"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-paper md:hidden">
          <nav aria-label="Primary" className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {[...SECTION_NAV_LINKS, CONTACT_LINK].map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-[0.95rem] text-foreground hover:bg-paper-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/control-centre"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-9 items-center justify-center rounded-md bg-brand px-4 text-[0.85rem] font-medium text-white"
            >
              Open the Control Centre
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function NavItem({
  link,
  active,
}: {
  link: { href: string; id: string; label: string };
  active: boolean;
}) {
  return (
    <Link
      href={link.href}
      aria-current={active ? "true" : undefined}
      className={`relative inline-flex h-full items-center px-3 text-[0.85rem] transition-colors ${
        active ? "text-foreground" : "text-ink-2 hover:text-foreground"
      }`}
    >
      {link.label}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-3 -bottom-px h-[2px] transition-colors ${
          active ? "bg-brand" : "bg-transparent"
        }`}
      />
    </Link>
  );
}
