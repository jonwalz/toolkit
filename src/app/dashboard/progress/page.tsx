import { DashboardHeader } from "@/components/header";
import { ProgressTable } from "@/components/progress-table";
import { Shell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const runtime = "edge";

export default function Progress() {
  return (
    <Shell>
      <div className="flex justify-between">
        <DashboardHeader heading="Progress log" />
        <Link
          href="/dashboard/progress/new"
          className={buttonVariants({ variant: "default" })}
        >
          New
        </Link>
      </div>
      <div
        className={
          "flex min-h-[400px] flex-col justify-center rounded-md border p-8 animate-in fade-in-50"
        }
      >
        <ProgressTable />
      </div>
    </Shell>
  );
}
