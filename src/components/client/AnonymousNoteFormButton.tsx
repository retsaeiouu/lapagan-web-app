"use client";

import { useFormStatus } from "react-dom";

export const SubmitButton = ({ isValid }: { isValid: boolean }) => {
  const { pending } = useFormStatus();
  return pending ? (
    <button
      disabled={!isValid}
      className="opacity-50 rounded-xl bg-custom_payne drop-shadow-lg hover:bg-custom_air active:scale-95 active:bg-custom_air p-4 font-comfortaa tracking-wide font-bold text-lg md:text-2xl text-custom_mint/80 transition-all duration-150 ease-out"
      type="submit"
    >
      creating post..
    </button>
  ) : (
    <button
      disabled={!isValid}
      className={`
          ${!isValid && "opacity-25"}
          rounded-xl bg-custom_payne drop-shadow-lg hover:bg-custom_air active:scale-95 active:bg-custom_air p-4 font-comfortaa tracking-wide font-bold text-lg md:text-2xl text-custom_mint/80 transition-all duration-150 ease-out
        `}
      type="submit"
    >
      post note
    </button>
  );
};
