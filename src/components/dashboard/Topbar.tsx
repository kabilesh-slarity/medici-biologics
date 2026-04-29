"use client";

import { useState } from "react";
import { Bell, Settings2 } from "lucide-react";
import { SettingsDrawer } from "@/components/settings/SettingsDrawer";

export function Topbar({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-30 h-16 px-6 sm:px-8 flex items-center justify-between border-b border-[var(--border)] bg-[color-mix(in_oklch,var(--bg)_80%,transparent)] backdrop-blur-md">
        <h1 className="text-[18px] font-semibold tracking-[-0.012em] text-ink">{title}</h1>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Notifications"
            className="relative h-10 w-10 inline-flex items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-[var(--surface-elev)] transition-colors"
          >
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.5} />
            <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Open theme settings"
            onClick={() => setOpen(true)}
            className="h-10 w-10 hidden sm:inline-flex items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-[var(--surface-elev)] transition-colors"
          >
            <Settings2 className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </button>
        </div>
      </header>
      <SettingsDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
