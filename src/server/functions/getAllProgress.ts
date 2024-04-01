"use server";

import { supabaseServerClient } from "../vendor/supabase";

type ProgressEntries = {
  created_at: string;
  date: string | null;
  id: number;
  play: string | null;
  progress_paragraph: string | null;
  self_care: string | null;
  user_id: string | null;
  wip_time: string | null;
  word_count: number | null;
};

export type ProgressResponse = {
  progress: ProgressEntries[];
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
    progress: ProgressEntries[];
    totalPages: number;
  };
}
