import { cookies } from "next/headers";
import { createRouteHandlerClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cache } from 'react';
import { CookieOptions, createServerClient, serialize } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseServerComponentClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
})

// export const supabaseServerClient = (params: { req?: NextRequest, res?: NextResponse}) => {
//   const { req, res } = params
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return req?.cookies.get(name)?.value;
//         },
//         set(name: string, value: string, options: CookieOptions) {
//           res?.cookies.set("Set-Cookie", serialize(name, value, options));
//         },
//         remove(name: string, options: CookieOptions) {
//           res?.cookies.set("Set-Cookie", serialize(name, "", options));
//         },
//       },
//     }
//   )

//   return supabase
// }

export const supabaseServerRouteClient = (params: { req?: NextRequest, res?: NextResponse}) => {
  const cookieStore = cookies()
  return createRouteHandlerClient({ cookies: () => cookieStore });
}