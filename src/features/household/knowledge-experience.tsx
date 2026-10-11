"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Clock3, House, NotebookPen, Search, ShieldCheck, X } from "lucide-react";
import { MemberLabel } from "@/components/ui/member-label";
import { demoHousehold } from "@/lib/demo-household";
import { knowledgeGroups, knowledgeToday, memoryConfidence, type HouseholdMemory } from "@/lib/demo-knowledge";
import { useHousehold } from "@/features/household/household-provider";
import { MemoryDetails } from "@/features/household/memory-details";
import { filterKnowledge, knowledgePage, type KnowledgeScope } from "@/features/household/knowledge-library";

const groupIcons = { preferences: NotebookPen, rules: ShieldCheck, temporary: Clock3 };
const scopes = [
  { id: "all", label: "All" },
  { id: "household", label: "Household" },
  ...Object.values(demoHousehold.members).map((member) => ({ id: member.id, label: member.firstName })),
] satisfies { id: KnowledgeScope; label: string }[];

function KnowledgeResults({ memories, onOpen }: { memories: HouseholdMemory[]; onOpen: (id: string, event: MouseEvent<HTMLButtonElement>) => void }) {
  const [pages, setPages] = useState({ preferences: 1, rules: 1, temporary: 1 });
  return <div className="mt-6 space-y-8">
    {knowledgeGroups.map((group) => {
      const items = memories.filter((memory) => memory.group === group.id);
      if (!items.length) return null;
      const slice = knowledgePage(items, pages[group.id]);
      const Icon = groupIcons[group.id];
      return <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`}>
        <div className="flex items-center gap-3"><Icon aria-hidden="true" strokeWidth={1.5} className="size-4 text-primary" /><h2 id={`${group.id}-heading`} className="font-display text-2xl text-primary-dark">{group.title}</h2><span className="text-xs text-muted">{items.length}</span></div>
        <ul className="mt-3 divide-y divide-border border-y border-border">
          {slice.items.map((memory) => <li key={memory.id}>
            <button type="button" aria-haspopup="dialog" onClick={(event) => onOpen(memory.id, event)} className="flex w-full cursor-pointer items-center gap-3 py-3.5 text-left hover:bg-surface-secondary">
              <span className={`flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4 ${memory.type === "Rule" ? "border-l-2 border-primary pl-3" : ""}`}>
                <span className="shrink-0 sm:w-20">{memory.scope === "household" ? <span className="inline-flex items-center gap-1.5 text-xs text-muted"><House aria-hidden="true" className="size-3.5" />Household</span> : <MemberLabel memberId={memory.scope} />}</span>
                <span className="min-w-0 flex-1"><span className="line-clamp-2 text-sm font-medium leading-6 text-primary-dark">{memory.statement}</span></span>
                <span className={`shrink-0 text-xs ${memory.type === "Rule" ? "text-primary" : "text-muted"}`}>
                  {memory.type === "Temporary context" && memory.expiresOn ? <>Ends <time dateTime={memory.expiresOn}>{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${memory.expiresOn}T00:00:00Z`))}</time></> : <>{memory.type}{memoryConfidence(memory) === "Still learning" ? " · Still learning" : ""}</>}
                </span>
              </span>
              <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-muted" />
            </button>
          </li>)}
        </ul>
        {slice.pageCount > 1 && <nav aria-label={`${group.title} pages`} className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
          <p>{slice.start + 1}–{slice.start + slice.items.length} of {items.length}</p>
          <div className="flex items-center gap-4">
            <button type="button" aria-label={`Previous ${group.title.toLowerCase()} page`} disabled={slice.page === 1} onClick={() => setPages((current) => ({ ...current, [group.id]: slice.page - 1 }))} className="inline-flex min-h-10 items-center gap-1 text-primary disabled:text-muted disabled:opacity-40"><ChevronLeft aria-hidden="true" className="size-4" />Previous</button>
            <span>Page {slice.page} of {slice.pageCount}</span>
            <button type="button" aria-label={`Next ${group.title.toLowerCase()} page`} disabled={slice.page === slice.pageCount} onClick={() => setPages((current) => ({ ...current, [group.id]: slice.page + 1 }))} className="inline-flex min-h-10 items-center gap-1 text-primary disabled:text-muted disabled:opacity-40">Next<ChevronRight aria-hidden="true" className="size-4" /></button>
          </div>
        </nav>}
      </section>;
    })}
  </div>;
}

export function KnowledgeExperience({ selectedScope = "all" }: { selectedScope?: KnowledgeScope }) {
  const { memories, setMemories } = useHousehold();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const selectedMemory = memories.find((memory) => memory.id === selectedId);
  const activeMemories = filterKnowledge(memories, "all", "");
  const matches = filterKnowledge(memories, selectedScope, query);
  const user = demoHousehold.members[demoHousehold.primaryUserId];
  const scopeLabel = scopes.find((scope) => scope.id === selectedScope)?.label;

  function openMemory(id: string, event: MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setSelectedId(id);
    setAnnouncement("");
    dialogRef.current?.showModal();
  }

  function closeMemory() {
    setSelectedId(null);
    requestAnimationFrame(() => {
      if (triggerRef.current?.isConnected) triggerRef.current.focus({ preventScroll: true });
      else searchRef.current?.focus({ preventScroll: true });
    });
  }

  function saveMemory(id: string, statement: string) {
    setMemories((current) => current.map((memory) => memory.id === id ? { ...memory, statement, editedOn: knowledgeToday, confidence: undefined } : memory));
    setAnnouncement("Saved. Kit’s remembered statement has been updated.");
  }

  function removeMemory(id: string, ended: boolean) {
    dialogRef.current?.close();
    setMemories((current) => current.filter((memory) => memory.id !== id));
    setAnnouncement(ended ? "Temporary context ended. It is no longer active." : "Memory forgotten. It is no longer included in what Kit knows.");
  }

  return (
    <main id="main" className="mx-auto max-w-5xl px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
      <Link href="/household" className="inline-flex min-h-10 items-center gap-2 text-sm text-muted hover:text-primary"><ArrowLeft aria-hidden="true" className="size-4" /> Household</Link>
      <header className="mt-4">
        <h1 className="font-display text-4xl leading-tight tracking-tight text-primary-dark sm:text-5xl">What Kit Knows</h1>
        <p className="mt-3 max-w-xl text-base leading-7 text-muted">The things Kit remembers so it can help without asking the same questions again.</p>
        <p className="mt-3 text-sm leading-6 text-muted">You’re in control. Correct a detail, forget it, or end context that no longer applies.</p>
      </header>
      <div className="relative mt-7">
        <label htmlFor="knowledge-search" className="sr-only">Search what Kit knows</label>
        <Search aria-hidden="true" strokeWidth={1.5} className="pointer-events-none absolute left-4 top-4 size-5 text-muted" />
        <input ref={searchRef} id="knowledge-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search what Kit knows…" className="block w-full rounded-kit border border-border bg-surface py-3.5 pr-14 pl-12 text-base text-foreground placeholder:text-muted [&::-webkit-search-cancel-button]:appearance-none" />
        {query && <button type="button" aria-label="Clear search" onClick={() => { setQuery(""); searchRef.current?.focus(); }} className="absolute right-2 top-1.5 flex size-10 items-center justify-center rounded-kit text-muted hover:bg-surface-secondary hover:text-primary"><X aria-hidden="true" className="size-4" /></button>}
      </div>
      <dl aria-label="Household knowledge overview" className="mt-6 grid gap-4 border-b border-border pb-6 sm:grid-cols-3 sm:gap-6">
        {knowledgeGroups.map((group) => <div key={group.id}><dt className="text-sm font-medium text-primary-dark">{group.title}</dt><dd className="mt-1 text-xs leading-5 text-muted"><span className="font-medium text-primary-dark">{activeMemories.filter((memory) => memory.group === group.id).length}</span> {group.id === "preferences" ? "things learned" : group.id === "rules" ? "explicit constraints" : "currently active"}</dd></div>)}
      </dl>
      <nav aria-label="Filter knowledge by household member" className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-1">
        {scopes.map((scope) => <Link key={scope.id} href={scope.id === "all" ? "/household/knowledge" : `/household/knowledge?member=${scope.id}`} scroll={false} aria-current={selectedScope === scope.id ? "true" : undefined} className={`inline-flex min-h-10 items-center rounded-kit px-3 text-sm ${selectedScope === scope.id ? "bg-surface-secondary font-medium text-primary" : "text-muted hover:bg-surface-secondary hover:text-primary"}`}>{scope.label}</Link>)}
      </nav>
      <p role="status" className="mt-4 text-xs leading-6 text-muted">{matches.length} {matches.length === 1 ? "thing" : "things"}{query.trim() ? " found" : " remembered"} · {scopeLabel === "All" ? "All household knowledge" : scopeLabel}{query.trim() && <> · “{query.trim()}”</>}</p>
      <p role="status" className={announcement && !selectedMemory ? "mt-3 text-sm leading-6 text-primary" : "sr-only"}>{!selectedMemory ? announcement : ""}</p>
      {matches.length ? <KnowledgeResults key={`${selectedScope}:${query.trim().toLocaleLowerCase()}`} memories={matches} onOpen={openMemory} /> : <section className="mt-8 border-t border-border py-8"><h2 className="font-display text-2xl text-primary-dark">{query.trim() ? "No matching memories" : "Nothing remembered here right now"}</h2><p className="mt-2 text-sm leading-6 text-muted">{query.trim() ? "Try another word or look across all household knowledge." : "You can look across the household to see what else Kit knows."}</p><div className="mt-4 flex flex-wrap gap-5 text-sm text-primary">{query && <button type="button" onClick={() => { setQuery(""); searchRef.current?.focus(); }} className="min-h-10 hover:underline">Clear search</button>}{selectedScope !== "all" && <Link href="/household/knowledge" scroll={false} className="inline-flex min-h-10 items-center hover:underline">View all household knowledge</Link>}</div></section>}
      <dialog ref={dialogRef} onClose={closeMemory} aria-labelledby="memory-details-heading" className="fixed inset-0 m-auto max-h-[calc(100dvh_-_3rem)] w-[calc(100%_-_3rem)] max-w-xl overflow-y-auto rounded-kit border border-border bg-background p-6 text-foreground backdrop:bg-primary-dark/25 sm:p-8">
        <div className="flex items-start justify-between gap-4"><h2 id="memory-details-heading" className="font-display text-2xl text-primary-dark">What Kit knows.</h2><button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close memory details" className="flex size-10 shrink-0 items-center justify-center rounded-kit text-muted hover:bg-surface-secondary hover:text-primary"><X aria-hidden="true" className="size-5" /></button></div>
        {selectedMemory && <MemoryDetails key={selectedMemory.id} memory={selectedMemory} editorName={user.firstName} onSave={saveMemory} onRemove={removeMemory} />}
        <p role="status" className={announcement && selectedMemory ? "mt-3 text-sm leading-6 text-primary" : "sr-only"}>{selectedMemory ? announcement : ""}</p>
      </dialog>
    </main>
  );
}
