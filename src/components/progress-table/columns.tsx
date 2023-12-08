"use client";

import { Database } from "@/types/db";
import { createColumnHelper } from "@tanstack/react-table";

type Progress = Database["public"]["Tables"]["progress"]["Row"];

const columnHelper = createColumnHelper<Progress>();

export const columns = [
  columnHelper.accessor("date", {
    id: "date",
    header: "Date",
    cell: (info) => info.getValue(),
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
  columnHelper.accessor("word_count", {
    id: "word_count",
    header: "Word Count",
    cell: (info) => info.getValue(),
  }),
];
