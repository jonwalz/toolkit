import { DashboardHeader } from "@/components/header";
import { NewPostButton } from "@/components/new-post-button";
import { Shell } from "@/components/shell";

export const runtime = "edge";

export default function Progress() {
  return (
    <Shell>
      <div className="flex justify-between">
        <DashboardHeader heading="Progress log" />
        <NewPostButton />
      </div>
      <div
        className={
          "flex min-h-[400px] flex-col justify-center rounded-md border p-8 animate-in fade-in-50"
        }
      ></div>
    </Shell>
  );
}
