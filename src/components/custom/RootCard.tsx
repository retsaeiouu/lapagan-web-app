import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import AccountPopup from "@/components/custom/AccountPopup";
import CreateNote from "./CreateNote";
import { validateRequest } from "@/actions/userFormActions";

export default async function RootCard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  return (
    <Card className="w-screen lg:w-1/2 flex flex-col border-none">
      <ScrollArea className="flex-1">
        <CardHeader className="flex sticky top-0 items-center h-full bg-background/50 backdrop-blur-md">
          <CardTitle className="font-hachi text-2xl lg:text-3xl tracking-wide text-foreground">
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
        {user && <CreateNote />} {/*  NOTE: create anonymous posting feature */}
      </ScrollArea>
    </Card>
  );
}
