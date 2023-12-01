import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { redirect } from 'next/navigation'

import { supabaseClient, supabaseServerRouteClient } from "~/server/vendor/supabase";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async () => {
      const { data: notes } = await supabaseClient.from("notes").select("*");

      return {
        greeting: notes,
      };
    }),
  // TODO: Create private procedure that requires authentication
  createUser: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input: { email, password }, ctx }) => {
      // @ts-ignore
      const { data, error } = await supabaseServerRouteClient({ req: ctx.req, res: ctx.res}).auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        console.log("Server error: ", error);
        throw new Error(error.message);
      }

      // TODO: handle existing user
      // TODO: Handle success

      cookies().set('userId', data?.user?.id || "") 

      const userId = cookies().get('userId')

      console.log("Cookie user id: ", userId)

      console.log("data: ", data);
    }),
    login: publicProcedure
      .input(z.object({ email: z.string(), password: z.string() }))
      .mutation(async ({ input: { email, password }, ctx }) => {
        const res = NextResponse.next()
        const { data, error } = await supabaseServerRouteClient({ req: ctx.req, res: res})
          .auth
          .signInWithPassword({
            email: email,
            password: password
          });

        if (error) {
          console.log("Server error: ", error);
          throw new Error(error.message);
        }
    
        return {
          user: data?.user
        }
    }),
    logout: publicProcedure
      .query(async ({ ctx }) => {
        const res = NextResponse.next()
        const { error } = await supabaseServerRouteClient({ req: ctx.req, res: res})
          .auth
          .signOut()

        if (error) {
          console.log("Server error: ", error);
          throw new Error(error.message);
        }
      })
});
