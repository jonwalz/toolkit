import { supabaseServerClient } from "../vendor/supabase";

export async function getOneProgressEntry(id: string) {
  return await supabaseServerClient().from("progress").select("*").eq("id", id);
}
