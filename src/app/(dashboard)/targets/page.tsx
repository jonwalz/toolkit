import { DashboardHeader } from "@/components/header";
import { Shell } from "@/components/shell";

export const runtime = "edge";

export default function Targets() {
  return (
    <Shell>
      <div className="flex justify-between">
        <DashboardHeader heading="Progress log" />
      </div>
    </Shell>
  );
}
