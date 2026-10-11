"use client";

import { demoHousehold, type MemberId } from "@/lib/demo-household";
import { useHousehold } from "@/features/household/household-provider";

export function MemberLabel({ memberId }: { memberId: MemberId }) {
  const member = demoHousehold.members[memberId];
  const { colors } = useHousehold();
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted" title={member.name}>
      <span aria-hidden="true" className={`size-2 rounded-full ${colors[memberId]}`} />
      {member.firstName}
    </span>
  );
}
