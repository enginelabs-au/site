# Engine Labs — `/site`

Next.js 16 (App Router) implementation of the Engine Labs marketing site.
This is the **Week 1 deliverable** from
[`docs/build/tech-stack.md` §6](docs/build/tech-stack.md):
a styled, content-complete marketing site with a stubbed Control Centre.

## Stack

- **Framework:** Next.js 16 App Router + TypeScript + Turbopack.
- **Styling:** Tailwind CSS v4 (`@theme` tokens), shadcn/ui (Radix + tw-animate-css), `next-themes` for the dark-mode toggle.
- **Type:** Geist Sans + Geist Mono via `next/font/google`.
- **Motion:** [`motion`](https://motion.dev/) (the new name for Framer Motion). Lightweight scroll reveals, hover lifts, and the animated gradient border on the Control Centre input. Honours `prefers-reduced-motion`.
- **Icons:** `lucide-react` (one stroke weight, used sparingly).
- **Content:** MDX in `content/engines/*.mdx` and `content/lab/*.mdx`. Frontmatter is parsed with `gray-matter`.
- **Package manager:** pnpm 10.

## Run it

```bash
pnpm install
cp .env.example .env.local   # OPENROUTER_API_KEY + RESEND_API_KEY
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm start    # serve the production build
```

### Control Centre AI (OpenRouter)

Copy `.env.example` → `.env.local` and set `OPENROUTER_API_KEY`. The live chat uses `POST /api/briefs/chat` (OpenRouter → `anthropic/claude-opus-4.7` by default) with a **US$1 per-browser session cap**, clarify/recommend token limits, 600-char user messages, and 5 user turns. Usage is tracked in `.data/usage/` via the `cc_uid` cookie.

### Contact form (Resend)

Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL=hello@enginelabs.com.au`, and `RESEND_FROM_EMAIL=Engine Labs <hello@enginelabs.com.au>`. Submissions from the homepage (`/#send`), `/contact`, and Control Centre handoff post to `POST /api/contact`, which sends via Resend and always appends a copy to `.data/contact-inbox.json`. Verify `enginelabs.com.au` in the [Resend dashboard](https://resend.com/domains) so `hello@enginelabs.com.au` is allowed as the from address. On Vercel, add the same three variables to the project environment.

## Routes shipped

Marketing surfaces:

- `/` — homepage with the 11 sections from `docs/build/page-ia-copy.md` §3.
- `/engines` + `/engines/[slug]` — 8 Engine pages, content from `content/engines/*.mdx`.
- `/verticals` + `/verticals/[slug]` — 6 vertical landing variants.
- `/methodology` — Build → Run loop + downloadable PDFs (stubbed in Week 1).
- `/lab` + `/lab/[slug]` — Lab post index and Post #1 (the "Building the Control Centre that built itself" Part 1 skeleton).
- `/pricing` — full price band table + Support plans.
- `/about` — Cam's bio + entity info.
- `/faq` — the full grouped FAQ.
- `/privacy` — privacy statement with entity info.
- `/terms` — plain-English MSA summary with entity info.
- `/what-we-dont-do` — long-form anti-claim page with referral list.
- `/control-centre` — deep-link surface for the Control Centre stub.

API:

- `POST /api/briefs/chat` — OpenRouter recommender (clarify / recommend JSON → short reply). Enforces spend cap.
- `POST /api/briefs` — persists briefs + optional transcript / recommendation JSON to `.data/briefs.json`.
- `GET /api/briefs` — returns the count of stored briefs (debug).
- `POST /api/contact` — contact / brief handoff form → Resend email to `CONTACT_TO_EMAIL` + local inbox backup.

## What's stubbed in Week 1

Per `docs/build/tech-stack.md` §6 phasing, the following are **deliberately not implemented** in this build:

| Surface | Status |
|---|---|
| LLM recommender / clarifying turns / classification | **Live** when `OPENROUTER_API_KEY` is set. `POST /api/briefs/chat` → OpenRouter (`anthropic/claude-opus-4.7`), US$1 session cap, token/char limits. Prompt: `app/_lib/recommender/system-prompt.ts` (from `docs/build/recommender-prompt.md`). |
| Draft SOW PDF | Deferred to Week 3 |
| Authenticated client mode (project board, support tickets, handover pack) | Deferred to Week 4 |
| Stripe AU | Deferred to Week 3 — Cam to set up the AU account; integration stubbed |
| Documenso e-signature | Deferred to Week 4 |
| "Ask the Engine" RAG | Deferred to v1.1 |
| Methodology PDFs | Filename + description rendered, files stubbed (cards say `PDF · stub`) |
| Lab posts beyond #1 | The Lab index is wired but only Post #1 ships at end of Week 1 |

### Brief storage

The Control Centre stub writes briefs to `site/.data/briefs.json` in this format:

```json
[
  {
    "id": "uuid",
    "brief": "…",
    "email": "you@example.com",
    "surface": "home-hero",
    "createdAt": "2026-05-18T05:15:00.000Z",
    "status": "received"
  }
]
```

The `.data/` folder is git-ignored so production-bound briefs never end up in source control.

## Entity facts (locked, from `docs/CONSISTENCY.md` §I)

- Trading name: Cam Douglas
- Entity type: Australian sole trader (Engine Labs registered as a business name)
- ABN: 13 141 459 638
- Governing law: New South Wales, Australia
- Public email: hello@enginelabs.com.au
- Apex domain: enginelabs.com.au

These appear in `app/_components/SiteFooter.tsx`, `/about`, `/privacy`, `/terms`. If any change, also sweep `docs/CONSISTENCY.md`.

## Brand and copy invariants

The site obeys every locked invariant in [`docs/CONSISTENCY.md`](docs/CONSISTENCY.md):

- 8 Engines (locked roster) — see `app/_lib/engines.ts`.
- 6 hero verticals (locked roster) — same file.
- Pricing always rendered through `<PriceBand>` so the `from A$X → A$Y (AUD)` format is consistent (R5).
- Australian English everywhere (Centre, organisation, optimise, behaviour, labour).
- Anti-claim block lives on the homepage above the FAQ, not in fine print (V4).
- No emojis. No retired words ("solutions", "cutting-edge", "enterprise-grade", etc.).

## File map

```
site/
├── app/
│   ├── _components/        # shared UI (Header, Footer, ControlCentre, AntiClaim, PriceBand, MotionSection, ThemeToggle, ThemeProvider, …)
│   ├── _lib/               # engines + verticals data, FAQ data, MDX content loader
│   ├── api/briefs/         # Control Centre stub API
│   ├── engines/[slug]/     # Engine pages (MDX-driven)
│   ├── verticals/[slug]/   # vertical landing variants
│   ├── lab/[slug]/         # Lab posts (MDX-driven)
│   ├── (other routes)/
│   ├── globals.css         # Tailwind v4 @theme tokens + brand palette + dark mode
│   ├── layout.tsx          # Root layout, fonts, providers, header, footer
│   └── page.tsx            # homepage (12 sections)
├── components/ui/          # shadcn/ui primitives
├── content/
│   ├── engines/            # 8 Engine spec sheets as MDX
│   └── lab/                # Lab posts as MDX
├── docs/                   # strategy, build blueprints, CONSISTENCY
├── lib/utils.ts            # cn() helper
└── .data/                  # local-dev brief storage (git-ignored)
```

## Next steps

The Week 2–4 backlog lives in `docs/build/tech-stack.md` §6. The
recommender prompt is fully written in
`docs/build/recommender-prompt.md` and ready to wire in once the
Supabase project is provisioned. Production routing, per the answer to
open decision 4, is OpenRouter → Claude Opus 4.7 with per-session and
per-day rate limits enforced in the orchestrator.

## Dev server output

When `pnpm dev` is running, this terminal file captures the dev-server output for troubleshooting:

```
~/.cursor/projects/Users-camdouglas-enginelabs/terminals/<id>.txt
```

(The terminal id is reported by the agent that started the dev server.)
