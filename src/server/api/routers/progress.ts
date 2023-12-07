import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { supabaseServerComponentClient } from "@/server/vendor/supabase";
import { z } from "zod";

export const progressRouter = createTRPCRouter({
  createProgress: publicProcedure
    .input(
      z.object({
        date: z.string(),
        play: z.string(),
        wipTime: z.string(),
        selfCare: z.string(),
        wordCount: z.number(),
        progressParagraph: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { data: progress, error } = await supabaseServerComponentClient()
        .from("progress")
        .insert([
          {
            date: input.date,
            play: input.play,
            wip_time: input.wipTime,
            self_care: input.selfCare,
            word_count: input.wordCount,
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
