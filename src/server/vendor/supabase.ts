import { cookies } from "next/headers";
import {
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cache } from "react";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { Database } from "@/types/db";

const supabaseUrl = process.env.SUPABASE_URL!;

const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export const supabaseClient = createClient(
  supabaseUrl ?? "",
  supabaseAnonKey ?? "",
);

export const supabaseServerComponentClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});

export const supabaseServerRouteClient = () => {
  const cookieStore = cookies();
  return createRouteHandlerClient({ cookies: () => cookieStore });
};

export const supabaseServerClient = () => {
  const cookieStore = cookies();
  return createServerClient(supabaseUrl, supabaseAnonKey, {
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
