"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import {
  hasSeenThemeToggleHint,
  markThemeToggleHintSeen,
  onThemeToggleHintDismissed,
} from "@/app/_lib/theme-toggle-hint";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [hintActive, setHintActive] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setHintActive(!hasSeenThemeToggleHint());
    return onThemeToggleHintDismissed(() => setHintActive(false));
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  function handleToggle() {
    markThemeToggleHintSeen();
    setHintActive(false);
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      aria-label={
        hintActive
          ? "Switch appearance — light or dark"
          : "Toggle light or dark mode"
      }
      onClick={handleToggle}
      className={[
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-paper text-foreground transition-colors hover:border-foreground/40 hover:bg-paper-2",
        hintActive ? "theme-toggle-hint" : "",
      ].join(" ")}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" aria-hidden />
        ) : (
          <Moon className="h-4 w-4" aria-hidden />
        )
      ) : (
        <Sun className="h-4 w-4 opacity-70" aria-hidden />
      )}
    </button>
  );
}
