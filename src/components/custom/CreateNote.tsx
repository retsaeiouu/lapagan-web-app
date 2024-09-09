import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { PencilIcon } from "@heroicons/react/24/solid";
import { NoteForm } from "./NoteForm";

//  NOTE:
//  - - - > implement note form action
//          both post and querying, add
//          anonymous posts feature

export default async function CreateNote() {
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="absolute bottom-5 right-6 p-3 bg-primary rounded-full">
          <PencilIcon className="h-6 w-6 text-secondary" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="border-none rounded-t-3xl bg-background">
        <DrawerHeader>
          <DrawerTitle>Post a Note</DrawerTitle>
          <DrawerDescription>Share your thoughts!</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <NoteForm />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
