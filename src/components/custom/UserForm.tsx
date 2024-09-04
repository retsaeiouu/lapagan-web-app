"use client";

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

import { userFormZodSchema, type t_userFormZodSchema } from "../../lib/types";

export default function UserForm() {
  const form = useForm<t_userFormZodSchema>({
    resolver: zodResolver(userFormZodSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password_hash: "",
    },
  });

  function onSubmit(userInput: t_userFormZodSchema) {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // action={submitData}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="iluvbinigwen>.<" {...field} />
              </FormControl>
              <FormDescription>Enter a unique name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_hash"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="missusomuch" {...field} />
              </FormControl>
              <FormDescription>Enter a secure password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
