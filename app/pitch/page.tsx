import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import LogoMark from "@/app/_components/LogoMark";
import { ENGINES } from "@/app/_lib/engines";

export const metadata: Metadata = {
  title: "Engine Labs pitch deck",
  description:
    "Engine Labs in eight slides: the problem, the Engines, the proof, the price.",
  robots: { index: false, follow: false },
};

const GRADIENT_TEXT =
  "bg-gradient-to-r from-sky-300 via-blue-300 to-violet-300 bg-clip-text text-transparent";

const CARD =
  "rounded-3xl border border-sky-400/25 bg-gradient-to-br from-blue-900/35 to-violet-900/35 backdrop-blur-md";

function Slide({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <section
      id={id}
      className="relative flex min-h-screen items-center justify-center px-6 py-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        {children}
      </div>
    </section>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className={`text-balance text-4xl font-bold tracking-tight md:text-6xl ${GRADIENT_TEXT}`}
    >
      {children}
    </h2>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 text-balance text-lg text-white/85 md:text-2xl">
      {children}
    </p>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3 text-left text-sm text-white/85 md:text-base">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PitchPage() {
  return (
    <div className="relative text-white">
      {/* Fixed backdrop: diagonal gradient plus soft orbs. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, #1a1650 0%, #122e6a 45%, #1e40af 72%, #4b1458 100%)",
        }}
      >
        <div className="absolute left-[10%] top-[18%] h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute right-[12%] top-[12%] h-24 w-24 rounded-full bg-sky-300/10 blur-xl" />
        <div className="absolute bottom-[14%] left-[22%] h-28 w-28 rounded-full bg-violet-300/10 blur-xl" />
        <div className="absolute bottom-[22%] right-[18%] h-48 w-48 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10">
      {/* 1. Title */}
      <Slide id="title">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-white/10 shadow-2xl shadow-blue-950/50 ring-1 ring-white/15 backdrop-blur-md md:h-32 md:w-32">
          <LogoMark className="h-20 w-auto md:h-24" priority />
        </div>
        <h1
          className={`mt-8 text-6xl font-bold tracking-tight md:text-8xl ${GRADIENT_TEXT}`}
        >
          Engine Labs
        </h1>
        <p className="mt-4 text-lg italic text-white/80 md:text-2xl">
          An agentic company, building agentic companies.
        </p>
        <p className="mt-16 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50">
          Scroll <ArrowDown className="h-3 w-3" />
        </p>
      </Slide>

      {/* 2. Problem */}
      <Slide id="problem">
        <Heading>Small teams hire for repeatable work.</Heading>
        <Sub>Then the best people spend their week doing it.</Sub>
        <div className={`${CARD} mx-auto mt-10 max-w-2xl p-8 md:p-10`}>
          <Bullets
            items={[
              "Leads go cold because the reply took six hours.",
              "The principal builds the Monday spreadsheet on Sunday night.",
              "The senior hire is the office search engine.",
              "Invoices get keyed in twice and paid twice.",
            ]}
          />
        </div>
      </Slide>

      {/* 3. Engines */}
      <Slide id="engines">
        <Heading>Eight productised Engines.</Heading>
        <Sub>Fixed scope. Published price. Clean handover.</Sub>
        <div className="mt-10 grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
          {ENGINES.map((e) => (
            <div key={e.slug} className={`${CARD} p-5`}>
              <p className="text-sm font-semibold text-sky-200">{e.name}</p>
              <p className="mt-1 text-sm text-white/80">{e.homeOneLiner}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 4. How */}
      <Slide id="how">
        <Heading>How a build runs.</Heading>
        <Sub>One to six weeks. A$450 to A$8,500, GST exclusive.</Sub>
        <p className={`mt-10 text-lg font-semibold md:text-2xl ${GRADIENT_TEXT}`}>
          Brief → Scope → Build → Acceptance → Handover → Run
        </p>
        <div className={`${CARD} mx-auto mt-10 max-w-2xl p-8 md:p-10`}>
          <Bullets
            items={[
              "Every build ships with the repo, prompts, credentials and a run-book.",
              "Engines draft. Humans decide. Nothing customer-facing is auto-sent.",
              "7 to 14 day defect-fix window, then optional Care from A$300 a month.",
              "No hourly billing, no open retainers, no outcome guarantees.",
            ]}
          />
        </div>
      </Slide>

      {/* 5. Proof */}
      <Slide id="proof">
        <Heading>Proof, not promises.</Heading>
        <Sub>All eight Engines in production at MCG Property Shoalhaven.</Sub>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["40 hrs", "manual work retired, every week"],
            ["A$113k", "a year, at A$85 and A$45 an hour"],
            ["A$16,900", "total build spend for all eight"],
            ["< 1 month", "payback on the Sales Engine"],
          ].map(([big, small]) => (
            <div key={big} className={`${CARD} p-6`}>
              <p className={`text-3xl font-bold md:text-4xl ${GRADIENT_TEXT}`}>
                {big}
              </p>
              <p className="mt-2 text-xs text-white/75 md:text-sm">{small}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-white/55">
          Hours are the client&apos;s own, timed before and after. Every figure is
          written up in{" "}
          <Link href="/lab" className="underline underline-offset-2 hover:text-white">
            the Lab
          </Link>
          . This site shipped in under 24 hours for under A$50.
        </p>
      </Slide>

      {/* 6. Why us */}
      <Slide id="why">
        <Heading>One operator. One laptop.</Heading>
        <Sub>Agents do the keystrokes. I do the judgement.</Sub>
        <div className={`${CARD} mx-auto mt-10 max-w-2xl p-8 md:p-10`}>
          <Bullets
            items={[
              "No overhead to keep billable, so the price points hold.",
              "The same delivery model I sell is the one that built this site.",
              "Agentbox, Gmail, WhatsApp, Drive, Pricefinder: wired to what you already use.",
              "Sydney based. Australian contracts. AUD invoices.",
            ]}
          />
        </div>
      </Slide>

      {/* 7. Model */}
      <Slide id="model">
        <Heading>How it makes money.</Heading>
        <Sub>Fixed-price builds, then optional Care.</Sub>
        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            ["Builds", "A$450 to A$8,500", "Basic, Standard, Premium per Engine"],
            ["Care", "A$300 to A$1,200 / mo", "Defect fixes, health checks, change requests"],
            ["Workshops", "From A$750", "Credited if the build goes ahead"],
          ].map(([t, p, d]) => (
            <div key={t} className={`${CARD} p-6`}>
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-sky-200">
                {t}
              </p>
              <p className={`mt-2 text-2xl font-bold ${GRADIENT_TEXT}`}>{p}</p>
              <p className="mt-2 text-sm text-white/75">{d}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 8. Ask */}
      <Slide id="ask">
        <Heading>Brief me a problem.</Heading>
        <Sub>Ten minutes in the Control Centre gets you an Engine and a scope band.</Sub>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/control-centre"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-950 transition hover:bg-sky-100"
          >
            Open the Control Centre <ArrowUpRight className="h-4 w-4" />
          </Link>
          <a
            href="mailto:hello@enginelabs.com.au"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            hello@enginelabs.com.au
          </a>
        </div>
        <p className="mt-16 text-xs text-white/50">
          Cam Douglas · Engine Labs · Sydney, NSW ·{" "}
          <Link href="/" className="underline underline-offset-2 hover:text-white">
            enginelabs.com.au
          </Link>
        </p>
      </Slide>
      </div>
    </div>
  );
}
