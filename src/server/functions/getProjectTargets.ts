import { format, parseISO } from "date-fns";
import { supabaseServerClient } from "../vendor/supabase";
import { redirect } from "next/navigation";

export async function fetchProjectTargets() {
  const supabase = supabaseServerClient();
  const user = await supabase.auth.getUser();
  const userId = user?.data?.user?.id;

  if (!userId) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("project_targets")
    .select()
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching project targets", error);
  }

  const {
    total_word_count,
    target_start_date,
    target_complete_date,
    days_per_week,
  } = data ?? {
    total_word_count: 0,
    target_start_date: null,
    target_complete_date: null,
    days_per_week: 0,
  };

  return {
    totalWordCount: total_word_count,
    targetStartDate:
      target_start_date && format(parseISO(target_start_date), "yyyy-MM-dd"),
    targetCompleteDate:
      target_complete_date &&
      format(parseISO(target_complete_date), "yyyy-MM-dd"),
    writingDaysPerWeek: days_per_week,
  };
}
