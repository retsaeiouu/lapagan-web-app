import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import AccountPopup from "@/components/custom/AccountPopup";
import { PencilIcon } from "@heroicons/react/24/solid";
import CreateNote from "./CreateNote";

export default async function RootCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="w-screen lg:w-1/2 flex flex-col border-none">
      <ScrollArea className="flex-1">
        <CardHeader className="flex sticky top-0 items-center h-full bg-background/50 backdrop-blur-md">
          <CardTitle className="font-monkey text-2xl lg:text-3xl tracking-wide text-foreground">
            Lapagan
          </CardTitle>
          <div className="ml-auto">
            <AccountPopup />
          </div>
        </CardHeader>
        <CardDescription className="mx-6 mb-2 font-bold">Feed</CardDescription>
        <CardContent>
          <div className="flex flex-col gap-5 items-center">{children}</div>
        </CardContent>
        <CreateNote />
      </ScrollArea>
    </Card>
  );
}
