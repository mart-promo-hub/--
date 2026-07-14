// components/PiProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

// أنواع البيانات
type PiUser = {
  uid: string;
  username: string;
  accessToken?: string;
};

type PiContextType = {
  user: PiUser | null;
  loading: boolean;
  error: string | null;
  isPiBrowser: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
  checkPiStatus: () => boolean;
};

// إنشاء السياق
const PiContext = createContext<PiContextType | undefined>(undefined);

// مزود السياق
export const PiProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<PiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPiBrowser, setIsPiBrowser] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // التحقق من وجود Pi SDK
  const checkPiStatus = useCallback(() => {
    const hasPi = typeof window !== 'undefined' && !!(window as any).Pi;
    setIsPiBrowser(hasPi);
    return hasPi;
  }, []);

  // دالة تسجيل الدخول
  const signIn = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("🚀 بدء عملية تسجيل الدخول...");
      
      // التحقق من وجود Pi SDK
      if (!checkPiStatus()) {
        throw new Error("يرجى استخدام Pi Browser لتسجيل الدخول");
      }

      const Pi = (window as any).Pi;
      console.log("✅ Pi SDK موجود");

      // تهيئة SDK
      console.log("🔄 تهيئة Pi SDK...");
      await Pi.init({
        version: "2.0",
        sandbox: true, // استخدم true للتحقق في App Studio
      });
      console.log("✅ تم تهيئة Pi SDK بنجاح");
      setIsInitialized(true);

      // طلب المصادقة - هذا هو المطلوب لـ App Studio
      console.log("🔄 طلب المصادقة من Pi...");
      const auth = await Pi.authenticate(
        ["username", "payments"],
        (payment: any) => {
          console.log("دفعة غير مكتملة:", payment);
        }
      );

      console.log("✅ تم استلام رد المصادقة:", auth);

      if (!auth?.accessToken) {
        throw new Error("لم يتم الحصول على رمز المصادقة");
      }

      console.log("✅ تم الحصول على التوكن:", auth.accessToken);

      // محاولة إرسال التوكن إلى الخادم الخلفي
      try {
        const response = await fetch("/api/auth/pi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken: auth.accessToken,
            uid: auth.user?.uid,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUser({
              ...data.user,
              accessToken: auth.accessToken,
            });
            console.log("✅ تم تسجيل الدخول بنجاح:", data.user.username);
            return;
          }
        }
      } catch (apiError) {
        console.warn("⚠️ فشل الاتصال بالخادم الخلفي، استخدام البيانات المحلية");
      }

      // إذا فشل الخادم الخلفي، استخدم بيانات المستخدم من Pi مباشرة
      const userData = {
        uid: auth.user?.uid || auth.user?.id || "unknown",
        username: auth.user?.username || auth.user?.name || "Pi User",
        accessToken: auth.accessToken,
      };
      
      setUser(userData);
      console.log("✅ تم تسجيل الدخول بنجاح (محلي):", userData.username);

    } catch (err: any) {
      console.error("❌ فشل تسجيل الدخول:", err);
      setError(err.message || "حدث خطأ أثناء تسجيل الدخول");
      
      if (err.message.includes("Pi Browser")) {
        setError("⚠️ هذا التطبيق يعمل فقط في متصفح Pi Network");
      }
    } finally {
      setLoading(false);
    }
  }, [checkPiStatus]);

  // دالة تسجيل الخروج
  const signOut = useCallback(() => {
    setUser(null);
    setError(null);
    console.log("👋 تم تسجيل الخروج بنجاح");
    localStorage.removeItem('pi_user');
  }, []);

  // تهيئة التطبيق
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log("🔄 بدء تهيئة التطبيق...");
        
        const hasPi = checkPiStatus();
        console.log("📱 Pi Browser متاح؟", hasPi);
        
        if (!hasPi) {
          console.warn("⚠️ هذا التطبيق يعمل فقط في متصفح Pi Network");
          setError("⚠️ هذا التطبيق يعمل فقط في متصفح Pi Network");
          setLoading(false);
          return;
        }

        const Pi = (window as any).Pi;
        console.log("🔄 تهيئة Pi SDK...");
        
        await Pi.init({
          version: "2.0",
          sandbox: true, // استخدم true للتحقق في App Studio
        });
        
        console.log("✅ تم تهيئة Pi SDK بنجاح");
        setIsInitialized(true);

        // محاولة استعادة الجلسة السابقة
        const savedUser = localStorage.getItem('pi_user');
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            if (parsedUser.accessToken) {
              setUser(parsedUser);
              console.log("🔄 تم استعادة الجلسة السابقة");
            }
          } catch (e) {
            console.warn("⚠️ فشل استعادة الجلسة السابقة");
          }
        }

        // محاولة تسجيل الدخول التلقائي (مطلوب لـ App Studio)
        console.log("🔄 محاولة تسجيل الدخول التلقائي...");
        await signIn();

      } catch (err: any) {
        console.error("❌ فشل تهيئة التطبيق:", err);
        setError("فشل تهيئة التطبيق: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, [checkPiStatus, signIn]);

  // حفظ المستخدم في التخزين المحلي
  useEffect(() => {
    if (user) {
      localStorage.setItem('pi_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pi_user');
    }
  }, [user]);

  const value = {
    user,
    loading,
    error,
    isPiBrowser,
    signIn,
    signOut,
    checkPiStatus,
  };

  return (
    <PiContext.Provider value={value}>
      {children}
    </PiContext.Provider>
  );
};

// Hook مخصص للاستخدام
export const usePi = () => {
  const context = useContext(PiContext);
  if (context === undefined) {
    throw new Error("usePi must be used within a PiProvider");
  }
  return context;
};
