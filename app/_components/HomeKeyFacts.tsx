import Link from "next/link";

/**
 * Plain factual rundown rendered as a definition list near the top of /.
 * Only facts already on the site, footer, catalog data, or Lab write-ups.
 * Track-record figures are the totals of the MCG series in /lab; update both.
 */
const FACTS: { term: string; detail: string }[] = [
  {
    term: "Location",
    detail: "Sydney, NSW, Australia",
  },
  {
    term: "Operator",
    detail: "Cam Douglas (sole trader)",
  },
  {
    term: "Catalog",
    detail: "Eight productised Engines",
  },
  {
    term: "Pricing",
    detail: "Published bands in AUD, GST exclusive unless stated",
  },
  {
    term: "Typical timeline",
    detail: "1–6 weeks per Engine",
  },
  {
    term: "Areas served",
    detail: "Australia",
  },
];

const TRACK_RECORD: { term: string; detail: string }[] = [
  {
    term: "Engines in production",
    detail:
      "All eight, built one at a time for MCG Property Shoalhaven between November 2025 and August 2026",
  },
  {
    term: "Manual work retired",
    detail: "About 40 hours a week across a team of under ten, roughly 1,900 hours a year",
  },
  {
    term: "Value of that time",
    detail: "About A$113,000 a year at A$85 an hour for agents and A$45 for admin roles",
  },
  {
    term: "Total build spend",
    detail: "A$16,900 ex GST for all eight Engines, under A$260 a month to run",
  },
  {
    term: "Fastest payback",
    detail:
      "Sales Engine: 8 hours a week and about A$32,600 a year retired for a A$1,800 build, paid back inside the first month",
  },
  {
    term: "This website",
    detail: "Built in under 24 hours for under A$50 in cash outlay, live scoping agent included",
  },
];

export default function HomeKeyFacts() {
  return (
    <section
      aria-labelledby="home-key-facts-heading"
      className="border-t border-border bg-paper-2 px-4 py-12 md:py-16"
    >
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Key facts</p>
        <h2
          id="home-key-facts-heading"
          className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-[1.75rem]"
        >
          Engine Labs at a glance.
        </h2>
        <dl className="mt-8 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
          {FACTS.map((fact) => (
            <div key={fact.term} className="border-l-2 border-rule pl-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                {fact.term}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-foreground">
                {fact.detail}
              </dd>
            </div>
          ))}
        </dl>

        <h3
          id="home-track-record-heading"
          className="mt-14 text-xl font-semibold tracking-tight text-foreground md:text-2xl"
        >
          Track record, from the Lab.
        </h3>
        <dl
          aria-labelledby="home-track-record-heading"
          className="mt-6 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2"
        >
          {TRACK_RECORD.map((fact) => (
            <div key={fact.term} className="border-l-2 border-brand pl-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                {fact.term}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-foreground">
                {fact.detail}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs leading-relaxed text-ink-3">
          Hours are the client&apos;s own, timed before and after each build.
          Every figure traces to a write-up in{" "}
          <Link href="/lab" className="underline underline-offset-2 hover:text-foreground">
            the Lab
          </Link>
          . Nothing here counts listings, revenue or conversion.
        </p>
      </div>
    </section>
  );
}
