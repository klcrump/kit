import { Wrench } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";

export default function Page() {
  return (
    <PageContainer>
      <div className="flex items-center gap-3">
        <Wrench aria-hidden="true" className="size-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Kit</h1>
      </div>
      <p className="mt-4 text-neutral-600">
        Project foundation ready. Product screens will be added in a later phase.
      </p>
    </PageContainer>
  );
}
