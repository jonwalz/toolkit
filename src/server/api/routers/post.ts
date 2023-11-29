import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { redirect } from 'next/navigation'

import { supabaseClient, supabaseServerClient } from "~/server/vendor/supabase";
import { NextResponse } from "next/server";

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
    .mutation(async ({ input: { email, password }, ctx }) => {
      const { data, error } = await supabaseServerClient().auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        console.log("Server error: ", error);
        throw new Error(error.message);
      }

      // TODO: handle existing user
      // TODO: Handle success

      console.log("data: ", data);
    }),
    login: publicProcedure
      .input(z.object({ email: z.string(), password: z.string() }))
      .mutation(async ({ input: { email, password }, ctx }) => {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email: email,
          password: password
        });

        if (error) {
          console.log("Server error: ", error);
          throw new Error(error.message);
        }

        // console.log("data: ", data);
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
