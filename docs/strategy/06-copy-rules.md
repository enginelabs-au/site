# 06 — Copy Rules

A checklist for every piece of language that goes on the Engine Labs site, in the Control Centre, in proposals, in marketing emails, and in social posts. The rule of thumb:

> **If the contract pack wouldn't sign it, the page doesn't say it.**

This doc maps the substantive copy decisions back to the specific clauses in the Master Services Agreement (MSA), AI/Data/Security Addendum (Addendum), Support and Maintenance SLA Addendum (SLA), and the Pricing and Package Schedule (Pricing). Cite the clause when in doubt.

## Universal rules

### R1. No outcome guarantees
**Forbidden phrases**: "guaranteed leads", "X% conversion lift", "we'll double your pipeline", "ROI guarantee", "results or your money back", "drives revenue", "boosts sales", "100% accuracy", "AI that always…".

**Why**: MSA §16 explicitly disclaims: *"The Provider does not guarantee that any deliverable will increase revenue, reduce costs by a specific amount, generate leads, … be free of all bugs, … or remain compatible with third-party tools indefinitely."*

**Allowed alternatives**: "designed to", "intended to", "many clients use this to", "in the briefs we've scoped, the typical aim is", "your goal might be".

### R2. AI outputs need human review — always
**Forbidden phrases**: "fully autonomous", "set and forget", "AI that sends for you", "auto-replies to customers", "fires without supervision", "decides on your behalf".

**Why**: MSA §12 and Addendum §4: *"For material outputs, the workflow should include human review before the output is sent, published, relied on, or used to affect customers, staff, applicants, suppliers or the public."*

**Allowed alternatives**: "drafts for your one-click send", "queues with your sign-off", "routes for your approval", "ready in your inbox", "with human review baked in".

**Exception**: Internal routing, classification, tagging, scoring, summarising, alerting and reminding can be fully automated. The line is at *external* effect — anything that touches a customer, contract, account, money or person's record needs a human gate.

### R3. No regulated decision systems, ever
**Forbidden phrases**: "AI lawyer", "AI doctor", "AI accountant", "AI underwriter", "AI hiring decisions", "automatic loan approvals", "AI diagnosis", "AI legal advice", "AI tax advice", "AI financial advice", "AI credit scoring", "AI insurance decisions".

**Why**: MSA §3 and Addendum §5 explicitly exclude *"automated legal, medical, financial, employment, credit, insurance, immigration, housing, education, welfare, safety, or other high-impact decisions."*

**Allowed alternatives** (admin-layer framing): "intake forms for your law firm", "supplier paperwork for your clinic", "candidate screening drafts for your recruiter to review", "expense data extraction for your bookkeeper".

### R4. No enterprise / mission-critical claims
**Forbidden phrases**: "enterprise-grade", "enterprise-ready", "production-grade infrastructure", "mission-critical", "SOC2", "HIPAA-compliant", "ISO-certified", "24/7 monitoring", "high-availability DevOps", "compliance certification", "penetration tested".

**Why**: MSA §3: *"The Provider is not engaged as a senior software engineering consultancy, cyber security auditor, regulated engineering firm, … enterprise architect, or compliance officer."* And Pricing §5: out-of-scope work includes *"production-grade cyber security, penetration testing, incident response, SOC2/ISO certification, or regulated compliance ownership; mission-critical infrastructure, high-availability DevOps."*

**Allowed alternatives**: "small business", "founder-led teams", "operator-grade", "controlled scope", "fixed-scope builds", "lightweight backend".

### R5. Pricing shown is *starting* pricing
**Forbidden phrases**: "fixed price", "flat fee for any project", "no surprises", "guaranteed price", "$X for any AI build".

**Why**: Pricing §7: *"Default quoting rule: use the package price only where the scope is narrow and clearly accepted. For unclear, high-risk or larger projects, use a paid scoping workshop, then quote a custom SOW with milestone pricing."*

**Required phrasing on every price**:
- The currency symbol `A$` (with the A).
- The word "from" or "starting at" in front of any number that's a Basic-tier price.
- A reference to scoping in the Control Centre or a paid scoping workshop for ambiguous or larger work.
- "AUD" or "Australian dollars" at least once per pricing block.

**Allowed alternatives**: "from A$450", "scoped in the Control Centre", "starting price for controlled scopes", "larger or ambiguous projects begin with a paid scoping workshop".

### R6. IP language
**Forbidden phrases**: "you own everything we build" (overclaims — Provider Background IP is licensed, not assigned), "we own your data" (incorrect — Client owns Client Materials), "all rights belong to you forever".

**Why**: MSA §13: *"Subject to full payment of all undisputed fees, the Provider assigns to the Client the Provider's assignable rights in the final bespoke deliverables created specifically for the Client … excluding Provider Background IP, generic know-how, methods, templates, prompts, reusable workflow patterns, libraries, frameworks, open-source components, third-party assets, and tools not created exclusively for the Client."*

**Allowed phrasing**:
- "You own the bespoke deliverables built specifically for you, on full payment."
- "We retain our templates, prompts and reusable patterns; you get a perpetual licence to use them as part of your deliverable."
- "Your data stays yours."

### R7. Support is opt-in
**Forbidden phrases**: "we support you forever", "free lifetime updates", "24/7 support", "unlimited revisions after launch", "we'll always be here".

**Why**: SLA §1: *"This Addendum applies only if a Statement of Work includes support, maintenance, warranty-style bug fixing, monitoring, or post-delivery assistance. It is not included by default."*

**Required phrasing**:
- Distinguish the included **defect-fix period** (7–14 days, per SLA §2) from ongoing **support plans** (Basic Care, Standard Care, Priority Care, per SLA §3).
- Show the response targets as targets, not resolution guarantees (SLA §1).
- Make plan tiers and pricing visible.

### R8. Third-party tool reality
**Forbidden phrases**: "guaranteed uptime", "always available", "never breaks", "we control the AI".

**Why**: MSA §11: *"The Provider does not control those services and is not responsible for their downtime, pricing changes, model behaviour, approval processes, deprecations, rate limits, policy changes, account restrictions, data practices, or terms of use."*

**Allowed phrasing**: "built on tools you already use", "we'll tell you the dependencies up front", "if a third-party service changes its API or pricing, we'll let you know and quote any rework".

### R9. Outreach copy must be permission-gated
Anywhere the site mentions outreach, email campaigns, lead generation, sales sequences:

**Required language**: "permissioned contacts only", "your opted-in list", "people you have permission to contact", "consent-verified", "no cold outreach", "no scraping".

**Why**: Addendum §7 and ACMA spam rules. The Outreach Engine spec sheet (`02-engines/outreach-engine.md`) details this; copy elsewhere must not contradict it.

### R10. Data class language
Anywhere the site asks for or talks about data input:

**Required behaviour**:
- Warn against pasting secrets, API keys, sensitive personal data.
- Distinguish: public data (fine), internal business data (fine with care), personal information (requires SOW provision), sensitive/regulated data (excluded by default).
- Mirror the four classes in Addendum §2.

## Voice rules

### V1. Plain Australian English
- Spellings: centre, organisation, optimise, behaviour, labour, programme (for a series).
- Currency: `A$` prefix.
- Time: "business days" with Sydney time as the default reference.
- Tone: direct, plain, operator-grade. Short sentences. Concrete nouns.

### V2. Verbs over adjectives
- Replace "transformative AI solutions" → "an agent that drafts your replies".
- Replace "innovative workflow" → "a workflow that posts to Slack when an invoice lands".
- Adjectives are evidence-free; verbs describe work.

### V3. Examples over claims
For every capability claim, give a one-sentence example. "We build inbox triage" is weaker than "We built a triage Engine that reads 200 emails a day, tags each one, and drafts the reply in the operator's voice."

### V4. Show the boundaries, don't hide them
The exclusions list (`05-portfolio-substitutes.md` Substitute 5) is a trust accelerator. Treat it as marketing copy, not fine print.

## Pre-publish checklist

Before any new page, blog post, social post, email, ad, or Engine description goes live, run this list:

- [ ] No outcome guarantees (R1)
- [ ] Every AI workflow described has a human-review step (R2)
- [ ] No regulated-decision use cases implied (R3)
- [ ] No enterprise / mission-critical language (R4)
- [ ] Pricing shown as "from A$X", AUD, with scoping path for unclear work (R5)
- [ ] IP language matches MSA §13 (R6)
- [ ] Support framed as opt-in tiered plans, not implied (R7)
- [ ] Third-party tool dependency language present where relevant (R8)
- [ ] Outreach language is consent-gated (R9)
- [ ] Data class warnings present on input surfaces (R10)
- [ ] Australian English spelling and `A$` currency (V1)
- [ ] At least one concrete example per capability claim (V3)
- [ ] No words from the "retire" list in `01-positioning.md`

## Clause-to-copy quick reference

| Topic | Source clause | Where copy must reflect it |
|---|---|---|
| Outcome guarantees | MSA §16 | Hero, Engine pages, pricing |
| Human review | MSA §12, Addendum §4 | Engine pages, Control Centre prompts, FAQ |
| Regulated decisions | MSA §3, Addendum §5 | What-we-don't-do, Outreach Engine, vertical pages |
| Enterprise scope | MSA §3, Pricing §5 | Hero, About, FAQ |
| Pricing posture | Pricing §7 | All pricing, Engine pages, Control Centre |
| IP ownership | MSA §13 | FAQ, terms of service summary |
| Support tiers | SLA §1, §3 | Support page, Control Centre client mode |
| Third-party risk | MSA §11 | FAQ, Engine pages |
| Outreach consent | Addendum §5, §7 | Outreach Engine, FAQ, ad copy |
| Data classes | Addendum §2 | Control Centre input warnings, FAQ |
| Defect-fix period | SLA §2 | Engine pages, FAQ |
| Acceptance process | MSA §9 | Methodology page, FAQ |
| Change requests | MSA §8 | Engine pages, FAQ, Control Centre |
| Confidentiality | MSA §14 | Privacy page, footer |
| Retention | Addendum §9 | Privacy page, Control Centre data warning |
