import * as z from "zod";

export const RegisterSchema = z.object({
  fullName: z
    .string({ message: "Name must be string" })
    .min(2, { message: "Name minimum length is 2" }),
  email: z
    .email({ message: "Invalid email format" })
    .min(1, { message: "Email required" }),
  password: z
    .string({ message: "Password must be string" })
    .min(8, { message: "Password minimum length is 8" }),
});
