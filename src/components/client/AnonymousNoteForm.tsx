"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { anonymousNoteZodSchema } from "@/utils/anonymousNoteSchema";
import { createAnonymousNote } from "@/actions/anonymousNote";
import { SubmitButton } from "./AnonymousNoteFormButton";

export const AnonymousNoteForm = () => {
  const {
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(anonymousNoteZodSchema),
    mode: "onTouched",
    defaultValues: {
      content: "",
    },
  });

  return (
    <form action={createAnonymousNote} className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <textarea
          placeholder="what's up?"
          className="focus:outline-none break-words text-pretty text-custom_mint focus:text-custom_raisin bg-transparent focus:bg-custom_columbia h-72 md:h-44 text-lg md:text-xl font-comfortaa font-bold tracking-wide px-4 py-2 rounded-xl resize-none transition-all duration-150 ease-out"
          {...register("content")}
        />
        {errors && errors.content && (
          <p className="font-poppins font-bold text-rose-400 text-sm">
            {errors.content.message}
          </p>
        )}
      </div>
      <SubmitButton isValid={isValid} />
    </form>
  );
};
