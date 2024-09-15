import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChatBubbleOvalLeftEllipsisIcon as CommentIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { getComments } from "@/actions/commentActions";
import CommentForm from "./CommentForm";

export default async function CommentSection({
  noteId,
  userId,
  author,
}: {
  noteId: string;
  userId?: string;
  author: string;
}) {
  const comments = await getComments(noteId);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <CommentIcon className="h-8 w-8 text-foreground" />
        </DialogTrigger>
        <DialogContent className="flex flex-col h-auto w-[90%] py-0 pb-14 bg-background rounded-3xl border-none">
          <ScrollArea className="h-96 flex flex-col items-center justify-center">
            <DialogHeader className="sticky top-0 h-20 bg-background/50 backdrop-blur-lg flex flex-col items-center justify-center">
              <DialogTitle className="font-bold text-lg">Comments</DialogTitle>
              <DialogDescription>note by @{author}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5 items-center">
              {comments ? (
                comments.map((comment, index) => (
                  <CommentCard {...comment} key={index} />
                ))
              ) : (
                <h1>There are currently no comments yet</h1>
              )}
            </div>
            {userId && <CommentForm userId={userId} noteId={noteId} />}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}

function CommentCard({
  user,
  content,
  time,
}: {
  user: string;
  content: string;
  time: string;
}) {
  return (
    <Card className="bg-secondary w-[100%] pb-2">
      <CardHeader className="flex flex-col justify-start pt-2">
        <CardTitle className="text-base font-bold text-foreground/80">
          @{user}
        </CardTitle>
        <CardDescription className="text-lg text-foreground font-bold break-words max-w-[12rem] sm:max-w-72">
          {content}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-xs text-muted-foreground">
        {time}
      </CardContent>
    </Card>
  );
}
