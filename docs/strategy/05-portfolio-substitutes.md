# 05 — Portfolio Substitutes (commitment plan)

Engine Labs is launching without a case study library. The page has to earn trust without "logos of clients we've worked with". This doc commits to the five substitutes from the ideation plan and turns each into a shippable plan.

The principle: **publish the methodology, the artefacts and the process. Make the apparatus visible. Treat operational transparency as the portfolio.**

## Substitute 1 — The Control Centre itself

### What
The Control Centre on the homepage *is* a working Sales Engine + Founder Engine demo. Visitors don't read about what Engine Labs builds; they use one.

### Commitments
- Control Centre is the primary CTA above the fold. Not below. Not behind a click.
- Footer line is permanent: "This Control Centre was built with the Founder Engine in [X] days for A$[Y] AUD. See the SOW →"
- The "See the SOW" link goes to a real, redacted SOW for the Centre build, published in the Lab.
- If the Centre is ever taken down for maintenance, the fallback page says so honestly. No fake demo.

### Owner / cadence
Cam. One-time build, ongoing maintenance against the prompt and classification logic in `../build/recommender-prompt.md`.

## Substitute 2 — Public methodology

### What
The methodology Engine Labs uses is published, downloadable, and reusable by anyone — including competitors. Most freelancers and small agencies treat process as a moat. Engine Labs treats it as a megaphone: "this is how seriously we take the work."

### Artefacts to publish on `/methodology`
- The **Client Intake Questionnaire** (PDF — from the Handover Pack §1).
- The **Scope Confirmation Checklist** (Handover Pack §2).
- The **Access & Credential Checklist** (Handover Pack §3).
- The **Acceptance Form template** (Handover Pack §5).
- The **Handover Checklist** (Handover Pack §6).
- A **sample SOW** (one fully filled out, with a fictional client).
- A **sample Change Request** (showing how scope changes are priced).
- A **Sample Production Sign-off form** (Addendum §11).

### Framing
Page title: *"How we work. Take it, use it, copy it."*
Subhead: *"Process is not a moat. Showing you how we work is faster than telling you we're good."*

### Commitments
- All artefacts CC-licensed for reuse with attribution.
- Each PDF includes the line: "Adapted from the Engine Labs contract pack. Not legal advice."
- Updated whenever the underlying contract pack changes.

### Owner / cadence
Cam. Publish at launch. Quarterly review.

## Substitute 3 — Engine spec sheets

### What
The 8 Engine spec sheets in `02-engines/` are themselves the product catalog. Each one reads like a product page for a SaaS product, not a freelancer service description. This alone closes most of the credibility gap.

### Commitments
- Every Engine has a permanent page at `/engines/[engine-name]`.
- Each page links to: a "configure in the Control Centre" CTA, the price band, and at least one Lab build that used that Engine (after the first month).
- Spec sheets are version-controlled. Material changes log a changelog entry visible on the page.
- No Engine page makes a claim the SOW template can't deliver. The page-to-SOW alignment is checked against `06-copy-rules.md`.

### Owner / cadence
Cam. Live at launch. Edited as new SOWs reveal real-world variations.

## Substitute 4 — Build-in-public log (`/lab`)

### What
A weekly post documenting one small Engine, demo, or workflow Cam built. Each post is a synthetic case study Engine Labs fully owns — no client permission needed, no NDA risk, no waiting on real customer wins.

### Format of each post
- **Title**: the outcome, plainly. "Inbox triage agent for a one-person agency. Built in 4 hours. A$0 in API costs so far."
- **The problem**: 3 sentences.
- **What was built**: 5 bullets, named tools.
- **The actual artefact**: a Loom video, a screenshot, or (where safe) a public demo link.
- **The SOW that would have been**: a redacted version of what this would have cost as a real engagement, with the price band.
- **What didn't work**: at least one honest failure or limitation. (This is what makes it trustworthy.)
- **Try it yourself**: the prompts, the no-code recipe, or the GitHub link — give it away.

### Commitments
- **One post per week, minimum.** Missing a week is publicly acknowledged at the top of the next post.
- Posts are tagged by Engine and by vertical, so visitors can filter to what's relevant to them.
- The Lab page is a primary nav link (not buried in a footer).
- Every post has a "configure your version of this in the Control Centre" CTA, with the brief pre-seeded into the input.

### Initial post backlog (first 8 weeks)
1. *"Building the Control Centre that built itself."* (The Founder Engine SOW for this very site.)
2. *"A tradesman missed-call rescue agent. SMS → qualified callback → calendar invite. Built in one evening."*
3. *"Weekly client report writer for an agency owner who was losing his Fridays."*
4. *"An inbox triage Engine for a 200-orders-a-week Shopify store, with the exact prompt published."*
5. *"How I price a build before writing a line of code (the recommender's classification logic, explained)."*
6. *"What happened when I asked the Control Centre to scope a regulated medical chatbot. Spoiler: it said no."* (The decline path as content.)
7. *"Bookkeeper data-entry replacement: 50 invoices in 4 minutes, with the review step still owned by a human."*
8. *"A recruiter's Knowledge Engine: every candidate they've ever talked to, searchable in plain English."*

### Owner / cadence
Cam. Weekly. The Lab posts are also the social-content engine — each becomes 1 LinkedIn post, 1 X thread, 1 email to the list.

## Substitute 5 — Anti-claim posture

### What
A visible, confident statement of what Engine Labs **will not** do and **will not promise**. Counter-intuitively, this is the single fastest trust accelerator on the page. It signals professional boundaries, contract literacy, and that the business has thought about risk.

### Where it appears
- A dedicated section on the homepage: *"What we don't do, and what we won't promise."*
- A persistent link in the Control Centre header (per `04-control-centre.md` X1).
- Echoed in the Control Centre's decline path when a brief trips an exclusion.
- A long-form version on `/what-we-dont-do`.

### The actual statements (final copy)

> **What we don't do**
>
> - We don't build systems that make legal, medical, financial, employment, credit, insurance, immigration, housing or safety decisions on behalf of humans. Those decisions need a regulated professional, not an agent.
> - We don't take on production-grade cyber security, penetration testing, SOC2 / ISO certification or regulated compliance ownership.
> - We don't build mission-critical infrastructure where a failure has material legal, financial or safety consequence.
> - We don't scrape restricted platforms, extract data from sources that breach platform terms, or build mass-cold-outreach systems on unconsented lists.
> - We don't take on managed hosting, 24/7 monitoring, or enterprise DevOps.

> **What we won't promise**
>
> - We won't promise a revenue lift, lead volume, conversion rate, response time or AI accuracy number. Anyone who does is making it up.
> - We won't promise uptime guarantees beyond what the underlying third-party tools offer.
> - We won't promise that an AI output will always be correct. The human-review step is non-negotiable.
> - We won't quote a fixed price for unclear scope. Larger or ambiguous projects start with a paid scoping workshop.

### Why this works
This language is drawn directly from MSA §3, §16, Addendum §5 and the Pricing Schedule §5–§7. It costs nothing to publish (it's already in the contracts) and it does three things at once:
1. Filters out bad-fit inbound before it consumes Cam's hours.
2. Signals to good-fit inbound that Engine Labs is serious.
3. Pre-empts every "but what about…" objection in the sales conversation.

### Owner / cadence
Cam. Live at launch. Reviewed whenever the contract pack changes.

## Master commitments checklist

| Substitute | Required by launch | Required by week 4 | Required by week 12 |
|---|---|---|---|
| Control Centre live | ✅ | — | — |
| Methodology PDFs published | ✅ | — | — |
| 8 Engine spec sheets live | ✅ | — | — |
| First Lab post published | ✅ | — | — |
| Lab posts cadence | — | 4 published | 12 published |
| Anti-claim section live on homepage | ✅ | — | — |
| `/what-we-dont-do` long-form | — | ✅ | — |
| Control Centre footer dogfood line points to real SOW | — | ✅ | — |
| Vertical landing variants | — | — | 6 live |
