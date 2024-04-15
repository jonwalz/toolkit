"use server";

import { StoryAccomplishmentEntry } from "@/components/accomplishments-table/columns";
import { supabaseServerClient } from "../vendor/supabase";

export type AccomplishmentResponse = {
  accomplishments: StoryAccomplishmentEntry[];
  totalPages: number;
};

export async function getAllAccomplishments({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}): Promise<AccomplishmentResponse> {
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize - 1;

  const { data: accomplishments, error } = await supabaseServerClient()
    .from("storyAccomplishments")
    .select("*")
    .order("date", { ascending: false })
    .range(startIndex, endIndex);

  if (error) {
    console.log("Progress entry error: ", error.message);
    throw error;
  }

  // To get the total number of pages
  const { data: totalCount, error: countError } = await supabaseServerClient()
    .from("progress")
    .select("*", { count: "exact" });

  if (countError) {
    console.log("Total count error: ", countError.message);
    throw countError;
  }

  const totalPages = Math.ceil(totalCount?.length / pageSize);

  return { accomplishments, totalPages } as {
    accomplishments: StoryAccomplishmentEntry[];
    totalPages: number;
  };
}
