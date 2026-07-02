import type { Metadata } from "next";
import Script from "next/script";
import { PiProvider } from "@/components/PiProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pi App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Load Pi SDK */}
        <Script src="https://sdk.minepi.com/pi-sdk.js" strategy="beforeInteractive" />

        <PiProvider>
          {children}
        </PiProvider>
      </body>
    </html>
  );
}