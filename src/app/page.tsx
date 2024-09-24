export default function Home() {
  return (
    <div
      className="h-screen w-screen flex flex-col justify-between
      overflow-auto pb-4 px-8 md:px-16 lg:px-32"
    >
      <MainDisplay />
      <MainCards />
    </div>
  );
}

const MainDisplay = () => (
  <div
    className="flex flex-1 flex-col justify-center gap-8
    md:gap-12 items-center"
  >
    <h1
      className="text-custom_mint font-gloria font-bold
      text-5xl md:text-6xl tracking-wide"
    >
      lapagan
    </h1>
    <h2
      className="lg:w-[60%] break-words text-custom_mint/80 
      font-comfortaa text-justify md:text-center lg:text-justify
      text-xl"
    >
      Express your ideas, share them quick. Appreciate every thoughts that make
      us all unique.
    </h2>
  </div>
);

const MainCards = () => (
  <div className="grid lg:grid-cols-3 gap-4">
    <div
      className="lg:col-span-2 rounded-3xl bg-custom_air flex
      flex-col items-center justify-center gap-6 p-6 transition-all
      ease-out hover:scale-105 duration-300"
    >
      <h3
        className="font-comfortaa text-custom_raisin text-2xl
        font-bold"
      >
        Post Anonymously
      </h3>
      <h4
        className="font-comfortaa text-custom_raisin/80 text-lg
        break-words text-center"
      >
        Create an anonymous post.
      </h4>
    </div>
    <div
      className="bg-custom_payne rounded-3xl flex flex-col
      items-center justify-center gap-6 p-6 transition-all
      ease-out hover:scale-105 duration-300"
    >
      <h3
        className="font-comfortaa text-custom_mint/80 text-2xl
        font-bold"
      >
        Accounts
      </h3>
      <h4
        className="max-md:hidden font-comfortaa <text-custom_mint />
      <80></80>text-lg break-words text-center"
      >
        Login to an existing account or create a new one.
      </h4>
    </div>
    <div
      className="lg:col-span-3 rounded-3xl flex flex-col items-center
      justify-center bg-custom_columbia/80 p-6 transition-all
      ease-out hover:scale-105 duration-300"
    >
      <h3
        className="font-comfortaa text-custom_raisin text-2xl font-bold
        break-words"
      >
        Check out what others have shared!
      </h3>
    </div>
    <div
      className="lg:col-span-3 rounded-3xl flex flex-col items-center
      justify-center bg-custom_raisin p-6 transition-all
      ease-out hover:scale-105 duration-300"
    >
      <h3 className="font-comfortaa text-custom_mint/80 text-2xl font-bold">
        What is lapagan?
      </h3>
    </div>
  </div>
);
