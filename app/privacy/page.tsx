import type { Metadata } from "next";
import MotionSection from "@/app/_components/MotionSection";

export const metadata: Metadata = {
  title: "Engine Labs privacy",
  description:
    "What we collect, how we use it, how long we keep it. 90-day brief retention by default.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div aria-hidden className="subtle-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow">Privacy</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[4rem]">
            Privacy.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            What we collect, how we use it, how long we keep it, and what you
            can ask us to delete.
          </p>
          <p className="mt-4 text-xs text-ink-3">
            Not legal advice. Engine Labs is an Australian sole
            trader trading as Cam Douglas (ABN 13 141 459 638), governed by
            the laws of New South Wales.
          </p>
        </div>
      </section>

      <MotionSection>
        <div className="mx-auto max-w-3xl px-4 py-20">
          <div className="prose">
            <h2>What we collect</h2>
            <ul>
              <li>
                <strong>Brief inputs.</strong> The text you type into the
                Control Centre. Retention is 90 days by default; longer if
                you save the brief.
              </li>
              <li>
                <strong>Email addresses.</strong> Only if you give them to us
                — to email a brief copy back, or to receive Lab posts.
              </li>
              <li>
                <strong>Basic analytics.</strong> Page views and referrer.
                No third-party tracking pixels by default.
              </li>
            </ul>

            <h2>What we don't collect</h2>
            <ul>
              <li>
                Sensitive personal data (health records, identity documents,
                credentials).
              </li>
              <li>Payment card details. Stripe handles those when payments are due.</li>
              <li>Biometrics.</li>
              <li>Location beyond country.</li>
            </ul>

            <h2>What we do with it</h2>
            <p>
              We use brief inputs to draft your scope and to reply with a
              starting price band. We use email addresses for the single
              purpose you gave them to us for. We don't train models on your
              data. We don't sell or share it.
            </p>

            <h2>How long we keep it</h2>
            <ul>
              <li>
                <strong>Briefs:</strong> 90 days unless you save the brief.
                Saved briefs persist until you delete them.
              </li>
              <li>
                <strong>Project data:</strong> per the MSA §14 and Addendum
                §9, default 12 months post-handover unless you request
                earlier deletion.
              </li>
              <li>
                <strong>Analytics:</strong> aggregated and rotated annually.
              </li>
            </ul>

            <h2>Your rights</h2>
            <p>
              Access, correction, deletion, complaint. Email{" "}
              <a href="mailto:hello@enginelabs.com.au">
                hello@enginelabs.com.au
              </a>{" "}
              or contact the OAIC. We respond within 30 days; for personal
              data deletion we typically respond within 5 business days.
            </p>

            <h2>Cookies</h2>
            <p>Essential only by default. No third-party tracking cookies.</p>

            <h2>Where data is stored</h2>
            <p>
              Our Control Centre data sits in Sydney (`ap-southeast-2`) by
              default. Your Engine's data lives wherever your tools live —
              the handover pack documents the dependency list. Stripe
              processes payments globally per Stripe's terms.
            </p>

            <h2>AI processing</h2>
            <p>
              Where we use third-party language models, we route through
              OpenRouter to Claude Opus 4.7 in inference mode. Prompts are
              not used for model training under the providers' API terms. A
              secret-scrubber runs on brief content before any prompt is
              dispatched, replacing detected secrets, API keys, payment-card
              numbers, TFNs and Medicare numbers with placeholders.
            </p>

            <h2>Contact</h2>
            <p>
              <a href="mailto:hello@enginelabs.com.au">
                hello@enginelabs.com.au
              </a>
            </p>
            <p className="text-sm text-ink-3">
              Engine Labs is an Australian sole trader trading as Cam Douglas
              (ABN 13 141 459 638), governed by the laws of New South Wales,
              Australia.
            </p>
          </div>
        </div>
      </MotionSection>
    </>
  );
}
