import { Database } from "@/types/db";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabaseComponentClient = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
);
