import Link from "next/link";

//  FIXME: scrolling is not smooth -_-

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-auto flex flex-col justify-between max-sm:pt-16 pb-2 md:pb-4 px-8 md:px-16 lg:px-32">
      <MainDisplay />
      <MainButtons />
    </main>
  );
}

const MainDisplay = () => (
  <div className="flex flex-1 flex-col justify-center gap-8 md:gap-12 items-center">
    <h1 className="text-custom_mint font-gloria font-bold text-5xl md:text-6xl tracking-wide">
      lapagan
    </h1>
    <h2 className="lg:w-[60%] break-words text-custom_mint/80 font-comfortaa text-justify md:text-center lg:text-justify text-xl">
      Express your ideas, share them quick. Appreciate every thoughts that make
      us all unique.
    </h2>
  </div>
);

const MainButtons = () => (
  <div className="max-sm:mt-16 grid lg:grid-cols-3 gap-2 md:gap-4">
    <button className="lg:col-span-2 rounded-3xl bg-custom_air flex flex-col items-center justify-center gap-3 md:gap-5 p-4 md:p-6 transition-all ease-out hover:scale-[1.02] duration-300">
      <Link href="/public-feed/create-anonymous-note">
        <h3 className="font-comfortaa text-custom_raisin text-lg md:text-2xl font-bold">
          Post Anonymously
        </h3>
        <h4 className="font-comfortaa text-custom_raisin/80 text-sm md:text-base break-words text-center">
          Create an anonymous post now!
        </h4>
      </Link>
    </button>
    <button
      disabled
      className="cursor-not-allowed bg-custom_payne rounded-3xl flex flex-col items-center justify-center p-4 md:p-5 transition-all ease-out duration-300"
    >
      <h3 className="opacity-30 font-comfortaa text-custom_mint/80 text-lg md:text-2xl font-bold">
        Accounts
      </h3>
      <h4 className="font-comfortaa text-custom_mint/10 text-sm md:text-base break-words text-center">
        Archived Notes, Like &amp; Comment interactivity, and more!
      </h4>
    </button>
    <button className="lg:col-span-3 rounded-3xl flex flex-col items-center justify-center bg-custom_columbia/80 p-4 md:p-5 transition-all hover:scale-[1.02] ease-out duration-300">
      <Link href="/public-feed">
        <h3 className="font-comfortaa text-custom_raisin text-lg md:text-2xl font-bold break-words">
          Public Feed
        </h3>
        <h4 className="font-comfortaa text-custom_raisin/80 text-sm md:text-base break-words text-center">
          Check out what others have shared!
        </h4>
      </Link>
    </button>
    <button
      disabled
      className="cursor-not-allowed lg:col-span-3 rounded-3xl flex flex-col items-center justify-center bg-custom_raisin p-4 md:p-5 transition-all ease-out duration-300"
    >
      <h3 className="opacity-30 font-comfortaa text-custom_mint/80 text-lg md:text-2xl font-bold">
        What is lapagan?
      </h3>
    </button>
  </div>
);
