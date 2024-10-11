import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const anonymousNoteTable = pgTable("anonymous_note_table", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
