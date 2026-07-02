│
│  │  "use client";                                                          │   │
│  │  import { createContext, useContext, useState, useEffect } from "react";│   │
│  │  const PiContext = createContext({ user: null, isAuthenticated: false, │   │
│  │    isLoading: true });                                                 │   │
│  │  export function PiProvider({ children }) {                            │   │
│  │    const [user, setUser] = useState(null);                             │   │
│  │    const [isLoading, setIsLoading] = useState(true);                   │   │
│  │    useEffect(() => {                                                   │   │
│  │      const init = async () => {                                        │   │
│  │        if (window.Pi) {                                                │   │
│  │          const r = await window.Pi.authenticate();                     │   │
│  │          if (r) setUser({ username: r.username });                     │   │
│  │        }                                                               │   │
│  │        setIsLoading(false);                                            │   │
│  │      };                                                                │   │
│  │      init();                                                           │   │
│  │    }, []);                                                             │   │
│  │    return <PiContext.Provider value={{ user, isAuthenticated: !!user,  │   │
│  │      isLoading }}>{children}</PiContext.Provider>;                     │   │
│  │  }                                                                     │   │
│  │  export const usePi = () => useContext(PiContext);                    │   │
