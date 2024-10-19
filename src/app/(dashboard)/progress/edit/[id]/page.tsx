import { DashboardHeader } from "@/components/header";
import { ProgressForm } from "@/components/progress-form";
import { Shell } from "@/components/shell";
import { getOneProgressEntry } from "@/server/functions/getOneProgressEntry";
import { Suspense } from "react";

export const runtime = "edge";

type ProgressEntryData = {
  date: string;
  play: string;
  wipTime: string;
  selfCare: string;
  wordCount: number | null;
  progressParagraph: string;
};

export default async function Edit({ params }: { params: { id: string } }) {
  const { data, error } = await getOneProgressEntry(params.id);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data found for this entry</div>;
  }

  const entryData: ProgressEntryData = {
    date: data[0]?.date ?? "",
    play: data[0]?.play ?? "",
    wipTime: data[0]?.wip_time ?? "",
    selfCare: data[0]?.self_care ?? "",
    wordCount: data[0]?.word_count ?? null,
    progressParagraph: data[0]?.progress_paragraph ?? "",
  };

  return (
    <Shell>
      <DashboardHeader heading="Progress log" />
      <div className="max-w-[800px]">
        <Suspense fallback={<div>Loading...</div>}>
          <ProgressForm id={params.id} entryData={entryData} />
        </Suspense>
      </div>
    </Shell>
  );
}
