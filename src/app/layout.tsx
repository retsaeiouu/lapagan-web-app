import type { Metadata } from "next";
import "./globals.css";

import "@fontsource/poppins";
import "@fontsource/happy-monkey";
import "@fontsource/hachi-maru-pop";
import RootCard from "@/components/custom/RootCard";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Lapagan Web App",
  description: "Share your thoughts here instead of keeping it to yourself!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark bg-background flex justify-center w-screen h-screen">
        <Suspense
          fallback={
            <>
              <h1 className="fixed top-52 font-hachi text-2xl lg:text-3xl tracking-wide text-foreground font-black">
                Lapagan
              </h1>
              <h2 className="fixed bottom-32 text-lg text-foreground">
                by team maloi
              </h2>
            </>
          }
        >
          <RootCard>{children}</RootCard>
        </Suspense>
      </body>
    </html>
  );
}
