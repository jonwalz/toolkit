import { supabaseServerClient } from "../vendor/supabase";

export async function fetchProjectTargets() {
  const supabase = supabaseServerClient();
  const user = await supabase.auth.getUser();
  const userId = user?.data?.user?.id;

  if (userId) {
    const { data, error } = await supabase
      .from("project_targets")
      .select()
      .eq("user_id", userId)

      .single();

    if (!error) {
      return data;
    }
  }
}
