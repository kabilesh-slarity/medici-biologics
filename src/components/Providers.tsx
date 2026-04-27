"use client";

import { ThemeProvider } from "next-themes";
import { SettingsProvider } from "@/lib/theme";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="theme">
      <SettingsProvider>{children}</SettingsProvider>
    </ThemeProvider>
  );
}
