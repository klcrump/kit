import { demoHousehold, type MemberId } from "@/lib/demo-household";

export function MemberLabel({ memberId }: { memberId: MemberId }) {
  const member = demoHousehold.members[memberId];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted" title={member.name}>
      <span aria-hidden="true" className={`size-2 rounded-full ${member.color}`} />
      {member.firstName}
    </span>
  );
}
