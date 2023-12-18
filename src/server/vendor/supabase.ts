import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { Database } from "@/types/db";

const supabaseUrl = process.env.SUPABASE_URL!;

const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export const supabaseClient = createClient(
  supabaseUrl ?? "",
  supabaseAnonKey ?? "",
);

export const supabaseServerClient = () => {
  const cookieStore = cookies();
  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        cookieStore.delete({ name, ...options });
      },
    },
  });
};
