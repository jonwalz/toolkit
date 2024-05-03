import { DashboardHeader } from "@/components/header";
import { ProgressForm } from "@/components/progress-form";
import { Shell } from "@/components/shell";

export const runtime = "edge";

export default function Progress() {
  return (
    <Shell>
      <DashboardHeader heading="Progress log" />
      <div className={"max-w-[800px]"}>
        <ProgressForm />
      </div>
    </Shell>
  );
}
