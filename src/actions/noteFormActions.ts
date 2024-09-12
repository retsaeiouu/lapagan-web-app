"use server";

import { noteTableInsertSchema, t_noteTableSchema } from "@/lib/types";
import { generateIdFromEntropySize } from "lucia";
import { refreshHomePage, validateRequest } from "./userFormActions";
import { db } from "@/db/init";
import { noteTable } from "@/db/schema";

export async function postNote(_: unknown, data: FormData) {
  try {
    const noteContent = data.get("content");
    if (!noteContent)
      return { success: false, message: "empty data, please try again" };

    const { user } = await validateRequest();
    if (!user) return { success: false, message: "no user logged in" };

    const noteId = generateIdFromEntropySize(10); // 16 characters

    const newNote: t_noteTableSchema = {
      id: noteId,
      userId: user.id,
      content: noteContent as string,
    };

    const result = noteTableInsertSchema.safeParse(newNote);
    if (!result.success) return { success: false, message: "server error:(" };

    await db.insert(noteTable).values(result.data).execute();

    refreshHomePage();

    return {
      success: true,
      message: "Your note has now been posted on everyone's feed!",
    };
  } catch {
    return { success: false, message: "server error:(" };
  }
}
