"use server";

import { supabaseServerClient } from "../vendor/supabase";
import { redirect } from "next/navigation";

export async function upsertProjectTargets({
  totalWordCount,
  startDate,
  endDate,
  writingDaysPerWeek,
}: {
  totalWordCount: number | null;
  startDate: string | undefined;
  endDate: string | undefined;
  writingDaysPerWeek: number | null;
  userId: string;
}) {
  const supabase = supabaseServerClient();

  const { error } = await supabase
    .from("project_targets")
    .insert([
      {
        total_word_count: totalWordCount,
        target_start_date: startDate,
        target_complete_date: endDate,
        days_per_week: writingDaysPerWeek,
      },
    ])
    .select();

  if (error) {
    console.log("Progress entry error: ", error.message);
    throw error;
  }

  redirect("/targets");
}
