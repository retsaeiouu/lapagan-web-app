import type { Metadata } from "next";
import "./globals.css";

import "@fontsource/poppins";
import "@fontsource/happy-monkey";
import RootCard from "@/components/custom/RootCard";

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
        <RootCard>{children}</RootCard>
      </body>
    </html>
  );
}
