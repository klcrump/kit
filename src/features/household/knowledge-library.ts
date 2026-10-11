import { demoHousehold, type MemberId } from "@/lib/demo-household";
import { knowledgeToday, type HouseholdMemory } from "@/lib/demo-knowledge";

export type KnowledgeScope = "all" | "household" | MemberId;
export const knowledgePageSize = 8;

export function filterKnowledge(memories: HouseholdMemory[], scope: KnowledgeScope, query: string) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return memories.filter((memory) => {
    if (memory.expiresOn && memory.expiresOn < knowledgeToday) return false;
    if (scope !== "all" && memory.scope !== scope) return false;
    const name = memory.scope === "household" ? `${demoHousehold.name} household` : demoHousehold.members[memory.scope].name;
    const searchable = `${memory.statement} ${name}`.toLocaleLowerCase();
    return terms.every((term) => searchable.includes(term));
  });
}

export function knowledgePage(items: HouseholdMemory[], requestedPage: number) {
  const pageCount = Math.max(1, Math.ceil(items.length / knowledgePageSize));
  const page = Math.max(1, Math.min(requestedPage, pageCount));
  const start = (page - 1) * knowledgePageSize;
  return { items: items.slice(start, start + knowledgePageSize), page, pageCount, start };
}
