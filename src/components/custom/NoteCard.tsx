import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LikeButton } from "@/hooks/custom/LikeButton";
import { validateRequest } from "@/actions/userFormActions";
import { isUserLiked } from "@/actions/noteMethods";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import CommentSection from "./CommentSection";

export default async function NoteCard({
  noteId,
  author,
  time,
  content,
  likeDetails,
  comments,
}: {
  noteId: string;
  author: string;
  time: string;
  content: string;
  likeDetails: { userId: string; count: number };
  comments: number;
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
          className="h-[60%] w-[90%] bg-secondary rounded-3xl p-2 pt-5 pb-3 border-none"
          aria-describedby={undefined}
        >
          <div className="flex flex-col ml-6">
            <h3 className="font-bold text-foreground/80">{`@${author}`}</h3>
            <h3 className="text-muted-foreground/70 text-xs">{time}</h3>
          </div>
          <ScrollArea>
            <Card className="flex flex-col w-[100%] bg-secondary mt-0 mb-0 pt-0 border-none">
              <div className="h-auto flex">
                <CardHeader className="flex flex-col mt-0 pt-0 h-auto pr-0">
                  <CardTitle className="max-w-[12rem] sm:max-w-72 mt-0 pt-0">
                    <div className="text-lg font-black break-words flex flex-col items-start">
                      {content}
                    </div>
                  </CardTitle>
                </CardHeader>
              </div>
            </Card>
          </ScrollArea>
          <div className="flex h-auto items-center gap-5 ml-6 text-xs text-muted-foreground/70">
            <p>
              {likeDetails ? likeDetails.count : 0}{" "}
              {likeDetails && likeDetails.count !== 1 ? "Likes" : "Like"}
            </p>
            <p>
              {comments ? comments : 0}{" "}
              {comments && comments !== 1 ? "Comments" : "Comment"}
            </p>
          </div>
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
          <CommentSection noteId={noteId} userId={user?.id} author={author} />
        </div>
      </div>
      <CardFooter className="flex items-start gap-5 text-xs text-muted-foreground/70">
        <p>
          {likeDetails ? likeDetails.count : 0}{" "}
          {likeDetails && likeDetails.count !== 1 ? "Likes" : "Like"}
        </p>
        <p>
          {comments ? comments : 0}{" "}
          {comments && comments !== 1 ? "Comments" : "Comment"}
        </p>
      </CardFooter>
    </Card>
  );
}
