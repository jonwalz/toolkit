import { supabaseServerClient } from "@/server/vendor/supabase";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  console.log("code", code);
  if (typeof code === "string") {
    const supabase = supabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
