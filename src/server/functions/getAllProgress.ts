"use server";

import { ProgressEntry } from "@/components/progress-table/columns";
import { supabaseServerClient } from "../vendor/supabase";

export type ProgressResponse = {
  progress: ProgressEntry[];
  totalPages: number;
};

export async function getAllProgress(
  pageIndex: number,
  pageSize: number,
): Promise<ProgressResponse> {
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize - 1;

  const { data: progress, error } = await supabaseServerClient()
    .from("progress")
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

  return { progress, totalPages } as {
    progress: ProgressEntry[];
    totalPages: number;
  };
}
