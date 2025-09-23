import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .email({ message: "Invalid email format" })
    .min(1, { message: "Email required" }),
  password: z
    .string({ message: "Password must be string" })
    .min(8, { message: "Password minimum length is 8" }),
});
