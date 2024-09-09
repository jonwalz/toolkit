import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Email must contain at least 3 characters." }),
  password: z
    .string()
    .min(3, { message: "Password must contain at least 3 characters." })
    .max(20),
});

export type LoginFormData = z.infer<typeof loginSchema>;
import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Email must contain at least 3 characters." }),
  password: z
    .string()
    .min(3, { message: "Password must contain at least 3 characters." })
    .max(20),
});

export type LoginFormData = z.infer<typeof loginSchema>;
