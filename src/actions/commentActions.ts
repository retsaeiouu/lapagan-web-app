"use server";

import { db } from "@/db/init";
import { commentTable, userTable } from "@/db/schema";
import {
  commentTableInsertSchema,
  t_commentTableInsertSchema,
} from "@/lib/types";
import { desc, eq } from "drizzle-orm";
import { refreshHomePage } from "./userFormActions";

export async function getComments(noteId: string) {
  try {
    const comments = await db
      .select()
      .from(commentTable)
      .where(eq(commentTable.noteId, noteId))
      .orderBy(desc(commentTable.created))
      .execute();
    if (!comments.length) return null;

    return Promise.all(
      comments.map(async (comment) => {
        const username = await db
          .select({ username: userTable.username })
          .from(userTable)
          .where(eq(userTable.id, comment.userId))
          .execute();
        const ago = await getCommentAgoDisplay(comment.created!);
        return {
          user: username[0].username,
          content: comment.content,
          time: ago,
        };
      }),
    );
  } catch {
    return null;
  }
}

export async function addComment(_: unknown, data: FormData) {
  const noteId = data.get("noteId");
  const userId = data.get("userId");
  const content = data.get("content");
  if (!noteId || !userId || !content)
    return { success: false, message: "empty data" };

  const newComment: t_commentTableInsertSchema = {
    noteId: noteId as string,
    userId: userId as string,
    content: content as string,
  };

  const result = commentTableInsertSchema.safeParse(newComment);
  if (!result.success)
    return { success: false, message: "invalid data format" };

  try {
    await db.insert(commentTable).values(result.data).execute();
  } catch {
    return { success: false, message: "server error:(" };
  }

  refreshHomePage();
  return { success: true, message: "comment added" };
}

export async function getCommentAgoDisplay(timePosted: Date) {
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
