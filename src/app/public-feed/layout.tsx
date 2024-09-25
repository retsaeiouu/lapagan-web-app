//  TODO:
//    gui for public feed (where notes will be displayed)
//    gui for creating anonymous notes
//    set up db and finish the creating anonymous notes feature
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <header>
        <h1 className="text-custom_mint font-gloria font-bold text-xl md:text-3xl tracking-wide">
          lapagan
        </h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
