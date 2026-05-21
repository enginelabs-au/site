type Variant = "section" | "compact";

const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Vercel",
  "pnpm",
] as const;

/**
 * "Built on" — a public, security-safe view of the stack this site runs on.
 *
 * Limited to tech you can trivially infer from the public HTML, response
 * headers, or knowing this is a Next-on-Vercel deploy. AI providers,
 * databases, queues, auth providers, etc. are intentionally excluded.
 */
export default function BuiltOnStrip({
  variant = "section",
}: {
  variant?: Variant;
}) {
  if (variant === "compact") {
    return (
      <section
        aria-labelledby="built-on-heading-compact"
        className="border-t border-border bg-paper-2"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 md:py-12">
          <h2
            id="built-on-heading-compact"
            className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3"
          >
            Built on
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-2">
            This site runs on a transparent, open-source stack we use for every
            Engine build.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {STACK.map((label) => (
              <li key={label}>
                <span className="inline-flex items-center rounded-md border border-border bg-paper px-2.5 py-1 text-[0.78rem] font-medium text-ink-2">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="built-on-heading"
      className="scroll-mt-16 border-t border-border bg-paper-2 px-4 py-14 md:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">The stack</p>
        <h2
          id="built-on-heading"
          className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-[1.75rem]"
        >
          Built on
        </h2>
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-2">
          This site runs on a transparent, open-source stack we use for every
          Engine build.
        </p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {STACK.map((label) => (
            <li key={label}>
              <span className="inline-flex items-center rounded-md border border-border bg-paper px-3 py-1.5 text-sm font-medium text-ink-2">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
