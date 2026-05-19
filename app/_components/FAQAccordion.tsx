"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ReactNode } from "react";

export type FAQItem = {
  q: string;
  a: ReactNode;
};

export default function FAQAccordion({
  items,
  defaultOpen,
}: {
  items: FAQItem[];
  defaultOpen?: string;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className="border-y border-border"
      defaultValue={defaultOpen}
    >
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="border-b border-border last:border-b-0"
        >
          <AccordionTrigger className="py-6 text-left text-[1.02rem] font-medium text-foreground hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="pb-7 pr-8 text-[0.98rem] leading-relaxed text-ink-2">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
