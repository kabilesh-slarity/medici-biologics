"use client";

// Onboarding — temporary state collected across the 5 /start steps.
// Persisted to localStorage("medici.onboarding") so a refresh restores
// the user to their last filled state. Cleared on payment success.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createElement } from "react";

export type OnboardingState = {
  phone: string;
  otp: string;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    dob: { month: string; day: string; year: string };
  };
  consents: { hipaa: boolean; telehealth: boolean; tos: boolean };
  payment: {
    cardNumber: string;
    exp: string;
    cvc: string;
    zip: string;
  };
};

const STORAGE_KEY = "medici.onboarding";

export const EMPTY_ONBOARDING: OnboardingState = {
  phone: "",
  otp: "",
  profile: { firstName: "", lastName: "", email: "", dob: { month: "", day: "", year: "" } },
  consents: { hipaa: false, telehealth: false, tos: false },
  payment: { cardNumber: "", exp: "", cvc: "", zip: "" },
};

type Ctx = {
  state: OnboardingState;
  hydrated: boolean;
  update: (partial: Partial<OnboardingState>) => void;
  updateProfile: (partial: Partial<OnboardingState["profile"]>) => void;
  updateConsents: (partial: Partial<OnboardingState["consents"]>) => void;
  updatePayment: (partial: Partial<OnboardingState["payment"]>) => void;
  clear: () => void;
};

const OnboardingCtx = createContext<Ctx | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(EMPTY_ONBOARDING);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...EMPTY_ONBOARDING, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const update = (p: Partial<OnboardingState>) => setState((s) => ({ ...s, ...p }));
  const updateProfile = (p: Partial<OnboardingState["profile"]>) =>
    setState((s) => ({ ...s, profile: { ...s.profile, ...p } }));
  const updateConsents = (p: Partial<OnboardingState["consents"]>) =>
    setState((s) => ({ ...s, consents: { ...s.consents, ...p } }));
  const updatePayment = (p: Partial<OnboardingState["payment"]>) =>
    setState((s) => ({ ...s, payment: { ...s.payment, ...p } }));

  const clear = () => {
    setState(EMPTY_ONBOARDING);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return createElement(
    OnboardingCtx.Provider,
    { value: { state, hydrated, update, updateProfile, updateConsents, updatePayment, clear } },
    children,
  );
}

export function useOnboarding(): Ctx {
  const ctx = useContext(OnboardingCtx);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}

// Helpers
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function isValidPhone(raw: string): boolean {
  return raw.replace(/\D/g, "").length === 10;
}

export function detectCardBrand(num: string): "visa" | "mastercard" | "amex" | "discover" | "unknown" {
  const n = num.replace(/\s/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  if (/^(6011|65|64[4-9])/.test(n)) return "discover";
  return "unknown";
}

export function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}
