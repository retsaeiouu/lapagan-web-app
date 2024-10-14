import { getAnonymousNotes } from "@/actions/anonymousNote";
import { refreshPublicFeed } from "@/actions/publicFeed";

export default function Page() {
  return (
    <main className="px-8 md:px-16 lg:px-32">
      <div className="flex flex-col gap-5">
        <h3 className="text-xs md:text-sm tracking-wider font-semibold text-custom_mint/40 font-poppins self-center">
          public feed
        </h3>
        <Notes />
      </div>
    </main>
  );
}

async function Notes() {
  await refreshPublicFeed();
  const notes = await getAnonymousNotes();
  const MAX_NOTE_LENGTH = 100;

  return (
    <>
      {!notes && (
        <h2 className="text-xs md:text-sm tracking-wider font-semibold text-custom_mint/40 font-poppins self-center">
          There are currently no posted notes yet.
        </h2>
      )}
      <div className="grid lg:grid-cols-2 gap-5 justify-center">
        {notes &&
          notes.map((note) => (
            <div
              key={note.id}
              className={`
                ${note.content.length >= MAX_NOTE_LENGTH && "lg:col-span-2"}
                max-sm:w-[19rem] font-comfortaa flex flex-col bg-custom_charcoal px-6 py-4 gap-4 md:gap-6 rounded-3xl
              `}
            >
              <h3 className="text-base italic text-custom_mint/90 font-bold">
                Anonymous
              </h3>
              <div className="text-pretty break-words">
                <p className="text-lg font-bold text-custom_mint">
                  {note.content}
                </p>
              </div>
              <h6 className="mt-auto text-xs font-bold text-custom_mint/60">
                {note.created}
              </h6>
            </div>
          ))}
      </div>
    </>
  );
}
