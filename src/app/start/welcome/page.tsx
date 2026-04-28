"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useSession } from "@/lib/session";

export default function WelcomePage() {
  const router = useRouter();
  const { session, hydrated } = useSession();

  useEffect(() => {
    if (!hydrated) return;
    if (!session) {
      router.replace("/start");
      return;
    }
    const t = setTimeout(() => router.push("/app"), 1800);
    return () => clearTimeout(t);
  }, [hydrated, session, router]);

  if (!hydrated || !session) return null;

  return (
    <div className="relative min-h-dvh flex items-center justify-center px-6">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, color-mix(in oklch, var(--sage) 20%, transparent), transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--sage)] text-[var(--bg)]"
        >
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </motion.div>

        <h1 className="text-[34px] sm:text-[40px] leading-[1.05] tracking-[-0.025em] font-semibold text-ink">
          You're in, {session.profile.firstName}.
        </h1>
        <p className="mt-4 text-[16px] leading-[1.55] text-ink-muted">
          Your protocol is being prepared. Dr. Gabi is reviewing the details and a licensed
          physician will approve your first order shortly.
        </p>

        <Link
          href="/app"
          className="mt-10 inline-flex items-center justify-center h-12 px-6 rounded-full bg-[var(--ink)] text-[var(--bg)] text-[14px] font-medium hover:scale-[1.02] active:scale-[0.99] transition-transform"
        >
          Go to dashboard
        </Link>
      </motion.div>
    </div>
  );
}
