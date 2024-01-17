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

  return (
    <Shell>
      <DashboardHeader heading="Progress log" />
      <div
        className={
          "flex min-h-[400px] flex-col justify-center rounded-md border p-8 animate-in fade-in-50"
        }
      >
        <ProgressForm
          id={params.id}
          entryData={{
            date: data?.[0]?.date ?? "",
            play: data?.[0]?.play ?? "",
            wipTime: data?.[0]?.wip_time ?? "",
            selfCare: data?.[0]?.self_care ?? "",
            wordCount: data?.[0]?.word_count ?? null,
            progressParagraph: data?.[0]?.progress_paragraph ?? "",
          }}
        />
      </div>
    </Shell>
  );
}
