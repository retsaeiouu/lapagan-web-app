"use client";

import { refreshPublicFeed } from "@/actions/publicFeed";
import { useRouter } from "next/navigation";

export const HomeButtons = () => {
  const router = useRouter();

  return (
    <div className="max-sm:mt-16 grid lg:grid-cols-3 gap-2 md:gap-4">
      <button
        className="lg:col-span-2 rounded-3xl bg-custom_air flex flex-col items-center justify-center gap-3 md:gap-5 p-4 md:p-6 transition-all ease-out hover:scale-[1.02] duration-300"
        type="button"
        onClick={() => router.push("/public-feed/create-anonymous-note")}
      >
        <h3 className="font-comfortaa text-custom_raisin text-lg md:text-2xl font-bold">
          Post Anonymously
        </h3>
        <h4 className="font-comfortaa text-custom_raisin/80 text-sm md:text-base break-words text-center">
          Create an anonymous post now!
        </h4>
      </button>
      <button
        disabled
        className="relative bg-custom_payne rounded-3xl flex flex-col items-center justify-center p-4 md:p-5 transition-all ease-out duration-300"
      >
        <h3 className="opacity-30 font-comfortaa text-custom_mint/80 text-lg md:text-2xl font-bold">
          Accounts
        </h3>
        <h4 className="font-comfortaa text-custom_mint/10 text-sm md:text-base break-words text-center">
          Archived Notes, Like &amp; Comment interactivity, and more!
        </h4>
        <h4 className="absolute font-comfortaa text-custom_mint/70 text-sm md:text-base break-words text-center">
          Unavailable yet:(
        </h4>
      </button>
      <button
        className="lg:col-span-3 rounded-3xl flex flex-col items-center justify-center bg-custom_columbia/80 p-4 md:p-5 transition-all hover:scale-[1.02] ease-out duration-300"
        type="button"
        onClick={async () => {
          await refreshPublicFeed();
          router.push("/public-feed");
        }}
      >
        <h3 className="font-comfortaa text-custom_raisin text-lg md:text-2xl font-bold break-words">
          Public Feed
        </h3>
        <h4 className="font-comfortaa text-custom_raisin/80 text-sm md:text-base break-words text-center">
          Check out what others have shared!
        </h4>
      </button>
      <button
        disabled
        className="relative lg:col-span-3 rounded-3xl flex flex-col items-center justify-center bg-custom_raisin p-4 md:p-5 transition-all ease-out duration-300"
      >
        <h3 className="opacity-30 font-comfortaa text-custom_mint/30 text-lg md:text-2xl font-bold">
          What is lapagan?
        </h3>
        <h4 className="absolute font-comfortaa text-custom_mint/70 text-sm md:text-base break-words text-center">
          Unavailable yet:(
        </h4>
      </button>
    </div>
  );
};
