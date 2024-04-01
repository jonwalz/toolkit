import { z } from "zod";

export const progressSchema = z.object({
  date: z.string(),
  play: z.string(),
  wipTime: z.string(),
  selfCare: z.string(),
  wordCount: z
    .string()
    .transform((value) => (value === "" ? null : parseFloat(value)))
    .nullable()
    .optional(),
  progressParagraph: z.string(),
  id: z.string().optional(),
});
