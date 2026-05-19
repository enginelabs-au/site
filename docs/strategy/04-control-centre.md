# 04 — Control Centre v1 Feature Spec

## What the Control Centre is

A single AI-powered interface that does two jobs:

1. **Prospect mode** (public, unauthenticated): takes a visitor's plain-English problem, asks clarifying questions, classifies the brief, recommends an Engine, drafts a SOW, offers next steps.
2. **Client mode** (authenticated, returning clients): a live project portal — status, briefs, SOWs, support tickets, handover docs, and an "Ask the Engine" RAG over the client's own handover docs.

One name, one interface, one mental model. The visitor's first interaction with Engine Labs is using Engine Labs.

## v1 scope

**Both prospect mode and client mode ship in v1.** This is the differentiator and the dogfood; shipping only the prospect side undersells the brand. Tech stack assumptions about how to do this with one operator are in `../build/tech-stack.md`.

## Prospect mode — features

### P1. Brief input
- Single, large, focused input field. Placeholder: *"What's slowing your business down? We'll draft a solution for you."*
- Optional preset prompt chips per vertical, sourced from `03-verticals.md` example briefs. Examples: "I'm a plumber missing leads", "Agency owner drowning in status reports", "Founder needs an MVP for an investor demo".
- Optional file/URL attachments (a Loom link, a screenshot of the problem, a spreadsheet of the manual process).

### P2. Clarifying conversation (3–5 turns max)
- AI agent asks targeted clarifying questions drawn from the Client Intake Questionnaire (Handover Pack §1).
- Hard cap: 5 turns before draft. The point is to qualify, not to interview.
- Questions adapt to brief content. A "I want an MVP" brief gets different questions than "my support inbox is overwhelming."
- The agent does **not** assume scope, price, or feasibility until clarification is complete.

### P3. Classification (silent, server-side)
Every brief is classified across four axes before recommendation:

- **Engine fit**: which of the 8 Engines (one or stacked) best matches.
- **Scope size**: Basic / Standard / Premium / Custom (maps to package tiers).
- **Risk tier**: Green (auto-recommend) / Amber (recommend with conditions) / Red (decline or refer).
- **Data class**: Public / Internal / Personal / Sensitive (mirrors Addendum §2). Sensitive data routes to a human conversation, not auto-quote.

Classification logic and the full system prompt live in `../build/recommender-prompt.md`.

### P4. Recommendation
- A summary of what the agent heard, in the visitor's own framing.
- Recommended Engine(s) with one-line "why this fits".
- Price band (drawn from the Engine spec sheets).
- Typical timeline.
- What the visitor would need to provide.
- Explicit exclusions: what's *not* in this Engine.
- A note if the brief touches a sensitive area, with a human-review escalation path.

### P5. Draft SOW
- A one-page draft Statement of Work generated from the brief, mirroring the SOW Template.
- Sections: Project Snapshot, Business Outcome, Included Deliverables, Exclusions, Milestones, Price, Assumptions.
- Downloadable as PDF.
- Watermarked "Draft — not a binding offer until accepted by Engine Labs."
- Visitor can edit any section inline and re-generate.

### P6. Choose next step
Four clear actions:

- **Save my brief.** Email me a copy. (Captures email; no commitment.)
- **Talk to Cam.** Books a discovery call with the draft SOW pre-attached.
- **Refine this brief.** Goes back into the clarifying loop.
- **This isn't right for me.** Optional feedback capture; no friction to leave.

### P7. Graceful decline (red-tier)
- For out-of-scope briefs (regulated decisions, scraping, mission-critical, mass cold outreach), the agent declines.
- The decline references the relevant policy in plain English: "Engine Labs doesn't build systems that make legal, medical, financial, employment, credit, insurance or safety decisions on behalf of humans."
- It offers either (a) a referral to a more appropriate provider, or (b) a partial scope that *is* in range ("we won't build the decision system, but we can build the admin layer around it").

### P8. Honest "I don't know"
- If the classifier confidence is low, the agent says so and offers a human conversation rather than guessing.
- This is on by default and tuned conservatively. A bad quote is worse than no quote.

## Client mode — features

For clients who have completed a project (or are mid-build). Same UI, signed in.

### C1. Project board
- A row per active or past project.
- Status: Scoping / Building / In Review / Handed Over / Run mode.
- Current milestone and target date.
- Payment state (deposit paid / milestone due / final due / paid).
- Links to the SOW, change requests, and the handover pack.

### C2. Saved briefs
- All past briefs the client has submitted (including ones that never became projects).
- Re-open any brief to refine or re-submit.
- Useful when a client wants to compare "what if we'd added integration X" without losing the original draft.

### C3. SOW + change request log
- Source-of-truth view of the SOW for each active project.
- Change requests visible as diffs against the original SOW (scope added, price delta, timeline delta).
- Sign-off state on each.

### C4. Support tickets
- For clients on a Support & Maintenance plan (per the SLA Addendum).
- Submit a ticket: severity (Critical / High / Medium / Low), description, reproduction steps, attachments.
- See live status and the support-hours allowance remaining for the month.
- The first-response targets shown match the client's actual plan (Basic / Standard / Priority / Ad hoc).

### C5. Handover pack
- The deliverables, setup notes, credential rotation guide, third-party dependencies, run-book.
- Always accessible — clients don't have to dig through Drive folders or old emails.
- Mirrors the Handover Checklist (Handover Pack §6).

### C6. "Ask the Engine" — RAG over their own handover docs
- A chat window scoped to *that client's* handover materials.
- Answers questions like "what happens if the API key expires", "how do I add a new tag", "where do support logs go".
- Every answer cites the source doc.
- Includes a "this isn't covered — open a support ticket?" fallback that pre-fills a ticket form.
- This is, itself, a Knowledge Engine in miniature, deployed per client. Another dogfood story.

### C7. Production sign-off form
- Mirrors the AI Addendum §11 Client Sign-Off form.
- Required before any Engine moves from "test mode" to "production".
- Captures: tested with representative data, understand limitations, confirmed third-party billing/limits, reviewed privacy/customer-impact, retained backups, understand human-review obligation.

## Cross-cutting features

### X1. Always-visible "what we don't do"
- A persistent link in the Centre header to the exclusions page. Never hidden, never apologetic.

### X2. Dogfood footer line
- Visible at the bottom of the Control Centre at all times:
  > "This Control Centre was built with the Founder Engine in [X] days for A$[Y] AUD. See the SOW →"
- Linked to the actual SOW for the Control Centre build, published in the Lab (see `05-portfolio-substitutes.md`).

### X3. Privacy and data hygiene
- Every brief input warns: "Don't paste secrets, API keys, or sensitive personal information here."
- Briefs are stored for the visitor's session by default; saved briefs only persist if the visitor opts in by giving an email.
- Per Addendum §9, brief retention is 90 days unless the visitor saves them.

### X4. Lightweight admin (Cam-side only)
- A simple admin view for Cam: incoming briefs, classifications, declines, scheduled calls.
- Daily digest email of the previous day's briefs grouped by Engine and risk tier.
- Approve / edit / reject any auto-generated draft SOW before it goes to the prospect (optional gate, off by default).

## What v1 explicitly does *not* include

Honouring the "ship the smallest viable thing" rule from the Pricing Schedule:

- No payment processing inside the Centre. Stripe links emailed separately, signed SOWs handled by e-signature.
- No real-time collaborative editing on draft SOWs (single-user editing is fine).
- No multi-language support beyond English.
- No mobile-native app (responsive web is enough).
- No third-party integrations *into* clients' tools from inside the Centre — the Centre is a portal, not a runtime. The Engines themselves run wherever the client's tools live.
- No public showcase of other clients' briefs or SOWs (confidentiality, per MSA §14).

## Success criteria for the Centre itself

How Cam can tell the Centre is working in its first 90 days:

1. **>50% of inbound contacts arrive with a complete brief** (not "hi, are you available?").
2. **<20% of briefs need a clarifying call** before a real SOW can be drafted.
3. **Zero contracts signed for work the contract pack disclaims** (i.e. the decline logic actually works).
4. **At least one client uses "Ask the Engine"** to self-serve a question that would otherwise have been an email to Cam.
5. **The Centre is referenced as the build artefact** in at least one Lab post per month.

If these aren't being hit by day 90, the bottleneck is the recommender prompt (`../build/recommender-prompt.md`) or the page IA (`../build/page-ia-copy.md`), not the feature set.
