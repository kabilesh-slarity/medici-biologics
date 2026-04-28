"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { StepShell } from "@/components/onboarding/StepShell";
import { Button } from "@/components/ui/Button";
import { useOnboarding, formatPhone } from "@/lib/onboarding";
import { useSession } from "@/lib/session";

export default function VerifyPage() {
  const router = useRouter();
  const { state, update, hydrated } = useOnboarding();
  const { session, hydrated: sessionHydrated } = useSession();
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | undefined>();
  const [resendIn, setResendIn] = useState(30);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // If returning user, hop straight to dashboard
  useEffect(() => {
    if (sessionHydrated && session) router.replace("/app");
  }, [sessionHydrated, session, router]);

  useEffect(() => {
    if (!hydrated) return;
    if (!state.phone) router.replace("/start");
    inputs.current[0]?.focus();
  }, [hydrated, state.phone, router]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  const onChange = (i: number, v: string) => {
    const next = [...digits];
    if (v.length > 1) {
      // Paste handling
      const chars = v.replace(/\D/g, "").slice(0, 6).split("");
      for (let j = 0; j < chars.length && i + j < 6; j++) next[i + j] = chars[j];
      setDigits(next);
      const lastIdx = Math.min(i + chars.length, 5);
      inputs.current[lastIdx]?.focus();
    } else {
      next[i] = v.replace(/\D/g, "").slice(0, 1);
      setDigits(next);
      if (next[i] && i < 5) inputs.current[i + 1]?.focus();
    }
    if (error) setError(undefined);
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) inputs.current[i + 1]?.focus();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length !== 6) {
      setError("Enter all 6 digits.");
      return;
    }
    update({ otp: code });
    router.push("/start/profile");
  };

  return (
    <OnboardingShell step={2}>
      <StepShell
        eyebrow="Step 2 of 5"
        title="Enter your code."
        subtitle={`Code sent to ${state.phone ? formatPhone(state.phone) : "your phone"}.`}
        back="/start"
      >
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex justify-between gap-2 sm:gap-3" role="group" aria-label="One time code">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={i === 0 ? 6 : 1}
                value={d}
                onChange={(e) => onChange(i, e.target.value)}
                onKeyDown={(e) => onKeyDown(i, e)}
                aria-label={`Digit ${i + 1}`}
                className="h-14 w-full sm:h-16 text-center text-[24px] font-semibold tabular text-ink bg-[var(--surface)] border border-[var(--border)] rounded-2xl focus:border-[var(--ink)] focus:outline-none transition-colors"
              />
            ))}
          </div>

          {error && (
            <p role="alert" aria-live="polite" className="text-[12px] text-[var(--danger)] text-center">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" variant="primary" className="w-full h-14 text-[15px]">
            Verify
          </Button>

          <div className="text-center text-[13px] text-ink-muted">
            {resendIn > 0 ? (
              <>Resend code in {resendIn}s</>
            ) : (
              <button type="button" onClick={() => setResendIn(30)} className="text-ink hover:underline">
                Resend code
              </button>
            )}
            <span className="mx-2 text-ink-soft">·</span>
            <Link href="/start" className="text-ink-muted hover:text-ink">
              Change number
            </Link>
          </div>
        </form>
      </StepShell>
    </OnboardingShell>
  );
}
