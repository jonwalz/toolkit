import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { redirect } from 'next/navigation'

import { supabaseClient } from "~/server/vendor/supabase";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async () => {
      const { data: notes } = await supabaseClient.from("notes").select("*");

      return {
        greeting: notes,
      };
    }),
  // Create private procedure that requires authentication TODO
  createUser: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input: { email, password } }) => {
      const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.log("Server error: ", error);
        throw new Error(error.message);
      }

      console.log("data: ", data);
      return { message: "User created successfully", user: data };
    }),
    login: publicProcedure
      .input(z.object({ email: z.string(), password: z.string() }))
      .mutation(async ({ input: { email, password }, ctx }) => {
        console.log("URL: ", ctx.req.url);
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (error) {
          console.log("Server error: ", error);
          throw new Error(error.message);
        }

        // console.log("data: ", data);
        return { message: "User logged in successfully", user: data };
      }),
    logout: publicProcedure
      .query(async () => {
        const { error } = await supabaseClient.auth.signOut()

        if (error) {
          console.log("Server error: ", error);
          throw new Error(error.message);
        }
      })
});
