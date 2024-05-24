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
}) {
  const targetData = {
    total_word_count: totalWordCount,
    target_start_date: startDate?.length ? startDate : null,
    target_complete_date: endDate?.length ? endDate : null,
    days_per_week: writingDaysPerWeek,
  };

  const filteredData = Object.fromEntries(
    Object.entries(targetData).filter(([_, v]) => v !== null),
  );

  const { error } = await supabaseServerClient()
    .from("project_targets")
    .upsert([filteredData])
    .select();

  if (error) {
    console.log("Progress entry error: ", error.message);
    throw error;
  }

  redirect("/targets");
}
