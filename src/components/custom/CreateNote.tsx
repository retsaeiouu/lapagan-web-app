"use client";

import {
  Drawer,
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

import { PencilIcon } from "@heroicons/react/24/solid";
import { noteFormSchema, type t_noteFormSchema } from "@/lib/types";
import { postNote } from "@/actions/noteFormActions";
import { useFormState } from "react-dom";
import { Textarea } from "../ui/textarea";

//  NOTE:
//  - - - > implement note form action
//          both post and querying

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
        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
