import * as z from "zod";

export const AddCourseSchema = z.object({
  title: z
    .string({ message: "Title must be string" })
    .min(1, { message: "Title required" }),
  slug: z
    .string({ message: "Slug must be string" })
    .min(1, { message: "Slug required" }),
  price: z.number({ message: "Price must be number" }),
  currency: z
    .string({ message: "Currency must be string" })
    .min(1, { message: "Currency required" }),
  duration: z.number({ message: "Duration must be number" }),
  tags: z
    .array(z.string({ message: "Tags must be string" }))
    .min(1, { message: "Tags required" }),
  thumbnail: z
    .string({ message: "Thumbnail must be string" })
    .min(1, { message: "Thumbnail required" }),
  level: z
    .string({ message: "Summary must be string" })
    .min(1, { message: "Summary required" }),
  summary: z
    .string({ message: "Thumbnail must be string" })
    .min(1, { message: "Thumbnail required" }),
  content: z
    .string({ message: "Content must be string" })
    .min(1, { message: "Content required" }),
});
