"use client";

import Link from "next/link";
import { useState } from "react";
import { Settings2 } from "lucide-react";
import { motion } from "framer-motion";
import { ProgressRail } from "./ProgressRail";
import { SettingsDrawer } from "@/components/settings/SettingsDrawer";

export function OnboardingShell({
  step,
  children,
}: {
  step: number;
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="relative min-h-dvh flex flex-col">
      {/* Soft background atmosphere — continuity from landing hero */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, color-mix(in oklch, var(--sage) 14%, transparent), transparent 60%), radial-gradient(50% 40% at 0% 100%, color-mix(in oklch, var(--accent) 8%, transparent), transparent 65%)",
        }}
      />

      {/* Top chrome */}
      <header className="px-6 sm:px-10 py-5 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 group" aria-label="Back to Medici Biologics">
          <Logomark />
          <span className="text-[14px] font-semibold tracking-[-0.01em] text-ink hidden sm:inline">
            Medici Biologics
          </span>
        </Link>

        <div className="flex-1 flex justify-center">
          <ProgressRail currentStep={step} />
        </div>

        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open theme settings"
          className="h-10 w-10 inline-flex items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-[var(--surface-elev)] transition-colors"
        >
          <Settings2 className="h-[18px] w-[18px]" strokeWidth={1.5} />
        </button>
      </header>

      {/* Step content */}
      <motion.main
        key={step}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex items-center justify-center px-6 sm:px-10 py-10"
      >
        <div className="w-full max-w-md">{children}</div>
      </motion.main>

      <footer className="px-6 sm:px-10 py-5 text-[11px] text-ink-soft text-center">
        Encrypted, HIPAA-compliant, reviewed by licensed physicians.
      </footer>

      <SettingsDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}

function Logomark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden className="text-[var(--primary)]">
      <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.25" opacity="0.35" />
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.25" opacity="0.6" />
      <circle cx="11" cy="11" r="2" fill="currentColor" />
    </svg>
  );
}
