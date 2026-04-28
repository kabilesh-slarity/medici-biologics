"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { StepShell } from "@/components/onboarding/StepShell";
import { Field } from "@/components/onboarding/Field";
import { Button } from "@/components/ui/Button";
import { useOnboarding, formatPhone, isValidPhone } from "@/lib/onboarding";

export default function StartPhonePage() {
  const router = useRouter();
  const { state, update, hydrated } = useOnboarding();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (hydrated && state.phone) setPhone(state.phone);
  }, [hydrated, state.phone]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPhone(phone)) {
      setError("Enter a 10-digit US mobile number.");
      return;
    }
    update({ phone });
    router.push("/start/verify");
  };

  return (
    <OnboardingShell step={1}>
      <StepShell
        eyebrow="Step 1 of 5"
        title="What's your mobile number?"
        subtitle="We'll text a 6-digit code to confirm it's you. Standard rates apply."
      >
        <form onSubmit={onSubmit} className="space-y-6">
          <Field
            ref={inputRef}
            type="tel"
            name="phone"
            label="Mobile number"
            placeholder="(555) 123-4567"
            value={phone}
            onChange={(e) => {
              setPhone(formatPhone(e.target.value));
              if (error) setError(undefined);
            }}
            onBlur={() => {
              if (phone && !isValidPhone(phone)) setError("Enter a 10-digit US mobile number.");
            }}
            inputMode="tel"
            autoComplete="tel"
            error={error}
            prefix={<span className="font-medium text-ink">🇺🇸 +1</span>}
          />

          <Button type="submit" size="lg" variant="primary" className="w-full h-14 text-[15px]">
            Send code
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Button>

          <p className="text-[12px] text-ink-soft text-center">
            By continuing, you agree to receive SMS messages. Reply STOP to unsubscribe.
          </p>
        </form>
      </StepShell>
    </OnboardingShell>
  );
}
