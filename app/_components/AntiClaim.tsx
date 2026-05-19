import Link from "next/link";

const DONT_DO = [
  "We don't build systems that make legal, medical, financial, employment, credit, insurance, immigration, housing or safety decisions on behalf of humans. Those decisions need a regulated professional, not an agent.",
  "We don't take on production-grade cyber security, penetration testing, SOC2 / ISO certification or regulated compliance ownership.",
  "We don't build mission-critical infrastructure where a failure has material legal, financial or safety consequence.",
  "We don't scrape restricted platforms, extract data from sources that breach platform terms, or build mass-cold-outreach systems on unconsented lists.",
  "We don't take on managed hosting, 24/7 monitoring, or enterprise DevOps.",
];

const WONT_PROMISE = [
  "We won't promise a revenue lift, lead volume, conversion rate, response time or AI accuracy number. Anyone who does is making it up.",
  "We won't promise uptime guarantees beyond what the underlying third-party tools offer.",
  "We won't promise that an AI output will always be correct. The human-review step is non-negotiable.",
  "We won't quote a fixed price for unclear scope. Larger or ambiguous projects start with a paid scoping workshop.",
];

export default function AntiClaim({
  variant = "section",
}: {
  variant?: "section" | "long";
}) {
  const isSection = variant === "section";
  return (
    <div className={isSection ? "border-y border-border bg-paper" : ""}>
      <div className="mx-auto max-w-6xl px-4 py-24 md:py-28">
        {isSection ? (
          <header className="mb-14 max-w-3xl">
            <p className="eyebrow">Boundaries</p>
            <h2 className="mt-4 text-[2.25rem] font-medium tracking-tight text-foreground md:text-[3rem]">
              What we don't do, and what we won't promise.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
              Most agencies hide this in the fine print. We put it on the
              homepage. If your brief lands in one of these columns, the
              Control Centre will say so and offer a referral.
            </p>
          </header>
        ) : null}

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">
              What we don't do
            </h3>
            <ul className="mt-6 space-y-5">
              {DONT_DO.map((line, i) => (
                <li
                  key={i}
                  className="flex gap-4 text-sm leading-relaxed text-ink-2 md:text-base"
                >
                  <span
                    aria-hidden
                    className="mt-3 h-px w-4 flex-none bg-rule-strong"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">
              What we won't promise
            </h3>
            <ul className="mt-6 space-y-5">
              {WONT_PROMISE.map((line, i) => (
                <li
                  key={i}
                  className="flex gap-4 text-sm leading-relaxed text-ink-2 md:text-base"
                >
                  <span
                    aria-hidden
                    className="mt-3 h-px w-4 flex-none bg-rule-strong"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {isSection ? (
          <div className="mt-12">
            <Link
              href="/what-we-dont-do"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 decoration-1 hover:text-brand hover:underline"
            >
              The long version, with the clauses each line comes from →
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
