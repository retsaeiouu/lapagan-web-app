import { db } from "@/db/init";
import { noteTable, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

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

        return {
          author: noteAuthor[0].username,
          time: ago,
          content: note.content,
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
