const STORAGE_KEY = "enginelabs-theme-toggle-seen";
const DISMISS_EVENT = "enginelabs:theme-hint-dismissed";

export function hasSeenThemeToggleHint(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(STORAGE_KEY) === "1";
}

export function markThemeToggleHintSeen(): void {
  localStorage.setItem(STORAGE_KEY, "1");
  window.dispatchEvent(new Event(DISMISS_EVENT));
}

export function onThemeToggleHintDismissed(listener: () => void): () => void {
  window.addEventListener(DISMISS_EVENT, listener);
  return () => window.removeEventListener(DISMISS_EVENT, listener);
}
