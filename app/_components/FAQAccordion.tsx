"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { slugify } from "@/app/_lib/json-ld/helpers";
import type { ReactNode } from "react";
import { SentencePara } from "@/app/_components/typography";

export type FAQItem = {
  q: string;
  a: ReactNode;
};

/**
 * Accordion-style FAQ list with stable per-question anchor ids.
 *
 * Important: passes `forceMount` to AccordionContent so every answer is
 * present in the rendered HTML (Radix hides closed content via the HTML
 * `hidden` attribute and CSS rather than unmounting). This is required so
 * AI Overview / search engine crawlers can read every answer without
 * needing to click the trigger.
 */
export default function FAQAccordion({
  items,
  defaultOpen,
  idPrefix = "faq",
}: {
  items: FAQItem[];
  defaultOpen?: string;
  /** Anchor id prefix — set to e.g. "pricing-faq" to avoid id collisions. */
  idPrefix?: string;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className="border-y border-border"
      defaultValue={defaultOpen}
    >
      {items.map((item) => {
        const slug = slugify(item.q);
        const anchorId = `${idPrefix}-${slug}`;
        return (
          <AccordionItem
            key={slug}
            id={anchorId}
            value={slug}
            className="scroll-mt-24 border-b border-border last:border-b-0"
          >
            <AccordionTrigger className="py-6 text-left text-[1.02rem] font-medium text-foreground hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent
              forceMount
              className="pb-7 pr-8 text-[0.98rem] leading-relaxed text-ink-2"
            >
              <SentencePara>{item.a}</SentencePara>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
