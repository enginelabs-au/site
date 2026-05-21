/**
 * Data for the four /compare/* pages.
 *
 * The pages are factual and non-disparaging — describing trade-offs, not
 * attacking the alternative. Every claim is restricted to what we already
 * say elsewhere on the site (engines.ts, MDX specs, /pricing,
 * /methodology, /what-we-dont-do).
 */
export type CompareRow = {
  attribute: string;
  optionA: string;
  optionB: string;
};

export type CompareFaq = {
  q: string;
  a: string;
};

export type ComparePage = {
  slug: string;
  optionAName: string;
  optionBName: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  comparisonRows: CompareRow[];
  whenOptionAWins: { heading: string; body: string };
  whenOptionBWins: { heading: string; body: string };
  faqs: CompareFaq[];
};

export const COMPARE_PAGES: ComparePage[] = [
  {
    slug: "engine-labs-vs-hiring-a-va",
    optionAName: "Hiring a virtual assistant",
    optionBName: "Engine Labs",
    h1: "Engine Labs vs hiring a virtual assistant",
    metaTitle: "Engine Labs vs Hiring a VA · Engine Labs",
    metaDescription:
      "Engine Labs vs hiring a virtual assistant. Compare scope, output, pricing, timeline and best-fit cases — productised AI workflow build versus ongoing human admin support.",
    summary:
      "Hiring a virtual assistant means recurring human admin hours; Engine Labs means a productised AI workflow that retires repeatable admin once. The decision is whether the work you want done is recurring human judgement or repeatable system work that can be drafted by software for a human to review.",
    comparisonRows: [
      {
        attribute: "Scope",
        optionA: "Ongoing administrative tasks performed by a person.",
        optionB:
          "A productised AI workflow, agent or internal tool that retires a specific slice of repeatable work.",
      },
      {
        attribute: "Output",
        optionA: "Work done directly by the assistant during their hours.",
        optionB:
          "A system you keep — repo, prompts, run-book and dependency list — drafting work for a human to review.",
      },
      {
        attribute: "Pricing model",
        optionA: "Hourly or monthly retainer for time.",
        optionB:
          "Fixed price per Engine, scoped in the Control Centre. Bands from A$450 to A$8,500 AUD, GST exclusive unless stated.",
      },
      {
        attribute: "Timeline",
        optionA: "Onboard in days; throughput proportional to hours.",
        optionB:
          "1–6 weeks per Engine; throughput scales with the system once live.",
      },
      {
        attribute: "Best for",
        optionA:
          "Highly variable, judgement-heavy, low-volume tasks where the cost of building a system outweighs the cost of human hours.",
        optionB:
          "Repeatable, high-volume work (inbound enquiries, support tickets, weekly reporting, supplier paperwork) where a draft-and-review system pays back inside a few months.",
      },
      {
        attribute: "Limitations",
        optionA:
          "Throughput capped by hours; quality and continuity tied to one person; harder to scale without re-hiring.",
        optionB:
          "Engine Labs does not own managed hosting or 24/7 monitoring; no outcome guarantees on lead volume, conversion or accuracy.",
      },
    ],
    whenOptionAWins: {
      heading: "When hiring a VA is the better fit",
      body: "If the work changes shape every week, needs a human voice on the phone, or is too low-volume to justify building a system, a virtual assistant will usually be simpler and cheaper than an Engine. The same is true if the bottleneck is your time on calls or relationship work — that is not the part Engine Labs replaces.",
    },
    whenOptionBWins: {
      heading: "When Engine Labs is the better fit",
      body: "If the work is repeatable (inbound enquiries, support tickets, weekly reporting, supplier paperwork, knowledge questions), Engine Labs delivers a system you keep — drafts for a human to review, a documented run-book, and a fixed price for the build. After the build, you choose whether to opt into a Support plan or run it yourself.",
    },
    faqs: [
      {
        q: "Does Engine Labs replace my virtual assistant entirely?",
        a: "Not always. Engines draft, classify, route and remind — humans still send anything that touches a customer, contract, account or person's record. Many clients keep a VA on calls and relationship work and run an Engine on the repeatable admin behind it.",
      },
      {
        q: "How is Engine Labs pricing different from a VA retainer?",
        a: "Engine Labs is a fixed price per Engine, scoped in the Control Centre, with starting bands from A$450 to A$8,500 AUD GST exclusive. A VA retainer is recurring hours. Engine Labs is build-once; optional Support plans (Basic Care, Standard Care, Priority Care) are separate.",
      },
      {
        q: "Can a VA also use the Engine?",
        a: "Yes. The Engines run in your tools on your accounts; anyone on your team — including a VA — can review and send the drafts the Engine queues.",
      },
    ],
  },
  {
    slug: "engine-labs-vs-zapier-consultant",
    optionAName: "A Zapier consultant",
    optionBName: "Engine Labs",
    h1: "Engine Labs vs a Zapier consultant",
    metaTitle: "Engine Labs vs Zapier Consultant · Engine Labs",
    metaDescription:
      "Engine Labs vs a Zapier consultant. Compare scope, AI agent capability, pricing model and handover — productised AI workflow build versus no-code automation consulting.",
    summary:
      "A Zapier consultant builds connector-based automations on top of your existing SaaS stack; Engine Labs builds productised AI workflows that include AI agents, RAG, drafting, classification and scheduling alongside connector logic. The decision is whether your workflow is connector-shaped or needs an AI layer on top.",
    comparisonRows: [
      {
        attribute: "Scope",
        optionA:
          "No-code automation flows wiring trigger → action between SaaS tools.",
        optionB:
          "A productised AI workflow, agent or internal tool — drafting, classification, RAG, scheduling and routing on top of connector logic.",
      },
      {
        attribute: "Output",
        optionA: "Zaps in your Zapier account.",
        optionB:
          "An Engine that runs in your tools on your accounts, with repo, prompts, run-book and dependency list as the handover.",
      },
      {
        attribute: "Pricing model",
        optionA: "Hourly or per-zap consulting fees.",
        optionB:
          "Fixed price per Engine, scoped in the Control Centre. Bands published in AUD, GST exclusive unless stated.",
      },
      {
        attribute: "Timeline",
        optionA: "Hours to days per zap.",
        optionB: "1–6 weeks per Engine depending on tier and integration count.",
      },
      {
        attribute: "Best for",
        optionA:
          "Pure trigger-action work between SaaS tools where no model judgement is required.",
        optionB:
          "Workflows where a draft, a classification, a citation, a summary or a personalised reply is part of the deliverable.",
      },
      {
        attribute: "Limitations",
        optionA:
          "Limited to the connector-action vocabulary of the no-code tool; AI features are bolt-ons.",
        optionB:
          "Engine Labs does not own managed hosting or 24/7 monitoring; no outcome guarantees on accuracy, lead volume or conversion.",
      },
    ],
    whenOptionAWins: {
      heading: "When a Zapier consultant is the better fit",
      body: "If your workflow is genuinely connector-shaped — move a row from this app to that app on a trigger, no judgement, no drafting — a Zapier consultant will usually be faster and cheaper. Engine Labs also uses connector tools (Zapier, Make and n8n appear in the Ops Engine integration list) so there is no reason to over-engineer a pure trigger-action job.",
    },
    whenOptionBWins: {
      heading: "When Engine Labs is the better fit",
      body: "If the workflow needs an AI draft, a tagged classification, a cited answer, a written weekly summary or a triaged inbox — anything where a model is in the loop — Engine Labs ships that as a productised Engine with a published spec sheet, a defect-fix period and a documented handover.",
    },
    faqs: [
      {
        q: "Does Engine Labs use Zapier?",
        a: "Sometimes. Zapier, Make and n8n are in the Ops Engine integration list — we use them where they are the right tool. The difference is the scope: an Engine is a productised build that includes an AI layer, not a collection of zaps.",
      },
      {
        q: "Can a Zapier consultant build what Engine Labs builds?",
        a: "Sometimes, sometimes not. Engines include RAG over your docs, citation-aware drafting, tone training and weekly written summaries — work that needs prompts, ingestion pipelines and review queues, not just connector logic.",
      },
      {
        q: "Who owns the work after the build?",
        a: "You do. The handover pack includes the repo, the prompts, the run-book and the dependency list — designed so you can keep running it yourself or take it to another developer.",
      },
    ],
  },
  {
    slug: "engine-labs-vs-ai-automation-agency",
    optionAName: "A traditional AI automation agency",
    optionBName: "Engine Labs",
    h1: "Engine Labs vs a traditional AI automation agency",
    metaTitle: "Engine Labs vs AI Automation Agency · Engine Labs",
    metaDescription:
      "Engine Labs vs a traditional AI automation agency. Compare scope, pricing model, methodology and exclusions — productised AI workflow build with published bands versus open-scope agency engagement.",
    summary:
      "A traditional AI automation agency typically scopes per engagement and bills by retainer or hours; Engine Labs publishes a catalog of eight productised Engines with starting price bands and a fixed-scope SOW per build. The decision is between an open-scope agency engagement and a productised catalog with a published Build → Run loop.",
    comparisonRows: [
      {
        attribute: "Scope",
        optionA: "Custom scope per engagement, defined during discovery.",
        optionB:
          "One of eight Engines with a published spec sheet; Custom tier for stacked or ambiguous briefs after a paid scoping workshop.",
      },
      {
        attribute: "Output",
        optionA: "Whatever the SOW says; varies by agency.",
        optionB:
          "A productised Engine with repo, prompts, run-book, dependency list and a defect-fix period.",
      },
      {
        attribute: "Pricing model",
        optionA: "Hourly, retainer or custom project fee.",
        optionB:
          "Published price bands per Engine in AUD, GST exclusive unless stated. Workshop fee credited against the final fee if you proceed.",
      },
      {
        attribute: "Timeline",
        optionA: "Variable; multi-month engagements common.",
        optionB:
          "1–6 weeks per Engine, weekly checkpoints, six-step Build → Run loop.",
      },
      {
        attribute: "Best for",
        optionA:
          "Long-running custom transformations, multi-team rollouts, enterprise change management.",
        optionB:
          "Small businesses, agencies and founder-led teams who want a fixed-scope, fixed-price Engine and a clean handover.",
      },
      {
        attribute: "Limitations",
        optionA:
          "Open scope can mean unclear acceptance criteria and surprise costs.",
        optionB:
          "Engine Labs does not own managed hosting, 24/7 monitoring, regulated compliance work or outcome guarantees on revenue, leads, conversion or accuracy.",
      },
    ],
    whenOptionAWins: {
      heading: "When a traditional AI automation agency is the better fit",
      body: "If the work is genuinely enterprise-scale — multi-team rollout, formal change management, on-call SRE rotation, regulated compliance ownership — a senior agency with a larger team is the right shape. Engine Labs is a one-operator studio with a productised catalog, not a full-service consultancy.",
    },
    whenOptionBWins: {
      heading: "When Engine Labs is the better fit",
      body: "If the work fits inside an Engine — inbound sales, support triage, ops workflows, reporting, MVP prototype, internal knowledge chat, back-office extraction, permissioned outreach — Engine Labs delivers a fixed-scope build with a published price band, a documented six-step methodology and a handover pack you keep.",
    },
    faqs: [
      {
        q: "Why is Engine Labs cheaper than most AI agencies?",
        a: "Because the catalog is productised. The Engines have published spec sheets, the scope is defined up-front in the Control Centre, and the price bands are visible before any conversation. Pricing runs from A$450 to A$8,500 AUD GST exclusive depending on Engine and tier.",
      },
      {
        q: "Will Engine Labs take on a long custom build?",
        a: "Stacked or ambiguous briefs use the Custom tier, which starts with a paid scoping workshop credited against the final fee. We will not take on regulated compliance ownership, managed hosting or mission-critical infrastructure — those are listed in /what-we-dont-do.",
      },
      {
        q: "Who owns the build at the end?",
        a: "You do. The handover pack is designed so you can keep running it yourself or take it to another developer — repo, credentials, prompts, run-book, dependency list.",
      },
    ],
  },
  {
    slug: "ai-automation-vs-workflow-automation",
    optionAName: "AI automation",
    optionBName: "Workflow automation",
    h1: "AI automation vs workflow automation",
    metaTitle: "AI Automation vs Workflow Automation · Engine Labs",
    metaDescription:
      "AI automation vs workflow automation — what is the difference, when do you need each, and how Engine Labs Engines combine both. Neutral, factual comparison with no buyer pressure.",
    summary:
      "AI automation uses a model to draft, classify, summarise or route content; workflow automation uses connector logic to move data and trigger actions between tools. Most real business problems need both — the question is which layer carries the weight in your particular workflow.",
    comparisonRows: [
      {
        attribute: "Scope",
        optionA:
          "Drafting, classification, retrieval, summarisation and tone-aware writing by an AI model.",
        optionB:
          "Trigger-action connector logic that moves data and fires events between SaaS tools.",
      },
      {
        attribute: "Output",
        optionA:
          "A drafted reply, a tagged ticket, a summary, a citation, a confidence-scored extraction.",
        optionB:
          "A row created in another tool, a Slack message posted, an email sent, a record updated.",
      },
      {
        attribute: "Pricing model",
        optionA:
          "Build-once plus model API usage that scales with volume.",
        optionB:
          "Build-once plus connector tool subscription (Zapier, Make, n8n) — usually flat per zap or per task.",
      },
      {
        attribute: "Timeline",
        optionA:
          "Longer build; needs prompt design, ingestion pipelines and a review queue.",
        optionB:
          "Faster build for pure trigger-action work; minutes to hours per zap once the tools are connected.",
      },
      {
        attribute: "Best for",
        optionA:
          "Replies, summaries, knowledge questions, ticket triage, supplier-paperwork extraction — anywhere a draft or classification is part of the output.",
        optionB:
          "Moving data between tools, sending reminders on a schedule, posting status updates, gating approvals on simple rules.",
      },
      {
        attribute: "Limitations",
        optionA:
          "Needs a human-review step for anything customer-facing; outputs are drafts, not decisions.",
        optionB:
          "Limited to the connector vocabulary of the platform; no model judgement unless an AI step is added.",
      },
    ],
    whenOptionAWins: {
      heading: "When AI automation carries the weight",
      body: "If the deliverable is a reply, a summary, a cited answer, a tagged ticket, an extracted invoice or a personalised draft — work that needs language or classification — AI is the right layer. Engine Labs ships these as the Sales, Support, Insight, Knowledge, Back-office and Outreach Engines, each with a human-review gate built in.",
    },
    whenOptionBWins: {
      heading: "When workflow automation carries the weight",
      body: "If the deliverable is data moving between tools on a trigger — a row created, a Slack message posted, a reminder fired, an approval routed — connector-based workflow automation is the right layer. Engine Labs ships these as the Ops Engine and as the connector layer underneath every other Engine.",
    },
    faqs: [
      {
        q: "Do I need both AI automation and workflow automation?",
        a: "Usually, yes. Most Engines combine both: AI for drafting and classification, workflow logic for routing, scheduling and connector actions. The Control Centre will recommend the right combination based on your brief.",
      },
      {
        q: "Is AI automation more expensive than workflow automation?",
        a: "Usually higher build cost because it needs prompt design, ingestion pipelines and a review queue, and ongoing model API usage scales with volume. Workflow automation tends to be flatter on price but limited to connector vocabulary.",
      },
      {
        q: "Which Engine Labs Engine is which?",
        a: "Workflow-heavy: the Ops Engine, parts of the Back-office Engine, parts of the Outreach Engine (sending and throttling). AI-heavy: the Sales, Support, Insight, Founder, Knowledge and Outreach Engines (drafting). The Engines mix both layers — the labelling here is which one carries the weight.",
      },
    ],
  },
];

export function comparePageBySlug(slug: string): ComparePage | undefined {
  return COMPARE_PAGES.find((c) => c.slug === slug);
}
