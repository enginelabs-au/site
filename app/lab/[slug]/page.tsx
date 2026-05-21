import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listLabPosts } from "@/app/_lib/content";
import MotionSection from "@/app/_components/MotionSection";
import { labMdxComponents } from "@/app/_components/typography";
import {
  JsonLd,
  breadcrumbSchema,
  labArticleSchema,
} from "@/app/_lib/json-ld";
import { getSiteUrl } from "@/app/_lib/site-url";

export async function generateStaticParams() {
  const posts = await listLabPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await listLabPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.subtitle ?? "A build from the Engine Labs Lab.",
  };
}

export default async function LabPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await listLabPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  type MdxComponent = React.ComponentType<{ components?: typeof labMdxComponents }>;
  let MDX: MdxComponent | null = null;
  try {
    const mod = await import(`@/content/lab/${slug}.mdx`);
    MDX = mod.default as MdxComponent;
  } catch {
    notFound();
  }

  const siteUrl = getSiteUrl();

  return (
    <article className="border-b border-border">
      <header className="relative bg-background">
        <div className="relative mx-auto max-w-3xl px-4 pt-16 pb-10">
          <p className="text-sm text-ink-3">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <span className="mx-1.5 text-ink-3/60">/</span>
            <Link href="/lab" className="transition-colors hover:text-foreground">
              Lab
            </Link>
          </p>
          <p className="eyebrow mt-10">
            {post.engine ? `${post.engine} engine` : "Build"}
            {post.status && post.status !== "published"
              ? ` · ${post.status}`
              : ""}
          </p>
          <h1 className="mt-3 text-balance text-[2.25rem] font-medium leading-[1.08] tracking-tight text-foreground md:text-[3rem]">
            {post.title}
          </h1>
          <p className="mt-6 text-xs text-ink-3">
            By Cam Douglas
            {post.date_published ? ` · ${post.date_published}` : ""}
            {post.read_time_minutes
              ? ` · ${post.read_time_minutes} min read`
              : ""}
          </p>
          {post.subtitle ? (
            <aside
              aria-labelledby={`tldr-${post.slug}`}
              className="mt-8 rounded-xl border border-border bg-paper-2 p-5 md:p-6"
            >
              <p
                id={`tldr-${post.slug}`}
                className="text-xs font-semibold uppercase tracking-[0.08em] text-brand"
              >
                TL;DR
              </p>
              <p className="mt-2 text-base leading-relaxed text-ink-2 md:text-lg">
                {post.subtitle}
              </p>
            </aside>
          ) : null}
        </div>
      </header>

      <MotionSection>
        <div className="mx-auto max-w-3xl px-4 pb-24">
          <div className="prose">
            <MDX components={labMdxComponents} />
          </div>
        </div>
      </MotionSection>

      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "Lab", path: "/lab" },
            { name: post.title, path: `/lab/${post.slug}` },
          ],
          siteUrl,
        )}
      />
      <JsonLd data={labArticleSchema(post, {}, siteUrl)} />
    </article>
  );
}
