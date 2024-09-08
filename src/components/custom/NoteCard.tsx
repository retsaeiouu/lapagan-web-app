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
  HeartIcon as LikedIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as UnlikedIcon } from "@heroicons/react/24/outline";

export default function NoteCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="flex flex-col w-[100%] bg-secondary border-none">
      <div className="h-auto flex">
        <CardHeader className="flex flex-col h-auto pr-0">
          <CardDescription className="flex flex-col text-sm">
            <span className="font-bold text-foreground/80">@retsssssssss</span>
            <span className="text-muted-foreground/70 text-xs">just now</span>
          </CardDescription>
          <CardTitle className="max-w-[12rem] sm:max-w-72">
            <div className="text-lg font-black break-words">{children}</div>
          </CardTitle>
        </CardHeader>
        <div className="flex flex-col p-3 gap-1 ml-auto">
          <UnlikedIcon className="h-8 w-8 text-foreground" />
          <CommentIcon className="h-8 w-8 text-foreground" />
        </div>
      </div>
      <CardFooter className="flex items-start gap-5 text-xs text-muted-foreground/70">
        <p>200 Likes</p>
        <p>98 Comments</p>
      </CardFooter>
    </Card>
  );
}
