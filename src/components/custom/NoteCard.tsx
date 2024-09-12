import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChatBubbleOvalLeftEllipsisIcon as CommentIcon } from "@heroicons/react/24/solid";
import { LikeButton } from "@/hooks/custom/LikeButton";
import { validateRequest } from "@/actions/userFormActions";
import { isUserLiked } from "@/actions/noteMethods";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

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
  const isLiked = await isUserLiked(user?.id, noteId);

  // max displayed note content
  const maxContentLength = 200;

  //  NOTE:
  //  - - - > like feature is done, work with comments feature
  //          tmr. and then fallback uis and sh*ts

  function ClickableNotes() {
    return (
      <Dialog>
        <DialogTrigger>
          <div className="text-sm text-muted-foreground font-light italic mr-auto">
            view full note
          </div>
        </DialogTrigger>
        <DialogContent
          className="h-[80%] w-[90%] bg-secondary rounded-3xl p-2 border-none"
          aria-describedby={undefined}
        >
          <ScrollArea>
            <Card className="flex flex-col w-[100%] bg-secondary border-none">
              <div className="h-auto flex">
                <CardHeader className="flex flex-col h-auto pr-0">
                  <CardDescription className="flex flex-col text-sm fixed top-2 left-2 px-2 py-2 bg-secondary/30 backdrop-blur-lg rounded-xl">
                    <span className="font-bold text-foreground/80">{`@${author}`}</span>
                    <span className="text-muted-foreground/70 text-xs">
                      {time}
                    </span>
                  </CardDescription>
                  <CardTitle className="max-w-[12rem] sm:max-w-72">
                    <div className="text-lg font-black break-words flex flex-col items-start">
                      {content}
                    </div>
                  </CardTitle>
                </CardHeader>
              </div>
              <CardFooter className="fixed bottom-2 bg-secondary/30 py-1 px-2 rounded-xl backdrop-blur-lg flex items-start gap-5 text-xs text-muted-foreground/70">
                <p>
                  {likeDetails ? likeDetails.count : 0}{" "}
                  {likeDetails && likeDetails.count !== 1 ? "Likes" : "Like"}
                </p>
                <p>98 Comments</p>
              </CardFooter>
            </Card>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Card className="flex flex-col w-[100%] bg-secondary border-none">
      <div className="h-auto flex">
        <CardHeader className="flex flex-col h-auto pr-0">
          <CardDescription className="flex flex-col text-sm">
            <span className="font-bold text-foreground/80">{`@${author}`}</span>
            <span className="text-muted-foreground/70 text-xs">{time}</span>
          </CardDescription>
          <CardTitle className="max-w-[12rem] sm:max-w-72">
            <div className="text-lg font-black break-words">
              {content.length >= maxContentLength
                ? content.slice(0, maxContentLength)
                : content}
              {content.length >= maxContentLength && (
                <>
                  <br />
                  <ClickableNotes />
                </>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <div className="flex flex-col p-3 gap-1 ml-auto">
          {user && (
            <LikeButton noteId={noteId} userId={user.id} isLiked={isLiked} />
          )}
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
