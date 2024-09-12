"use client";

import { useEffect, useState } from "react";

import { HeartIcon as LikedIcon } from "@heroicons/react/24/solid";
import { HeartIcon as UnlikedIcon } from "@heroicons/react/24/outline";
import { useFormState, useFormStatus } from "react-dom";
import { likeAction } from "@/actions/noteMethods";

export function LikeButton({
  noteId,
  userId,
}: {
  noteId: string;
  userId: string;
}) {
  const [liked, setLiked] = useState(false);

  return <LikeAction noteId={noteId} userId={userId} />;
}

export function LikeAction({
  noteId,
  userId,
}: {
  noteId: string;
  userId: string;
}) {
  const [response, action] = useFormState(likeAction, null);
  return (
    <form action={action}>
      <input name="noteId" value={noteId} readOnly={true} hidden={true} />
      <input name="userId" value={userId} readOnly={true} hidden={true} />
      <LikeFormButton />
    </form>
  );
}

export function LikeFormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      <UnlikedIcon className="h-8 w-8 text-foreground" />
    </button>
  );
}
