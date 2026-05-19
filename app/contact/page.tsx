import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ContactSectionAnchor from "@/app/_components/ContactSectionAnchor";
import ContactSendForm from "@/app/_components/ContactSendForm";

export const metadata: Metadata = {
  title: "Contact Engine Labs",
  description:
    "Send Engine Labs a message or your Control Centre brief — we reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative border-b border-border bg-background">
        <div aria-hidden className="subtle-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl px-4 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3.25rem]">
            Send us your brief.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            Complete the Control Centre first and your scoped brief will appear below — or
            write your own message. We read every submission within one business day (Sydney
            time).
          </p>
          <p className="mt-4 text-base text-ink-2">
            <a
              href="mailto:hello@enginelabs.com.au"
              className="font-medium text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
            >
              hello@enginelabs.com.au
            </a>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:hello@enginelabs.com.au"
              className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
            >
              Email us
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/control-centre"
              className="inline-flex items-center justify-center rounded-md border border-border bg-paper px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-rule-strong hover:bg-paper-3"
            >
              Open the Control Centre
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-paper-2">
        <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
          <ContactSectionAnchor>
            <h2 className="text-lg font-semibold text-foreground">Email us from here</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              No mail app required. Add your name and email, review the message, and send
              directly to{" "}
              <a
                href="mailto:hello@enginelabs.com.au"
                className="font-medium text-foreground underline decoration-1 underline-offset-4 transition-colors hover:text-brand"
              >
                hello@enginelabs.com.au
              </a>
              .
            </p>
            <ContactSendForm className="mt-8" />
          </ContactSectionAnchor>
          <p className="mt-10 text-sm text-ink-3">
            Based in Sydney, NSW. GST exclusive unless stated on any quote we send. Public
            contact:{" "}
            <a
              href="mailto:hello@enginelabs.com.au"
              className="text-ink-2 underline decoration-1 underline-offset-4 transition-colors hover:text-foreground"
            >
              hello@enginelabs.com.au
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
