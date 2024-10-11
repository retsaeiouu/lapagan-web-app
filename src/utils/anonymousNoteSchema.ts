import { z } from "zod";

export const anonymousNoteZodSchema = z.object({
  content: z.string().trim().min(1, { message: "posts can't be empty" }),
});
