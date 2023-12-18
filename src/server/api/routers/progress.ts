import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { supabaseServerClient } from "@/server/vendor/supabase";
import { z } from "zod";

export const progressRouter = createTRPCRouter({
  getProgress: publicProcedure.query(async () => {
    const { data: progress, error } = await supabaseServerClient()
      .from("progress")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.log("Progress entry error: ", error.message);
      throw error;
    }

    return progress;
  }),
  createProgress: publicProcedure
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
});
