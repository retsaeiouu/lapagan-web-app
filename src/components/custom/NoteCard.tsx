import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChatBubbleOvalLeftEllipsisIcon as CommentIcon,
  HeartIcon as LikedIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as UnlikedIcon } from "@heroicons/react/24/outline";
import { LikeButton } from "@/hooks/custom/LikeButton";
import { validateRequest } from "@/actions/userFormActions";

export default async function NoteCard({
  noteId,
  author,
  time,
  content,
  likeDetails,
}: {
  noteId: string;
  author: string;
  time: string;
  content: string;
  likeDetails: { userId: string; count: number };
}) {
  const { user } = await validateRequest();

  //  NOTE:
  //  - - - > the like action is working, the next thing
  //          to do is, unlike action (to prevent multiple likes)
  //          and add a limit of 5 like interaction per user
  //          (to prevent spam) with maybe a penalty time of 5mins
  //          also add a loading ui when the like is submitting

  return (
    <Card className="flex flex-col w-[100%] bg-secondary border-none">
      <div className="h-auto flex">
        <CardHeader className="flex flex-col h-auto pr-0">
          <CardDescription className="flex flex-col text-sm">
            <span className="font-bold text-foreground/80">{`@${author}`}</span>
            <span className="text-muted-foreground/70 text-xs">{time}</span>
          </CardDescription>
          <CardTitle className="max-w-[12rem] sm:max-w-72">
            <div className="text-lg font-black break-words">{content}</div>
          </CardTitle>
        </CardHeader>
        <div className="flex flex-col p-3 gap-1 ml-auto">
          {user && <LikeButton noteId={noteId} userId={user.id} />}
          <CommentIcon className="h-8 w-8 text-foreground" />
        </div>
      </div>
      <CardFooter className="flex items-start gap-5 text-xs text-muted-foreground/70">
        <p>
          {likeDetails ? likeDetails.count : 0}{" "}
          {likeDetails && likeDetails.count !== 1 ? "Likes" : "Like"}
        </p>
        <p>98 Comments</p>
      </CardFooter>
    </Card>
  );
}
