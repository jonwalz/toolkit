import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import { createSupabaseReqResClient } from "./utils/supabase/server";

// A function that checks if the pathname is in the list of urls
function isUrl(request: NextRequest, urls: string[]) {
  return urls.some((url) => request.nextUrl.pathname.startsWith(url));
}

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  const supabase = createSupabaseReqResClient(request, response);

  const { data, error: sessionError } = await supabase.auth.getSession();

  if (sessionError && isUrl(request, ["/login", "/register"])) {
    console.log("Session error: ", sessionError);
    const { error } = await supabase.auth.signOut();

    // To handle expired sessions
    if (error) {
      if (error) console.error("Error signing out:", error);
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    data.session?.user &&
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register")
  ) {
    console.log("Confirmed session user, redirecting to /");
    return NextResponse.redirect(new URL("/"));
  }

  if (
    !data.session?.user &&
    request.nextUrl.pathname !== "/login" &&
    request.nextUrl.pathname !== "/register"
  ) {
    console.log("DATA: ", data);
    console.log("No data.session.user, redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|auth/callback|auth/confirm).*)",
  ],
};
