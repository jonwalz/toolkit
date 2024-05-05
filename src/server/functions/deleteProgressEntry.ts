"use server";

import { supabaseServerClient } from "../vendor/supabase";
import { redirect } from "next/navigation";

export async function deleteProgressEntry(id: string | undefined) {
  if (!id) {
    // This should never happen
    console.log("Progress entry id is missing");
    throw new Error("Progress entry id is missing");
  }

  const { error } = await supabaseServerClient()
    .from("progress")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.log("Progress entry error: ", error.message);
    throw error;
  }

  redirect("/dashboard/progress");
}
