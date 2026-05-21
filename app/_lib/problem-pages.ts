import type { EngineSlug } from "@/app/_lib/engines";

/**
 * Data definitions for the eight problem-led landing pages.
 *
 * Each problem page is a query-targeted route (e.g. /ai-lead-response-automation)
 * that mirrors an Engine in the catalog. The page renders from this data so
 * the eight pages aren't hand-coded duplicates.
 *
 * Hard rules: only restate facts already true elsewhere in the codebase
 * (engines.ts, content/engines/*.mdx, _lib/faq.tsx). Never invent
 * capabilities or integrations the site doesn't already mention.
 */

export type ProblemPageFaq = {
  q: string;
  a: string;
};

export type ProblemPage = {
  /** URL slug under /app — the route path is `/${slug}`. */
  slug: string;
  /** Engine in the catalog this page maps to. */
  engineSlug: EngineSlug;
  /** Display name of the mapped Engine (kept here to avoid a runtime lookup). */
  engineName: string;
  /** Short topic phrase used inside the body, e.g. "AI lead response automation". */
  topic: string;
  /** H1 — search-intent phrase. */
  h1: string;
  /** Meta title (<=60 chars including " · Engine Labs"). */
  metaTitle: string;
  /** Meta description 150–160 chars — mirrors the on-page summary. */
  metaDescription: string;
  /** 2–3 sentence direct summary directly under the H1. */
  summary: string;
  /** Plain-language body for "What is {topic}?". */
  whatIsIt: string;
  /** Who buys this — short. */
  whoIsItFor: string;
  /** What it replaces — short. */
  whatItReplaces: string;
  /** Inputs the system needs — short paragraph or sentence-list. */
  inputs: string[];
  /** Outputs the system produces. */
  outputs: string[];
  /**
   * Integration list pulled from the matching `content/engines/*.mdx` spec
   * (the verbatim spec list — these names are already public on the site).
   */
  integrations: string;
  /**
   * One or two exclusions to quote from /what-we-dont-do. Short.
   */
  exclusions: string[];
  /** "How Engine Labs builds it" prose. */
  buildProcess: string;
  /** 3–5 FAQ pairs answerable from existing site content. */
  faqs: ProblemPageFaq[];
};

export const PROBLEM_PAGES: ProblemPage[] = [
  {
    slug: "ai-lead-response-automation",
    engineSlug: "sales",
    engineName: "Sales Engine",
    topic: "AI lead response automation",
    h1: "AI lead response automation",
    metaTitle: "AI Lead Response Automation · Engine Labs",
    metaDescription:
      "AI lead response automation for small businesses, agencies and founder-led teams. Inbound enquiries caught, qualified and drafted for one-click send by the Sales Engine.",
    summary:
      "AI lead response automation is the workflow that catches an inbound enquiry, qualifies it against your rules, and drops a personalised draft reply into your inbox for one-click send. Engine Labs ships this as the Sales Engine — a productised AI build with a published spec sheet and an AUD price band.",
    whatIsIt:
      "AI lead response automation reads inbound leads from your website form, email, marketplace messages and referral channels; scores them against your qualification rules; writes a draft first reply in your tone; and queues the draft for a human to send. It is not auto-send: every customer-facing message sits as a draft until you click send.",
    whoIsItFor:
      "Trades, recruiters, coaches and consultants who lose jobs to whoever rang back first. Anyone whose website form is the front door of their pipeline and whose response time directly affects close rate.",
    whatItReplaces:
      "A junior sales development representative or inbound coordinator copy-pasting between a contact form, an inbox, a CRM and a calendar.",
    inputs: [
      "Inbound leads from your website form, email, DMs, marketplace messages or referrals.",
      "Your existing CRM, calendar and product or pricing reference material.",
      "The qualification rules you already use — budget, fit, urgency, role.",
    ],
    outputs: [
      "Qualified, scored, tagged lead records in your CRM with notes and a next-action.",
      "Draft personalised replies waiting in your inbox for one-click send.",
      "A weekly digest of pipeline health, sources, drop-off and follow-ups due.",
    ],
    integrations:
      "HubSpot, Pipedrive, Attio, Notion, Airtable, Google Sheets, Gmail, Outlook, Calendly, Cal.com, Slack, Typeform, Tally, Webflow forms, Stripe (for paid-intent signals).",
    exclusions: [
      "Outbound cold sequences — see the Outreach Engine, which requires consent gating.",
      "Outcome guarantees on lead volume, conversion rate or response time.",
    ],
    buildProcess:
      "Brief, scope, build, acceptance, handover. Weekly checkpoints. The Sales Engine is delivered as your repo, your prompts, your run-book and your dependency list — all yours to keep.",
    faqs: [
      {
        q: "Will the AI send replies to leads on my behalf?",
        a: "No. Every customer-facing reply sits in your inbox as a draft until you click send. Internal classification, scoring and routing can run unattended, but the send action is always a human.",
      },
      {
        q: "How much does AI lead response automation cost?",
        a: "The Sales Engine price band runs from A$650 to A$5,500 AUD, GST exclusive unless stated. Basic is single-channel intake on a single CRM; Premium covers multi-channel with multi-rule scoring, enrichment and a documented prompt library. Scoped in the Control Centre.",
      },
      {
        q: "What CRMs and inbox tools does it integrate with?",
        a: "HubSpot, Pipedrive, Attio, Notion, Airtable and Google Sheets on the CRM side; Gmail and Outlook for inbox; Calendly and Cal.com for scheduling; Slack for alerts; Typeform, Tally and Webflow forms for intake. Stack listed in the Sales Engine spec sheet.",
      },
      {
        q: "How long does it take to ship?",
        a: "One to three weeks depending on tier and integration count. The Control Centre will give you a calendar-week range based on the brief.",
      },
    ],
  },
  {
    slug: "ai-support-ticket-triage",
    engineSlug: "support",
    engineName: "Support Engine",
    topic: "AI support ticket triage",
    h1: "AI support ticket triage",
    metaTitle: "AI Support Ticket Triage · Engine Labs",
    metaDescription:
      "AI support ticket triage for e-commerce and service businesses. Every ticket auto-tagged, prioritised, drafted in your tone and queued for one-click send by the Support Engine.",
    summary:
      "AI support ticket triage reads every incoming support message, drafts the reply in your tone with the right policy or order details cited, tags and prioritises the ticket, and queues the draft for a human to send. Engine Labs ships this as the Support Engine.",
    whatIsIt:
      "AI support ticket triage retires the tier-one inbox job: reading the ticket, looking up the answer in your help docs or past tickets, writing the reply, tagging the category, and prioritising urgency. The Support Engine drafts everything; a human still sends.",
    whoIsItFor:
      "E-commerce stores, coaches and course creators whose support inbox is the bottleneck. Teams where the same six issue categories repeat weekly and senior staff are pulled in to firefight.",
    whatItReplaces:
      "Tier-one support: the person who reads the ticket, looks up the answer, writes the reply and tags the issue.",
    inputs: [
      "Your support inbox(es) and channels — email, web chat, social DMs where permitted.",
      "Your help docs, FAQs, refund policy, shipping policy and past resolved tickets.",
      "Your tagging taxonomy and SLA targets.",
    ],
    outputs: [
      "A drafted reply for every ticket, in your tone, with facts cited from your docs.",
      "Auto-tagged and prioritised tickets, with urgency and category set.",
      "A weekly summary of top issue categories, repeat offenders and missing docs.",
    ],
    integrations:
      "Zendesk, Intercom, Help Scout, Front, Freshdesk, Gmail, Outlook, Notion, Google Docs, Confluence, your own help centre, Slack (for handover alerts).",
    exclusions: [
      "Auto-sending of replies to customers — drafts only by default.",
      "Refunds, credits, account-status changes or any action with money or access consequences.",
    ],
    buildProcess:
      "Brief, scope, build, acceptance, handover. Two to four weeks depending on doc volume and inbox count. You keep the repo, the prompts and the run-book.",
    faqs: [
      {
        q: "Does the Support Engine send replies automatically?",
        a: "No. Every customer-facing reply is a draft. The auto-send gate is non-negotiable and is written into every Statement Of Work. Refunds, credits and account-status changes always require a human.",
      },
      {
        q: "What helpdesk tools does AI support ticket triage integrate with?",
        a: "Zendesk, Intercom, Help Scout, Front and Freshdesk on the helpdesk side; Gmail and Outlook for inbox; Notion, Google Docs, Confluence and your own help centre for source material; Slack for handover alerts.",
      },
      {
        q: "How much does AI support ticket triage cost?",
        a: "The Support Engine price band runs from A$650 to A$4,500 AUD, GST exclusive unless stated. Basic is one inbox with RAG on one doc set; Premium is multi-inbox, multi-doc-set RAG with custom tone training and a summary dashboard.",
      },
      {
        q: "How does the AI know my tone of voice?",
        a: "We train on your past resolved tickets and your help docs. The Premium tier includes explicit tone training. Every reply is a draft you review before sending, so the model learns iteratively.",
      },
    ],
  },
  {
    slug: "ai-operations-workflow-automation",
    engineSlug: "ops",
    engineName: "Ops Engine",
    topic: "AI operations workflow automation",
    h1: "AI operations workflow automation",
    metaTitle: "AI Operations Workflow Automation · Engine Labs",
    metaDescription:
      "AI operations workflow automation for agencies and recruiters. Approvals, status updates, reminders and escalations routed by the Ops Engine — published price bands, scoped in the Control Centre.",
    summary:
      "AI operations workflow automation runs the recurring admin a chief-of-staff would otherwise do: approvals, status updates, reminders and escalations. Engine Labs ships this as the Ops Engine — a productised workflow build with a published spec sheet and an AUD price band.",
    whatIsIt:
      "AI operations workflow automation maps a recurring business process (approvals, onboarding, weekly check-ins, project status, vendor management), wires up the triggers and notifications, and adds named-owner escalation rules so nothing sits silently for a week. The Engine sends, reminds and escalates — it does not approve on anyone's behalf.",
    whoIsItFor:
      "Agencies and recruiters whose senior team's week is half status reports and approvals. Any small business whose ops coordinator role exists mostly to chase.",
    whatItReplaces:
      "An ops coordinator chasing approvals, status updates and reminders across Slack, email, spreadsheets and project tools.",
    inputs: [
      "The recurring processes you already run (approvals, onboarding, weekly check-ins, project status).",
      "Your existing tools and where decisions actually get made.",
      "The escalation rules you wish were followed consistently.",
    ],
    outputs: [
      "Automated routing and reminder cycles for any approval or recurring task.",
      "Auto-generated status updates posted to the channel your team actually reads.",
      "Escalations triggered by clear rules — nothing sits silently for a week.",
    ],
    integrations:
      "Slack, Microsoft Teams, Notion, Asana, ClickUp, Linear, Monday, Trello, Google Workspace, Airtable, Zapier, Make, n8n.",
    exclusions: [
      "Org-wide change management or process consulting.",
      "Mission-critical workflows where a missed step has legal, safety or financial consequence — these need specialist review per Addendum §5.",
    ],
    buildProcess:
      "Brief, scope, build, acceptance, handover. Two to four weeks depending on workflow count and integration depth. The handover pack includes a run-book so your team can pause, edit or trigger workflows themselves.",
    faqs: [
      {
        q: "What workflows can the Ops Engine actually run?",
        a: "Recurring admin — approvals, onboarding, weekly check-ins, project status, vendor management, reminder cycles. The Engine handles trigger logic (time-based, event-based, conditional), notifications and named-owner escalation. It does not approve anything on a human's behalf.",
      },
      {
        q: "Does AI operations workflow automation replace my project tool?",
        a: "No. The Ops Engine sits on top of the tools you already use — Slack, Notion, Asana, ClickUp, Linear, Monday, Trello, Google Workspace, Airtable, Zapier, Make, n8n. You keep your tool of choice; the Engine wires the routing and reminders.",
      },
      {
        q: "How much does it cost?",
        a: "The Ops Engine price band runs from A$650 to A$5,500 AUD, GST exclusive unless stated. Basic is one workflow on one tool; Premium covers up to six workflows across multiple tools with a documented run-book.",
      },
      {
        q: "What about sensitive routing like terminations or large refunds?",
        a: "Excluded from auto-routing by default. Sensitive routing requires explicit human sign-off and is called out in the SOW. The Engine sends and reminds; humans approve.",
      },
    ],
  },
  {
    slug: "ai-reporting-dashboard-automation",
    engineSlug: "insight",
    engineName: "Insight Engine",
    topic: "AI reporting dashboard automation",
    h1: "AI reporting dashboard automation",
    metaTitle: "AI Reporting Dashboard Automation · Engine Labs",
    metaDescription:
      "AI reporting dashboard automation for agencies, e-commerce and founders. A live dashboard plus a weekly written summary, drafted by the Insight Engine. Published AUD price bands.",
    summary:
      "AI reporting dashboard automation turns your raw data into the meeting you would otherwise have to prepare for: a live dashboard with the metrics that matter and a scheduled written summary in plain English. Engine Labs ships this as the Insight Engine.",
    whatIsIt:
      "AI reporting dashboard automation connects your existing data sources, builds a dashboard with the metrics that drive your decisions, and writes a weekly or monthly summary in plain English that gets posted where your team reads. Optional anomaly alerts fire when a metric moves outside its normal range.",
    whoIsItFor:
      "Agencies, e-commerce operators and founders whose Monday morning is taken by pulling numbers from a handful of tools into a deck. Anyone whose weekly read needs to be a paragraph, not a pivot table.",
    whatItReplaces:
      "A weekly reporting analyst pulling numbers, writing commentary and explaining what changed.",
    inputs: [
      "Your existing data sources (Stripe, Google Analytics, HubSpot, Shopify, Airtable, Sheets, a CSV export, Postgres).",
      "The questions you actually care about each week — not all the metrics, the ones that drive decisions.",
      "The audience for the read (you, your team, your board, your investors).",
    ],
    outputs: [
      "A live dashboard with the metrics that matter and the filters you need.",
      "A scheduled written summary (weekly or monthly) in plain English, sent where your team reads.",
      "Anomaly alerts when a metric moves outside its normal range.",
    ],
    integrations:
      "Stripe, Google Analytics 4, HubSpot, Shopify, Klaviyo, Mailchimp, Airtable, Google Sheets, Notion, Postgres/Supabase, BigQuery, Metabase, Lightdash, Looker Studio, Plausible, Fathom.",
    exclusions: [
      "Data warehouse design or large-scale ETL.",
      "Investor-grade financial modelling or auditing.",
    ],
    buildProcess:
      "Brief, scope, build, acceptance, handover. One to three weeks depending on source count and dashboard complexity. Every metric definition is documented so there is no 'what does this number actually mean' argument later.",
    faqs: [
      {
        q: "Does the Insight Engine make business decisions?",
        a: "No. It summarises and alerts. Every summary is clearly labelled as AI-generated commentary on the underlying numbers; the numbers are the source of truth, the commentary is the read.",
      },
      {
        q: "What does AI reporting dashboard automation cost?",
        a: "The Insight Engine price band runs from A$450 to A$3,500 AUD, GST exclusive unless stated. Basic is a single data source with a static dashboard; Premium covers up to four sources with a full dashboard, AI summary, anomaly alerts and documented metric definitions.",
      },
      {
        q: "Which dashboards and data sources are supported?",
        a: "Stripe, Google Analytics 4, HubSpot, Shopify, Klaviyo, Mailchimp, Airtable, Google Sheets, Notion, Postgres/Supabase, BigQuery on the data side; Metabase, Lightdash and Looker Studio on the dashboard side. Listed in full on the Insight Engine spec sheet.",
      },
      {
        q: "Do you build the dashboard in your tool or mine?",
        a: "Yours. The Insight Engine works in your existing analytics or BI tool of choice — we do not lock you into a proprietary dashboard.",
      },
    ],
  },
  {
    slug: "ai-mvp-prototype-builder",
    engineSlug: "founder",
    engineName: "Founder Engine",
    topic: "AI MVP prototype builder",
    h1: "AI MVP prototype builder",
    metaTitle: "AI MVP Prototype Builder · Engine Labs",
    metaDescription:
      "AI MVP prototype builder for solo founders and pre-seed teams. A clickable prototype, an MVP and a build roadmap in days, not weeks. The Founder Engine, with published AUD bands.",
    summary:
      "AI MVP prototype builder is the workflow that compresses the 'should we even build this' phase from months to days: a clickable prototype, a functional MVP and a written build roadmap. Engine Labs ships this as the Founder Engine.",
    whatIsIt:
      "AI MVP prototype builder takes an idea written in plain English, a 30-minute scoping workshop and the smallest set of features that proves the idea, and returns a clickable prototype, an MVP with one core feature and a lightweight backend, and a build roadmap for the next three milestones. Enough to test with first users or show in an investor meeting.",
    whoIsItFor:
      "Solo founders and pre-seed teams who need to test the idea before they quit, raise or hire. Anyone trying to compress the early product phase without paying for a fractional CTO and a product designer for six weeks.",
    whatItReplaces:
      "A fractional CTO plus a product designer for the first sprint of a startup.",
    inputs: [
      "Your idea, written in plain English (we will help you tighten it).",
      "Any existing brand, design or domain assets.",
      "Whatever you have already built or sketched.",
      "Who you are building for and what they currently do instead.",
    ],
    outputs: [
      "A clickable prototype (5–10 screens) covering the core flow.",
      "A working MVP with auth, one core feature and a lightweight backend.",
      "A written build roadmap covering the next three milestones.",
    ],
    integrations:
      "Figma, Framer, Webflow, Bubble, Lovable, v0, Cursor, Supabase, Firebase, Vercel, Stripe, Postmark, Resend, Clerk, Auth0.",
    exclusions: [
      "App store submission or compliance review, production-scale infrastructure, DevOps or load testing.",
      "Funding strategy, investor introductions or fundraising support, and outcome guarantees on traction or product-market fit.",
    ],
    buildProcess:
      "Brief, scope, build, acceptance, handover. Two to six weeks depending on tier. Starts with a paid 30-minute scoping workshop, credited against the final fee if you proceed. The handover pack includes repo access, deployment notes, prompt and automation documentation, and known limitations.",
    faqs: [
      {
        q: "Is Engine Labs my co-founder?",
        a: "No. Engine Labs builds what is in the scoped Statement Of Work; if the build reveals that the idea should change, that is a Change Request, not a unilateral pivot. You own every product decision.",
      },
      {
        q: "How much does an AI MVP prototype builder engagement cost?",
        a: "The Founder Engine price band runs from A$750 to A$8,500 AUD, GST exclusive unless stated. Basic is a clickable prototype only; Standard is a functional MVP with one core feature and a lightweight backend; Premium is a controlled multi-feature MVP with integrations, auth, payments and a documented roadmap.",
      },
      {
        q: "How fast can a prototype ship?",
        a: "Two to six weeks calendar time, tier-dependent. The Control Centre will give you a band based on the brief.",
      },
      {
        q: "Will you keep building once the MVP ships?",
        a: "Optionally. After handover you choose whether to opt into a Support plan or to take the build to your own developer with the handover pack — the pack is designed for either path.",
      },
    ],
  },
  {
    slug: "ai-internal-knowledge-base-chatbot",
    engineSlug: "knowledge",
    engineName: "Knowledge Engine",
    topic: "AI internal knowledge base chatbot",
    h1: "AI internal knowledge base chatbot",
    metaTitle: "AI Internal Knowledge Base Chatbot · Engine Labs",
    metaDescription:
      "An AI internal knowledge base chatbot built on your own SOPs and docs, with cited answers and access controls. The Knowledge Engine — published AUD bands, scoped in the Control Centre.",
    summary:
      "An AI internal knowledge base chatbot is a private chat that answers your team's 'how do we do X' questions from your own SOPs, docs and past work — so new hires stop interrupting senior staff. Engine Labs ships this as the Knowledge Engine.",
    whatIsIt:
      "An AI internal knowledge base chatbot ingests your internal docs (Notion, Confluence, Drive, SharePoint, PDFs, past project handovers), runs a retrieval pipeline with citations, and exposes a chat interface inside Slack, Teams or a simple web app. Every answer links back to the source doc so trust is verifiable. Access controls align to your existing source-of-truth permissions.",
    whoIsItFor:
      "Agencies, recruiters and coaches whose senior staff have become an internal Slack help desk. Teams where the same six questions get asked weekly because the docs exist but no one can find them.",
    whatItReplaces:
      "Senior staff being a Slack help desk for repeated 'how do we do X' questions.",
    inputs: [
      "Your internal knowledge: Notion, Confluence, Google Drive, SharePoint, PDFs, a wiki, past project handovers, SOPs.",
      "The questions your team actually asks (we pull these from your support inbox or run a workshop).",
      "Who is allowed to see what — access control is mandatory, not optional.",
    ],
    outputs: [
      "A private chat interface for your team (Slack-native, Teams-native or a simple web app).",
      "Cited answers — every reply links back to the source doc.",
      "A weekly 'knowledge gap' report of questions the docs could not answer.",
    ],
    integrations:
      "Notion, Confluence, Google Drive, SharePoint, Dropbox, Slab, Guru, Slack, Microsoft Teams, Linear, GitHub.",
    exclusions: [
      "Public-facing chatbots — internal-only by default; public deployment is a separate scope.",
      "Doc cleanup or rewriting — we tell you what is broken; fixing it is your team's call or a separate engagement.",
    ],
    buildProcess:
      "Brief, scope, build, acceptance, handover. Two to four weeks depending on doc volume and access control complexity. The Engine ships with a re-ingestion run-book so your team can refresh sources on their own schedule.",
    faqs: [
      {
        q: "Will my docs be used to train an AI model?",
        a: "No. We use third-party model APIs in inference mode only, and we select providers whose terms exclude prompt content from training (Addendum §3).",
      },
      {
        q: "How does access control work?",
        a: "The Knowledge Engine aligns to your existing source-of-truth permissions. A user only sees answers based on docs they would already have access to in Notion, Confluence, Drive or SharePoint. Access controls are mandatory, not optional.",
      },
      {
        q: "How much does an AI internal knowledge base chatbot cost?",
        a: "The Knowledge Engine price band runs from A$650 to A$4,500 AUD, GST exclusive unless stated. Basic is one doc source over web chat; Premium covers multi-source ingestion with access controls, a custom chat UI and full reporting.",
      },
      {
        q: "Can it be made public-facing for customers?",
        a: "Internal-only by default. Public deployment is a separate scope with different risk and is quoted separately.",
      },
    ],
  },
  {
    slug: "ai-back-office-automation",
    engineSlug: "back-office",
    engineName: "Back-office Engine",
    topic: "AI back-office automation",
    h1: "AI back-office automation",
    metaTitle: "AI Back-Office Automation · Engine Labs",
    metaDescription:
      "AI back-office automation for trades and e-commerce. Invoices, receipts and supplier docs read, extracted and drafted for your bookkeeper by the Back-office Engine.",
    summary:
      "AI back-office automation reads your invoices, receipts and supplier docs, extracts the data, and drafts the records cleanly in the system your bookkeeper actually uses. Engine Labs ships this as the Back-office Engine. We do not give bookkeeping, tax or accounting advice.",
    whatIsIt:
      "AI back-office automation retires the data-entry half of bookkeeping: opening a PDF, reading the vendor, date and amount, typing it into your accounting tool, attaching the file and tagging the category. The Back-office Engine does the reading and typing; a human still reviews. Records below the confidence threshold are flagged automatically. The Engine never moves money.",
    whoIsItFor:
      "Trades and e-commerce operators whose Friday is supplier paperwork. Anyone whose bookkeeper would happily get rid of the data entry but not the review step.",
    whatItReplaces:
      "The data-entry half of bookkeeping.",
    inputs: [
      "Invoices, receipts, supplier statements, purchase orders and expense reports (PDF, image, email).",
      "Where they currently arrive (an email inbox, a Dropbox folder, a Drive folder, scanned uploads).",
      "Your chart of accounts and category tags.",
    ],
    outputs: [
      "Extracted structured data: vendor, date, amount, GST, line items, category guess.",
      "A draft record in your accounting tool (or a clean CSV ready to import), with the original file attached.",
      "A weekly summary of what was processed, what is flagged and what needs human attention.",
    ],
    integrations:
      "Xero, QuickBooks Online, MYOB, Wave, Zoho Books, Hubdoc, Dext, Google Drive, Dropbox, Gmail, Outlook, Airtable, Google Sheets.",
    exclusions: [
      "Bookkeeping, tax, BAS, GST, financial or accounting advice — this Engine extracts data; your accountant reviews and decides.",
      "Auto-posting of records to your accounting system without human review, and any action that moves money.",
    ],
    buildProcess:
      "Brief, scope, build, acceptance, handover. Two to four weeks depending on document variety and accounting tool integration. The handover pack includes accuracy benchmarks at the Premium tier.",
    faqs: [
      {
        q: "Does this give me bookkeeping or tax advice?",
        a: "No. The Back-office Engine extracts and drafts; your accountant or bookkeeper reviews and decides. This is explicit in the MSA §3 and re-stated in every Back-office SOW.",
      },
      {
        q: "What accounting tools does AI back-office automation integrate with?",
        a: "Xero, QuickBooks Online, MYOB, Wave and Zoho Books on the accounting side; Hubdoc and Dext for receipt capture; Google Drive, Dropbox, Gmail and Outlook for intake; Airtable and Google Sheets for staging.",
      },
      {
        q: "How much does it cost?",
        a: "The Back-office Engine price band runs from A$650 to A$3,500 AUD, GST exclusive unless stated. Basic is one source and one document type with CSV output; Premium covers multi-source with full flagging, a weekly summary and accuracy benchmarks.",
      },
      {
        q: "Can it pay invoices automatically?",
        a: "No. The Engine never moves money. Extraction and drafting only; a human approves, edits or rejects every record before anything is posted.",
      },
    ],
  },
  {
    slug: "ai-outreach-drafting-assistant",
    engineSlug: "outreach",
    engineName: "Outreach Engine",
    topic: "AI outreach drafting assistant",
    h1: "AI outreach drafting assistant",
    metaTitle: "AI Outreach Drafting Assistant · Engine Labs",
    metaDescription:
      "AI outreach drafting assistant for your existing contacts — past customers, opted-in subscribers, warm referrals. The Outreach Engine. Not cold outreach. Published AUD bands.",
    summary:
      "An AI outreach drafting assistant writes personalised messages to people you already have permission to contact — past customers, opted-in subscribers, warm referrals. Engine Labs ships this as the Outreach Engine. Cold lists, scraped contacts and unconsented data are out of scope and non-negotiable.",
    whatIsIt:
      "An AI outreach drafting assistant takes your permissioned contact list, the thing you want to say (re-engagement, new product, event, check-in, referral ask), and your tone and brand voice, and produces personalised draft messages per recipient on a throttled sending schedule. Replies route to a human, never back into the bot. Unsubscribes are honoured immediately.",
    whoIsItFor:
      "Coaches, consultants, course creators and agencies with an opted-in list or a CRM full of past customers. Anyone who needs personalised follow-up at scale without writing every message by hand.",
    whatItReplaces:
      "The hours a small business owner spends writing personalised re-engagement, follow-up, win-back, upsell or referral messages.",
    inputs: [
      "Your permissioned contact list (CRM exports, past customer database, opted-in newsletter list, event attendees who consented).",
      "The thing you want to say (re-engagement, new product, event, check-in, feedback ask, referral ask).",
      "Your tone, brand voice, signoff and any examples of past messages that worked.",
    ],
    outputs: [
      "Personalised draft messages per recipient with the relevant context pulled in.",
      "A throttled sending schedule (no batch-blast) with unsubscribe handling per ACMA spam rules.",
      "A reply-triage hookup so responses route to a human.",
    ],
    integrations:
      "HubSpot, Pipedrive, Attio, Mailchimp, Klaviyo, ActiveCampaign, ConvertKit, Customer.io, Postmark, Resend, Gmail (with proper SPF/DKIM), Outlook, SMS providers (Twilio, MessageBird) where consent permits.",
    exclusions: [
      "Cold outreach — if you cannot demonstrate consent or a pre-existing business relationship, Engine Labs will decline the build.",
      "Scraping — no contact data from LinkedIn, restricted platforms, purchased lists or aggregators where the source breaches platform terms.",
    ],
    buildProcess:
      "Brief, scope, build, acceptance, handover. Two to four weeks including the consent and permission verification phase. The first batch in any campaign is reviewed manually before the rest sends.",
    faqs: [
      {
        q: "Will Engine Labs do cold outreach for me?",
        a: "No. The Outreach Engine only works on lists where you can demonstrate consent or an existing business relationship. No scraping, no purchased lists, no harvested contacts. The Control Centre will decline a cold-outreach brief and explain why.",
      },
      {
        q: "Why is the starting price higher than other Engines?",
        a: "Because compliance setup and consent verification are mandatory and non-trivial. The Outreach Engine price band runs from A$1,350 to A$4,500 AUD, GST exclusive unless stated.",
      },
      {
        q: "What outreach tools does the AI outreach drafting assistant integrate with?",
        a: "HubSpot, Pipedrive and Attio on the CRM side; Mailchimp, Klaviyo, ActiveCampaign, ConvertKit and Customer.io for ESP; Postmark and Resend for transactional; Gmail and Outlook for direct send; Twilio and MessageBird for SMS where consent permits.",
      },
      {
        q: "Are messages sent automatically?",
        a: "Throttled and reviewed. The first batch in any campaign is reviewed manually before the rest sends; sending can be paused at any time; replies always go to a human, never back into the model.",
      },
    ],
  },
];

export function problemPageBySlug(slug: string): ProblemPage | undefined {
  return PROBLEM_PAGES.find((p) => p.slug === slug);
}
