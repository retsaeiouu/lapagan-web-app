import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";
import AccountPopup from "./AccountPopup";

export default function RootCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-screen lg:w-1/2 flex flex-col border-none">
      <ScrollArea className="flex-1">
        <CardHeader className="sticky top-0 items-center bg-background/60 backdrop-blur-sm">
          <CardTitle className="font-monkey text-2xl lg:text-3xl tracking-wide text-foreground/60">
            Lapagan
          </CardTitle>
          <div className="ml-auto">
            <AccountPopup />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">{children}</div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
