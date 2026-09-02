import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

/** Lab metadata kept out of MDX so frontmatter never renders in the article body. */
const MCG = "MCG Property Shoalhaven";

const LAB_POST_META_BY_SLUG: Record<
  string,
  Omit<LabPostMeta, "slug">
> = {
  "mcg-founder-engine-landlord-portal": {
    title: "A landlord portal MCG could afford to be wrong about",
    subtitle:
      "Prototype in eight days, working MVP in four weeks, built on data the earlier Engines had already cleaned up. About 2 hours a week of owner calls retired.",
    date_published: "2026-08-14",
    engine: "founder",
    client: MCG,
    verticals: ["founders"],
    status: "published",
    read_time_minutes: 4,
    author: "Engine Labs",
  },
  "mcg-outreach-engine-past-appraisals": {
    title: "Following up every past appraisal without a call-around",
    subtitle:
      "Consent-checked drafts to people already in Agentbox, throttled and reviewed by the agent. About 3 hours a week retired, roughly A$12,200 a year.",
    date_published: "2026-06-26",
    engine: "outreach",
    client: MCG,
    verticals: ["coaches", "agencies"],
    status: "published",
    read_time_minutes: 4,
    author: "Engine Labs",
  },
  "mcg-back-office-engine-trade-invoices": {
    title: "120 trade invoices a month, read and matched before the bookkeeper sees them",
    subtitle:
      "Invoices matched to work orders and owners, duplicates caught before payment, nothing posted without a human. About 5 hours a week retired, roughly A$10,800 a year.",
    date_published: "2026-05-29",
    engine: "back-office",
    client: MCG,
    verticals: ["trades", "ecommerce"],
    status: "published",
    read_time_minutes: 4,
    author: "Engine Labs",
  },
  "mcg-knowledge-engine-how-do-we": {
    title: "Stopping the senior PM from being the office search engine",
    subtitle:
      "A private chat over MCG's own procedures with a weekly list of what nobody has written down yet. About 4 hours a week retired, roughly A$8,600 a year.",
    date_published: "2026-04-17",
    engine: "knowledge",
    client: MCG,
    verticals: ["agencies", "recruiters"],
    status: "published",
    read_time_minutes: 4,
    author: "Engine Labs",
  },
  "mcg-support-engine-tenant-inbox": {
    title: "Triage for a property management inbox that gets 80 emails a day",
    subtitle:
      "Every tenant and landlord email tagged, urgent maintenance texted to the on-duty PM, routine replies drafted with citations. About 10 hours a week retired, roughly A$21,600 a year.",
    date_published: "2026-03-13",
    engine: "support",
    client: MCG,
    verticals: ["ecommerce", "trades"],
    status: "published",
    read_time_minutes: 4,
    author: "Engine Labs",
  },
  "mcg-insight-engine-monday-numbers": {
    title: "Taking Sunday night back from the Monday meeting spreadsheet",
    subtitle:
      "Agentbox, the rent roll and portal stats in one dashboard, with a written briefing at 6am Monday. About 3 hours a week of the principal's time retired, roughly A$12,200 a year.",
    date_published: "2026-02-06",
    engine: "insight",
    client: MCG,
    verticals: ["agencies", "founders"],
    status: "published",
    read_time_minutes: 3,
    author: "Engine Labs",
  },
  "mcg-ops-engine-leases-and-maintenance": {
    title: "Lease expiries and landlord approvals that chase themselves",
    subtitle:
      "Three workflows for the property management side: renewals at 90, 60 and 30 days, maintenance approvals chased automatically, one Monday status email. About 5 hours a week retired, roughly A$10,800 a year.",
    date_published: "2025-12-19",
    engine: "ops",
    client: MCG,
    verticals: ["agencies", "trades"],
    status: "published",
    read_time_minutes: 4,
    author: "Engine Labs",
  },
  "mcg-sales-engine-portal-enquiries": {
    title: "Portal enquiries into Agentbox with a draft reply, any hour of the day",
    subtitle:
      "Every realestate.com.au and Domain enquiry scored, filed in Agentbox and answered in the agent's voice within minutes. About 8 hours a week retired, roughly A$32,600 a year.",
    date_published: "2025-11-14",
    engine: "sales",
    client: MCG,
    verticals: ["trades", "recruiters", "coaches"],
    status: "published",
    read_time_minutes: 4,
    author: "Engine Labs",
  },
  "building-the-control-centre-that-built-itself": {
    title: "Building the Control Centre that built itself",
    subtitle:
      "Case study: this site, built for Engine Labs by Engine Labs, shipped in under 24 hours for under A$50.",
    date_published: "2026-05-19",
    engine: "founder",
    client: "Engine Labs, Sydney (in-house)",
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
  /** Named client for client builds; absent for public Lab builds. */
  client?: string;
  verticals?: string[];
  status?: string;
  read_time_minutes?: number;
  author?: string;
};

/** Renders an ISO date (YYYY-MM-DD) as day month year, e.g. "19 May 2026". */
export function formatDateAU(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

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
