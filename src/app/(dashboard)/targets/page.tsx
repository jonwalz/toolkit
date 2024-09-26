import { DashboardHeader } from "@/components/header";
import { ProjectTargetsForm } from "@/components/project-targets-form";
import { Shell } from "@/components/shell";
import { fetchProjectTargets } from "@/server/functions/getProjectTargets";

export const runtime = "edge";

export default async function Targets() {
  const data = await fetchProjectTargets();

  return (
    <Shell className="flex w-full max-w-[1000px] flex-col items-center self-center">
      <div className="flex w-full items-center justify-between">
        <DashboardHeader heading="Project Targets" />
      </div>
      <div className={"flex w-full justify-center"}>
        <ProjectTargetsForm {...data} />
      </div>
    </Shell>
  );
}
