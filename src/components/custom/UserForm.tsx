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
  userSignupFormZodSchema,
  userLoginFormZodSchema,
  type t_userSignupFormZodSchema,
  type t_userLoginFormZodSchema,
} from "@/lib/types";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function UserForm({ login }: { login: boolean }) {
  return login ? <LoginUserForm /> : <SignupUserForm />;
}

export function SignupUserForm() {
  const form = useForm<t_userSignupFormZodSchema>({
    resolver: zodResolver(userSignupFormZodSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password_hash: "",
    },
  });
  const { isValid } = form.formState;

  const [response, formAction] = useFormState(signupAction, null);

  return (
    <>
      {/* if not successful */}
      {response && !response.success && (
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
                  <Input
                    className="rounded-xl border-none bg-secondary"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter a unique name</FormDescription>
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
                  <Input
                    className="rounded-xl border-none bg-secondary"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter a secure password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <UserFormButton valid={isValid} />
        </form>
      </Form>
    </>
  );
}

export function LoginUserForm() {
  const form = useForm<t_userLoginFormZodSchema>({
    resolver: zodResolver(userLoginFormZodSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password_hash: "",
    },
  });
  const { isValid } = form.formState;

  const [response, formAction] = useFormState(loginAction, null);

  return (
    <>
      {/* if not successful */}
      {response && !response.success && (
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
                  <Input
                    className="rounded-xl border-none bg-secondary"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your username</FormDescription>
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
                  <Input
                    className="rounded-xl border-none bg-secondary"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <UserFormButton login={true} valid={isValid} />
        </form>
      </Form>
    </>
  );
}

export function UserFormButton({
  valid,
  login,
}: {
  valid: boolean;
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
