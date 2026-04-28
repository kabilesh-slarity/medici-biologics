"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createElement } from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "gabi";
  body: string;
  at: string;
  starred?: boolean;
};

export type Chat = {
  id: string;
  title: string;
  starred: boolean;
  messages: ChatMessage[];
  updatedAt: string;
};

const STORAGE_KEY = "medici.chat";

type Ctx = {
  chats: Chat[];
  hydrated: boolean;
  newChat: () => string;
  appendMessage: (chatId: string, msg: Omit<ChatMessage, "id" | "at">) => string;
  toggleStarChat: (chatId: string) => void;
  toggleStarMessage: (chatId: string, msgId: string) => void;
  setTitle: (chatId: string, title: string) => void;
  getChat: (chatId: string) => Chat | undefined;
};

const ChatCtx = createContext<Ctx | null>(null);

function genId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChats(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
    } catch {
      /* ignore */
    }
  }, [chats, hydrated]);

  const newChat = (): string => {
    const id = genId();
    const now = new Date().toISOString();
    setChats((cs) => [
      { id, title: "New conversation", starred: false, messages: [], updatedAt: now },
      ...cs,
    ]);
    return id;
  };

  const appendMessage = (chatId: string, msg: Omit<ChatMessage, "id" | "at">): string => {
    const id = genId();
    const at = new Date().toISOString();
    setChats((cs) =>
      cs.map((c) =>
        c.id === chatId
          ? {
              ...c,
              updatedAt: at,
              title: c.messages.length === 0 && msg.role === "user" ? truncate(msg.body, 48) : c.title,
              messages: [...c.messages, { ...msg, id, at }],
            }
          : c,
      ),
    );
    return id;
  };

  const toggleStarChat = (chatId: string) =>
    setChats((cs) => cs.map((c) => (c.id === chatId ? { ...c, starred: !c.starred } : c)));

  const toggleStarMessage = (chatId: string, msgId: string) =>
    setChats((cs) =>
      cs.map((c) =>
        c.id === chatId
          ? { ...c, messages: c.messages.map((m) => (m.id === msgId ? { ...m, starred: !m.starred } : m)) }
          : c,
      ),
    );

  const setTitle = (chatId: string, title: string) =>
    setChats((cs) => cs.map((c) => (c.id === chatId ? { ...c, title } : c)));

  const getChat = (chatId: string) => chats.find((c) => c.id === chatId);

  return createElement(
    ChatCtx.Provider,
    { value: { chats, hydrated, newChat, appendMessage, toggleStarChat, toggleStarMessage, setTitle, getChat } },
    children,
  );
}

export function useChat(): Ctx {
  const ctx = useContext(ChatCtx);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}

function truncate(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n - 1) + "…";
}

// Mock AI replies — keyed off user message
export function generateGabiReply(userText: string, firstName: string): string {
  const t = userText.toLowerCase();
  const name = firstName || "there";

  if (t.includes("dose") || t.includes("250") || t.includes("bpc")) {
    return `Your current BPC-157 protocol is 250 mcg twice daily, ${name}. We picked this dose based on your bloodwork and recovery goals. Most members feel the first signal in 7–10 days, full effects by week 3. Subcutaneous injection in the abdomen, rotated daily.`;
  }
  if (t.includes("effect") || t.includes("how long") || t.includes("notice")) {
    return `For BPC-157, expect early signals (sleep depth, gut comfort, soft-tissue recovery) in 7–10 days. Visible inflammation reduction usually appears around week 3. We'll log a check-in at week 4 to recalibrate if needed.`;
  }
  if (t.includes("stack") || t.includes("combine")) {
    return `Stacking is reasonable once your baseline protocol is stable, typically week 4. Common pairings with BPC-157 include TB-500 for tendon work or Ipamorelin for sleep architecture. I'll route any stack proposal to your physician for review.`;
  }
  if (t.includes("track") || t.includes("result") || t.includes("progress")) {
    return `Three signals matter most for your protocol: (1) subjective recovery score, (2) inflammatory markers (hsCRP, ESR), (3) any GI signal change. I can pre-fill a 60-second weekly check-in if you'd like.`;
  }
  if (t.includes("safe") || t.includes("side effect")) {
    return `BPC-157 has a strong safety profile in clinical literature, ${name}. Most reported events are minor — local injection site reaction or transient nausea. We screen for contraindications during intake and your physician reviews labs before approval.`;
  }
  if (t.includes("ship") || t.includes("deliver") || t.includes("when")) {
    return `Once your physician approves the protocol, the compounding lab ships within 48 hours. You'll receive a tracking link and the Certificate of Analysis at the same time.`;
  }
  return `Great question, ${name}. I'm reviewing your bloodwork against current peptide research and will route this to a physician if a clinical decision is needed. Anything specific you'd like me to factor in — recent symptoms, sleep, stress?`;
}
