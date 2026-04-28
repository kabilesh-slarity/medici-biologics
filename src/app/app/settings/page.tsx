"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  CreditCard,
  Receipt,
  Lock,
  Palette,
  LogOut,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { Topbar } from "@/components/dashboard/Topbar";
import { useSession } from "@/lib/session";
import { useSettings, type FontChoice, type Palette as PaletteT, isValidHex, normalizeHex } from "@/lib/theme";
import { THEME_PRESETS, type ThemePreset } from "@/lib/themePresets";
import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";

const SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "subscription", label: "Subscription", icon: CreditCard },
  { id: "billing", label: "Billing", icon: Receipt },
  { id: "privacy", label: "Privacy", icon: Lock },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function SettingsPage() {
  const { session, signOut } = useSession();
  const router = useRouter();

  const onSignOut = () => {
    signOut();
    router.replace("/");
  };

  if (!session) return null;

  return (
    <>
      <Topbar title="Settings" />
      <div className="px-6 sm:px-8 py-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10">
          {/* Sub-rail */}
          <nav aria-label="Settings sections" className="hidden lg:block">
            <ul className="sticky top-24 space-y-0.5">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex items-center gap-2.5 h-9 px-3 rounded-xl text-[13px] text-ink-muted hover:text-ink hover:bg-[var(--surface-elev)] transition-colors"
                  >
                    <s.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-6">
            {/* Profile */}
            <Section id="profile" title="Profile" subtitle="Personal details we have on file.">
              <Row label="Name" value={`${session.profile.firstName} ${session.profile.lastName}`} />
              <Row label="Email" value={session.profile.email} />
              <Row label="Phone" value={session.profile.phone} />
              <Row
                label="Date of birth"
                value={`${session.profile.dob.month}/${session.profile.dob.day}/${session.profile.dob.year}`}
              />
            </Section>

            {/* Subscription */}
            <Section id="subscription" title="Subscription" subtitle="Your Founding Member plan.">
              <div className="rounded-2xl bg-[var(--surface-elev)] border border-[var(--border)] p-5">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <div>
                    <div className="text-[15px] font-semibold text-ink">Founding Member</div>
                    <div className="text-[12px] text-ink-soft mt-1">
                      Joined {new Date(session.paidAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-[var(--sage)]/15 text-[color-mix(in_oklch,var(--sage)_60%,var(--ink))] text-[11px] font-medium">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                    Active
                  </span>
                </div>
                <div className="mt-5 pt-5 border-t border-[var(--border)] grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.12em] text-ink-soft">Rate</div>
                    <div className="mt-1 text-[14px] font-semibold tabular text-ink">$19 / month</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.12em] text-ink-soft">Locked until</div>
                    <div className="mt-1 text-[14px] font-semibold tabular text-ink">Forever</div>
                  </div>
                </div>
              </div>
            </Section>

            {/* Billing */}
            <Section id="billing" title="Billing" subtitle="Payment method and invoices.">
              <div className="flex items-center gap-3 rounded-2xl bg-[var(--surface-elev)] border border-[var(--border)] p-4">
                <span className="inline-flex h-9 w-12 items-center justify-center rounded-md bg-[var(--surface)] border border-[var(--border)] text-[10px] font-semibold tabular tracking-wider text-ink uppercase">
                  {session.cardBrand}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-ink">•••• •••• •••• {session.cardLast4}</div>
                  <div className="text-[11px] text-ink-soft">Default payment method</div>
                </div>
                <button type="button" className="text-[12px] text-ink-muted hover:text-ink">
                  Update
                </button>
              </div>
              <div className="mt-3">
                <div className="text-[11px] uppercase tracking-[0.12em] text-ink-soft mb-2">Invoices</div>
                <ul className="divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] overflow-hidden">
                  <InvoiceRow date={new Date(session.paidAt)} amount="$228.00" desc="Founding Member · year one" />
                </ul>
              </div>
            </Section>

            {/* Privacy */}
            <Section id="privacy" title="Privacy" subtitle="Control how your data is used.">
              <ToggleRow label="Email reminders" defaultOn />
              <ToggleRow label="SMS reminders" defaultOn />
              <ToggleRow label="Share anonymized data with research partners" />
            </Section>

            {/* Appearance */}
            <Section id="appearance" title="Appearance" subtitle="Theme, palette, and font.">
              <AppearancePanel />
            </Section>

            {/* Sign out */}
            <div className="pt-4">
              <button
                type="button"
                onClick={onSignOut}
                className="inline-flex items-center gap-2 h-10 px-4 rounded-full text-[13px] text-[var(--danger)] hover:bg-[var(--danger)]/10 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="rounded-[24px] bg-[var(--surface)] border border-[var(--border)] p-7">
      <h2 className="text-[20px] font-semibold tracking-[-0.012em] text-ink">{title}</h2>
      {subtitle && <p className="mt-1 text-[13px] text-ink-muted">{subtitle}</p>}
      <div className="mt-6 space-y-3">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 border-b border-[var(--border)] last:border-0">
      <span className="text-[12px] uppercase tracking-[0.12em] text-ink-soft">{label}</span>
      <span className="text-[14px] text-ink font-medium tabular truncate">{value}</span>
    </div>
  );
}

function InvoiceRow({ date, amount, desc }: { date: Date; amount: string; desc: string }) {
  return (
    <li className="flex items-center gap-4 px-4 py-3.5 bg-[var(--surface-elev)]">
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-ink">{desc}</div>
        <div className="text-[11px] text-ink-soft">
          {date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
        </div>
      </div>
      <div className="text-[13px] tabular text-ink">{amount}</div>
      <button type="button" className="text-[12px] text-ink-muted hover:text-ink">
        PDF
      </button>
    </li>
  );
}

function ToggleRow({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((o) => !o)}
      className="w-full flex items-center justify-between gap-4 py-3 border-b border-[var(--border)] last:border-0 text-left"
    >
      <span className="text-[14px] text-ink">{label}</span>
      <span
        className={cn(
          "relative h-6 w-10 rounded-full transition-colors",
          on ? "bg-[var(--primary)]" : "bg-[var(--border)]",
        )}
      >
        <motion.span
          layout
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-[var(--bg)] shadow-card"
          style={{ left: on ? "calc(100% - 22px)" : "0.125rem" }}
        />
      </span>
    </button>
  );
}

function AppearancePanel() {
  const { theme, setTheme } = useTheme();
  const { settings, effectivePalette, setPreset, setPalette, setFont, resetToPreset, preset } = useSettings();

  return (
    <div className="space-y-7">
      {/* Mode */}
      <div>
        <div className="eyebrow mb-3">Mode</div>
        <div className="grid grid-cols-2 gap-1 p-1 bg-[var(--surface-elev)] rounded-full max-w-xs">
          {(["light", "dark"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setTheme(m)}
              aria-pressed={theme === m}
              className={cn(
                "h-9 rounded-full text-[13px] font-medium transition-colors capitalize",
                theme === m ? "bg-[var(--surface)] text-ink shadow-[0_1px_0_var(--border)]" : "text-ink-muted hover:text-ink",
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Theme presets */}
      <div>
        <div className="eyebrow mb-3">Theme</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {THEME_PRESETS.map((p) => (
            <PresetTile key={p.id} preset={p} active={settings.presetId === p.id} onClick={() => setPreset(p.id)} />
          ))}
        </div>
      </div>

      {/* Customize */}
      <div>
        <div className="eyebrow mb-3">Customize</div>
        <div className="space-y-3">
          {(["primary", "accent", "sage"] as (keyof PaletteT)[]).map((k) => (
            <div key={k} className="flex items-center gap-3">
              <label className="flex-1 text-[13px] text-ink capitalize">{k}</label>
              <input
                type="color"
                aria-label={`${k} color`}
                value={effectivePalette[k]}
                onChange={(e) => setPalette({ [k]: e.target.value } as Partial<PaletteT>)}
                className="h-9 w-9 rounded-full border border-[var(--border)] cursor-pointer overflow-hidden p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-full"
                style={{ background: effectivePalette[k] }}
              />
              <input
                type="text"
                aria-label={`${k} hex`}
                value={effectivePalette[k].toUpperCase()}
                onChange={(e) => {
                  const v = e.target.value;
                  if (isValidHex(v)) setPalette({ [k]: normalizeHex(v) } as Partial<PaletteT>);
                }}
                className="w-[92px] h-9 px-3 text-[12px] tabular bg-[var(--surface-elev)] border border-[var(--border)] rounded-md focus:outline-none focus:border-[var(--primary)] text-ink"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={resetToPreset}
          className="mt-4 text-[12px] text-ink-muted hover:text-ink underline-offset-4 hover:underline"
        >
          Reset to {preset.name} defaults
        </button>
      </div>

      {/* Font */}
      <div>
        <div className="eyebrow mb-3">Font</div>
        <div className="grid grid-cols-2 gap-1 p-1 bg-[var(--surface-elev)] rounded-full max-w-xs">
          {(["inter", "inter-tight"] as FontChoice[]).map((f) => (
            <button
              key={f}
              onClick={() => setFont(f)}
              aria-pressed={settings.font === f}
              className={cn(
                "h-9 rounded-full text-[13px] font-medium transition-colors",
                settings.font === f ? "bg-[var(--surface)] text-ink shadow-[0_1px_0_var(--border)]" : "text-ink-muted hover:text-ink",
              )}
            >
              {f === "inter" ? "Inter" : "Inter Tight"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PresetTile({
  preset,
  active,
  onClick,
}: {
  preset: ThemePreset;
  active: boolean;
  onClick: () => void;
}) {
  const swatch = preset.light;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative rounded-[18px] border p-3 text-left transition-all overflow-hidden",
        active ? "border-[var(--ink)] shadow-[0_0_0_1px_var(--ink)]" : "border-[var(--border)] hover:border-[var(--ink)]",
      )}
      style={{ backgroundColor: swatch.surface ?? "var(--surface)" }}
    >
      <div className="flex h-7 rounded-md overflow-hidden border border-[var(--border)] mb-2.5">
        <span className="flex-1" style={{ backgroundColor: swatch.bg ?? "var(--bg)" }} />
        <span className="flex-1" style={{ backgroundColor: swatch.primary }} />
        <span className="flex-1" style={{ backgroundColor: swatch.accent }} />
        <span className="flex-1" style={{ backgroundColor: swatch.sage }} />
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-semibold" style={{ color: swatch.ink ?? "var(--ink)" }}>
          {preset.name}
        </span>
        {active && (
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full" style={{ backgroundColor: swatch.primary, color: "#fff" }}>
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
          </span>
        )}
      </div>
    </button>
  );
}
