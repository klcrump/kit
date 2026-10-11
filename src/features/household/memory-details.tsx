"use client";

import { useRef, useState, type FormEvent } from "react";
import { House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MemberLabel } from "@/components/ui/member-label";
import { formatKnowledgeDate, memoryConfidence, type HouseholdMemory } from "@/lib/demo-knowledge";

type MemoryDetailsProps = {
  memory: HouseholdMemory;
  editorName: string;
  onSave: (id: string, statement: string) => void;
  onRemove: (id: string, ended: boolean) => void;
};

export function MemoryDetails({ memory, editorName, onSave, onRemove }: MemoryDetailsProps) {
  const [panel, setPanel] = useState<"edit" | "forget" | null>(null);
  const [draft, setDraft] = useState(memory.statement);
  const [error, setError] = useState("");
  const editRef = useRef<HTMLButtonElement>(null);
  const forgetRef = useRef<HTMLButtonElement>(null);
  const temporary = memory.type === "Temporary context";
  const confidenceLabel = memoryConfidence(memory);

  function closePanel() {
    const previousPanel = panel;
    setPanel(null);
    setError("");
    requestAnimationFrame(() => (previousPanel === "edit" ? editRef : forgetRef).current?.focus({ preventScroll: true }));
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const statement = draft.trim();
    if (!statement) {
      setError("Add a remembered statement before saving.");
      return;
    }
    onSave(memory.id, statement);
    closePanel();
  }

  return (
    <div className="mt-5">
      <div className={memory.type === "Rule" ? "border-l-2 border-primary pl-5" : ""}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className={`text-xs ${memory.type === "Rule" ? "font-medium text-primary" : "text-muted"}`}>{memory.type}</p>
          <span aria-hidden="true" className="text-border">·</span>
          {memory.scope === "household" ? <span className="inline-flex items-center gap-1.5 text-xs text-muted"><House aria-hidden="true" className="size-3.5" />Household</span> : <MemberLabel memberId={memory.scope} />}
        </div>

        {panel === "edit" ? (
          <form onSubmit={save} className="mt-4" onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); closePanel(); } }}>
            <label htmlFor={`statement-${memory.id}`} className="text-sm font-medium text-primary-dark">What should Kit remember?</label>
            <textarea id={`statement-${memory.id}`} autoFocus value={draft} onChange={(event) => { setDraft(event.target.value); setError(""); }} rows={3} maxLength={1000} aria-invalid={Boolean(error)} aria-describedby={error ? `error-${memory.id}` : undefined} className="mt-2 block w-full resize-y rounded-kit border border-border bg-surface px-4 py-3 text-base leading-7" />
            {error && <p id={`error-${memory.id}`} role="alert" className="mt-2 text-sm text-critical">{error}</p>}
            <div className="mt-3 flex flex-wrap items-center gap-4"><Button type="submit">Save changes</Button><button type="button" onClick={closePanel} className="min-h-11 text-sm text-muted hover:text-primary">Cancel</button></div>
          </form>
        ) : <h3 className="mt-3 max-w-2xl text-base font-medium leading-7 text-primary-dark sm:text-lg">{memory.statement}</h3>}

        {temporary && memory.expiresOn && <p className="mt-3 text-sm leading-6 text-primary">Active <span aria-hidden="true">·</span> Ends <time dateTime={memory.expiresOn}>{formatKnowledgeDate(memory.expiresOn)}</time></p>}

        <dl className="mt-5 space-y-3 text-sm leading-6">
          <div><dt className="text-xs text-muted">Applies to</dt><dd>{memory.scope === "household" ? "Household" : <MemberLabel memberId={memory.scope} />}</dd></div>
          <div><dt className="text-xs text-muted">Source</dt><dd>{memory.editedOn ? `Edited by ${editorName}` : memory.source}{confidenceLabel && <span className="text-muted"> · {confidenceLabel}</span>}</dd></div>
          <div><dt className="text-xs text-muted">Learned / observed</dt><dd>{memory.learnedWhen}</dd></div>
        </dl>
        <details className="mt-5 text-sm leading-6 text-muted">
          <summary className="w-fit cursor-pointer text-primary hover:underline underline-offset-4">Why does Kit know this?</summary>
          <div className="mt-2 max-w-xl border-l border-border pl-4">
            {memory.editedOn && <p>Corrected by {editorName} on {formatKnowledgeDate(memory.editedOn)}. Original source: {memory.source}.</p>}
            <p>{memory.editedOn && <span className="font-medium">Original context: </span>}{memory.sourceDetail}</p>
            <p className="mt-1">{memory.useDescription}</p>
            {memory.startsOn && <p className="mt-1">Relevant from <time dateTime={memory.startsOn}>{formatKnowledgeDate(memory.startsOn)}</time>{memory.expiresOn && <> through <time dateTime={memory.expiresOn}>{formatKnowledgeDate(memory.expiresOn)}</time></>}.</p>}
          </div>
        </details>

        {panel === null && (
          <div className="mt-2 flex items-center gap-5">
            <button ref={editRef} type="button" aria-label={`Edit: ${memory.statement}`} onClick={() => { setDraft(memory.statement); setError(""); setPanel("edit"); }} className="min-h-10 text-xs font-medium text-primary hover:underline">Edit</button>
            <button ref={forgetRef} type="button" aria-label={`${temporary ? "End now" : "Forget"}: ${memory.statement}`} onClick={() => setPanel("forget")} className="min-h-10 text-xs text-muted hover:text-primary hover:underline">{temporary ? "End now" : "Forget"}</button>
          </div>
        )}

        {panel === "forget" && (
          <div className="mt-4 rounded-kit bg-surface-secondary p-4" onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); closePanel(); } }}>
            <p className="text-sm font-medium text-primary-dark">{temporary ? "End this temporary context?" : `Forget this ${memory.type === "Rule" ? "rule" : "memory"}?`}</p>
            <p className="mt-1 text-sm leading-6 text-muted">{temporary ? "Kit will stop using this information now, before its scheduled end date." : "It will no longer be included in what Kit knows."}</p>
            <div className="mt-3 flex flex-wrap gap-5"><button type="button" autoFocus onClick={() => onRemove(memory.id, temporary)} className="min-h-10 text-sm font-medium text-primary hover:underline">{temporary ? "End now" : "Forget memory"}</button><button type="button" onClick={closePanel} className="min-h-10 text-sm text-muted hover:text-primary">{temporary ? "Keep active" : "Keep memory"}</button></div>
          </div>
        )}
      </div>
    </div>
  );
}
