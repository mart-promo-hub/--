  │
│  │  "use client";                                                          │   │
│  │  import { usePi } from "@/components/PiProvider";                      │   │
│  │  import { useState } from "react";                                     │   │
│  │  export default function Home() {                                      │   │
│  │    const { user, isAuthenticated, isLoading } = usePi();               │   │
│  │    if (isLoading) return <div>Loading...</div>;                        │   │
│  │    if (!isAuthenticated) return <button onClick={() =>                 │   │
│  │      window.Pi?.authenticate()}>Login with Pi</button>;                │   │
│  │    return <div>Welcome {user?.username}</div>;                         │   │
│  │  }                                                                     │   │
