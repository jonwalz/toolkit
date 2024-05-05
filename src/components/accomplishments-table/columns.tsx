"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Database } from "@/types/db";
import { formatDateString } from "@/utils/dates";
import Link from "next/link";
import { Icons } from "../icons";

export type StoryAccomplishmentEntry =
  Database["public"]["Tables"]["storyAccomplishments"]["Row"];

const columnHelper = createColumnHelper<StoryAccomplishmentEntry>();

export const columns = [
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info): string => formatDateString(info.getValue()),
  }),
  columnHelper.accessor("storyAccomplishments", {
    header: "Story Accomplishments",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("nextSteps", {
    header: "Next Steps",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("id", {
    id: "id",
    header: "Edit",
    cell: (info) => {
      return (
        <Link href={`/accomplishments/edit/${info.row.original.id}`}>
          <Icons.logo className="w-4 hover:cursor-pointer" />
        </Link>
      );
    },
  }),
];
