import { DashboardHeader } from "@/components/header";
import { ProgressForm } from "@/components/progress-form";
import { Shell } from "@/components/shell";

export const runtime = "edge";

export default function Progress() {
  return (
    <Shell>
      <DashboardHeader heading="Progress log" />
      <div
        className={
          "flex min-h-[400px] flex-col justify-center rounded-md border p-8 animate-in fade-in-50"
        }
      >
        <ProgressForm />
      </div>
    </Shell>
  );
}
