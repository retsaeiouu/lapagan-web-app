"use server";

import { db } from "@/db/init";
import { anonymousNoteTable } from "@/db/schema";

export const createAnonymousNote = async (data: FormData) => {
  const content = data.get("anonymousnoteinput");

  await db.insert(anonymousNoteTable).values({
    content: content as string,
  });
};
