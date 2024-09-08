import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UserIcon } from "@heroicons/react/24/solid";
import UserForm from "@/components/custom/UserForm";

import { logout, validateRequest } from "@/actions/userFormActions";
import { User } from "lucia";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default async function AccountPopup() {
  const { user } = await validateRequest();

  return !user ? <AccountCenter /> : <Dashboard user={user} />;
}

// if not logged in
function AccountCenter() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex gap-2 items-center text-foreground">
          <UserIcon className="h-4 w-4 lg:h-5 lg:w-5" />
          <h3 className="font-bold lg:text-xl">Account</h3>
        </div>
      </DialogTrigger>
      <DialogContent className="border-none">
        <Tabs defaultValue="signup" className="w-full">
          <DialogHeader className="flex flex-col gap-5">
            <DialogTitle>Account Center</DialogTitle>
            <TabsList>
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
          </DialogHeader>
          <TabsContent value="login" className="flex flex-col">
            <UserForm login={true} />
            <h3 className="mt-5 text-sm text-center">
              Are you new? <b>Create an account!</b>
            </h3>
          </TabsContent>
          <TabsContent value="signup" className="flex flex-col">
            <UserForm login={false} />
            <h3 className="mt-5 text-sm text-center">
              Already have an account? <b>Login now!</b>
            </h3>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// do this later
function Dashboard({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <h3 className="text-foreground font-bold text-sm lg:text-xl cursor-pointer">
          {`@${user.username}`}
        </h3>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-2xl bg-background/50 border-none backdrop-blur-md p-2 mt-3 mr-6">
        <DropdownMenuLabel className="flex gap-2 justify-center items-center">
          <UserIcon className="h-4 w-4" />
          <h3>My Account</h3>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LogoutButton() {
  return (
    <form action={logout}>
      <button className="text-foreground flex gap-2 items-center">
        <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
        sign out
      </button>
    </form>
  );
}
