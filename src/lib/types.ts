import { z } from "zod";

const spaceRegex = /^\S*$/;
const inputRegex = /^[A-Za-z0-9@!><_.():;=]+$/; // regex for user form input validation

// type for user table inserts
export const userTableInsertSchema = z.object({
  id: z.string().trim().min(1),
  username: z.string().min(1),
  password_hash: z.string().min(1),
});
export type t_userTableInsertSchema = z.infer<typeof userTableInsertSchema>;

// types for user auth forms
// signup
export const userFormZodSchema = z.object({
  username: z
    .string()
    .min(3, { message: "username is too short" })
    .max(12, { message: "username must only contain 12 characters" })
    .regex(spaceRegex, { message: "spaces are not allowed" })
    .regex(inputRegex, {
      message: "invalid symbols are not allowed",
    }),
  password_hash: z
    .string()
    .min(8, { message: "password must contain 8 characters" })
    .regex(spaceRegex, { message: "spaces are not allowed" })
    .regex(inputRegex, {
      message: "invalid symbols are not allowed",
    }),
});
export type t_userFormZodSchema = z.infer<typeof userFormZodSchema>;

// type for login
export const userLoginFormZodSchema = z.object({
  username: z.string().min(1, { message: "username can't be empty" }),
  password_hash: z.string().min(1, { message: "password can't be empty" }),
});
export type t_userLoginFormZodSchema = z.infer<typeof userLoginFormZodSchema>;

// types for notes table

export const noteTableSchema = z.object({
  id: z.string().trim().min(1),
  userId: z.string().trim().min(1),
  content: z.string().min(1, { message: "notes can't be empty" }),
});

export const noteFormSchema = z.object({
  content: z
    .string()
    .min(1, "notes can't be empty")
    .refine((value) => /\S/.test(value), {
      message: "notes cannot consist only of spaces",
    })
    .transform((value) => value.trim()),
});
export type t_noteFormSchema = z.infer<typeof noteFormSchema>;
