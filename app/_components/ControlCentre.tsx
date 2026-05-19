"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, RotateCcw, Send } from "lucide-react";
import BriefMarkdown from "@/app/_components/BriefMarkdown";
import {
  clearBriefHandoff,
  loadBriefHandoff,
  notifyBriefHandoffReady,
  saveBriefHandoff,
} from "@/app/_lib/brief-handoff";
import type { BriefHandoffMode } from "@/app/_lib/brief-handoff";
import { scrollToContactSend } from "@/app/_lib/scroll-to-contact";
import {
  contactIntakeAskEmail,
  isContactIntakeUserMessage,
  isValidVisitorEmail,
  isValidVisitorName,
  normalizeVisitorEmail,
  normalizeVisitorName,
  parseContactIntakeHeuristic,
  resolveContactIntakeStep,
  stripContactIntakeFromTranscript,
  type ContactIntakeStep,
} from "@/app/_lib/recommender/contact-intake";
import type { RecommendationResponse } from "@/app/_lib/recommender/types";

type ControlCentreProps = {
  variant?: "hero" | "footer" | "page" | "vertical" | "nexus";
  presetPrompts?: string[];
  prefilledBrief?: string;
  ctaPrimary?: string;
  ctaSecondary?: { label: string; href: string };
  surface?: string;
  showHeaderLinks?: boolean;
  /** Type the opening assistant line: on scroll (homepage) or on mount (control-centre page). */
  introAnimation?: "view" | "mount";
  /** Override root surface classes (homepage dark-band widget). */
  className?: string;
};

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const HERO_PRESETS = [
  "I'm a tradie missing leads",
  "Agency owner drowning in status reports",
  "Founder needs an MVP for an investor demo",
];

const GREETING =
  "Describe what's slowing your business down. We'll recommend an Engine and draft a scope.";

const NEXUS_GREETING =
  "Describe your biggest operational challenge. We'll recommend an Engine and outline a starting scope.";

const DISCLAIMER =
  "Brief scoping only — describe work you want engineered, not general chat. Don't disclose personal information.";

const CAP_REACHED_MESSAGE =
  "You've reached the session AI limit on this device. Email hello@enginelabs.com.au and we'll continue from here.";

export default function ControlCentre({
  variant = "hero",
  presetPrompts,
  prefilledBrief = "",
  ctaPrimary = "Send",
  ctaSecondary,
  surface,
  showHeaderLinks = true,
  introAnimation,
  className,
}: ControlCentreProps) {
  const [brief, setBrief] = useState(prefilledBrief);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    introAnimation ? [] : [{ id: "welcome", role: "assistant", content: introForVariant(variant) }],
  );
  const [isIntroTyping, setIsIntroTyping] = useState(false);
  const [introTyped, setIntroTyped] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error" | "cap_reached"
  >("idle");
  const [conversationDone, setConversationDone] = useState(false);
  const [hasHandoff, setHasHandoff] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [contactIntakeStep, setContactIntakeStep] = useState<"none" | "name" | "email">(
    "none",
  );
  const [pendingRecommendation, setPendingRecommendation] =
    useState<RecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const introStartedRef = useRef(false);

  const pathname = usePathname();
  const presets = presetPrompts ?? (variant === "hero" ? HERO_PRESETS : []);
  const isWidget = variant === "nexus";
  /** Homepage widget scrolls to #send; other routes use the contact page. */
  const contactSendHref = pathname === "/" && isWidget ? "/#send" : "/contact#send";
  const showSendBriefCta = conversationDone && hasHandoff;

  function hasCollectedContact(): boolean {
    return isValidVisitorName(visitorName) && isValidVisitorEmail(visitorEmail);
  }

  function scrollToContactForm() {
    notifyBriefHandoffReady();
    if (contactSendHref.startsWith("/#")) {
      if (window.location.pathname === "/") {
        window.history.pushState(null, "", "#send");
      }
      const scroll = () => scrollToContactSend("smooth");
      requestAnimationFrame(scroll);
      window.setTimeout(scroll, 120);
    } else {
      window.location.assign(contactSendHref);
    }
  }

  function openContactHandoff(mode: BriefHandoffMode) {
    if (mode === "brief") {
      const existing = loadBriefHandoff();
      if (existing) {
        saveBriefHandoff({ ...existing, mode: "brief" });
      }
      scrollToContactForm();
      return;
    }
    if (mode === "blank") {
      saveBriefHandoff({
        mode: "blank",
        createdAt: new Date().toISOString(),
        seedBrief: "",
        recommendationMarkdown: "",
        emailSubject: "",
        emailBody: "",
        surface: surface ?? variant,
      });
      scrollToContactForm();
      return;
    }
    if (mode === "contact_only") {
      if (!hasCollectedContact()) {
        openContactHandoff("blank");
        return;
      }
      saveBriefHandoff({
        mode: "contact_only",
        createdAt: new Date().toISOString(),
        seedBrief: "",
        recommendationMarkdown: "",
        emailSubject: "Website enquiry — Engine Labs",
        emailBody: "",
        visitorName: isValidVisitorName(visitorName)
          ? normalizeVisitorName(visitorName)
          : "",
        visitorEmail: isValidVisitorEmail(visitorEmail)
          ? normalizeVisitorEmail(visitorEmail)
          : "",
        surface: surface ?? variant,
      });
      scrollToContactForm();
      return;
    }
  }

  function playIntroAnimation(text: string) {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setMessages([{ id: "welcome", role: "assistant", content: text }]);
      setIntroTyped("");
      setIsIntroTyping(false);
      return;
    }

    setIsIntroTyping(true);
    setIntroTyped("");

    void delay(500).then(() => {
      setIsIntroTyping(false);
      let i = 0;
      const step = () => {
        i += 1;
        setIntroTyped(text.slice(0, i));
        if (i < text.length) {
          window.setTimeout(step, 16 + Math.random() * 10);
        } else {
          setMessages([{ id: "welcome", role: "assistant", content: text }]);
          setIntroTyped("");
        }
      };
      step();
    });
  }

  useEffect(() => {
    if (introAnimation !== "mount") return;
    if (introStartedRef.current) return;
    introStartedRef.current = true;
    playIntroAnimation(introForVariant(variant));
  }, [introAnimation, variant]);

  useEffect(() => {
    if (introAnimation !== "view") return;
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (!visible || introStartedRef.current) return;
        introStartedRef.current = true;
        observer.disconnect();
        playIntroAnimation(introForVariant(variant));
      },
      { threshold: 0.25, rootMargin: "-8% 0px -20% 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [introAnimation, variant]);

  function resetChat() {
    setBrief(prefilledBrief);
    setStatus("idle");
    setConversationDone(false);
    setHasHandoff(false);
    setVisitorName("");
    setVisitorEmail("");
    setContactIntakeStep("none");
    setPendingRecommendation(null);
    clearBriefHandoff();
    setError(null);
    setIntroTyped("");
    setIsIntroTyping(false);
    introStartedRef.current = false;

    if (introAnimation) {
      setMessages([]);
      introStartedRef.current = true;
      playIntroAnimation(introForVariant(variant));
    } else {
      setMessages([
        { id: "welcome", role: "assistant", content: introForVariant(variant) },
      ]);
    }
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }

  function applyPreset(text: string) {
    setBrief(text);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = brief.trim();
    if (!trimmed) {
      setError(
        contactIntakeStep === "name"
          ? "Please enter your name."
          : contactIntakeStep === "email"
            ? "Please enter your contact email."
            : "Please describe what's slowing your business down.",
      );
      return;
    }

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    let nameForApi = visitorName;
    let emailForApi = visitorEmail;
    let finalizeBrief = false;
    let intakeMessageAlreadyAdded = false;

    if (contactIntakeStep === "name" || contactIntakeStep === "email") {
      setMessages((prev) => [...prev, userMsg]);
      intakeMessageAlreadyAdded = true;
      setBrief("");
      setStatus("submitting");
      setError(null);
      scrollToBottom();

      const intakeStep: ContactIntakeStep =
        contactIntakeStep === "email" ? "email_only" : "name_only";
      const knownName =
        contactIntakeStep === "email" && isValidVisitorName(visitorName)
          ? normalizeVisitorName(visitorName)
          : undefined;

      try {
        let resolved = resolveContactIntakeStep({
          intakeStep,
          ...parseContactIntakeHeuristic(trimmed, knownName),
          knownName,
        });

        const needsApi =
          (intakeStep === "name_only" && !resolved.visitorName) ||
          (intakeStep === "email_only" && !resolved.visitorEmail);

        if (needsApi) {
          const parseRes = await fetch("/api/briefs/parse-contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              rawText: trimmed,
              intakeStep,
              knownName,
            }),
          });
          const parsed = (await parseRes.json()) as {
            ok?: boolean;
            visitorName?: string;
            visitorEmail?: string;
            nextStep?: "name" | "email" | "complete";
            ready?: boolean;
            message?: string;
            error?: string;
          };

          if (parseRes.status === 429) {
            setStatus("cap_reached");
            setConversationDone(true);
            setError(parsed.message ?? CAP_REACHED_MESSAGE);
            return;
          }

          if (!parseRes.ok || !parsed.ok) {
            throw new Error(parsed.message ?? "Could not read your name or email.");
          }

          resolved = {
            visitorName: parsed.visitorName?.trim()
              ? normalizeVisitorName(parsed.visitorName)
              : "",
            visitorEmail: parsed.visitorEmail?.trim()
              ? normalizeVisitorEmail(parsed.visitorEmail)
              : "",
            nextStep: parsed.nextStep ?? "name",
            ready: Boolean(parsed.ready),
          };
        }

        if (contactIntakeStep === "name") {
          if (resolved.nextStep === "email" && resolved.visitorName) {
            setVisitorName(resolved.visitorName);
            setMessages((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                role: "assistant",
                content: contactIntakeAskEmail(resolved.visitorName),
              },
            ]);
            setContactIntakeStep("email");
            setStatus("idle");
            scrollToBottom();
            return;
          }
          setStatus("idle");
          setError("Please enter your name (e.g. Cam Douglas).");
          return;
        }

        if (resolved.ready && resolved.visitorEmail) {
          const finalName =
            resolved.visitorName ||
            (isValidVisitorName(visitorName) ? normalizeVisitorName(visitorName) : "");
          const finalEmail = resolved.visitorEmail;
          if (!finalName) {
            setStatus("idle");
            setError("Please enter your name first.");
            setContactIntakeStep("name");
            return;
          }
          setVisitorName(finalName);
          setVisitorEmail(finalEmail);
          setContactIntakeStep("none");
          nameForApi = finalName;
          emailForApi = finalEmail;
          finalizeBrief = true;
          setMessages((prev) =>
            prev.filter(
              (m) =>
                m.role === "assistant" ||
                !isContactIntakeUserMessage(m.content, finalName, finalEmail),
            ),
          );
        } else {
          setStatus("idle");
          setError("Please enter a valid email address (e.g. you@company.com.au).");
          return;
        }
      } catch (err) {
        setStatus("idle");
        setError(
          err instanceof Error ? err.message : "Could not read your name or email.",
        );
        return;
      }
    }

    if (!intakeMessageAlreadyAdded) {
      setMessages((prev) => [...prev, userMsg]);
    }
    setBrief("");
    setStatus("submitting");
    setError(null);
    scrollToBottom();

    const transcript = buildApiTranscript(
      intakeMessageAlreadyAdded ? [...messages, userMsg] : messages,
      userMsg,
      nameForApi,
      emailForApi,
    );

    try {
      const res = await fetch("/api/briefs/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: transcript,
          surface: surface ?? variant,
          visitorName: nameForApi || undefined,
          visitorEmail: emailForApi || undefined,
          finalizeBrief,
          cachedRecommendation:
            finalizeBrief && pendingRecommendation ? pendingRecommendation : undefined,
        }),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        reply?: string;
        responseType?: string;
        intakeStep?: "name" | "email";
        message?: string;
        error?: string;
        handoff?: {
          subject: string;
          body: string;
          seedBrief: string;
          recommendationMarkdown: string;
          visitorName?: string;
          visitorEmail?: string;
        };
        cachedRecommendation?: RecommendationResponse;
      };

      if (res.status === 429 && data.error === "session_cap_reached") {
        setStatus("cap_reached");
        setConversationDone(true);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.message ?? CAP_REACHED_MESSAGE,
          },
        ]);
        scrollToBottom();
        return;
      }

      if (res.status === 503) {
        setStatus("error");
        setError(
          data.message ??
            "AI is not configured. Add OPENROUTER_API_KEY to .env and restart the dev server.",
        );
        return;
      }

      if (!res.ok || !data.reply) {
        throw new Error(data.message ?? `Server returned ${res.status}`);
      }

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
      };
      setMessages((prev) => [...prev, assistantMsg]);

      if (data.responseType === "contact_intake") {
        if (data.cachedRecommendation) {
          setPendingRecommendation(data.cachedRecommendation);
        }
        setContactIntakeStep(data.intakeStep === "email" ? "email" : "name");
        setStatus("idle");
        scrollToBottom();
        return;
      }

      if (data.responseType === "recommendation") {
        setPendingRecommendation(null);
        if (data.handoff) {
          const handoffName = data.handoff.visitorName ?? nameForApi;
          const handoffEmail = data.handoff.visitorEmail ?? emailForApi;
          const normalizedName = handoffName
            ? normalizeVisitorName(handoffName)
            : "";
          const normalizedEmail = handoffEmail
            ? normalizeVisitorEmail(handoffEmail)
            : "";
          if (normalizedName) setVisitorName(normalizedName);
          if (normalizedEmail) setVisitorEmail(normalizedEmail);
          saveBriefHandoff({
            mode: "brief",
            createdAt: new Date().toISOString(),
            seedBrief: data.handoff.seedBrief,
            recommendationMarkdown: data.handoff.recommendationMarkdown,
            emailSubject: data.handoff.subject,
            emailBody: data.handoff.body,
            visitorName: normalizedName || handoffName,
            visitorEmail: normalizedEmail || handoffEmail,
            surface: surface ?? variant,
          });
          setHasHandoff(true);
        }
        setContactIntakeStep("none");
        setStatus("success");
        setConversationDone(true);
      } else {
        setStatus("idle");
      }
      scrollToBottom();
    } catch (err) {
      setStatus("error");
      const detail = err instanceof Error ? err.message : "";
      setError(
        detail && !detail.startsWith("Server returned")
          ? detail
          : "Something went wrong on our side. Try again in a minute, or email hello@enginelabs.com.au.",
      );
    }
  }

  const userTurnCount = messages.filter((m) => m.role === "user").length;
  const showPresets =
    presets.length > 0 &&
    !conversationDone &&
    userTurnCount === 0;
  const inputDisabled =
    status === "submitting" || status === "success" || status === "cap_reached" || conversationDone;
  const showReset =
    userTurnCount > 0 ||
    conversationDone ||
    status === "cap_reached" ||
    (messages.length > 0 && !isIntroTyping && !introTyped);

  return (
    <div
      ref={rootRef}
      id="control-centre"
      className={`relative flex flex-col overflow-hidden ${
        className ??
        (isWidget
          ? "border border-border/80 bg-background shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          : "border border-border bg-background shadow-sm")
      } ${
        isWidget ? "min-h-[26rem] rounded-3xl" : "min-h-[28rem] rounded-2xl"
      }`}
    >
      <div
        className={`absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 ${
          isWidget ? "px-4 pt-3" : "px-4 pt-2.5"
        } pointer-events-none`}
      >
        <button
          type="button"
          onClick={() => openContactHandoff(hasCollectedContact() ? "contact_only" : "blank")}
          className="pointer-events-auto shrink-0 whitespace-nowrap rounded-full border border-brand/35 bg-brand-soft/50 px-3 py-1.5 text-[0.68rem] font-medium leading-none text-brand shadow-sm backdrop-blur-sm transition hover:border-brand/50 hover:bg-brand-soft hover:text-brand"
        >
          Something else you wish to discuss? Contact us.
        </button>
        {isWidget && showReset ? (
          <ResetButton
            onClick={resetChat}
            disabled={status === "submitting"}
            className="pointer-events-auto shrink-0"
          />
        ) : null}
      </div>

      {!isWidget ? (
        <>
          <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5 pt-12">
            <span className="text-sm font-medium text-foreground">Control Centre</span>
            {showReset ? (
              <ResetButton onClick={resetChat} disabled={status === "submitting"} />
            ) : null}
          </div>
          {showHeaderLinks ? (
            <div className="flex flex-wrap gap-3 border-b border-border px-4 py-2 text-xs">
              <Link
                href="/what-we-dont-do"
                className="text-muted-foreground hover:text-foreground"
              >
                What we don&apos;t do
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </div>
          ) : null}
        </>
      ) : null}

      <div
        ref={scrollRef}
        className={`flex flex-1 flex-col overflow-y-auto ${
          isWidget ? "min-h-[14rem] justify-end px-5 pb-4 pt-16 md:pt-20" : "justify-end space-y-4 px-4 py-6"
        }`}
        aria-live="polite"
      >
        <div className={isWidget ? "space-y-4" : "space-y-4"}>
          {introAnimation && isIntroTyping ? <TypingIndicator /> : null}
          {introAnimation && introTyped ? (
            <AssistantBubble content={introTyped} />
          ) : null}
          {messages.map((msg) => (
            <ChatBubble key={msg.id} role={msg.role} content={msg.content} widget={isWidget} />
          ))}
          {status === "submitting" ? <TypingIndicator label="Thinking…" /> : null}
        </div>

        {showSendBriefCta ? (
          <div className={isWidget ? "mt-2" : "mt-3"}>
            <button
              type="button"
              onClick={() => openContactHandoff("contact_only")}
              className="w-full rounded-lg border border-border bg-muted/30 px-3 py-2.5 text-left text-[0.78rem] leading-relaxed text-ink-2 transition hover:border-brand/40 hover:bg-muted/50 hover:text-foreground"
            >
              If this brief isn&apos;t right or there&apos;s something else you wish to discuss,
              please Contact us below.
            </button>
          </div>
        ) : null}
      </div>

      <form
        onSubmit={handleSubmit}
        className={`shrink-0 bg-background ${isWidget ? "px-4 pb-4 pt-2" : "border-t border-border p-3"}`}
      >
        {showSendBriefCta ? (
          <Link
            href={contactSendHref}
            onClick={(e) => {
              openContactHandoff("brief");
              if (contactSendHref.startsWith("/#")) {
                e.preventDefault();
              }
            }}
            className={`flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-medium text-white transition hover:brightness-110 ${
              isWidget ? "rounded-[1.625rem]" : "rounded-[1.75rem]"
            }`}
          >
            <Send className="h-4 w-4" aria-hidden />
            Send your brief
          </Link>
        ) : (
          <div
            className={`flex items-end gap-2 border border-border bg-muted/30 px-3 py-2.5 shadow-inner focus-within:border-brand/40 focus-within:ring-1 focus-within:ring-brand/25 ${
              isWidget ? "rounded-[1.625rem]" : "rounded-[1.75rem]"
            }`}
          >
            <label htmlFor="cc-brief-chat" className="sr-only">
              Your message
            </label>
            <textarea
              id="cc-brief-chat"
              name="brief"
              rows={1}
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder={
                contactIntakeStep === "name"
                  ? "e.g. Cam Douglas"
                  : contactIntakeStep === "email"
                    ? "e.g. you@company.com.au"
                    : "Message…"
              }
              maxLength={600}
              className="max-h-28 min-h-[1.375rem] flex-1 resize-none border-0 bg-transparent py-0.5 text-[0.9rem] text-foreground outline-none placeholder:text-muted-foreground"
              disabled={inputDisabled}
            />
            <button
              type="submit"
              disabled={inputDisabled || !brief.trim()}
              aria-label={status === "submitting" ? "Sending" : ctaPrimary}
              className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition hover:opacity-90 disabled:opacity-40"
            >
              <ArrowUp className="h-4 w-4" aria-hidden />
            </button>
          </div>
        )}

        {error ? <p className="mt-2 text-center text-xs text-warn">{error}</p> : null}

        <p className="mt-2.5 text-center text-[0.68rem] leading-relaxed text-muted-foreground">
          {DISCLAIMER}
        </p>

        {showPresets ? (
          <div className="mt-3 border-t border-border/60 pt-3">
            <p className="text-center text-[0.65rem] font-medium uppercase tracking-[0.06em] text-muted-foreground/80">
              Examples
            </p>
            <ul className="mt-2 flex flex-wrap justify-center gap-1.5">
              {presets.map((p) => (
                <li key={p}>
                  <button
                    type="button"
                    onClick={() => applyPreset(p)}
                    disabled={inputDisabled}
                    className="rounded-full border border-border/80 bg-muted/40 px-2.5 py-1 text-[0.7rem] leading-snug text-ink-2 transition-colors hover:border-brand/40 hover:bg-muted hover:text-foreground disabled:opacity-50"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {!isWidget && !conversationDone ? (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-muted-foreground">
            {ctaSecondary ? (
              <Link
                href={ctaSecondary.href}
                className="hover:text-foreground hover:underline"
              >
                {ctaSecondary.label}
              </Link>
            ) : (
              <Link href="/engines" className="hover:text-foreground hover:underline">
                See the Engines first →
              </Link>
            )}
            <span>Two to four minutes for most briefs.</span>
          </div>
        ) : null}

      </form>
    </div>
  );
}

function introForVariant(variant: ControlCentreProps["variant"]) {
  return variant === "nexus" || variant === "page" ? NEXUS_GREETING : GREETING;
}

function ResetButton({
  onClick,
  disabled,
  className = "",
}: {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1 rounded-md border border-border bg-background/80 px-2 py-1 text-[0.7rem] font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:border-foreground/30 hover:text-foreground disabled:opacity-40 ${className}`}
      aria-label="Reset chat"
    >
      <RotateCcw className="h-3 w-3" aria-hidden />
      Reset
    </button>
  );
}

/** Messages sent to the recommender API (excludes static UI intro). */
function buildApiTranscript(
  messages: ChatMessage[],
  userMsg: ChatMessage,
  visitorName?: string,
  visitorEmail?: string,
): Array<{ role: "user" | "assistant"; content: string }> {
  const merged = [...messages, userMsg]
    .filter((m) => m.id !== "welcome")
    .map(({ role, content }) => ({ role, content }));
  return stripContactIntakeFromTranscript(merged, visitorName, visitorEmail);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ChatBubble({
  role,
  content,
  widget,
}: {
  role: "assistant" | "user";
  content: string;
  widget?: boolean;
}) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <p
          className={`max-w-[88%] leading-relaxed text-foreground ${
            widget
              ? "rounded-2xl rounded-tr-md bg-muted/80 px-3.5 py-2.5 text-[0.9rem]"
              : "rounded-2xl rounded-tr-sm bg-muted px-4 py-2.5 text-[0.9375rem]"
          }`}
        >
          {content}
        </p>
      </div>
    );
  }

  return <AssistantBubble content={content} widget={widget} />;
}

function AssistantBubble({
  content,
  widget,
}: {
  content: string;
  widget?: boolean;
}) {
  const shell = widget
    ? "max-w-[92%] text-[0.9rem] text-ink-2"
    : "max-w-[92%] rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-[0.9375rem] text-foreground";

  return (
    <div className={shell}>
      <BriefMarkdown content={content} />
    </div>
  );
}

function TypingIndicator({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={label ?? "Assistant is typing"}>
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
      {label ? (
        <span className="text-xs text-muted-foreground">{label}</span>
      ) : null}
    </div>
  );
}
