"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { noteFormSchema, type t_noteFormSchema } from "@/lib/types";
import { postNote } from "@/actions/noteFormActions";
import { useFormState, useFormStatus } from "react-dom";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import { Alert, AlertTitle } from "../ui/alert";
import { refreshHomePage } from "@/actions/userFormActions";

//  NOTE:
//  - - - > implement note form action
//          both post and querying, add
//          anonymous posts feature

export default function CreateNote() {
  return (
    <>
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
    </>
  );
}

export function NoteForm() {
  const form = useForm<t_noteFormSchema>({
    mode: "onChange",
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      content: "",
    },
  });
  const { isValid } = form.formState;

  const [response, formAction] = useFormState(postNote, null);

  return (
    <>
      {!response?.success && response && (
        <Alert variant="destructive" className="flex flex-col">
          <AlertTitle>
            <ExclamationCircleIcon className="h-5 w-5 translate-y-0.5" />
            {response?.message}
          </AlertTitle>
        </Alert>
      )}
      {response?.success && response && (
        <div className="flex flex-col gap-4">
          <Alert className="border-none bg-teal-500 rounded-3xl flex items-center justify-center">
            <CheckCircleIcon className="h-5 w-5 translate-y-1" />
            <AlertTitle>{response?.message}</AlertTitle>
          </Alert>
          <DrawerClose>
            <Button variant="secondary" className="w-full">
              confirm
            </Button>
          </DrawerClose>
        </div>
      )}
      {!response && (
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="what's up?"
                      className="resize-none bg-secondary text-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be posted in everyone&apos;s feed
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <NoteButton valid={isValid} />
            <DrawerClose>
              <Button variant="ghost">cancel</Button>
            </DrawerClose>
          </form>
        </Form>
      )}
    </>
  );
}

function NoteButton({ valid }: { valid: boolean }) {
  const { pending } = useFormStatus();
  return pending ? (
    <Button type="submit" disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  ) : (
    <Button type="submit" disabled={!valid}>
      Post note
    </Button>
  );
}
