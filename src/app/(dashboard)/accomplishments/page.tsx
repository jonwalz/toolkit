import { StoryAccomplishmentsTable } from "@/components/accomplishments-table";
import { DashboardHeader } from "@/components/header";
import { Shell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const runtime = "edge";

export default function Accomplishments() {
  return (
    <Shell className="flex w-full max-w-[1000px] flex-col items-center self-center">
      <div className="flex w-full items-center justify-between">
        <DashboardHeader heading="Story Accomplishments" />
        <Link
          href="/accomplishments/new"
          className={buttonVariants({ variant: "default" })}
        >
          New
        </Link>
      </div>
      <StoryAccomplishmentsTable />
    </Shell>
  );
}
