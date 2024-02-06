import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { supabaseServerClient } from "@/server/vendor/supabase";
import { z } from "zod";

export const progressRouter = createTRPCRouter({
  getAllProgress: publicProcedure
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

      const { data: progress, error } = await supabaseServerClient()
        .from("progress")
        .select("*")
        .order("date", { ascending: false })
        .range(startIndex, endIndex);

      if (error) {
        console.log("Progress entry error: ", error.message);
        throw error;
      }
      // To get the total number of pages
      const { data: totalCount, error: countError } =
        await supabaseServerClient()
          .from("progress")
          .select("*", { count: "exact" });

      if (countError) {
        console.log("Total count error: ", countError.message);
        throw countError;
      }

      const totalPages = Math.ceil(totalCount?.length / pageSize);

      return { progress, totalPages };
    }),
  createProgress: protectedProcedure
    .input(
      z.object({
        date: z.string(),
        play: z.string(),
        wipTime: z.string(),
        selfCare: z.string(),
        wordCount: z.number().or(z.undefined()),
        progressParagraph: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { data: progress, error } = await supabaseServerClient()
        .from("progress")
        .insert([
          {
            date: input.date,
            play: input.play,
            wip_time: input.wipTime,
            self_care: input.selfCare,
            word_count: input.wordCount ?? null,
            progress_paragraph: input.progressParagraph,
          },
        ]);

      if (error) {
        console.log("Progress entry error: ", error.message);
        throw error;
      }

      return progress;
    }),
  updateProgress: publicProcedure
    .input(
      z.object({
        id: z.string(),
        date: z.string(),
        play: z.string(),
        wipTime: z.string(),
        selfCare: z.string(),
        wordCount: z.number().or(z.undefined()),
        progressParagraph: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { data: progress, error } = await supabaseServerClient()
        .from("progress")
        .update({
          date: input.date,
          play: input.play,
          wip_time: input.wipTime,
          self_care: input.selfCare,
          word_count: input.wordCount ?? null,
          progress_paragraph: input.progressParagraph,
        })
        .eq("id", input.id);

      if (error) {
        console.log("Progress entry error: ", error.message);
        throw error;
      }

      return progress;
    }),
});
