import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// A function that checks if the pathname is in the list of urls
function isUrl(request: NextRequest, urls: string[]) {
  return urls.some((url) => request.nextUrl.pathname.startsWith(url));
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createMiddlewareClient({ req: request, res: response });

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
      request.nextUrl.pathname === "/register" ||
      request.nextUrl.pathname === "/")
  ) {
    console.log("Redirecting to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    !data.session?.user &&
    request.nextUrl.pathname !== "/login" &&
    request.nextUrl.pathname !== "/register"
  ) {
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
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
