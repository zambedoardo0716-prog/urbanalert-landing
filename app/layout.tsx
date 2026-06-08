import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "UrbanAlert | Segnalazioni urbane ordinate",
  description: "Un possibile spazio digitale per raccogliere, gestire e risolvere le segnalazioni urbane.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}