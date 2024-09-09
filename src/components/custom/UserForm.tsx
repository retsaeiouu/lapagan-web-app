"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";

import { Alert, AlertTitle } from "@/components/ui/alert";
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
import { Loader2 } from "lucide-react";

import { loginAction, signupAction } from "@/actions/userFormActions";
import {
  userFormZodSchema,
  userLoginFormZodSchema,
  type t_userFormZodSchema,
  type t_userLoginFormZodSchema,
} from "@/lib/types";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function UserForm({ login }: { login: boolean }) {
  // conditional type for login or sign up form, might refactor this into
  // two seperate form for more readable
  type userFormSchemaType<isLogin extends boolean> = isLogin extends true
    ? t_userLoginFormZodSchema
    : t_userFormZodSchema;
  const resolver = login ? userLoginFormZodSchema : userFormZodSchema;
  const form = useForm<userFormSchemaType<typeof login>>({
    resolver: zodResolver(resolver),
    mode: "onChange",
    defaultValues: {
      username: "",
      password_hash: "",
    },
  });
  const { isValid } = form.formState;

  // handles if the form should be login or sign up
  // simple logic i came up with haha no bash bash
  let userFormType = login ? loginAction : signupAction;
  const [response, formAction] = useFormState(userFormType, null);

  return (
    <>
      {!response?.success && response != null && (
        <Alert variant="destructive" className="flex flex-col">
          <AlertTitle>
            <ExclamationCircleIcon className="h-5 w-5 translate-y-0.5" />
            {response?.message}
          </AlertTitle>
        </Alert>
      )}
      <Form {...form}>
        <form action={formAction} className="space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {!login && (
                  <FormDescription>Enter a unique name.</FormDescription>
                )}
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
                  <Input {...field} />
                </FormControl>
                {!login && (
                  <FormDescription>Enter a secure password</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          {!login ? (
            <UserFormButton valid={isValid} />
          ) : (
            <UserFormButton login={login} valid={isValid} />
          )}
        </form>
      </Form>
    </>
  );
}

export function UserFormButton({
  valid,
  login,
}: {
  valid?: boolean;
  login?: boolean;
}) {
  const { pending } = useFormStatus();

  function ButtonType() {
    return login ? (
      <Button type="submit" disabled={!valid}>
        Log in
      </Button>
    ) : (
      <Button type="submit" disabled={!valid}>
        Sign up
      </Button>
    );
  }

  return pending ? (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  ) : (
    <ButtonType />
  );
}
