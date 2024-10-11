//  NOTE: PRODUCTION-READY LESGOOOOO
//  TODO: Accounts and like-comment features!!!

import { AnonymousNoteForm } from "@/components/client/AnonymousNoteForm";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <div className="drop-shadow-xl mx-8 mt-16 flex flex-col gap-6 md:gap-8 px-4 md:px-8 py-4 rounded-3xl lg:w-4/6 bg-custom_charcoal">
        <h1 className="text-center mb-auto text-2xl md:text-3xl font-bold font-comfortaa text-custom_mint/80">
          Create a new anonymous Note
        </h1>
        <AnonymousNoteForm />
      </div>
    </div>
  );
}
