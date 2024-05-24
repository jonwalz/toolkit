import { DashboardHeader } from "@/components/header";
import { ProjectTargetsForm } from "@/components/project-targets-form";
import { Shell } from "@/components/shell";

export const runtime = "edge";

export default function Targets() {
  return (
    <Shell>
      <div className="flex justify-between">
        <DashboardHeader heading="Project Targets" />
      </div>
      <ProjectTargetsForm />
    </Shell>
  );
}
