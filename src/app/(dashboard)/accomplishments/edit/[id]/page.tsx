import { AccomplishmentForm } from "@/components/accomplishment-form";
import { DashboardHeader } from "@/components/header";
import { Shell } from "@/components/shell";
import { supabaseServerClient } from "@/server/vendor/supabase";
import { title } from "../../_constants";

export const runtime = "edge";

export default async function Edit(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  // TODO: move this to server function
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
      <div className={"max-w-[400px]"}>
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
