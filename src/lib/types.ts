import { z } from "zod";
import { userTable } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";

const input_regex = /^[A-Za-z0-9@!><_.():;=]+$/;

// type for user auth forms
export const userFormZodSchema = createInsertSchema(userTable, {
  username: z
    .string()
    .min(3, { message: "username is too short" })
    .max(12, { message: "username must only contain 12 characters" })
    .regex(input_regex, {
      message: "spaces or invalid symbols are not allowed",
    }),
  password_hash: z
    .string()
    .min(8, { message: "password must contain 8 characters" })
    .regex(input_regex, {
      message: "spaces or invalid symbols are not allowed",
    }),
}).omit({ id: true });
export type t_userFormZodSchema = z.infer<typeof userFormZodSchema>;
