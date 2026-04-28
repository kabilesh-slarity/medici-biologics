"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/session";

export function RequireSession({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { session, hydrated } = useSession();

  useEffect(() => {
    if (hydrated && !session) router.replace("/start");
  }, [hydrated, session, router]);

  if (!hydrated) return <div aria-hidden className="min-h-dvh" />;
  if (!session) return null;
  return <>{children}</>;
}
