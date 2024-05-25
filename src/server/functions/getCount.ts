"use server";

import { supabaseServerClient } from "../vendor/supabase";

export async function getCount() {
  const supabase = supabaseServerClient();

  const { data, error } = await supabase.from("count").select();

  if (!error) {
    return data;
  }
}
