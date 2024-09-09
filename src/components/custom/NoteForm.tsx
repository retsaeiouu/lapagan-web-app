"use client";

import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
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

import { postNote } from "@/actions/noteFormActions";
import { noteFormSchema, type t_noteFormSchema } from "@/lib/types";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

import { Loader2 } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { Alert, AlertTitle } from "../ui/alert";
import { Textarea } from "../ui/textarea";

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
      {/* if not sucessful */}
      {response && !response.success && (
        <Alert variant="destructive" className="flex flex-col">
          <AlertTitle>
            <ExclamationCircleIcon className="h-5 w-5 translate-y-0.5" />
            {response?.message}
          </AlertTitle>
        </Alert>
      )}

      {/* if successfully created */}
      {response && response.success && (
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

      {/* this will not be rendered if the user */}
      {/* already posted a note */}
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
            <DrawerClose className="ml-3 text-sm text-muted-foreground font-bold">
              cancel
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
