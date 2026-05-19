import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { listLabPosts } from "@/app/_lib/content";
import MotionSection from "@/app/_components/MotionSection";

export const metadata: Metadata = {
  title: "The Engine Labs Lab — one build per week",
  description:
    "Documented Engines, demos and prompts. Filter by Engine and vertical. Take what you like.",
};

export default async function LabIndexPage() {
  const posts = await listLabPosts();
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow">From the Lab</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
            One build per week,{" "}
            <span className="text-brand">fully documented.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            No clients required. Take what you like. Each post documents one
            small Engine, demo or workflow — including what didn't work — with
            a redacted SOW and a price band in AUD.
          </p>
        </div>
      </section>

      <MotionSection>
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
          {posts.length === 0 ? (
            <p className="text-ink-2">No posts yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/lab/${p.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-paper p-6 transition-colors hover:border-rule-strong hover:bg-paper-3/30"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">
                    {p.engine ? `${p.engine} engine` : "Build"}
                    {p.status && p.status !== "published"
                      ? ` · ${p.status}`
                      : ""}
                  </p>
                  <h2 className="text-base font-semibold tracking-tight text-foreground">
                    {p.title}
                  </h2>
                  {p.subtitle ? (
                    <p className="text-sm leading-relaxed text-ink-2">
                      {p.subtitle}
                    </p>
                  ) : null}
                  <div className="mt-auto flex items-center justify-between gap-3 pt-3 text-xs text-ink-3">
                    <span>
                      {p.date_published ?? "draft"}
                      {p.read_time_minutes
                        ? ` · ${p.read_time_minutes} min read`
                        : ""}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-brand">
                      Read the build
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </MotionSection>
    </>
  );
}
