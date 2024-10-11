import type { Metadata } from "next";
import "./globals.css";

import { Comfortaa, Gloria_Hallelujah, Poppins } from "next/font/google";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-comfortaa",
});

const gloriaHallelujah = Gloria_Hallelujah({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gloria",
  weight: "400",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Lapagan",
  description: "Share your thoughts here instead of keeping it to yourself!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${comfortaa.variable} ${gloriaHallelujah.variable} ${poppins.variable} antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-custom_darkerspace">{children}</body>
    </html>
  );
}
