// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PiProvider } from "@/components/PiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "منصة الترويج الذكي - Pi Network",
  description: "منصة الترويج الذكي لرواد Pi Network",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="pi" content="Pi Network App" />
        <script
          src="https://sdk.minepi.com/pi-sdk.js"
          async
        />
      </head>
      <body className={inter.className}>
        <PiProvider>
          {children}
        </PiProvider>
      </body>
    </html>
  );
}
