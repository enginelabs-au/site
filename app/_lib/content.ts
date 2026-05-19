import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

/** Lab metadata kept out of MDX so frontmatter never renders in the article body. */
const LAB_POST_META_BY_SLUG: Record<
  string,
  Omit<LabPostMeta, "slug">
> = {
  "building-the-control-centre-that-built-itself": {
    title: "Building the Control Centre that built itself",
    subtitle:
      "Case study — this site, shipped in under 24 hours for under A$50.",
    date_published: "2026-05-19",
    engine: "founder",
    verticals: [
      "founders",
      "agencies",
      "trades",
      "ecommerce",
      "recruiters",
      "coaches",
    ],
    status: "published",
    read_time_minutes: 8,
    author: "Engine Labs",
  },
};

export type LabPostMeta = {
  slug: string;
  title: string;
  subtitle?: string;
  date_published?: string;
  engine?: string;
  verticals?: string[];
  status?: string;
  read_time_minutes?: number;
  author?: string;
};

export async function listLabPosts(): Promise<LabPostMeta[]> {
  const dir = path.join(CONTENT_ROOT, "lab");
  let files: string[] = [];
  try {
    files = await readdir(dir);
  } catch {
    return [];
  }

  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const known = LAB_POST_META_BY_SLUG[slug];
        if (known) {
          return { slug, ...known } satisfies LabPostMeta;
        }

        const raw = await readFile(path.join(dir, file), "utf8");
        const { data } = matter(raw);
        const rawDate = data.date_published;
        let date_published: string | undefined;
        if (rawDate instanceof Date) {
          date_published = rawDate.toISOString().slice(0, 10);
        } else if (typeof rawDate === "string") {
          date_published = rawDate;
        }
        return {
          slug,
          title: (data.title as string) ?? slug,
          subtitle: data.subtitle as string | undefined,
          date_published,
          engine: data.engine as string | undefined,
          verticals: data.verticals as string[] | undefined,
          status: data.status as string | undefined,
          read_time_minutes: data.read_time_minutes as number | undefined,
          author: data.author as string | undefined,
        } satisfies LabPostMeta;
      }),
  );

  return posts.sort((a, b) =>
    (b.date_published ?? "").localeCompare(a.date_published ?? ""),
  );
}
