import { cookies } from "next/headers";
// import { supabaseServerClient } from "@/server/vendor/supabase";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      },
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      console.log("\n Exchange code for session success \n");
      return NextResponse.redirect(`${requestUrl.origin}/`);
    } else {
      console.error("\n Exchange code for session error: \n", error);
    }
  }

  return NextResponse.redirect(requestUrl.origin);
}
