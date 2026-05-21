import type { FAQItem } from "@/app/_components/FAQAccordion";
import { normaliseAnswerText, slugify } from "./helpers";

/**
 * Build a schema.org FAQPage object from FAQ items.
 * Each entry's `answer` text is extracted from its ReactNode body.
 *
 * Pass an absolute `pageUrl` (e.g. `${siteUrl}/faq`) so anchor `@id`s resolve
 * to canonical absolute URLs.
 */
export function faqPageSchema(items: FAQItem[], pageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      "@id": pageUrl
        ? `${pageUrl}#${slugify(item.q)}`
        : `#${slugify(item.q)}`,
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: normaliseAnswerText(item.a),
      },
    })),
  };
}
