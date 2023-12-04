import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { supabaseServerComponentClient } from "@/server/vendor/supabase";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .query(async () => {
      const { data: user } = await supabaseServerComponentClient()
        .auth
        .getUser();

      return user.user
    }),
});
