import { supabaseServerClient } from "@/server/vendor/supabase";

export const getUser = async () => await supabaseServerClient().auth.getUser();
