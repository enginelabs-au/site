import type { MetadataRoute } from "next";
import { listLabPosts } from "@/app/_lib/content";
import { ENGINES, VERTICALS } from "@/app/_lib/engines";
import { PROBLEM_PAGES } from "@/app/_lib/problem-pages";
import { COMPARE_PAGES } from "@/app/_lib/compare-pages";
import { getSiteUrl } from "@/app/_lib/site-url";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/control-centre", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
  { path: "/engines", changeFrequency: "monthly", priority: 0.85 },
  { path: "/verticals", changeFrequency: "monthly", priority: 0.85 },
  { path: "/methodology", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.75 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.75 },
  { path: "/compare", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/lab", changeFrequency: "weekly", priority: 0.7 },
  { path: "/what-we-dont-do", changeFrequency: "yearly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }),
  );

  const engineEntries: MetadataRoute.Sitemap = ENGINES.map((engine) => ({
    url: `${base}/engines/${engine.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const verticalEntries: MetadataRoute.Sitemap = VERTICALS.map((vertical) => ({
    url: `${base}/verticals/${vertical.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const posts = await listLabPosts();
  const labEntries: MetadataRoute.Sitemap = posts
    .filter((post) => post.status !== "draft")
    .map((post) => ({
      url: `${base}/lab/${post.slug}`,
      lastModified: post.date_published
        ? new Date(post.date_published)
        : now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }));

  const problemEntries: MetadataRoute.Sitemap = PROBLEM_PAGES.map((p) => ({
    url: `${base}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const compareEntries: MetadataRoute.Sitemap = COMPARE_PAGES.map((c) => ({
    url: `${base}/compare/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [
    ...staticEntries,
    ...engineEntries,
    ...verticalEntries,
    ...problemEntries,
    ...compareEntries,
    ...labEntries,
  ];
}
