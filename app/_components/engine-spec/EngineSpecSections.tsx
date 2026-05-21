import type { ReactNode } from "react";

/** Top-to-bottom: each step is one shade darker (light and dark themes). */
const ENGINE_BAND = [
  "bg-engine-band-1",
  "bg-engine-band-2",
  "bg-engine-band-3",
  "bg-engine-band-4",
  "bg-engine-band-5",
  "bg-engine-band-6",
  "bg-engine-band-7",
  "bg-engine-band-8",
] as const;

type EngineBandStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

function engineBandClass(step: EngineBandStep) {
  return ENGINE_BAND[step - 1];
}

function EngineSpecBand({
  step,
  title,
  children,
}: {
  step: EngineBandStep;
  title?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`border-t border-border px-4 py-10 md:py-14 ${engineBandClass(step)}`}
    >
      <div className="prose-engine mx-auto max-w-5xl">
        {title ? (
          <h2 className="!mt-0 text-foreground">{title}</h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function EngineSpecLead({ children }: { children: ReactNode }) {
  return (
    <section
      className={`border-t border-border px-4 py-10 md:py-12 ${engineBandClass(1)}`}
    >
      <div className="prose-engine mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

export function EngineSpecRetires({ children }: { children: ReactNode }) {
  return (
    <EngineSpecBand step={2} title="The work it retires">
      {children}
    </EngineSpecBand>
  );
}

export function EngineSpecIO({ children }: { children: ReactNode }) {
  return <EngineSpecBand step={3}>{children}</EngineSpecBand>;
}

export function EngineSpecIntegrations({ children }: { children: ReactNode }) {
  return (
    <EngineSpecBand step={4} title="Typical integrations">
      {children}
    </EngineSpecBand>
  );
}

export function EngineSpecScope({ children }: { children: ReactNode }) {
  return <EngineSpecBand step={5}>{children}</EngineSpecBand>;
}

export function EngineSpecCommercial({ children }: { children: ReactNode }) {
  return <EngineSpecBand step={6}>{children}</EngineSpecBand>;
}

export function EngineRelatedBand({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`border-t border-border px-4 py-14 md:py-20 ${engineBandClass(7)}`}
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-[1.75rem]">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function EngineVerticalsBand({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`border-t border-border px-4 py-14 md:py-20 ${engineBandClass(8)}`}
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-[1.75rem]">
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-base text-ink-2">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
