"use server";

import { supabaseServerClient } from "../vendor/supabase";
import { redirect } from "next/navigation";

export async function upsertProjectTargets({
  totalWordCount,
  targetStartDate,
  targetCompleteDate,
  writingDaysPerWeek,
}: {
  totalWordCount: number | null;
  targetStartDate: string | null;
  targetCompleteDate: string | null;
  writingDaysPerWeek: number | null;
}) {
  const supabase = supabaseServerClient();
  const user = await supabase.auth.getUser();
  const userId = user?.data?.user?.id;

  const targetData = {
    total_word_count: totalWordCount,
    target_start_date: targetStartDate?.length ? targetStartDate : null,
    target_complete_date: targetCompleteDate?.length
      ? targetCompleteDate
      : null,
    days_per_week: writingDaysPerWeek,
    user_id: userId,
  };

  const filteredData = Object.fromEntries(
    Object.entries(targetData).filter(([_, v]) => v !== null),
  );

  const { error } = await supabase
    .from("project_targets")
    .upsert(filteredData)
    .select();

  if (error) {
    console.log("Progress entry error: ", error.message);
    throw error;
  }

  redirect("/targets");
}
