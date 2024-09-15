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
export const userSignupFormZodSchema = z.object({
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
export type t_userSignupFormZodSchema = z.infer<typeof userSignupFormZodSchema>;

// type for login
export const userLoginFormZodSchema = z.object({
  username: z.string().min(1, { message: "username can't be empty" }),
  password_hash: z.string().min(1, { message: "password can't be empty" }),
});
export type t_userLoginFormZodSchema = z.infer<typeof userLoginFormZodSchema>;

// types for notes
export const noteTableInsertSchema = z.object({
  id: z.string().trim().min(1),
  userId: z.string().trim().min(1),
  content: z.string().min(1, { message: "notes can't be empty" }),
});
export type t_noteTableSchema = z.infer<typeof noteTableInsertSchema>;

export const noteFormSchema = z.object({
  content: z
    .string()
    .min(1, { message: "notes can't be empty" })
    .refine((value) => /\S/.test(value), {
      message: "notes cannot consist only of spaces",
    })
    .transform((value) => value.trim()),
});
export type t_noteFormSchema = z.infer<typeof noteFormSchema>;

// types for likes
export const likeTableInsertSchema = z.object({
  userId: z.string().min(1),
  noteId: z.string().min(1),
});
export type t_likeTableInsertSchema = z.infer<typeof likeTableInsertSchema>;

// types for comments
export const commentTableInsertSchema = z.object({
  userId: z.string().min(1),
  noteId: z.string().min(1),
  content: z.string().min(1, { message: "comment is empty" }),
});
export type t_commentTableInsertSchema = z.infer<
  typeof commentTableInsertSchema
>;

export const commentFormSchema = commentTableInsertSchema.pick({
  content: true,
});
export type t_commentFormSchema = z.infer<typeof commentFormSchema>;
