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

  const { data, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) {
    console.log("Session error: ", sessionError);
    throw new Error(sessionError.message);
  }

  if (data.session?.user && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
    console.log("Redirecting to /dashboard")
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (!data.session?.user && (req.nextUrl.pathname !== '/login' && req.nextUrl.pathname !== '/register')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

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
