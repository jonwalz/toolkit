import { createServerClient, CookieOptions } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// A function that checks if the pathname is in the list of urls
function isUrl(request: NextRequest, urls: string[]) {
  return urls.some((url) => request.nextUrl.pathname.startsWith(url));
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
        },
      },
    },
  );

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
    console.log("Redirecting to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    !data.session?.user &&
    request.nextUrl.pathname !== "/login" &&
    request.nextUrl.pathname !== "/register"
  ) {
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
