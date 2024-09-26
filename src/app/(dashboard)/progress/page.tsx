import { DashboardHeader } from "@/components/header";
import { ProgressTable } from "@/components/progress-table";
import { Shell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const runtime = "edge";

export default function Progress() {
  return (
    <Shell className="flex w-full max-w-[1000px] flex-col items-center self-center">
      <div className="flex w-full items-center justify-between">
        <DashboardHeader heading="Progress log" />
        <Link
          href="/progress/new"
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          New
        </Link>
      </div>
      <ProgressTable />
    </Shell>
  );
}
