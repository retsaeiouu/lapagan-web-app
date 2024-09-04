import { sql } from "drizzle-orm";
import { integer } from "drizzle-orm/sqlite-core";
import { text } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  username: text("username").notNull().unique(),
  password_hash: text("password_hash").notNull(),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});

export const noteTable = sqliteTable("note", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  content: text("content").notNull(),
  created: text("created").default(sql`(CURRENT_TIMESTAMP)`),
});

export const likeTable = sqliteTable("like", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  noteId: text("note_id")
    .notNull()
    .references(() => noteTable.id),
});

export const commentTable = sqliteTable("comment", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  content: text("content").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  noteId: text("note_id")
    .notNull()
    .references(() => noteTable.id),
  created: text("created").default(sql`(CURRENT_TIMESTAMP)`),
});
