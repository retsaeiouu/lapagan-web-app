export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-16 flex flex-col gap-6 md:gap-8 px-4 md:px-8 py-4 w-full rounded-3xl lg:w-4/6 bg-custom_charcoal">
        <h1 className="text-center mb-auto text-2xl md:text-3xl font-bold font-comfortaa text-custom_mint/80">
          Create a new anonymous Note
        </h1>
        <textarea
          name="noteinput"
          placeholder="what's up?"
          className="focus:outline-none break-words text-pretty text-custom_mint focus:text-custom_raisin bg-transparent focus:bg-custom_columbia h-36 md:h-44 text-lg md:text-2xl font-comfortaa font-bold tracking-wide px-4 py-2 rounded-xl resize-none transition-all duration-150 ease-out"
        />
        <button
          className="rounded-xl bg-custom_payne hover:bg-custom_air active:scale-95 active:bg-custom_air p-4 font-comfortaa tracking-wide font-bold text-lg md:text-2xl text-custom_mint/80 transition-all duration-150 ease-out"
          type="submit"
        >
          post note
        </button>
      </div>
    </div>
  );
}
