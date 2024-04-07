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
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          New
        </Link>
      </div>
      <ProgressTable />
    </Shell>
  );
}
