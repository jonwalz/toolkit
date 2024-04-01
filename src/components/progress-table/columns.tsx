"use client";

import { Database } from "@/types/db";
import { formatDateString } from "@/utils/dates";
import { createColumnHelper } from "@tanstack/react-table";
import { Icons } from "../icons";
import Link from "next/link";

type Progress = Database["public"]["Tables"]["progress"]["Row"];

const columnHelper = createColumnHelper<Progress>();

export const columns = [
  columnHelper.accessor("date", {
    id: "date",
    header: "Date",
    cell: (info): string => formatDateString(info.getValue()),
  }),
  columnHelper.accessor("play", {
    id: "play",
    header: "Play",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("progress_paragraph", {
    id: "progress_paragraph",
    header: "Progress Paragraph",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("self_care", {
    id: "self_care",
    header: "Self Care",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("wip_time", {
    id: "wip_time",
    header: "WIP Time",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("id", {
    id: "id",
    header: "Edit",
    cell: (info) => {
      return (
        <Link href={`/dashboard/progress/edit/${info.row.original.id}`}>
          <Icons.logo className="w-4 hover:cursor-pointer" />
        </Link>
      );
    },
  }),
];
