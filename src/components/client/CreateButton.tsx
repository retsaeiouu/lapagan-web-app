"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function CreateButton() {
  "use client";
  return (
    <div
      className={`${usePathname() === "/public-feed" ? "" : "hidden"} ml-auto text-custom_mint hover:text-custom_columbia transition-all duration-500 ease-in-out`}
    >
      <Link
        href="/public-feed/create-anonymous-note"
        className="flex gap-1 items-center"
      >
        <h4 className="text-base md:text-xl font-bold font-poppins tracking-wide">
          create
        </h4>
        <PaperAirplaneIcon className="h-5 w-5" />
      </Link>
    </div>
  );
}
