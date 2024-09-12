"use server";

import { db } from "@/db/init";
import { likeTable, noteTable, userTable } from "@/db/schema";
import { likeTableInsertSchema, t_likeTableInsertSchema } from "@/lib/types";
import { eq, sql } from "drizzle-orm";

export async function getNotes() {
  try {
    const rawNotes = await db.select().from(noteTable).execute();
    if (!rawNotes[0]) return null;

    return Promise.all(
      rawNotes.map(async (note) => {
        const noteAuthor = await db
          .select({ username: userTable.username })
          .from(userTable)
          .where(eq(userTable.id, note.userId))
          .execute();

        const ago = await getAgoDisplay(note.created!);

        const likeDetails = await db
          .select({
            userId: likeTable.userId,
            count: sql<number>`cast(count(*) as integer)`,
          })
          .from(likeTable)
          .where(eq(likeTable.noteId, note.id))
          .groupBy(likeTable.userId)
          .execute();

        return {
          noteId: note.id,
          author: noteAuthor[0].username,
          time: ago,
          content: note.content,
          likeDetails: likeDetails[0],
        };
      }),
    );
  } catch {
    return null;
  }
}

export async function getAgoDisplay(timePosted: Date) {
  const now = new Date();
  const difference = Math.floor(
    ((now as any) - (new Date(timePosted) as any)) / 1000,
  );

  if (difference < 60) {
    return "just now";
  }

  const minutes = Math.floor(difference / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days <= 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  return `more than 7 days ago`;
}

export async function likeAction(_: unknown, data: FormData) {
  const userId = data.get("userId");
  const noteId = data.get("noteId");
  if (!userId || !noteId) return { success: false, message: "empty data" };
  const newLike: t_likeTableInsertSchema = {
    userId: userId as string,
    noteId: noteId as string,
  };

  const result = likeTableInsertSchema.safeParse(newLike);
  if (!result.success) return { success: false, message: "invalid data" };

  try {
    await db.insert(likeTable).values(result.data);
  } catch {
    return { success: false, message: "server error:(" };
  }
  return { success: true, message: "Liked!" };
}