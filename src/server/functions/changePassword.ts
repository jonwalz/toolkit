"use server";

import { createClient } from "@/utils/supabase/server";

export async function changePassword(formData: FormData) {
  const supabase = createClient();
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
