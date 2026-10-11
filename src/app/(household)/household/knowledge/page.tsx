import type { Metadata } from "next";
import { KnowledgeExperience } from "@/features/household/knowledge-experience";
import { demoHousehold } from "@/lib/demo-household";
import type { KnowledgeScope } from "@/features/household/knowledge-library";

export const metadata: Metadata = { title: "What Kit Knows · Kit" };

export default async function KnowledgePage({ searchParams }: { searchParams: Promise<{ member?: string | string[] }> }) {
  const { member } = await searchParams;
  const selectedScope = typeof member === "string" && (member === "household" || Object.hasOwn(demoHousehold.members, member)) ? member as KnowledgeScope : "all";
  return <KnowledgeExperience selectedScope={selectedScope} />;
}
