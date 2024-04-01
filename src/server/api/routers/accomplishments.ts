import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { supabaseServerClient } from "@/server/vendor/supabase";
import { z } from "zod";

export const accomplishmentsRouter = createTRPCRouter({
  getAllAccomplishments: publicProcedure
    .input(
      z.object({
        pageIndex: z.number().default(0),
        pageSize: z.number().default(10),
      }),
    )
    .query(async ({ input }) => {
      const { pageIndex, pageSize } = input;
      const startIndex = pageIndex * pageSize;
      const endIndex = startIndex + pageSize - 1;

      const { data: accomplishments, error } = await supabaseServerClient()
        .from("storyAccomplishments")
        .select("*")
        .order("entry_date", { ascending: false })
        .range(startIndex, endIndex);

      if (error) {
        console.log("Accomplishment entry error: ", error.message);
        throw error;
      }

      console.log("accomplishments: ", accomplishments);

      const { data: totalCount, error: countError } =
        await supabaseServerClient()
          .from("storyAccomplishments")
          .select("*", { count: "exact" });

      if (countError) {
        console.log("Total count error: ", countError.message);
        throw countError;
      }

      const totalPages = Math.ceil(totalCount?.length / pageSize);

      return { accomplishments, totalPages };
    }),
  createAccomplishment: protectedProcedure
    .input(
      z.object({
        date: z.string(),
        title: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { data: accomplishment, error } = await supabaseServerClient()
        .from("storyAccomplishments")
        .insert([
          {
            date: input.date,
            title: input.title,
            description: input.description,
          },
        ]);

      if (error) {
        console.log("Accomplishment entry error: ", error.message);
        throw error;
      }

      return accomplishment;
    }),
  getSingleAccomplishment: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { data: accomplishment, error } = await supabaseServerClient()
        .from("storyAccomplishments")
        .select("*")
        .eq("id", input.id)
        .single();

      if (error) {
        console.log("Accomplishment fetch error: ", error.message);
        throw error;
      }

      return accomplishment;
    }),
});
