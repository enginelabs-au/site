import type { FAQItem } from "@/app/_components/FAQAccordion";

/**
 * Homepage FAQ — the 10-item excerpted list from page-ia-copy.md §3.10.
 * Every answer cites the underlying clause + copy rule per V3.
 */
export const HOMEPAGE_FAQ: FAQItem[] = [
  {
    q: "Who owns the code and content you build for me?",
    a: (
      <>
        You own the bespoke deliverables we build specifically for you, on
        full payment. We keep our reusable templates, prompts and workflow
        patterns and licence them to you perpetually as part of your
        deliverable. Your data is yours, always. (MSA §13. Copy rule R6.)
      </>
    ),
  },
  {
    q: "What's the difference between the starting price and what I'll actually pay?",
    a: (
      <>
        The “from A$X” is the starting-tier price for a narrow, clearly
        accepted scope. The Control Centre gives you a band based on your
        brief. Larger or unclear projects start with a paid scoping workshop,
        then a custom SOW. The workshop fee is credited against the final fee
        if you proceed. (Pricing §7. Copy rule R5.)
      </>
    ),
  },
  {
    q: "Are the AI replies sent automatically?",
    a: (
      <>
        No. For anything that touches a customer, contract, account, money or
        person's record, a human approves before send. Drafts are queued in
        your inbox or tool of choice for one-click send. Internal
        classification, tagging and routing can run unattended. (MSA §12,
        Addendum §4. Copy rule R2.)
      </>
    ),
  },
  {
    q: "What happens if a third-party tool changes?",
    a: (
      <>
        Your Engines run on tools we don't control — OpenAI, Anthropic,
        Zapier, Slack, Stripe, your CRM, and so on. If a model is deprecated,
        a price changes, a rate limit drops or an API breaks, we'll tell you
        and quote any rework. You'll have the dependency list in your
        handover. (MSA §11. Copy rule R8.)
      </>
    ),
  },
  {
    q: "How many revisions do I get?",
    a: (
      <>
        Each SOW includes a defect-fix period of 7 to 14 days after
        acceptance, depending on the package. Within that window we fix
        anything that doesn't match the SOW at no extra cost. Beyond that,
        support is a separate plan — Basic Care, Standard Care or Priority
        Care — and you choose whether to opt in. (SLA §1, §2, §3. Copy rule
        R7.)
      </>
    ),
  },
  {
    q: "Do you do cold outreach or scrape data?",
    a: (
      <>
        No. The Outreach Engine only works on lists where you can demonstrate
        consent or an existing business relationship. No scraping, no
        purchased lists, no harvested contacts. If your brief includes cold
        outreach, the Control Centre will decline and explain why. (Addendum
        §5, §7, ACMA spam rules. Copy rule R9.)
      </>
    ),
  },
  {
    q: "Do you build AI for legal, medical, financial, hiring or credit decisions?",
    a: (
      <>
        No. Those are regulated decisions that need a regulated professional.
        We can build the admin layer around them — intake forms for a law
        firm, supplier paperwork for a clinic, candidate screening drafts for
        a recruiter to review — but never the decision itself. (MSA §3,
        Addendum §5. Copy rule R3.)
      </>
    ),
  },
  {
    q: "What data is safe to give the Engine?",
    a: (
      <>
        Public data is fine. Internal business data is fine with care.
        Personal information needs an explicit provision in the SOW. Sensitive
        or regulated data (health records, financial advice data, identity
        documents) is excluded by default and needs a separate conversation.
        Never paste secrets, API keys or passwords into the Control Centre.
        (Addendum §2. Copy rule R10.)
      </>
    ),
  },
  {
    q: "How long does a build take?",
    a: (
      <>
        Most Engines: 1 to 4 weeks. The Founder Engine MVP track: 2 to 6
        weeks. The Control Centre will give you a calendar-week range based
        on the brief.
      </>
    ),
  },
  {
    q: "Why might you decline my brief?",
    a: (
      <>
        Three reasons. One: it falls inside one of the excluded categories
        (regulated decisions, mission-critical, security ownership, cold
        outreach). Two: the brief is too unclear to quote responsibly — in
        which case we'll suggest a paid scoping workshop or free 20 minute
        discovery call. Three: the brief
        needs a senior software engineering firm or a regulated specialist
        that we are not. We'll tell you which.
      </>
    ),
  },
];

/**
 * Full FAQ — grouped by heading per page-ia-copy.md §6.6.
 */
export const FULL_FAQ: { heading: string; items: FAQItem[] }[] = [
  {
    heading: "Engagement & scope",
    items: [
      HOMEPAGE_FAQ[0],
      HOMEPAGE_FAQ[1],
      HOMEPAGE_FAQ[8],
      HOMEPAGE_FAQ[9],
      {
        q: "Do you take on retainers?",
        a: (
          <>
            Not in the conventional sense. We don't sell open-ended monthly
            hours. After a build, you can opt into a Support plan (Basic
            Care, Standard Care, Priority Care) which is a productized
            ongoing engagement with documented scope, response targets, and a
            cancel-anytime clause. (SLA §3. Copy rule R7.)
          </>
        ),
      },
      {
        q: "Can you take over an Engine someone else built?",
        a: (
          <>
            Sometimes. We'll do a paid scoping workshop to review what's
            there, identify dependencies and known risk, and quote the
            takeover as a fresh SOW. We don't inherit liability for someone
            else's prior decisions. (MSA §3. Copy rule R5.)
          </>
        ),
      },
      {
        q: "What's the smallest brief you'll quote?",
        a: (
          <>
            The Basic tier of any Engine starts from A$450 AUD (Insight
            Engine) or A$650 AUD (everything else, with the exception of
            Outreach Engine which starts from A$1,350 AUD because consent
            verification is mandatory). Anything smaller is usually a
            workshop or a Lab post, not a build.
          </>
        ),
      },
      {
        q: "What if I want to add something mid-build?",
        a: (
          <>
            That's a Change Request. Every SOW includes a Change Request
            process: you describe the addition, we price the scope and
            timeline delta, you sign and we keep going. No surprises. (MSA
            §8.)
          </>
        ),
      },
    ],
  },
  {
    heading: "AI & human review",
    items: [
      HOMEPAGE_FAQ[2],
      {
        q: "Can the Engine ever send without me?",
        a: (
          <>
            For internal effects — tagging, routing, classification, scoring,
            alerting, summarising — yes. For anything that lands in a
            customer's, supplier's, candidate's or staff member's hands, no.
            That gate is non-negotiable and is in every SOW. (Addendum §4.
            Copy rule R2.)
          </>
        ),
      },
      {
        q: "What about the internal stuff (tagging, scoring) — is that automated?",
        a: (
          <>
            Yes. Internal classification and routing are designed to run
            unattended. The audit trail is built in so you can spot-check or
            override.
          </>
        ),
      },
      {
        q: "How do I know the AI didn't get it wrong?",
        a: (
          <>
            Every drafted output is labelled as a draft. The handover pack
            includes accuracy benchmarks and known failure modes for every
            Engine where benchmarking is in scope (Premium tier). For lower
            tiers, the human review step catches errors before they leave
            your business.
          </>
        ),
      },
      {
        q: "What's your stance on agentic Engines that act on the world?",
        a: (
          <>
            Cautious. We build agents that draft, queue, classify and remind.
            We do not build agents that decide, send, pay, hire, fire, or
            commit you legally. That line is in the MSA and we won't move it.
          </>
        ),
      },
    ],
  },
  {
    heading: "Data, privacy & security",
    items: [
      HOMEPAGE_FAQ[7],
      {
        q: "Where is my data stored?",
        a: (
          <>
            Our Control Centre data sits in Sydney (`ap-southeast-2`) by
            default. Your Engine's data lives wherever your tools live —
            typically your existing CRM, inbox, project tool or accounting
            tool. The handover pack documents the dependency list.
          </>
        ),
      },
      {
        q: "Do you train models on my data?",
        a: (
          <>
            No. We use third-party model APIs in inference mode only. We
            select providers whose terms exclude prompt content from
            training. (Addendum §3.)
          </>
        ),
      },
      {
        q: "What's the retention?",
        a: (
          <>
            Brief retention is 90 days unless you save the brief. Saved briefs
            persist until you delete them. Project data persists for the life
            of the engagement plus the period in your MSA (default 12 months
            post-handover unless you ask for earlier deletion). (Addendum
            §9.)
          </>
        ),
      },
      {
        q: "What about Australian Privacy Principles?",
        a: (
          <>
            We honour the APPs and the OAIC Notifiable Data Breaches scheme.
            Privacy questions go to{" "}
            <a href="mailto:hello@enginelabs.com.au">
              hello@enginelabs.com.au
            </a>
            . The Privacy page has the full statement.
          </>
        ),
      },
    ],
  },
  {
    heading: "Pricing & payment",
    items: [
      HOMEPAGE_FAQ[1],
      {
        q: "How do you bill?",
        a: (
          <>
            Stripe AU, AUD, GST exclusive unless stated. Payment Links sent
            by email per milestone. Smaller builds: deposit + final. Larger
            builds: deposit + milestone + final. (Pricing §7.)
          </>
        ),
      },
      {
        q: "Do you do milestone payments?",
        a: (
          <>
            Yes for any build over A$2,500 AUD. Milestones are written into
            the SOW with target dates and amounts.
          </>
        ),
      },
      {
        q: "What does the scoping workshop cost?",
        a: (
          <>
            A 60–90 minute structured workshop with us, a written one-page
            recommendation, and a Custom SOW. The workshop fee is published
            in the Pricing Schedule and credited against the final fee if you
            proceed.
          </>
        ),
      },
      {
        q: "What about tool subscriptions — who pays for OpenAI / Zapier / Slack?",
        a: (
          <>
            You do, on your accounts. We never own a client's third-party
            subscriptions. The handover pack includes the dependency list and
            the rotation steps. (MSA §11.)
          </>
        ),
      },
    ],
  },
  {
    heading: "IP & ownership",
    items: [
      HOMEPAGE_FAQ[0],
      {
        q: "Can I use your prompts after the build?",
        a: (
          <>
            Yes — you get a perpetual licence to the prompts, workflows and
            templates that ship as part of your deliverable. We retain the
            ownership of our reusable patterns; you retain unrestricted use
            of yours. (MSA §13.)
          </>
        ),
      },
      {
        q: "What if I want to take the Engine to another developer?",
        a: (
          <>
            Fine. The handover pack is designed for exactly that. Repo,
            credentials, prompts, run-book, dependency list — all yours.
          </>
        ),
      },
      {
        q: "Can I open-source what you build for me?",
        a: (
          <>
            Anything we built specifically for you, yes. Our reusable
            templates and prompts stay licensed. The SOW says which is which.
          </>
        ),
      },
    ],
  },
  {
    heading: "Support, maintenance & change",
    items: [
      HOMEPAGE_FAQ[4],
      {
        q: "What's the defect-fix period?",
        a: (
          <>
            7 to 14 days after acceptance, depending on the package. Within
            that window we fix anything that doesn't match the SOW, no extra
            cost. (SLA §2.)
          </>
        ),
      },
      {
        q: "Can I downgrade my support plan?",
        a: (
          <>
            Yes — at the next monthly cycle. No penalties. (SLA §3.)
          </>
        ),
      },
      {
        q: "What if a third-party tool breaks the Engine?",
        a: (
          <>
            We'll tell you, quote the rework, and fix it. We don't promise
            zero breakage on tools we don't control. (MSA §11. Copy rule R8.)
          </>
        ),
      },
    ],
  },
  {
    heading: "Boundaries",
    items: [
      HOMEPAGE_FAQ[5],
      HOMEPAGE_FAQ[6],
      HOMEPAGE_FAQ[9],
      {
        q: "Will you build a chatbot for my medical clinic?",
        a: (
          <>
            We can build the admin around it — intake forms, supplier
            paperwork, scheduling reminders — but not the clinical
            interaction. Clinical decision-making is a regulated decision
            that needs a regulated professional. (Addendum §5.)
          </>
        ),
      },
      {
        q: "Will you scrape LinkedIn for me?",
        a: (
          <>
            No. LinkedIn's terms forbid it, and the contract pack excludes
            it. We can build from your CRM exports, opted-in lists, or APIs
            you have proper access to. (Addendum §5, §7.)
          </>
        ),
      },
      {
        q: "Will you take on my SOC2 audit?",
        a: (
          <>
            No. We're a one-operator studio — that's a different kind of
            firm. We can refer you to specialists. (MSA §3.)
          </>
        ),
      },
    ],
  },
];
