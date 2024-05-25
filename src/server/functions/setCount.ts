"use server";

import { supabaseServerClient } from "../vendor/supabase";

export async function setCount(date: string | undefined) {
  const supabase = supabaseServerClient();
  const user = await supabase.auth.getUser();
  const userId = user?.data?.user?.id;

  if (userId !== undefined && date !== undefined) {
    const { data, error } = await supabase
      .from("count")
      .upsert({
        date,
        user_id: userId,
      })
      .select();

    if (error) {
      console.log("Error: ", error);
    }

    if (!error) {
      return data;
    }
  }

  return null;
}
