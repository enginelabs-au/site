import Link from "next/link";
import { ENGINES } from "@/app/_lib/engines";
import FooterCurrencyNote from "@/app/_components/FooterCurrencyNote";
import LogoMark from "@/app/_components/LogoMark";

export default function SiteFooter() {
  return (
    <footer>
      <div className="border-t border-border bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
              <Link
                href="/"
                className="text-[1.05rem] font-semibold tracking-tight text-foreground"
                aria-label="Engine Labs — home"
              >
                Engine Labs
              </Link>
              <p className="mt-7 max-w-sm text-sm leading-relaxed text-ink-2">
                A one-operator AI build studio. We design and ship Engines —
                small, productised AI workflows, agents and internal tools — that
                retire repeatable work for small businesses, agencies and
                founder-led teams.
              </p>
              <p className="mt-5 text-xs italic text-ink-3">
                An agentic company, building agentic companies.
              </p>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                Engines
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {ENGINES.map((e) => (
                  <li key={e.slug}>
                    <Link
                      href={`/engines/${e.slug}`}
                      className="text-ink-2 transition-colors hover:text-foreground"
                    >
                      {e.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                Studio
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link
                    href="/methodology"
                    className="text-ink-2 transition-colors hover:text-foreground"
                  >
                    Methodology
                  </Link>
                </li>
                <li>
                  <Link href="/lab" className="text-ink-2 transition-colors hover:text-foreground">
                    From the Lab
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-ink-2 transition-colors hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/what-we-dont-do"
                    className="text-ink-2 transition-colors hover:text-foreground"
                  >
                    What we don&apos;t do
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#who-we-build-for"
                    className="text-ink-2 transition-colors hover:text-foreground"
                  >
                    Who we build for
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-ink-2 transition-colors hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-ink-2 transition-colors hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                Get in touch
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link
                    href="/control-centre"
                    className="text-foreground transition-colors hover:text-brand"
                  >
                    Open the Control Centre
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-ink-2 transition-colors hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section
        aria-label="Footer"
        className="border-t border-border bg-background"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="py-12 md:py-16" aria-labelledby="footer-lab-heading">
            <p
              id="footer-lab-heading"
              className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              From the Lab
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-3">
              <li>
                <Link href="/lab" className="transition-colors hover:text-ink-2">
                  All Lab posts
                </Link>
              </li>
              <li>
                <Link
                  href="/lab/building-the-control-centre-that-built-itself"
                  className="transition-colors hover:text-ink-2"
                >
                  Building the Control Centre
                </Link>
              </li>
              <li>
                <Link href="/what-we-dont-do" className="transition-colors hover:text-ink-2">
                  What we don&apos;t do
                </Link>
              </li>
            </ul>
          </div>

          <div
            className="flex flex-col items-center justify-center py-16 md:py-24 lg:py-28"
            aria-label="Engine Labs"
          >
            <Link href="/" className="transition-opacity hover:opacity-85">
              <LogoMark className="h-[min(10rem,22vh)] w-auto min-h-[7rem] max-h-[11rem] md:h-[min(12rem,24vh)] md:max-h-[13rem]" />
            </Link>
          </div>

          <div className="pb-12 md:pb-16" aria-labelledby="footer-legal-heading">
            <h3
              id="footer-legal-heading"
              className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3"
            >
              Legal
            </h3>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <li>
                <Link href="/privacy" className="text-ink-2 transition-colors hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-ink-2 transition-colors hover:text-foreground">
                  Terms
                </Link>
              </li>
              <li className="text-ink-3">
                MSA · SOW · SLA · Addendum
                <span className="ml-1 text-xs">(on request)</span>
              </li>
            </ul>

            <div className="mt-8 text-xs text-ink-3 sm:flex sm:items-start sm:justify-between sm:gap-8">
              <p className="max-w-3xl leading-relaxed">
                © 2026 Engine Labs. Engine Labs is an Australian sole trader trading as Cam
                Douglas (ABN 13 141 459 638), governed by the laws of New South Wales. Based
                in Sydney.
              </p>
              <FooterCurrencyNote />
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
