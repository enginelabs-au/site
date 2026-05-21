import ContactSectionAnchor from "@/app/_components/ContactSectionAnchor";
import ContactSendForm from "@/app/_components/ContactSendForm";
import { SentencePara } from "@/app/_components/typography";

/**
 * Homepage contact band — separate from the closing CTA; hosts #send for nav links.
 */
export default function HomeContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-16 border-t border-section-contact-border bg-section-contact px-4 py-14 md:py-20"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-3xl">
        <header className="max-w-2xl">
          <h2
            id="contact-heading"
            className="text-2xl font-semibold tracking-tight text-section-contact-fg md:text-[1.75rem]"
          >
            Contact
          </h2>
          <SentencePara className="mt-3 text-[0.95rem] leading-relaxed text-section-contact-fg-muted">
            Finished in the Control Centre? Your scoped recommendation can pre-fill the
            message below. Or write your own — we reply within one business day (Sydney
            time).
          </SentencePara>
        </header>

        <ContactSectionAnchor className="mt-8 rounded-xl border border-section-contact-surface-border bg-section-contact-surface px-6 py-8 md:px-10 md:py-10">
          <ContactSendForm />
        </ContactSectionAnchor>
      </div>
    </section>
  );
}
