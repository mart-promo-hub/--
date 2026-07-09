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
  signOut: () => void;
};

const PiContext = createContext<PiContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: () => {},
});

export const PiProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<PiUser | null>(null);
  const [loading, setLoading] = useState(true);

  // تهيئة Pi SDK عند تحميل التطبيق
  useEffect(() => {
    const initPi = async () => {
      try {
        await (window as any).Pi.init({ version: "2.0", sandbox: false });
        console.log("✅ Pi SDK initialized");
      } catch (error) {
        console.error("❌ Pi init failed:", error);
      } finally {
        setLoading(false);
      }
    };
    initPi();
  }, []);

  // دالة تسجيل الدخول
  const signIn = async () => {
    setLoading(true);
    try {
      // 1. طلب المصادقة من Pi
      const auth = await (window as any).Pi.authenticate(
        ["username"],
        () => {},
        () => {}
      );

      if (!auth?.accessToken) {
        throw new Error("لم يتم الحصول على توكن المصادقة");
      }

      // 2. إرسال التوكن إلى الخادم الخلفي للتحقق
      const response = await fetch("/api/auth/pi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: auth.accessToken }),
      });

      if (!response.ok) {
        throw new Error("فشل التحقق من التوكن في الخادم");
      }

      const data = await response.json();
      setUser(data.user);
      console.log("✅ تم تسجيل الدخول بنجاح:", data.user);
    } catch (error) {
      console.error("❌ فشل تسجيل الدخول:", error);
      alert("فشل تسجيل الدخول. تأكد من أنك تستخدم Pi Browser.");
    } finally {
      setLoading(false);
    }
  };

  // دالة تسجيل الخروج
  const signOut = () => {
    setUser(null);
    console.log("👋 تم تسجيل الخروج");
  };

  return (
    <PiContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </PiContext.Provider>
  );
};

export const usePi = () => useContext(PiContext);
