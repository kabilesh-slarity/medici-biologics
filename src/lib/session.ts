"use client";

// Session — represents a paid, signed-in member.
// Backed by localStorage("medici.session"). Mock-only (no real auth).

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createElement } from "react";

export type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  dob: { month: string; day: string; year: string };
  phone: string;
};

export type ProtocolStatus = "pending" | "approved" | "active" | "shipped";

export type Session = {
  mode: "demo";
  phone: string;
  profile: Profile;
  paidAt: string;
  protocolStatus: ProtocolStatus;
  cardLast4: string;
  cardBrand: "visa" | "mastercard" | "amex" | "discover" | "unknown";
};

const STORAGE_KEY = "medici.session";

type Ctx = {
  session: Session | null;
  hydrated: boolean;
  setSession: (s: Session | null) => void;
  signOut: () => void;
};

const SessionCtx = createContext<Ctx | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<Session | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSessionState(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const setSession = (s: Session | null) => {
    setSessionState(s);
    try {
      if (s) localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const signOut = () => setSession(null);

  return createElement(SessionCtx.Provider, { value: { session, hydrated, setSession, signOut } }, children);
}

export function useSession(): Ctx {
  const ctx = useContext(SessionCtx);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
