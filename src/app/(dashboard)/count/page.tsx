import { CountStartDate } from "@/components/count-form";
import { DashboardHeader } from "@/components/header";
import { Shell } from "@/components/shell";

export const runtime = "edge";

export default function Count() {
  return (
    <Shell className="flex w-full max-w-[1000px] flex-col items-center self-center">
      <div className="flex w-full items-center justify-between">
        <DashboardHeader heading="Word Count & Mindset Tracker" />
      </div>
      <div className={"flex w-full justify-center"}>
        <CountStartDate />
      </div>
    </Shell>
  );
}
