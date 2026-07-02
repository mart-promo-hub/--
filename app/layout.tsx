  │
│  │  import type { Metadata } from "next";                                 │   │
│  │  import "./globals.css";                                               │   │
│  │  import { PiProvider } from "@/components/PiProvider";                 │   │
│  │  export const metadata: Metadata = { title: "πPrime AI" };             │   │
│  │  export default function RootLayout({ children }) {                    │   │
│  │    return <html><body><PiProvider>{children}</PiProvider></body></html>;│   │
│  │  }                                                                     │   │
│
