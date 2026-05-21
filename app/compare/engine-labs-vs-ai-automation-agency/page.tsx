import type { Metadata } from "next";
import ComparePage from "@/app/_components/ComparePage";
import { comparePageBySlug } from "@/app/_lib/compare-pages";

const PAGE = comparePageBySlug("engine-labs-vs-ai-automation-agency")!;

export const metadata: Metadata = {
  title: PAGE.metaTitle,
  description: PAGE.metaDescription,
  alternates: { canonical: `/compare/${PAGE.slug}` },
};

export default function Page() {
  return <ComparePage page={PAGE} />;
}
