import { cookies } from "next/headers";
import { createRouteHandlerClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cache } from 'react';
import { NextRequest, NextResponse } from "next/server";
import { CookieOptions, createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseServerComponentClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
})

export const supabaseServerRouteClient = (params: { req?: NextRequest, res?: NextResponse }) => {
  const cookieStore = cookies()
  return createRouteHandlerClient({ cookies: () => cookieStore });
}

export const supabaseServerClient = () => {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete({ name, ...options })
        },
      },
    }
  )
}