import LogoMark from "@/app/_components/LogoMark";
import HomeScrollHint from "@/app/_components/HomeScrollHint";

/**
 * Full-viewport hero — logo, title and subtitle only (scroll for more).
 */
export default function HomeSplash() {
  return (
    <section
      id="top"
      className="subtle-grid relative flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center border-b border-border bg-background px-4"
      aria-label="Engine Labs"
    >
      <div className="flex flex-col items-center gap-12 py-12 text-center text-foreground md:gap-16 md:py-16">
        <LogoMark
          className="h-[min(21svh,210px)] w-auto min-h-[96px] max-h-[210px]"
          priority
        />
        <div className="flex flex-col items-center gap-5 md:gap-6">
          <h1 className="text-[1.375rem] font-semibold leading-none tracking-tight md:text-[2rem]">
            Engine Labs
          </h1>
          <p className="max-w-sm text-balance text-sm text-muted-foreground md:max-w-md md:text-base">
            An agentic company, building agentic companies.
          </p>
        </div>
      </div>
      <HomeScrollHint />
    </section>
  );
}
