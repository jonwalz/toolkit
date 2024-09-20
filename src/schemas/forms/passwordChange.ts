import { z } from "zod";

export const passwordChangeSchema = z
  .object({
    password: z
      .string()
      .min(3, { message: "Password must contain at least 3 characters." }),
    confirmPassword: z.string().min(3, {
      message: "Confirm Password must contain at least 3 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
