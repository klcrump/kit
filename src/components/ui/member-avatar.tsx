"use client";

import { useHousehold } from "@/features/household/household-provider";
import { demoHousehold, type MemberId } from "@/lib/demo-household";

export function MemberAvatar({ memberId, className }: { memberId: MemberId; className: string }) {
  const { colors } = useHousehold();
  return <span aria-hidden="true" className={`${className} ${colors[memberId]}`}>{demoHousehold.members[memberId].firstName[0]}</span>;
}
