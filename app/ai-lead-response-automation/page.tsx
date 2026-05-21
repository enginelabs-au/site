import type { Metadata } from "next";
import ProblemPage from "@/app/_components/ProblemPage";
import { problemPageBySlug } from "@/app/_lib/problem-pages";

const PAGE = problemPageBySlug("ai-lead-response-automation")!;

export const metadata: Metadata = {
  title: PAGE.metaTitle,
  description: PAGE.metaDescription,
  alternates: { canonical: `/${PAGE.slug}` },
};

export default function Page() {
  return <ProblemPage page={PAGE} />;
}
