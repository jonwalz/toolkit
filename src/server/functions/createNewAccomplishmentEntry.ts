"use server";

import { supabaseServerClient } from "../vendor/supabase";
import { redirect } from "next/navigation";
import { accomplishmentSchema } from "@/schemas/forms/accomplishment";

export async function createNewProgressEntry(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = await accomplishmentSchema.safeParseAsync(data);

  if (parsed.success) {
    const { error } = await supabaseServerClient()
      .from("storyAccomplishments")
      .insert([
        {
          date: parsed.data.date,
          accomplishment: parsed.data.accomplishment,
          next_step: parsed.data.next_step,
        },
      ]);

    if (error) {
      console.log("Progress entry error: ", error.message);
      throw error;
    }
  }

  redirect("/accomplishments/progress");
}
