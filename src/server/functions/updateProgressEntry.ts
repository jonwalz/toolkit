"use server";

import { progressSchema } from "@/schemas/forms/progress";
import { supabaseServerClient } from "../vendor/supabase";
import { redirect } from "next/navigation";

export async function updateProgressEntry(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = await progressSchema.safeParseAsync(data);

  if (parsed.success && parsed.data.id) {
    const { error } = await supabaseServerClient()
      .from("progress")
      .update({
        date: parsed.data.date,
        play: parsed.data.play,
        wip_time: parsed.data.wipTime,
        self_care: parsed.data.selfCare,
        word_count: parsed.data.wordCount ?? null,
        progress_paragraph: parsed.data.progressParagraph,
      })
      .eq("id", parsed.data.id)
      .select();

    if (error) {
      console.log("Progress entry error: ", error.message);
      throw error;
    }
  }

  if (!parsed.success) {
    console.log("Progress entry error: ", parsed.error);
    throw parsed.error;
  }

  redirect("/progress");
}
