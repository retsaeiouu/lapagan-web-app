"use server";

import { hash, verify } from "@node-rs/argon2";

import { db } from "@/db/init";
import { userTable } from "@/db/schema";
import { t_userTableInsertSchema, userTableInsertSchema } from "@/lib/types";
import { lucia } from "@/lucia-auth/init";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import type { Session, User } from "lucia";

//  TODO:
//        add validate function and try to change
//        the ui on when the user is either logged
//        in or not

export async function signupAction(_: unknown, data: FormData) {
  try {
    const username = data.get("username");
    const password = data.get("password_hash");
    if (!username || !password)
      return { success: false, message: "Empty Data" };

    const userId = generateIdFromEntropySize(10);
    const hashedPassword = await hash(password as string, {
      // recommended minimum parameters -by lucia
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    const newUser: t_userTableInsertSchema = {
      id: userId,
      username: username as string,
      password_hash: hashedPassword,
    };

    // runtime type checks
    const result = userTableInsertSchema.safeParse(newUser);
    if (!result.success) return { success: false, message: "server error:(" };

    // result.data now has the verified data

    // checks if the username is taken
    const test = await db
      .select({ username: userTable.username })
      .from(userTable)
      .where(eq(userTable.username, result.data.username))
      .execute();
    if (test[0]?.username)
      return {
        success: false,
        message: `${result.data.username} is already taken`,
      };

    // inserts the user in the database
    await db.insert(userTable).values(result.data).execute();

    // lucia auth abstractions then sets the cookies
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return { success: true, message: "Account created!" };
  } catch {
    return { success: true, message: "server error:(" };
  }
}

export async function loginAction(_: unknown, data: FormData) {
  try {
    const username = data.get("username");
    const password_hash = data.get("password_hash");
    if (!username || !password_hash)
      return { success: false, message: "Empty Data" };

    // checks if the username exists
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username as string))
      .execute();
    if (!user[0])
      return { success: false, message: "Incorrect username or password" };

    // checks if the password is correct
    const correct = await verify(
      user[0].password_hash,
      password_hash as string,
      {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      },
    );
    if (!correct)
      return { success: false, message: "Incorrect username or password" };

    const session = await lucia.createSession(user[0].id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return { success: true, message: "You are now logged in!" };
  } catch {
    return { success: false, message: "server error:(" };
  }
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}
    return result;
  },
);

export async function logout() {
  const { session } = await validateRequest();
  if (!session) {
    refreshHomePage();
    return;
  }
  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  refreshHomePage();
}

export async function refreshHomePage() {
  // clears the cache then redirects
  // the request to home
  revalidatePath("/");
  redirect("/");
}
