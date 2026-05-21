/**
 * Plain factual rundown rendered as a definition list near the top of /.
 * Only facts already on the site, footer, or in the catalog data — no claims.
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
      </div>
    </section>
  );
}
