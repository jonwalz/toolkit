import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'


export async function middleware(req: NextRequest) {
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createMiddlewareClient({ req, res });

  // const sessionData = await supabase.auth.getSession()
  const { data, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) {
    console.log("Session error: ", sessionError);
    throw new Error(sessionError.message);
  }

  // if user is signed in and the current path is / redirect the user to /dashboard
  if (data.session?.user && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')) {
    console.log("Redirecting to /dashboard")
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // // if user is not signed in and the current path is not / redirect the user to /
  if (!data.session?.user && (req.nextUrl.pathname !== '/login' && req.nextUrl.pathname !== '/signup')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  console.log("SESSION DATA: ", data);
  return res
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
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
