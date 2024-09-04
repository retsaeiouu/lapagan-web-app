import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import UserForm from "./UserForm";

export default function AccountPopup() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex gap-1 lg:gap-2 items-center">
          <h3 className="text-foreground/60 font-bold text-md lg:text-xl">
            Account
          </h3>
          <UserCircleIcon className="h-5 lg:h-7 w-5 lg:w-7 text-foreground/60" />
        </div>
      </DialogTrigger>
      <DialogContent className="border-none">
        <Tabs defaultValue="login" className="w-full">
          <DialogHeader className="flex flex-col gap-5">
            <DialogTitle>Account Center</DialogTitle>
            <TabsList>
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
          </DialogHeader>
          <TabsContent value="login" className="flex flex-col">
            <UserForm />
            <h3 className="mt-auto text-sm text-center">
              Are you new? <b>Create an account!</b>
            </h3>
          </TabsContent>
          <TabsContent value="signup" className="flex flex-col">
            <UserForm />
            <h3 className="mt-auto text-sm text-center">
              Already have an account? <b>Login now!</b>
            </h3>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
