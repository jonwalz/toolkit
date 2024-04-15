"use server";

import { supabaseServerClient } from "../vendor/supabase";
import { redirect } from "next/navigation";
import { accomplishmentSchema } from "@/schemas/forms/accomplishment";

export async function updateAccomplishmentEntry(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = await accomplishmentSchema.safeParseAsync(data);

  if (parsed.success && parsed.data.id) {
    const { error } = await supabaseServerClient()
      .from("storyAccomplishments")
      .update({
        date: parsed.data.date,
        accomplishment: parsed.data.accomplishment,
        next_step: parsed.data.next_step,
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

  redirect("/dashboard/progress");
}
