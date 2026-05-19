# 03 — Hero Verticals

Six verticals featured on the landing page. Each gets its own "for…" tile that links to a vertical landing variant. The Engine catalog is the same; the messaging, examples and suggested Engine stack differ.

## Why these six

- Each one fits cleanly inside the MSA's allowed scope.
- Each one has a clear "I'd rather automate this than hire someone" pain that maps to Lane C positioning.
- Together they cover most of the realistic inbound for a one-operator AI build studio without tripping the regulated/mission-critical exclusions.

## Vertical 1 — Solo founders / pre-seed

### Pain (in their words)
"I have an idea. I need to test it before I quit my job or raise a round. I can't afford to hire engineers and I don't want to learn a new no-code stack from scratch."

### Suggested Engine stack
- **[Founder Engine](02-engines/founder-engine.md)** (primary)
- **[Insight Engine](02-engines/insight-engine.md)** (once there are users to measure)
- **[Knowledge Engine](02-engines/knowledge-engine.md)** (later, once the team is more than one person)

### Hook line
"Ship a clickable prototype in two weeks. Find out if your idea has legs before you spend six months on it."

### Example brief (for the Control Centre seed prompts)
"I want to test a marketplace idea — two-sided, simple booking flow, payments, no admin app yet. Need something I can show in investor meetings next month."

---

## Vertical 2 — Small marketing & creative agencies

### Pain (in their words)
"We're winning more work than we can deliver. Hiring is slow and expensive. Half my senior team's week is admin, reporting and chasing approvals."

### Suggested Engine stack
- **[Ops Engine](02-engines/ops-engine.md)** (primary — approval flows, status updates, recurring agency rituals)
- **[Insight Engine](02-engines/insight-engine.md)** (client-facing weekly reports, written by AI from real data)
- **[Knowledge Engine](02-engines/knowledge-engine.md)** (so junior staff stop interrupting seniors)

### Hook line
"Give your senior team back the hours they spend on status reports, approvals and 'where's that file?' messages."

### Example brief
"Project status reports for 12 retainer clients eat my Friday. I want a weekly summary auto-generated from our project tool that I can review and send."

---

## Vertical 3 — Trades & service businesses

(Plumbers, sparkies, landscapers, cleaners, removalists, builders.)

### Pain (in their words)
"My phone rings while I'm on the tools. I miss leads. I'm slow to quote. Half the leads I do answer ghost because I take two days to reply."

### Suggested Engine stack
- **[Sales Engine](02-engines/sales-engine.md)** (primary — instant intake, qualification, first-reply drafting)
- **[Support Engine](02-engines/support-engine.md)** (after-hours enquiry triage)
- **[Back-office Engine](02-engines/back-office-engine.md)** (supplier invoices, receipts)

### Hook line
"Stop losing jobs to whoever rang back first. Catch every lead, qualify it, and send a same-hour draft reply."

### Example brief
"I'm a plumber. I get 10–20 enquiries a week from my website and Google. I want every one of them captured, qualified, and a draft quote-or-callback message ready in my phone within an hour."

---

## Vertical 4 — E-commerce / direct-to-consumer

### Pain (in their words)
"Support inbox is the bottleneck. Refund and shipping questions all day. Reporting takes me a full Monday. Stock and supplier admin is endless."

### Suggested Engine stack
- **[Support Engine](02-engines/support-engine.md)** (primary — order/shipping/refund triage with drafted replies)
- **[Insight Engine](02-engines/insight-engine.md)** (Stripe + Shopify + Klaviyo into one weekly read)
- **[Back-office Engine](02-engines/back-office-engine.md)** (supplier invoices, fulfilment paperwork)

### Hook line
"A support inbox that drafts every reply. A weekly read of your numbers that writes itself. Supplier paperwork that types itself."

### Example brief
"Shopify store, 200–400 orders/week. Support inbox is overwhelming. I want every ticket auto-tagged, prioritised, and drafted with the right policy or order details."

---

## Vertical 5 — Recruiters & staffing

### Pain (in their words)
"Inbound CVs, candidate follow-up, client briefings, scheduling — it's all admin and it never stops. The actual recruiting work is 20% of my week."

### Suggested Engine stack
- **[Sales Engine](02-engines/sales-engine.md)** (primary — both candidate intake and client lead intake)
- **[Ops Engine](02-engines/ops-engine.md)** (interview scheduling, follow-up cadence, reminder cycles)
- **[Knowledge Engine](02-engines/knowledge-engine.md)** (your candidate notes and past placements as a searchable memory)

### Hook line
"Get out of the inbox. Let the Engine catch, qualify, schedule and remind. You do the conversations that matter."

### Example brief
"Two-person recruiting agency, ~30 active roles. I want inbound CVs auto-screened against role briefs, candidates ranked, and shortlists drafted in my ATS."

### Important note
Anything that materially affects whether a person gets hired is regulated employment decision-making (Addendum §5). The Recruiter stack drafts, ranks and prepares — humans decide. The Control Centre will refuse to scope an "auto-reject" Engine.

---

## Vertical 6 — Coaches, consultants & course creators

### Pain (in their words)
"I sell a thing. I want the buyer journey to be smooth: enquiry → call → proposal → onboarded → supported. Right now it's all me, all manual."

### Suggested Engine stack
- **[Sales Engine](02-engines/sales-engine.md)** (primary — discovery call intake, qualification, proposal drafting)
- **[Knowledge Engine](02-engines/knowledge-engine.md)** (client-facing: a "ask my course" or "ask my framework" chatbot trained on your IP)
- **[Outreach Engine](02-engines/outreach-engine.md)** (re-engagement of your opted-in list — never cold)

### Hook line
"Your enquiry-to-onboarded journey, on rails. Your IP, made searchable for your clients."

### Example brief
"I run a coaching practice. I want a single flow that captures a discovery enquiry, asks pre-call questions, books a call, drafts a proposal afterwards, and onboards them when they say yes."

---

## Verticals deliberately not featured

These come up in inbound but should not have hero tiles, because the work that fits is narrow and the risk of scope creep is high:

- **Healthcare clinics**: admin-only (booking, intake forms, supplier paperwork). Never clinical decision-making. Per Addendum §5.
- **Law firms**: admin and intake only. Never legal advice or document drafting that resembles it. Per Addendum §5.
- **Financial advice / lending / insurance**: out of scope entirely. The contracts disclaim this and the page should not advertise into it.
- **Real estate (residential)**: lead intake is fine; anything touching contracts, settlements or compliance is not.
- **Enterprise (1000+ staff)**: a one-operator studio cannot meet enterprise security, procurement or compliance requirements. The site doesn't pretend to.

If a brief from one of these segments comes in, the Control Centre's classifier (see `04-control-centre.md`) routes it to a polite decline or a "we can help with the admin layer, not the regulated layer" partial-accept.

## How the verticals appear on the page

A grid of six tiles, each:

- One vertical name + one-line pain.
- Suggested Engine stack as tags.
- "See the [vertical] setup" link → vertical landing variant.

The vertical landing variant is the same page structure as the homepage, but with: vertical-specific hero copy, the suggested Engine stack expanded, example briefs pre-seeded into the Control Centre input, and (eventually) build-in-public examples tagged to that vertical.
