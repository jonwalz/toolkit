import { upsertProjectTargets } from "@/server/functions/updateProjectTargets";
import { supabase } from "../supabase";

type Value = {
  totalWordCount: number | null;
  targetStartDate: string | null;
  targetCompleteDate: string | null;
  writingDaysPerWeek: number | null;
};

export async function updateProjectTargets(value: Value) {
  try {
    const user = await supabase.auth.getUser();
    const userId = user?.data?.user?.id;

    if (userId) {
      await upsertProjectTargets(value);
    }
  } catch (error) {
    console.error("Error updating project targets:", error);
  }
}
