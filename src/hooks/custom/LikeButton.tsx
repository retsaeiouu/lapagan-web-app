"use client";

import { HeartIcon as LikedIcon } from "@heroicons/react/24/solid";
import { HeartIcon as UnlikedIcon } from "@heroicons/react/24/outline";
import { useFormState, useFormStatus } from "react-dom";
import { likeAction, unlikeAction } from "@/actions/noteMethods";

export function LikeButton({
  noteId,
  userId,
  isLiked,
}: {
  noteId: string;
  userId: string;
  isLiked: boolean;
}) {
  function Like() {
    //  NOTE: do something with the unused variable
    const [_, action] = useFormState(likeAction, null);
    return (
      <form action={action}>
        <input name="noteId" value={noteId} readOnly={true} hidden={true} />
        <input name="userId" value={userId} readOnly={true} hidden={true} />
        <LikeFormButton />
      </form>
    );
  }

  function Unlike() {
    const [_, action] = useFormState(unlikeAction, null);
    return (
      <form action={action}>
        <input name="noteId" value={noteId} readOnly={true} hidden={true} />
        <input name="userId" value={userId} readOnly={true} hidden={true} />
        <UnlikeFormButton />
      </form>
    );
  }

  return !isLiked ? <Like /> : <Unlike />;
}

export function LikeFormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      <UnlikedIcon
        className={`h-8 w-8 ${pending ? "text-foreground/50" : "text-foreground"}`}
      />
    </button>
  );
}

export function UnlikeFormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      <LikedIcon
        className={`h-8 w-8 ${pending ? "text-foreground/50" : "text-foreground"}`}
      />
    </button>
  );
}
