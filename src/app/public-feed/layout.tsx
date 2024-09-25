//  TODO:
//    gui for creating anonymous notes
//    setup neon db lesgoooooooo

import Link from "next/link";

//    set up db and finish the creating anonymous notes feature
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-screen bg-custom_raisin overflow-auto">
      <header className="bg-custom_raisin/80 backdrop-blur-lg sticky top-0 left-0 w-full z-1 flex flex-col justify-center py-3 md:py-4 px-8 md:px-16 lg:px-32">
        <Link href="/">
          <h1 className="translate-y-[-6px] text-custom_mint font-gloria font-bold text-2xl md:text-3xl tracking-wider">
            lapagan
          </h1>
        </Link>
      </header>
      <main className="px-8 md:px-16 lg:px-32">{children}</main>
      <footer className="mt-auto ml-auto py-1 mr-2">
        <h6 className="text-xs md:text-sm text-custom_mint/30 font-poppins">
          &copy; Copyright 2024. Lapagan. Team Maloi
        </h6>
      </footer>
    </div>
  );
}
