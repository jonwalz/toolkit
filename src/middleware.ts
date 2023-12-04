import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const reqCookies = request.cookies.getAll();
  console.log("Cookies: ", reqCookies);

  const supabase = createMiddlewareClient({ req: request, res: response });

  const { data, error: sessionError } = await supabase.auth.getSession();

  supabase.auth.onAuthStateChange((event, session) => {
    console.log("Event: ", event);
    console.log("Session: ", session);
  });

  if (sessionError) {
    console.log("Session error: ", sessionError);
    throw new Error(sessionError.message);
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
