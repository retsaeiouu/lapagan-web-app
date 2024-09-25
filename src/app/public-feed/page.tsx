export default function Page() {
  return (
    <div className="flex flex-col gap-5 pt-3">
      <h3 className="text-xs md:text-base font-bold text-custom_mint/60 font-poppins self-center">
        public feed
      </h3>
      <div className="grid lg:grid-cols-2 gap-5">
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
      </div>
    </div>
  );
}

function NoteCard() {
  return (
    <div className="flex flex-col bg-custom_charcoal p-6 gap-10 rounded-3xl">
      <div className="h-5 w-48 bg-custom_columbia" />
      <div className="flex flex-col gap-2 w-full">
        <div className="h-5 w-[100%] bg-custom_columbia" />
        <div className="h-5 w-[50%] bg-custom_columbia" />
        <div className="h-5 w-[60%] bg-custom_columbia" />
      </div>
      <div className="h-5 w-16 bg-custom_columbia" />
    </div>
  );
}
