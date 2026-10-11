"use client";

import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { demoHousehold, type MemberId } from "@/lib/demo-household";
import { demoKnowledge, type HouseholdMemory } from "@/lib/demo-knowledge";

type HouseholdState = {
  colors: Record<MemberId, string>;
  setMemberColor: (memberId: MemberId, color: string) => void;
  memories: HouseholdMemory[];
  setMemories: Dispatch<SetStateAction<HouseholdMemory[]>>;
};

const HouseholdContext = createContext<HouseholdState | null>(null);

// Shared across household routes; deliberately resets on a full page reload.
export function HouseholdProvider({ children }: { children: ReactNode }) {
  const [colors, setColors] = useState<Record<MemberId, string>>(() => ({
    alex: demoHousehold.members.alex.color,
    jordan: demoHousehold.members.jordan.color,
    emma: demoHousehold.members.emma.color,
    mason: demoHousehold.members.mason.color,
    harper: demoHousehold.members.harper.color,
  }));
  const [memories, setMemories] = useState<HouseholdMemory[]>(() => demoKnowledge.map((memory) => ({ ...memory })));

  function setMemberColor(memberId: MemberId, color: string) {
    setColors((current) => ({ ...current, [memberId]: color }));
  }

  return <HouseholdContext.Provider value={{ colors, setMemberColor, memories, setMemories }}>{children}</HouseholdContext.Provider>;
}

export function useHousehold() {
  const context = useContext(HouseholdContext);
  if (!context) throw new Error("useHousehold must be used within HouseholdProvider");
  return context;
}
