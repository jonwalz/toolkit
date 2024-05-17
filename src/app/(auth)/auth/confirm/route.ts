import { supabaseServerClient } from "@/server/vendor/supabase";
import { type EmailOtpType } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  console.log("Auth Route HIT");
  console.log("COOKIEEEEE: ", request.cookies.getAll());
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;

  console.log("Token hash: ", token_hash);
  console.log("Type: ", type);
  if (token_hash && type) {
    const supabase = supabaseServerClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      return NextResponse.redirect(redirectTo);
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = "/auth/auth-code-error";
  return NextResponse.redirect(redirectTo);
}
