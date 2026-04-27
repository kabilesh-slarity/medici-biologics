"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import {
  useSettings,
  isValidHex,
  normalizeHex,
  DEFAULT_PALETTE_LIGHT,
  type FontChoice,
  type Palette,
} from "@/lib/theme";
import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";

export function SettingsDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement | null;
      const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(
        "button, [href], input, [tabindex]:not([tabindex='-1'])",
      );
      firstFocusable?.focus();
    } else {
      lastFocus.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          "button, [href], input:not([disabled]), [tabindex]:not([tabindex='-1'])",
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-[rgb(10_14_13_/_0.4)] z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Customize appearance"
            className="fixed right-0 top-0 bottom-0 z-[61] w-full sm:w-[380px] bg-[var(--surface)] border-l border-[var(--border)] overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--border)] sticky top-0 bg-[var(--surface)] z-10">
              <h2 className="text-[15px] font-semibold tracking-[-0.01em]">Customize</h2>
              <button
                onClick={onClose}
                aria-label="Close settings"
                className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-[var(--surface-elev)] text-ink-muted hover:text-ink"
              >
                <X className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
            </div>

            <div className="px-6 py-7 space-y-9">
              <ThemeSection />
              <ColorSection />
              <FontSection />
              <ResetSection />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function ThemeSection() {
  const { theme, setTheme } = useTheme();
  const opts: { v: "light" | "dark"; label: string }[] = [
    { v: "light", label: "Light" },
    { v: "dark", label: "Dark" },
  ];
  return (
    <section>
      <h3 className="eyebrow mb-3">Appearance</h3>
      <div className="grid grid-cols-2 gap-1 p-1 bg-[var(--surface-elev)] rounded-full">
        {opts.map((o) => (
          <button
            key={o.v}
            onClick={() => setTheme(o.v)}
            className={cn(
              "h-9 rounded-full text-[13px] font-medium transition-colors",
              theme === o.v
                ? "bg-[var(--surface)] text-ink shadow-[0_1px_0_var(--border)]"
                : "text-ink-muted hover:text-ink",
            )}
            aria-pressed={theme === o.v}
          >
            {o.label}
          </button>
        ))}
      </div>
    </section>
  );
}

function ColorSection() {
  const { settings, setPalette } = useSettings();
  const rows: { key: keyof Palette; label: string }[] = [
    { key: "primary", label: "Primary" },
    { key: "accent", label: "Accent" },
    { key: "sage", label: "Secondary" },
  ];
  return (
    <section>
      <h3 className="eyebrow mb-3">Color</h3>
      <div className="space-y-4">
        {rows.map((r) => (
          <ColorRow
            key={r.key}
            label={r.label}
            value={settings.palette[r.key]}
            onChange={(v) => setPalette({ [r.key]: v } as Partial<Palette>)}
          />
        ))}
      </div>
    </section>
  );
}

function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <label className="flex-1 text-[13px] text-ink">{label}</label>
      <input
        type="color"
        aria-label={`${label} color`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-9 rounded-full border border-[var(--border)] cursor-pointer overflow-hidden p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-full"
        style={{ background: value }}
      />
      <input
        type="text"
        aria-label={`${label} hex value`}
        value={value.toUpperCase()}
        onChange={(e) => {
          const v = e.target.value;
          if (isValidHex(v)) onChange(normalizeHex(v));
          else onChange(v);
        }}
        className="w-[90px] h-9 px-3 text-[12px] tabular bg-[var(--surface-elev)] border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--primary)]"
      />
    </div>
  );
}

function FontSection() {
  const { settings, setFont } = useSettings();
  const opts: { v: FontChoice; label: string }[] = [
    { v: "inter", label: "Inter" },
    { v: "inter-tight", label: "Inter Tight" },
  ];
  return (
    <section>
      <h3 className="eyebrow mb-3">Font</h3>
      <div className="grid grid-cols-2 gap-1 p-1 bg-[var(--surface-elev)] rounded-full">
        {opts.map((o) => (
          <button
            key={o.v}
            onClick={() => setFont(o.v)}
            className={cn(
              "h-9 rounded-full text-[13px] font-medium transition-colors",
              settings.font === o.v
                ? "bg-[var(--surface)] text-ink shadow-[0_1px_0_var(--border)]"
                : "text-ink-muted hover:text-ink",
            )}
            aria-pressed={settings.font === o.v}
          >
            {o.label}
          </button>
        ))}
      </div>
    </section>
  );
}

function ResetSection() {
  const { reset } = useSettings();
  return (
    <section className="pt-6 border-t border-[var(--border)]">
      <button
        onClick={reset}
        className="text-[13px] text-ink-muted hover:text-ink underline-offset-4 hover:underline"
      >
        Reset to defaults
      </button>
      <p className="mt-2 text-[12px] text-ink-muted">
        Defaults: forest ink {DEFAULT_PALETTE_LIGHT.primary.toUpperCase()} primary, aged bronze accent.
      </p>
    </section>
  );
}
