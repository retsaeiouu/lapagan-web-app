import { HomeButtons } from "@/components/client/HomeButtons";

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-auto flex flex-col justify-between max-sm:pt-16 pb-2 md:pb-4 px-8 md:px-16 lg:px-32">
      <MainDisplay />
      <HomeButtons />
    </main>
  );
}

const MainDisplay = () => (
  <div className="flex flex-1 flex-col justify-center gap-8 md:gap-12 items-center">
    <h1 className="text-custom_mint font-gloria font-bold text-5xl md:text-6xl tracking-wide">
      BALUYOT
    </h1>
    <h2 className="lg:w-[60%] break-words text-custom_mint/80 font-comfortaa text-justify md:text-center lg:text-justify text-xl">
      Express your ideas, share them quick. Appreciate every thoughts that make
      us all unique.
    </h2>
  </div>
);
