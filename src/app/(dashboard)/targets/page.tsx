import { DashboardHeader } from "@/components/header";
import { ProjectTargetsForm } from "@/components/project-targets-form";
import { Shell } from "@/components/shell";
import { fetchProjectTargets } from "@/server/functions/getProjectTargets";

export const runtime = "edge";

export default async function Targets() {
  const data = await fetchProjectTargets();

  return (
    <Shell>
      <div className="flex justify-between">
        <DashboardHeader heading="Project Targets" />
      </div>
      <ProjectTargetsForm {...data} />
    </Shell>
  );
}
