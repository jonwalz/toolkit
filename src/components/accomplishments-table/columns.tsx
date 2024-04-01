import { createColumnHelper } from "@tanstack/react-table";
import { Database } from "@/types/db";

type StoryAccomplishment =
  Database["public"]["Tables"]["storyAccomplishments"]["Row"];

const columnHelper = createColumnHelper<StoryAccomplishment>();

export const columns = [
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("storyAccomplishments", {
    header: "Story Accomplishments",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("nextSteps", {
    header: "Next Steps",
    cell: (info) => info.getValue(),
  }),
];
