/**
 * Engine + Vertical roster.
 * Single source of truth derived from docs/CONSISTENCY.md §III + §IV.
 * Do not invent, rename, recombine or split entries here without updating
 * CONSISTENCY.md first.
 */

export type EngineSlug =
  | "sales"
  | "ops"
  | "support"
  | "insight"
  | "founder"
  | "knowledge"
  | "back-office"
  | "outreach";

export type StackTier =
  | "Workflow Automation"
  | "AI Agent"
  | "Internal Tools"
  | "Business Dashboard"
  | "Startup MVP"
  | "AI Prototype";

export type VerticalSlug =
  | "founders"
  | "agencies"
  | "trades"
  | "ecommerce"
  | "recruiters"
  | "coaches";

export type Tier = {
  name: string;
  price: number;
  blurb: string;
};

export type Engine = {
  slug: EngineSlug;
  number: number;
  name: string;
  oneLiner: string;
  homeOneLiner: string;
  replaces: string;
  priceFrom: number;
  priceTo: number;
  timeline: string;
  stackTiers: StackTier[];
  related: EngineSlug[];
  verticals: VerticalSlug[];
  tiers: Tier[];
  priceNote?: string;
};

export const ENGINES: Engine[] = [
  {
    slug: "sales",
    number: 1,
    name: "Sales Engine",
    oneLiner:
      "An AI agent that catches every inbound lead, qualifies it, and hands you a warm conversation instead of a cold inbox.",
    homeOneLiner:
      "Catch every inbound lead, qualify it, hand you a warm conversation.",
    replaces:
      "A junior sales development representative or inbound coordinator.",
    priceFrom: 650,
    priceTo: 5500,
    timeline: "1–3 weeks",
    stackTiers: ["AI Agent", "Workflow Automation"],
    related: ["ops", "outreach", "insight"],
    verticals: ["trades", "recruiters", "coaches"],
    tiers: [
      { name: "Basic", price: 650, blurb: "single-channel intake, single CRM, draft replies, one alert rule" },
      { name: "Standard", price: 1800, blurb: "multi-channel, scoring rules, weekly digest, two integrations" },
      { name: "Premium", price: 5500, blurb: "multi-channel, multi-rule scoring, enrichment, full digest, three+ integrations, documented prompt library" },
    ],
  },
  {
    slug: "ops",
    number: 2,
    name: "Ops Engine",
    oneLiner:
      "A workflow that runs the recurring admin a chief-of-staff would otherwise do: approvals, status updates, reminders, escalations.",
    homeOneLiner:
      "Run the recurring admin a chief-of-staff would otherwise do.",
    replaces:
      "An ops coordinator chasing approvals, status updates and reminders.",
    priceFrom: 650,
    priceTo: 5500,
    timeline: "2–4 weeks",
    stackTiers: ["Workflow Automation", "Internal Tools"],
    related: ["sales", "knowledge", "insight"],
    verticals: ["agencies", "recruiters"],
    tiers: [
      { name: "Basic", price: 650, blurb: "one workflow, one tool, simple triggers" },
      { name: "Standard", price: 2200, blurb: "up to 3 workflows, 2 tools, escalation rules" },
      { name: "Premium", price: 5500, blurb: "up to 6 workflows, multiple tools, admin view, documented run-book" },
    ],
  },
  {
    slug: "support",
    number: 3,
    name: "Support Engine",
    oneLiner:
      "A triage agent that reads every incoming support message, drafts the reply, and queues it for your one-click send.",
    homeOneLiner:
      "Read every ticket, draft the reply, queue it for your one-click send.",
    replaces: "A tier-1 support inbox jockey.",
    priceFrom: 650,
    priceTo: 4500,
    timeline: "2–4 weeks",
    stackTiers: ["AI Agent", "Workflow Automation"],
    related: ["knowledge", "insight", "ops"],
    verticals: ["ecommerce", "coaches"],
    tiers: [
      { name: "Basic", price: 650, blurb: "one inbox, RAG on one doc set, draft + tag" },
      { name: "Standard", price: 1800, blurb: "two inboxes, prioritisation rules, weekly summary" },
      { name: "Premium", price: 4500, blurb: "multi-inbox, multi-doc-set RAG, custom tone training, full summary dashboard" },
    ],
  },
  {
    slug: "insight",
    number: 4,
    name: "Insight Engine",
    oneLiner:
      "A dashboard and weekly written summary that turns your raw data into the meeting you'd otherwise have to prepare for.",
    homeOneLiner:
      "A dashboard and a weekly written summary that prepares your Monday meeting for you.",
    replaces: "A weekly reporting analyst.",
    priceFrom: 450,
    priceTo: 3500,
    timeline: "1–3 weeks",
    stackTiers: ["Business Dashboard", "AI Agent"],
    related: ["ops", "support", "sales"],
    verticals: ["agencies", "ecommerce", "founders"],
    tiers: [
      { name: "Basic", price: 450, blurb: "single data source, static dashboard, no AI summary" },
      { name: "Standard", price: 1200, blurb: "up to 3 sources, filterable dashboard, weekly AI summary" },
      { name: "Premium", price: 3500, blurb: "up to 4 sources, full dashboard, AI summary, anomaly alerts, metric documentation" },
    ],
  },
  {
    slug: "founder",
    number: 5,
    name: "Founder Engine",
    oneLiner:
      "An MVP, a clickable prototype and a build roadmap — enough to test the idea, show investors, and know what to build next.",
    homeOneLiner:
      "A clickable prototype, an MVP and a build roadmap in days, not weeks.",
    replaces:
      "A fractional CTO plus a product designer for the first sprint.",
    priceFrom: 750,
    priceTo: 8500,
    timeline: "2–6 weeks",
    stackTiers: ["Startup MVP"],
    related: ["insight", "knowledge", "sales"],
    verticals: ["founders"],
    tiers: [
      { name: "Basic", price: 750, blurb: "clickable prototype only" },
      { name: "Standard", price: 3500, blurb: "functional MVP with one core feature + lightweight backend" },
      { name: "Premium", price: 8500, blurb: "controlled multi-feature MVP with integrations, auth, payments and a documented roadmap" },
    ],
  },
  {
    slug: "knowledge",
    number: 6,
    name: "Knowledge Engine",
    oneLiner:
      "A private chat that answers your team's \u201chow do we do X\u201d questions from your own SOPs, docs and past work — so new hires stop interrupting senior staff.",
    homeOneLiner:
      "A private chat that answers your team's \u201chow do we do X\u201d from your own docs.",
    replaces: "Senior staff being a Slack help desk.",
    priceFrom: 650,
    priceTo: 4500,
    timeline: "2–4 weeks",
    stackTiers: ["AI Agent", "Internal Tools"],
    related: ["support", "ops", "insight"],
    verticals: ["agencies", "recruiters", "coaches"],
    tiers: [
      { name: "Basic", price: 650, blurb: "one doc source, web chat, no integrations" },
      { name: "Standard", price: 1800, blurb: "two doc sources, Slack/Teams integration, citations, weekly gap report" },
      { name: "Premium", price: 4500, blurb: "multi-source, access controls, custom chat UI, full reporting" },
    ],
  },
  {
    slug: "back-office",
    number: 7,
    name: "Back-office Engine",
    oneLiner:
      "A workflow that reads your invoices, receipts and supplier docs, extracts the data, and drops it cleanly into the system your bookkeeper actually uses.",
    homeOneLiner:
      "Read your invoices, receipts and supplier docs and draft the records for your bookkeeper to review.",
    replaces: "The data-entry half of bookkeeping.",
    priceFrom: 650,
    priceTo: 3500,
    timeline: "2–4 weeks",
    stackTiers: ["AI Prototype", "Workflow Automation"],
    related: ["ops", "insight", "support"],
    verticals: ["trades", "ecommerce"],
    tiers: [
      { name: "Basic", price: 650, blurb: "one source, one document type, CSV output" },
      { name: "Standard", price: 1800, blurb: "two sources, multiple doc types, draft records in your tool" },
      { name: "Premium", price: 3500, blurb: "multi-source, full flagging, weekly summary, accuracy benchmarks" },
    ],
  },
  {
    slug: "outreach",
    number: 8,
    name: "Outreach Engine",
    oneLiner:
      "A drafting assistant for outreach to your existing contacts — past customers, opted-in subscribers, warm referrals. Not cold lists.",
    homeOneLiner:
      "Draft personalised messages to people you already have permission to contact.",
    replaces: "Manual follow-up and win-back outreach.",
    priceFrom: 1350,
    priceTo: 4500,
    timeline: "2–4 weeks",
    stackTiers: ["AI Agent", "Workflow Automation"],
    related: ["sales", "knowledge", "insight"],
    verticals: ["coaches", "agencies"],
    priceNote:
      "Higher starting price because compliance setup and consent verification is mandatory.",
    tiers: [
      { name: "Standard", price: 1350, blurb: "single channel, single segment, draft + throttled send" },
      { name: "Standard+", price: 2800, blurb: "multi-segment, reply routing, weekly performance summary" },
      { name: "Premium", price: 4500, blurb: "multi-channel (email + SMS where permitted), full personalisation engine, compliance dashboard" },
    ],
  },
];

export function engineBySlug(slug: string): Engine | undefined {
  return ENGINES.find((e) => e.slug === slug);
}

export type Vertical = {
  slug: VerticalSlug;
  shortName: string;
  cardName: string;
  pain: string;
  stack: EngineSlug[];
  hookLine: string;
  exampleBrief: string;
  hero: {
    eyebrow: string;
    h1: string;
    subhead: string;
  };
  caveat?: string;
  metaTitle: string;
  metaDescription: string;
};

export const VERTICALS: Vertical[] = [
  {
    slug: "founders",
    shortName: "founders",
    cardName: "For solo founders & pre-seed teams",
    pain: "I need to test the idea before I quit my job or raise a round.",
    stack: ["founder", "insight", "knowledge"],
    hookLine:
      "Ship a clickable prototype in two weeks. Find out if your idea has legs before you spend six months on it.",
    exampleBrief:
      "I want to test a marketplace idea — two-sided, simple booking flow, payments, no admin app yet. Need something I can show in investor meetings next month.",
    hero: {
      eyebrow: "Built for solo founders & pre-seed teams",
      h1: "Ship a prototype in two weeks. Find out if your idea has legs.",
      subhead:
        "Engine Labs builds prototypes, MVPs and roadmaps for founders who need to test before they quit, raise or hire. We're not a co-founder. We compress the \u201cshould we even build this\u201d phase from months to weeks.",
    },
    metaTitle: "Engine Labs for solo founders and pre-seed teams",
    metaDescription:
      "Ship a prototype in two weeks. Find out if the idea has legs before you raise. From A$750 AUD.",
  },
  {
    slug: "agencies",
    shortName: "agencies",
    cardName: "For small marketing & creative agencies",
    pain:
      "Half my senior team's week is status reports, approvals and \u201cwhere's that file?\u201d",
    stack: ["ops", "insight", "knowledge"],
    hookLine:
      "Give your senior team back the hours they spend on status reports, approvals and \u201cwhere's that file?\u201d messages.",
    exampleBrief:
      "Project status reports for 12 retainer clients eat my Friday. I want a weekly summary auto-generated from our project tool that I can review and send.",
    hero: {
      eyebrow: "Built for marketing & creative agencies",
      h1: "Give your senior team back the hours they spend on status reports and approvals.",
      subhead:
        "Engine Labs builds Ops, Insight and Knowledge Engines for small agencies. Recurring admin, automated. Weekly client reads, drafted from real data. Junior questions, answered without interrupting senior staff.",
    },
    metaTitle: "Engine Labs for marketing and creative agencies",
    metaDescription:
      "Status reports, approvals and reporting, automated. Give senior staff their week back. From A$650 AUD.",
  },
  {
    slug: "trades",
    shortName: "trades",
    cardName: "For trades & service businesses",
    pain:
      "My phone rings while I'm on the tools. I lose jobs to whoever rang back first.",
    stack: ["sales", "support", "back-office"],
    hookLine:
      "Stop losing jobs to whoever rang back first. Catch every lead, qualify it, and send a same-hour draft reply.",
    exampleBrief:
      "I'm a plumber. I get 10\u201320 enquiries a week from my website and Google. I want every one of them captured, qualified, and a draft quote-or-callback message ready in my phone within an hour.",
    hero: {
      eyebrow: "Built for trades & service businesses",
      h1: "Stop losing jobs to whoever rang back first.",
      subhead:
        "Engine Labs builds inbound Engines for plumbers, sparkies, landscapers, cleaners, removalists, builders, etc. We catch every enquiry, qualify it, and put a same-hour draft reply in your phone — even when you're on the tools.",
    },
    metaTitle: "Engine Labs for trades and service businesses",
    metaDescription:
      "Catch every enquiry. Qualify it. Draft the reply to your phone. Stop losing jobs to whoever rang back first.",
  },
  {
    slug: "ecommerce",
    shortName: "e-commerce",
    cardName: "For e-commerce & direct-to-consumer",
    pain: "Support inbox is the bottleneck. Reporting takes me a full Monday.",
    stack: ["support", "insight", "back-office"],
    hookLine:
      "A support inbox that drafts every reply. A weekly read of your numbers that writes itself. Supplier paperwork that types itself.",
    exampleBrief:
      "Shopify store, 200\u2013400 orders/week. Support inbox is overwhelming. I want every ticket auto-tagged, prioritised, and drafted with the right policy or order details.",
    hero: {
      eyebrow: "Built for e-commerce & direct-to-consumer stores",
      h1: "A support inbox that drafts every reply. A weekly read of your numbers that writes itself.",
      subhead:
        "Engine Labs builds Support, Insight and Back-office Engines for stores running on Shopify, WooCommerce, BigCommerce and Stripe. Drafted replies. Weekly written reads. Supplier paperwork retired.",
    },
    metaTitle: "Engine Labs for e-commerce and direct-to-consumer stores",
    metaDescription:
      "Support inbox that drafts every reply. Weekly written read of your numbers. Supplier paperwork retired.",
  },
  {
    slug: "recruiters",
    shortName: "recruiters",
    cardName: "For recruiters & staffing",
    pain: "Actual recruiting is 20% of my week. The rest is admin.",
    stack: ["sales", "ops", "knowledge"],
    hookLine:
      "Get out of the inbox. Let the Engine catch, qualify, schedule and remind. You do the conversations that matter.",
    exampleBrief:
      "Two-person recruiting agency, ~30 active roles. I want inbound CVs auto-screened against role briefs, candidates ranked, and shortlists drafted in my ATS.",
    hero: {
      eyebrow: "Built for recruiters & staffing",
      h1: "Get out of the inbox. Let the Engine catch, qualify, schedule and remind.",
      subhead:
        "Engine Labs builds Sales, Ops and Knowledge Engines for two-to-ten-person recruiting teams. Inbound CV intake, scheduling and follow-up — all drafted, ranked and prepared. You do the conversations that matter.",
    },
    caveat:
      "The Engines draft, rank and prepare. Humans decide. We won't build an auto-reject Engine — that's regulated employment decision-making (Addendum §5).",
    metaTitle: "Engine Labs for recruiters and staffing",
    metaDescription:
      "Inbound CV intake, scheduling and follow-up. The Engines prepare. Humans decide. From A$650 AUD.",
  },
  {
    slug: "coaches",
    shortName: "coaches",
    cardName: "For coaches, consultants & course creators",
    pain: "Enquiry to onboarded is all me, all manual.",
    stack: ["sales", "knowledge", "outreach"],
    hookLine:
      "Your enquiry-to-onboarded journey, on rails. Your IP, made searchable for your clients.",
    exampleBrief:
      "I run a coaching practice. I want a single flow that captures a discovery enquiry, asks pre-call questions, books a call, drafts a proposal afterwards, and onboards them when they say yes.",
    hero: {
      eyebrow: "Built for coaches, consultants & course creators",
      h1: "Your enquiry-to-onboarded journey, on rails. Your IP, searchable for your clients.",
      subhead:
        "Engine Labs builds Sales, Knowledge and Outreach Engines for coaches, consultants and course creators. Enquiry intake, scheduling and proposals — drafted. Your IP — searchable for your clients. No cold outreach.",
    },
    caveat:
      "The Outreach Engine only works on your opted-in list. No cold outreach, no purchased lists, no scraped contacts (R9).",
    metaTitle: "Engine Labs for coaches and course creators",
    metaDescription:
      "Enquiry to onboarded, on rails. Your IP, searchable for your clients. No cold outreach.",
  },
];

export function verticalBySlug(slug: string): Vertical | undefined {
  return VERTICALS.find((v) => v.slug === slug);
}
