"use server";

import { supabaseServerClient } from "../vendor/supabase";
import { redirect } from "next/navigation";
import { accomplishmentSchema } from "@/schemas/forms/accomplishment";

export async function createNewAccomplishmentEntry(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = await accomplishmentSchema.safeParseAsync(data);

  if (parsed.success) {
    const { error } = await supabaseServerClient()
      .from("storyAccomplishments")
      .insert([
        {
          date: parsed.data.date,
          storyAccomplishments: parsed.data.accomplishment,
          nextSteps: parsed.data.next_step,
        },
      ]);

    if (error) {
      console.log("Progress entry error: ", error.message);
      throw error;
    }
  }

  redirect("/dashboard/accomplishments");
}
