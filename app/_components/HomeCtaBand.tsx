import Link from "next/link";

/**
 * Nexus-style GET STARTED band — sits between brief panel and repo README.
 */
export default function HomeCtaBand() {
  return (
    <section
      className="border-y border-border bg-paper-3 px-4 py-12 md:py-14"
      aria-labelledby="get-started-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <div>
          <p
            className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-muted-foreground"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Next step
          </p>
          <h2
            id="get-started-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-[1.75rem]"
          >
            Get started
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Open the full Control Centre, or send a one-line brief above — we&apos;ll
            recommend an Engine and draft scope.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/control-centre" className="btn-primary">
            Open the Control Centre
          </Link>
          <Link href="#brief" className="btn-ghost">
            Send a brief
          </Link>
        </div>
      </div>
    </section>
  );
}
