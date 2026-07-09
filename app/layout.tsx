import type { Metadata } from "next";
import Script from "next/script";
import { PiProvider } from "@/components/PiProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Promo Hub",
  description: "منصة الترويج الذكي لشبكة Pi Network",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Script
          src="https://sdk.minepi.com/pi-sdk.js"
          strategy="beforeInteractive"
        />
        <PiProvider>{children}</PiProvider>
      </body>
    </html>
  );
}
