import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res }, { supabaseUrl,  supabaseKey})

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log("user", user)

  // if user is signed in and the current path is / redirect the user to /account
  if (user && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/progress', req.url))
  }

  console.log("redirecting to login")
  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res

  // return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
