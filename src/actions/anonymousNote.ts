"use server";

import { db } from "@/db/init";
import { anonymousNoteTable } from "@/db/schema";
import { getDisplay } from "@/utils/timeFormat";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createAnonymousNote = async (data: FormData) => {
  const content = data.get("content");

  await db.insert(anonymousNoteTable).values({
    content: content as string,
  });

  revalidatePath("/public-feed");
  redirect("/public-feed");
};

export const getAnonymousNotes = async () => {
  const notes = await db
    .select()
    .from(anonymousNoteTable)
    .orderBy(sql`"created_at" DESC`)
    .execute();
  if (notes.length === 0) return null;

  return notes.map((note) => {
    return {
      id: note.id,
      content: note.content,
      created: getDisplay(note.createdAt!),
    };
  });
};
