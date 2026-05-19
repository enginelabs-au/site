# Engine Labs — docs

Strategy, content and build artefacts for the Engine Labs marketing site and Client Control Centre. Lives alongside the Next.js app in `/site`.

## Folder map

```
docs/
├── strategy/                       # decisions made during ideation
│   ├── 01-positioning.md           # brand lane + vocabulary
│   ├── 02-engines/                 # productized service spec sheets
│   │   ├── README.md
│   │   ├── sales-engine.md
│   │   ├── ops-engine.md
│   │   ├── support-engine.md
│   │   ├── insight-engine.md
│   │   ├── founder-engine.md
│   │   ├── knowledge-engine.md
│   │   ├── back-office-engine.md
│   │   └── outreach-engine.md
│   ├── 03-verticals.md             # 6 hero verticals + messaging
│   ├── 04-control-centre.md        # v1 feature spec
│   ├── 05-portfolio-substitutes.md # 5 credibility substitutes
│   └── 06-copy-rules.md            # contract-aligned copy guardrails
├── build/                          # implementation blueprints
│   ├── wireframe.md                # Control Centre flow + page layout
│   ├── recommender-prompt.md       # AI system prompt + classification logic
│   ├── page-ia-copy.md             # information architecture + full copy
│   └── tech-stack.md               # minimum stack to ship v1
└── lab/                            # Lab post source notes (canonical MDX in content/lab/)
```

## How to use this folder

1. `strategy/` is the source of truth for *what* the page says and offers. Edit there first if positioning or scope changes.
2. `build/` is downstream — wireframes, prompts, copy and stack all derive from `strategy/`. If a `strategy/` doc changes, sweep the affected `build/` doc.
3. Nothing on the site should contradict the contract pack. `strategy/06-copy-rules.md` is the checklist.

## Source documents

The strategy is derived from the seven contract templates Cam Douglas prepared:

- Master Services Agreement (MSA)
- Statement of Work Template (SOW)
- Pricing and Package Schedule
- AI, Data and Security Addendum
- Support and Maintenance SLA Addendum
- Lawyer Review Brief
- Client Intake, Acceptance and Handover Pack

These are not stored in this folder. They are the legal substrate. The site is the commercial surface that sells what those contracts deliver.
