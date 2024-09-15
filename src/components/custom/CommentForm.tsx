"use client";

import { commentFormSchema, t_commentFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Input } from "@/components/ui/input";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addComment } from "@/actions/commentActions";
import { useFormState, useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export default function CommentForm({
  noteId,
  userId,
}: {
  noteId: string;
  userId: string;
}) {
  const form = useForm<t_commentFormSchema>({
    mode: "onChange",
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: "",
    },
  });
  const { isValid } = form.formState;

  const [response, action] = useFormState(addComment, null);

  console.log(response?.message);

  return (
    <Form {...form}>
      <form
        action={action}
        className="fixed bottom-0 left-0 flex rounded-b-3xl justify-center items-center gap-3 h-14 w-[100%] bg-background/70 backdrop-blur-lg"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="border-none bg-secondary w-[100%]"
                  placeholder="share anything.."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <input name="noteId" value={noteId} readOnly={true} hidden={true} />
        <input name="userId" value={userId} readOnly={true} hidden={true} />
        <CommentFormButton valid={isValid} />
      </form>
    </Form>
  );
}

function CommentFormButton({ valid }: { valid: boolean }) {
  const { pending } = useFormStatus();
  return pending ? (
    <button type="submit" disabled>
      <Loader2 className="h-6 w-6 animate-spin" />
    </button>
  ) : (
    <button type="submit" disabled={!valid}>
      {valid ? (
        <PaperAirplaneIcon className="text-foreground h-7 w-7" />
      ) : (
        <PaperAirplaneIcon className="text-muted-foreground/50 h-7 w-7" />
      )}
    </button>
  );
}
