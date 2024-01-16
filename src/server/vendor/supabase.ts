import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { Database } from "@/types/db";

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const supabaseServerClient = () => {
  const cookieStore = cookies();
  return createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
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
