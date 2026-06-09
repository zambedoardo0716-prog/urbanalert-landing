import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "UrbanAlert | Segnalazioni urbane ordinate",
  description: "Un possibile spazio digitale per raccogliere, gestire e risolvere le segnalazioni urbane.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
