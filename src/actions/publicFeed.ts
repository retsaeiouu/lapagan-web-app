"use server";

import { revalidatePath } from "next/cache";

export const refreshPublicFeed = async () => revalidatePath("/public-feed");
