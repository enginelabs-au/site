import { SentencePara } from "@/app/_components/typography";

/**
 * Homepage "Who Engine Labs is for" section.
 *
 * Audience descriptors are derived strictly from the VERTICALS roster in
 * `_lib/engines.ts` and the existing copy on the site. No new audience
 * segments are introduced here.
 */
const AUDIENCES: string[] = [
  "Small businesses losing time to manual admin — trades and service businesses where the phone rings while the operator is on the tools.",
  "Marketing and creative agencies that need repeatable workflow automation — senior teams losing the week to status reports, approvals and reporting.",
  "E-commerce and direct-to-consumer stores where the support inbox is the bottleneck and reporting takes a full Monday.",
  "Recruiters and staffing teams who want CV intake, scheduling and follow-up drafted so the humans can do the conversations.",
  "Coaches, consultants and course creators who need the enquiry-to-onboarded journey on rails and their IP searchable for clients.",
  "Solo founders and pre-seed teams who need a prototype to test the idea before they quit, raise or hire.",
  "Teams that need internal AI tools — a private knowledge chat over their own SOPs, a back-office Engine for supplier paperwork.",
];

export default function HomeWhoForBlock() {
  return (
    <section
      id="who-engine-labs-is-for"
      aria-labelledby="home-who-for-heading"
      className="scroll-mt-16 border-t border-section-engines-border bg-section-engines px-4 py-14 text-section-engines-fg md:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="home-who-for-heading"
          className="text-2xl font-semibold tracking-tight md:text-[1.75rem]"
        >
          Who Engine Labs is for.
        </h2>
        <SentencePara className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-section-engines-fg-muted">
          Engine Labs builds for small businesses, agencies and founder-led
          teams in Australia. If one of the descriptions below sounds like
          you, there is already a recommended Engine or stack in the catalog.
        </SentencePara>
        <ul className="mt-8 space-y-3 text-[0.92rem] leading-relaxed text-section-engines-fg-muted">
          {AUDIENCES.map((line) => (
            <li
              key={line}
              className="rounded-lg border border-section-engines-surface-border bg-section-engines-surface px-4 py-3.5"
            >
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
