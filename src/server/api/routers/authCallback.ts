import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authCallbackRouter = createTRPCRouter({
  callback: publicProcedure
    .query(async ({ ctx }) => {
      const requestUrl = new URL(ctx.req.url);
      const code = requestUrl.searchParams.get("code");
    
      if (code) {
        const supabase = createRouteHandlerClient({ cookies });
        await supabase.auth.exchangeCodeForSession(code);
      }
    
      return NextResponse.redirect(requestUrl.origin);
    })
})