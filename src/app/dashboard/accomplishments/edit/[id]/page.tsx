import { AccomplishmentForm } from "@/components/accomplishment-form";
import { DashboardHeader } from "@/components/header";
import { Shell } from "@/components/shell";
import { supabaseServerClient } from "@/server/vendor/supabase";
import { title } from "../../_constants";

export const runtime = "edge";

export default async function Edit({ params }: { params: { id: string } }) {
  const { data, error } = await supabaseServerClient()
    .from("storyAccomplishments")
    .select("*")
    .eq("id", params.id);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Shell>
      <DashboardHeader heading={title} />
      <div
        className={
          "flex min-h-[400px] flex-col justify-center rounded-md border p-8 animate-in fade-in-50"
        }
      >
        <AccomplishmentForm
          id={params.id}
          entryData={{
            date: data?.[0]?.date ?? "",
            accomplishment: data?.[0]?.storyAccomplishments ?? "",
            next_step: data?.[0]?.nextSteps ?? "",
          }}
        />
      </div>
    </Shell>
  );
}
