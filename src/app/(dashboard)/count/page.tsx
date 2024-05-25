import { CountStartDate } from "@/components/count-form";
import { DashboardHeader } from "@/components/header";
import { Shell } from "@/components/shell";

export const runtime = "edge";

export default function Count() {
  return (
    <Shell>
      <DashboardHeader heading="Word Count & Mindset Tracker" />
      <CountStartDate />
    </Shell>
  );
}
