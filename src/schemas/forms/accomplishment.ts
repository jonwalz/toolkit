import { z } from "zod";

export const accomplishmentSchema = z.object({
  date: z.string(),
  accomplishment: z.string(),
  next_step: z.string(),
  id: z.string().optional(),
});
