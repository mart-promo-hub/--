"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type PiUser = {
  uid: string;
  username: string;
};

type PiContextType = {
  user: PiUser | null;
  loading: boolean;
  signIn: () => Promise<void>;
};

const PiContext = createContext<PiContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
});

export const PiProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<PiUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initPi = async () => {
      try {
        await (window as any).Pi.init({ version: "2.0" });
        setLoading(false);

        // Auto sign-in after init
        await signIn();
      } catch (e) {
        console.error("Pi init failed", e);
        setLoading(false);
      }
    };

    initPi();
  }, []);

  const validateWithBackend = async (accessToken: string) => {
    const res = await fetch("https://api.minepi.com/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) throw new Error("Token validation failed");

    return await res.json();
  };

  const signIn = async () => {
    try {
      const scopes = ["username"];

      const authResult = await (window as any).Pi.authenticate(scopes, async (payment: any) => {
        return payment;
      });

      const accessToken = authResult.accessToken;

      const userData = await validateWithBackend(accessToken);

      setUser({
        uid: userData.uid,
        username: userData.username,
      });

      // optional: send to your backend session endpoint
      await fetch("/api/auth/pi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken }),
      });
    } catch (err) {
      console.error("Pi auth failed", err);
    }
  };

  return (
    <PiContext.Provider value={{ user, loading, signIn }}>
      {children}
    </PiContext.Provider>
  );
};

export const usePi = () => useContext(PiContext);