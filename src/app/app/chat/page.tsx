"use client";

import { Suspense, useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Send, Star, Sparkles, Paperclip, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Topbar } from "@/components/dashboard/Topbar";
import { ChatProvider, useChat, generateGabiReply, type Chat } from "@/lib/chat";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/cn";

export default function ChatPage() {
  return (
    <ChatProvider>
      <Suspense fallback={null}>
        <ChatInner />
      </Suspense>
    </ChatProvider>
  );
}

function ChatInner() {
  const params = useSearchParams();
  const initialQ = params.get("q") ?? "";
  const { chats, newChat, appendMessage, hydrated } = useChat();
  const { session } = useSession();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState(initialQ);
  const [typing, setTyping] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const initialSentRef = useRef(false);

  // Pick or create active chat on hydrate
  useEffect(() => {
    if (!hydrated) return;
    if (activeId) return;
    if (chats.length > 0) {
      setActiveId(chats[0].id);
    } else {
      const id = newChat();
      setActiveId(id);
    }
  }, [hydrated, chats, activeId, newChat]);

  // If we arrived with ?q=, send it once
  useEffect(() => {
    if (!activeId || !initialQ || initialSentRef.current) return;
    initialSentRef.current = true;
    sendMessage(initialQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  const active = chats.find((c) => c.id === activeId);

  const sendMessage = async (text: string) => {
    if (!activeId || !text.trim()) return;
    appendMessage(activeId, { role: "user", body: text.trim() });
    setDraft("");
    setTyping(true);
    await new Promise((r) => setTimeout(r, 700 + Math.random() * 600));
    appendMessage(activeId, { role: "gabi", body: generateGabiReply(text, session?.profile.firstName ?? "") });
    setTyping(false);
  };

  const handleNew = () => {
    const id = newChat();
    setActiveId(id);
  };

  return (
    <>
      <Topbar title="Chat with Dr. Gabi" />

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] min-h-[calc(100dvh-64px)]">
        {/* History rail */}
        <aside className="hidden lg:flex flex-col border-r border-[var(--border)] bg-[var(--surface-elev)]">
          <div className="px-5 pt-5 pb-3">
            <button
              onClick={handleNew}
              type="button"
              className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] text-[var(--bg)] text-[13px] font-medium hover:scale-[1.01] active:scale-[0.99] transition-transform"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.25} />
              New chat
            </button>
          </div>
          <ChatHistory chats={chats} activeId={activeId} onSelect={setActiveId} />
        </aside>

        {/* Conversation */}
        <main className="relative flex flex-col">
          {/* Mobile history bar */}
          <div className="lg:hidden border-b border-[var(--border)] px-4 py-2 flex items-center justify-between bg-[var(--surface-elev)]">
            <button
              type="button"
              onClick={() => setHistoryOpen((o) => !o)}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-full text-[13px] text-ink-muted hover:text-ink hover:bg-[var(--surface)] transition-colors"
            >
              <MessageSquare className="h-4 w-4" strokeWidth={1.5} />
              History
            </button>
            <button
              type="button"
              onClick={handleNew}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-full text-[13px] text-ink-muted hover:text-ink hover:bg-[var(--surface)] transition-colors"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.25} />
              New
            </button>
          </div>

          {/* Mobile collapsible history panel */}
          {historyOpen && (
            <div className="lg:hidden border-b border-[var(--border)] bg-[var(--surface-elev)] max-h-[40vh] overflow-y-auto flex flex-col">
              <ChatHistory
                chats={chats}
                activeId={activeId}
                onSelect={(id) => { setActiveId(id); setHistoryOpen(false); }}
              />
            </div>
          )}

          {active && active.messages.length === 0 && <EmptyState onPick={(p) => sendMessage(p)} />}

          {active && active.messages.length > 0 && (
            <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8">
              <div className="max-w-3xl mx-auto space-y-6">
                {active.messages.map((m) => (
                  <Bubble key={m.id} role={m.role} body={m.body} />
                ))}
                {typing && <TypingIndicator />}
              </div>
            </div>
          )}

          {/* Composer */}
          <div className="sticky bottom-0 border-t border-[var(--border)] bg-[var(--bg)] px-6 sm:px-10 py-4">
            <Composer
              draft={draft}
              setDraft={setDraft}
              onSend={() => sendMessage(draft)}
            />
          </div>
        </main>
      </div>
    </>
  );
}

function ChatHistory({
  chats,
  activeId,
  onSelect,
}: {
  chats: Chat[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const grouped = useMemo(() => {
    const now = Date.now();
    const buckets: Record<string, Chat[]> = { Saved: [], Today: [], Yesterday: [], "Last 7 days": [], Older: [] };
    for (const c of chats) {
      const t = new Date(c.updatedAt).getTime();
      const days = (now - t) / (1000 * 60 * 60 * 24);
      if (c.starred) buckets.Saved.push(c);
      else if (days < 1) buckets.Today.push(c);
      else if (days < 2) buckets.Yesterday.push(c);
      else if (days < 7) buckets["Last 7 days"].push(c);
      else buckets.Older.push(c);
    }
    return buckets;
  }, [chats]);

  return (
    <nav className="flex-1 overflow-y-auto px-2 pb-4" aria-label="Chat history">
      {Object.entries(grouped).map(([group, list]) =>
        list.length === 0 ? null : (
          <section key={group} className="mt-3">
            <div className="px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-ink-soft">{group}</div>
            <ul>
              {list.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(c.id)}
                    className={cn(
                      "relative w-full text-left px-3 py-2.5 rounded-xl transition-colors",
                      activeId === c.id ? "bg-[var(--surface)]" : "hover:bg-[var(--surface)]",
                    )}
                  >
                    {activeId === c.id && (
                      <span aria-hidden className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-[var(--primary)]" />
                    )}
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[13px] font-medium text-ink truncate flex-1">{c.title}</span>
                      {c.starred && <Star className="h-3 w-3 text-[var(--accent)] fill-[var(--accent)]" />}
                    </div>
                    {c.messages.length > 0 && (
                      <div className="mt-0.5 text-[11px] text-ink-soft truncate">
                        {c.messages[c.messages.length - 1].body}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ),
      )}
    </nav>
  );
}

const SUGGESTED = [
  "How long until I notice effects?",
  "Is my BPC-157 dose right for me?",
  "What should I track each week?",
];

function EmptyState({ onPick }: { onPick: (p: string) => void }) {
  return (
    <div className="flex-1 flex items-center justify-center px-6 sm:px-10">
      <div className="max-w-xl text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--bg)]">
          <Sparkles className="h-6 w-6" strokeWidth={1.5} />
        </span>
        <h2 className="mt-6 text-[28px] sm:text-[32px] leading-[1.1] tracking-[-0.02em] font-semibold text-ink">
          Ask Dr. Gabi anything.
        </h2>
        <p className="mt-3 text-[15px] leading-[1.55] text-ink-muted">
          Your bloodwork, protocol, side effects, timeline — Dr. Gabi reads your record before answering.
        </p>
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {SUGGESTED.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onPick(s)}
              className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[13px] text-ink hover:border-[var(--ink)] transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5 text-[var(--primary)]" strokeWidth={1.5} />
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Bubble({ role, body }: { role: "user" | "gabi"; body: string }) {
  if (role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-end"
      >
        <div className="max-w-[80%] rounded-3xl rounded-tr-md bg-[var(--ink)] text-[var(--bg)] px-4 py-3 text-[14.5px] leading-[1.55]">
          {body}
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-3 max-w-[88%]"
    >
      <span className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--bg)] text-[10px] font-semibold tracking-wider">
        GABI
      </span>
      <div className="text-[15px] leading-[1.6] text-ink whitespace-pre-line">{body}</div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
      <span className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--bg)] text-[10px] font-semibold tracking-wider">
        GABI
      </span>
      <div className="flex gap-1 items-center h-8">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-ink-soft"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function Composer({
  draft,
  setDraft,
  onSend,
}: {
  draft: string;
  setDraft: (s: string) => void;
  onSend: () => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [draft]);

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onSend();
    }
    if (e.key === "Enter" && !e.shiftKey && draft.trim()) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-end gap-2 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] shadow-product px-3 py-2">
        <button
          type="button"
          aria-label="Attach"
          className="h-9 w-9 inline-flex items-center justify-center rounded-full text-ink-soft hover:text-ink hover:bg-[var(--surface-elev)] transition-colors"
        >
          <Paperclip className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <textarea
          ref={ref}
          rows={1}
          placeholder="Ask Dr. Gabi…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          className="flex-1 resize-none bg-transparent outline-none text-[15px] leading-[1.5] text-ink placeholder:text-ink-soft py-2 max-h-40"
        />
        <button
          type="button"
          aria-label="Send"
          onClick={onSend}
          disabled={!draft.trim()}
          className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-[var(--ink)] text-[var(--bg)] disabled:opacity-40 hover:scale-[1.05] active:scale-[0.95] transition-transform"
        >
          <Send className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
      <p className="mt-2 text-center text-[11px] text-ink-soft">
        Dr. Gabi provides clinical decision support. Final treatment decisions are made by your physician.
      </p>
    </div>
  );
}
