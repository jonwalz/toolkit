import { DashboardHeader } from "@/components/header";
import { ProgressForm } from "@/components/progress-form";
import { Shell } from "@/components/shell";
import { supabaseServerClient } from "@/server/vendor/supabase";

export const runtime = "edge";

export default async function Edit({ params }: { params: { id: string } }) {
  const { data, error } = await supabaseServerClient()
    .from("progress")
    .select("*")
    .eq("id", params.id);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const entryData = {
    date: data?.[0]?.date ?? "",
    play: data?.[0]?.play ?? "",
    wipTime: data?.[0]?.wip_time ?? "",
    selfCare: data?.[0]?.self_care ?? "",
    wordCount: data?.[0]?.word_count ?? null,
    progressParagraph: data?.[0]?.progress_paragraph ?? "",
  };

  return (
    <Shell>
      <DashboardHeader heading="Progress log" />
      <div className={"max-w-[800px]"}>
        <ProgressForm id={params.id} entryData={entryData} />
      </div>
    </Shell>
  );
}
