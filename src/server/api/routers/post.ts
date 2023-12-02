import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { supabaseClient } from "@/server/vendor/supabase";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async () => {
      const { data: notes } = await supabaseClient.from("notes").select("*");

      return {
        greeting: notes,
      };
    }),
});
