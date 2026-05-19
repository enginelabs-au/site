"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CURRENCY_DISCLAIMER,
  DEFAULT_CURRENCY,
  type CurrencyCode,
  formatAmount,
  formatPriceBand,
} from "@/app/_lib/currency";

const STORAGE_KEY = "enginelabs-currency";

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatAmount: (amountAud: number) => string;
  formatBand: (fromAud: number, toAud?: number) => string;
  disclaimer: string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      if (stored && ["AUD", "USD", "GBP", "EUR", "NZD", "SGD"].includes(stored)) {
        setCurrencyState(stored);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      formatAmount: (amountAud) => formatAmount(amountAud, currency),
      formatBand: (fromAud, toAud) => formatPriceBand(fromAud, toAud, currency),
      disclaimer: CURRENCY_DISCLAIMER,
    }),
    [currency, setCurrency],
  );

  if (!ready) {
    return (
      <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
    );
  }

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return ctx;
}
