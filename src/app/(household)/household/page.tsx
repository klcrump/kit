import type { Metadata } from "next";
import { HouseholdOverview } from "@/features/household/household-overview";

export const metadata: Metadata = { title: "Household · Kit" };

export default function HouseholdPage() {
  return <HouseholdOverview />;
}
