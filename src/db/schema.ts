import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  username: text("username").notNull().unique(),
  password_hash: text("password_hash").notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const noteTable = pgTable("note", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  content: text("content").notNull(),
  created: timestamp("created").defaultNow(),
});

export const likeTable = pgTable("like", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  noteId: text("note_id")
    .notNull()
    .references(() => noteTable.id),
});

export const commentTable = pgTable("comment", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  noteId: text("note_id")
    .notNull()
    .references(() => noteTable.id),
  created: timestamp("created").defaultNow(),
});
