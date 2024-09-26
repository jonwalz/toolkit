import { DashboardHeader } from "@/components/header";
import { ProgressForm } from "@/components/progress-form";
import { Shell } from "@/components/shell";

export const runtime = "edge";

export default function Progress() {
  return (
    <Shell className="flex flex-col items-center">
      <DashboardHeader heading="Progress log" />
      <div className={"flex w-full max-w-[800px] justify-center"}>
        <ProgressForm />
      </div>
    </Shell>
  );
}
