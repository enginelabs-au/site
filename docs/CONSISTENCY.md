# CONSISTENCY.md — Cross-doc invariants

This is the rulebook for everything in `site/docs/`. Any change in `strategy/`, `build/`, or downstream code (`/site/`) must keep these invariants true. If you break one of these, you've introduced drift; either fix the drift or update this file with a deliberate change.

The point of this file: a single grep tells you whether the docs are still coherent. Anyone editing the docs (or a future agent) can run the checks at the bottom and get a yes/no.

---

## I. Entity facts (locked)

These appear in 5+ places. They are the only ones that can change *because* the real-world entity changed; everything else here is a writing convention.

| Field | Value |
|---|---|
| Trading name | Cam Douglas (sole trader) |
| Business name | Engine Labs (being registered on the ABR) |
| Entity type | Australian sole trader |
| ABN | 13 141 459 638 |
| Governing law | New South Wales, Australia |
| Public email | hello@enginelabs.com.au |
| Primary apex domain | **enginelabs.com.au** |
| LLM gateway | OpenRouter (single Engine Labs account) |
| LLM primary model | `anthropic/claude-opus-4.7` (rate-limited per session and per day) |

If any of these change, sweep:
- `docs/build/page-ia-copy.md` (footer disclaimer, `/about`, `/privacy`, `/terms`)
- `docs/build/tech-stack.md` §9 open decisions
- `site/app/_components/SiteFooter.tsx` and any About/Privacy/Terms page in `/site/`

---

## II. Brand vocabulary (locked)

| Term | Form | Never |
|---|---|---|
| Company name | **Engine Labs** | EngineLabs, engine labs, Engine labs |
| Productised service | **Engine** (capitalised when naming a specific one) | engine when naming a specific one |
| Interactive tool | **Control Centre** | Control Center, control centre, ControlCentre |
| Workshop frame | **The Lab** | the lab, /Lab |
| Methodology | **Build → Run loop** | build-run loop, Build-Run Loop |
| Submitted problem | **Brief** | enquiry, lead, contact form submission |
| End-of-build delivery | **Handover** | hand-off, transition, delivery |
| Specifically the MVP bundle | **The Founder Engine** | Founder Engine (use the definite article when speaking generically) |

Spelling: Australian English everywhere. `centre`, `organisation`, `optimise`, `behaviour`, `labour`, `customise`, `programme` (for a series).

Currency: always `A$` prefix. Never `$` alone.

---

## III. The 8 Engines (locked roster)

| Slug | Display name | Spec sheet | Price band |
|---|---|---|---|
| `sales` | Sales Engine | `strategy/02-engines/sales-engine.md` | from A$650 → A$5,500 (AUD) |
| `ops` | Ops Engine | `strategy/02-engines/ops-engine.md` | from A$650 → A$5,500 (AUD) |
| `support` | Support Engine | `strategy/02-engines/support-engine.md` | from A$650 → A$4,500 (AUD) |
| `insight` | Insight Engine | `strategy/02-engines/insight-engine.md` | from A$450 → A$3,500 (AUD) |
| `founder` | Founder Engine | `strategy/02-engines/founder-engine.md` | from A$750 → A$8,500 (AUD) |
| `knowledge` | Knowledge Engine | `strategy/02-engines/knowledge-engine.md` | from A$650 → A$4,500 (AUD) |
| `back-office` | Back-office Engine | `strategy/02-engines/back-office-engine.md` | from A$650 → A$3,500 (AUD) |
| `outreach` | Outreach Engine | `strategy/02-engines/outreach-engine.md` | from A$1,350 → A$4,500 (AUD) |

There are exactly 8. Do not invent new Engines, rename, recombine or split them in any doc without updating this file first.

### Engine name casing — must

- `Back-office Engine` (lowercase `o`, hyphen). Never `Back Office`, `Backoffice`, `Back-Office`.
- `Founder Engine` (when generic). `The Founder Engine` (when specific).
- All others are `[Word] Engine` with capital first letter.

---

## IV. The 6 hero verticals (locked roster)

| Slug | Display name | Source |
|---|---|---|
| `founders` | Solo founders / pre-seed | `strategy/03-verticals.md` §V1 |
| `agencies` | Small marketing & creative agencies | `strategy/03-verticals.md` §V2 |
| `trades` | Trades & service businesses | `strategy/03-verticals.md` §V3 |
| `ecommerce` | E-commerce / direct-to-consumer | `strategy/03-verticals.md` §V4 |
| `recruiters` | Recruiters & staffing | `strategy/03-verticals.md` §V5 |
| `coaches` | Coaches, consultants & course creators | `strategy/03-verticals.md` §V6 |

Exactly 6. The "verticals deliberately not featured" list (`03-verticals.md`) is the gate; healthcare, law, financial advice, real estate and enterprise are deliberately out.

---

## V. Price-band formatting rule (R5)

Every price band published anywhere must look like one of these two patterns:

- **Long form** (Engine pages, catalog tables, pricing page): `from A$X → A$Y (AUD)`
- **Inline / wireframe / Control Centre output**: `from A$X AUD` (no upper bound when describing a specific tier)

Required components in any pricing block:
- `A$` prefix.
- `from` or `starting at` prefix on any Basic-tier price.
- `AUD` or "Australian dollars" at least once per block.
- A scoping path nearby — typically `scoped in the Control Centre` or "larger or ambiguous projects begin with a paid scoping workshop".

Forbidden: bare `$X`, `$X USD`, prices without "from" prefix, prices without an AUD marker anywhere on the page.

---

## VI. Locked copy strings

These exact strings must appear verbatim, character-for-character, wherever the corresponding context applies. Do not paraphrase.

### Hero / Control Centre input placeholder

> What's slowing your business down? We'll draft a solution for you.

Appears in: `strategy/04-control-centre.md` P1, `build/wireframe.md` §2.1, `build/page-ia-copy.md` hero section, and (when implemented) the `<ControlCentre>` component placeholder.

### Dogfood line (long form, persistent footer of the Centre)

> This Control Centre was built with the Founder Engine in [X] days for A$[Y] AUD. See the SOW →

Appears in: `strategy/04-control-centre.md` X2, `strategy/05-portfolio-substitutes.md` Substitute 1, `build/page-ia-copy.md` hero + footer notes.

The `[X]` (days) and `[Y]` (price) placeholders are intentional. They get filled in when the Centre actually ships and Cam can quote the real build cost.

### Dogfood badge (short form, allowed on smaller surfaces)

> This Control Centre was built with the Founder Engine. See the SOW →

The short form is permitted only where the long form does not fit. The full version must appear at least once per page that mounts the Centre.

### Anti-claim opener

> Engine Labs doesn't build systems that make legal, medical, financial, employment, credit, insurance, immigration, housing or safety decisions on behalf of humans.

This phrasing is reused in three places: the homepage anti-claim section, the `/what-we-dont-do` page, and the Control Centre red-tier decline copy.

### Primary positioning line (Lane C)

> Stop hiring for repeatable work. Engineer it instead.

Hero use. Also acceptable in social bios and ad copy.

### Founding line (use sparingly, in About / footer)

> An agentic company, building agentic companies.

### Australian voice signature line (footer)

> Engine Labs is an Australian sole trader trading as Cam Douglas (ABN 13 141 459 638), governed by the laws of New South Wales.

---

## VII. Forbidden words and phrases

These never appear in published copy. They may appear inside rule-teaching contexts (`strategy/06-copy-rules.md`, `strategy/01-positioning.md`, the QA checklist in `build/page-ia-copy.md`, and this file) only.

- Buzzwords: `solutions` (plural), `cutting-edge`, `state-of-the-art`, `next-generation`, `bespoke AI partner`, `AI transformation partner`, `transform`, `revolutionise`, `disrupt`, `harness`, `leverage`, `unleash`, `supercharge`, `end-to-end`, `AI-powered`.
- False enterprise claims: `enterprise-grade`, `enterprise-ready`, `production-grade infrastructure`, `mission-critical`, `SOC2`, `HIPAA-compliant`, `ISO-certified`, `24/7 monitoring`, `high-availability DevOps`, `compliance certification`, `penetration tested`.
- False guarantees: `guaranteed leads`, `X% conversion lift`, `we'll double your pipeline`, `ROI guarantee`, `results or your money back`, `drives revenue`, `boosts sales`, `100% accuracy`, `AI that always …`.
- False autonomy: `fully autonomous`, `set and forget`, `AI that sends for you`, `auto-replies to customers`, `fires without supervision`, `decides on your behalf`.
- American spellings: `Center`, `Customize`, `Organization`, `Behavior`, `Optimize`, `Program` (when referring to a series).

The word "solution" (singular) is permitted in the hero placeholder copy ("We'll draft a solution for you") because it is the visitor's framing of their own need, not a marketing claim about Engine Labs.

---

## VIII. Feature ID conventions

Build docs reference Control Centre features by ID. The canonical list lives in `strategy/04-control-centre.md`. Any new feature added there must claim the next unused ID; never reuse a retired ID.

| Prefix | Meaning | Range in use |
|---|---|---|
| `P` | Prospect-mode feature | P1–P8 |
| `C` | Client-mode feature | C1–C7 |
| `X` | Cross-cutting feature | X1–X4 |
| `R` | Copy rule (numbered) | R1–R10 |
| `V` | Voice rule | V1–V4 |

Wireframes (`build/wireframe.md`) and the recommender prompt (`build/recommender-prompt.md`) cite these IDs in callouts. If you add a new feature, sweep both files.

---

## IX. Folder ownership

| Folder | Owner | Edit when |
|---|---|---|
| `strategy/` | Source of truth for *what* the page says and offers | Positioning, scope, prices, exclusions change |
| `build/` | Implementation blueprints derived from `strategy/` | Stack, wireframes, prompts, copy implementation change |
| `site/` (sibling repo, not in this folder) | The actual Next.js implementation | Code, components, deployed copy |
| `CONSISTENCY.md` (this file) | Cross-doc invariants | Whenever a locked thing changes (and only then) |

Rule: **never edit downstream without updating upstream first.** A change in `site/` that isn't reflected in `build/` is drift. A change in `build/` that isn't reflected in `strategy/` is drift.

---

## X. Manual consistency checks

Run these greps (`rg` is ripgrep). All should return either nothing or only the expected hits noted.

```bash
# 1. American spelling check — should return zero matches.
rg -n 'Control Center\b|\bCenter\b' docs . 2>/dev/null

# 2. Engine name casing — should return zero matches for the wrong forms.
rg -n 'Back Office Engine|Backoffice Engine|back-office engine' docs . 2>/dev/null

# 3. Pricing format — every Engine spec sheet's Price band line must include "from" and "(AUD)".
rg -n '^\*\*A\$' docs/strategy/02-engines  # bad: missing "from" prefix
rg -n '\*\*from A\$\d.+\(AUD\)\*\*' docs/strategy/02-engines  # good: must hit exactly 8 lines

# 4. Dogfood line — every long-form mention must include "AUD".
rg -n 'Founder Engine in \[X\] days for A\$\[Y\][^ ]' docs  # bad: missing " AUD" after [Y]
rg -n 'Founder Engine in \[X\] days for A\$\[Y\] AUD' docs  # good

# 5. Hero placeholder — must be character-identical wherever it appears.
rg -n "What's slowing your business down\? We'll draft a solution for you\." docs . 2>/dev/null

# 6. Forbidden words in published copy (excluding rule-teaching docs).
rg -in 'enterprise-grade|cutting-edge|state-of-the-art|leverage|harness|unleash|supercharge' \
  docs/build docs/strategy/02-engines docs/strategy/03-verticals.md \
  docs/strategy/04-control-centre.md app content 2>/dev/null
# This should only return hits that are inside rule-teaching contexts (citations of the forbidden word). Sanity-check each hit.

# 7. Engine count assertions.
rg -n '\b(8|eight)\b.*[Ee]ngines?' docs . 2>/dev/null  # should all say 8 / eight, never 7, 9, or other.

# 8. Vertical count assertions.
rg -n '\b(6|six)\b.*[Vv]erticals?' docs . 2>/dev/null  # should all say 6 / six.

# 9. Entity info — should always appear together when any of them appears.
rg -n 'ABN' docs . 2>/dev/null  # every hit should be "13 141 459 638"

# 10. Currency prefix — every monetary number should have A$ in front, not bare $.
rg -nP '(?<!A)\$\d' docs app content 2>/dev/null
# Allowable hits: US$ in pricing-benchmark comparison contexts (rare).
```

Run these from the `site/` directory (repo: `enginelabs/site/`). Anything unexpected → fix the doc or update this file.

---

## XI. Update protocol

If you intentionally change something locked here:

1. Make the change in the upstream doc (`strategy/` or `build/`).
2. Update this file in the same commit.
3. Run all the checks in §X.
4. Sweep any downstream code in `/site/` that referenced the old value.

If you find drift that wasn't intentional:

1. Decide which version is correct.
2. Fix the wrong version.
3. Re-run the checks in §X.
4. Add a note in the relevant doc's change log, if it has one.

---

*Maintained alongside `docs/build/page-ia-copy.md` §QA Checklist. Last revised May 2026.*
