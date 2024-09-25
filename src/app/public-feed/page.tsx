export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-xs md:text-sm tracking-wider font-semibold text-custom_mint/40 font-poppins self-center">
        public feed
      </h3>
      <div className="grid lg:grid-cols-2 gap-5 justify-center">
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
    <div className="max-sm:w-[19rem] font-comfortaa flex flex-col bg-custom_charcoal px-6 py-4 gap-4 md:gap-6 rounded-3xl">
      <h3 className="text-base italic text-custom_mint/90 font-bold">
        Anonymous
      </h3>
      <div className="text-pretty break-words">
        <p className="text-lg font-bold text-custom_mint">
          missssssuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu maloi onli hehe
        </p>
      </div>
      <h6 className="text-xs font-bold text-custom_mint/60">2 days ago</h6>
    </div>
  );
}
