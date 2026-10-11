import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { HouseholdProvider } from "@/features/household/household-provider";

export default function HouseholdLayout({ children }: { children: ReactNode }) {
  return <HouseholdProvider><AppShell>{children}</AppShell></HouseholdProvider>;
}
