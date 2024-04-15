import { StoryAccomplishmentsTable } from "@/components/accomplishments-table";
import { DashboardHeader } from "@/components/header";
import { Shell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const runtime = "edge";

export default function Accomplishments() {
  return (
    <Shell>
      <div className="flex justify-between">
        <DashboardHeader heading="Story Accomplishments" />
        <Link
          href="/dashboard/accomplishments/new"
          className={buttonVariants({ variant: "default" })}
        >
          New
        </Link>
      </div>
      <StoryAccomplishmentsTable />
    </Shell>
  );
}
