// app/page.tsx
"use client";

import { usePi } from "@/components/PiProvider";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, loading, error, isPiBrowser, signIn, signOut } = usePi();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 text-lg">جاري تجهيز المصادقة...</p>
          <p className="text-sm text-gray-500 mt-2">يرجى الانتظار</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">خطأ في المصادقة</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            {!isPiBrowser && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-yellow-800">💡 يرجى فتح هذا التطبيق في متصفح Pi Network</p>
              </div>
            )}
            <button onClick={signIn} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              محاولة مرة أخرى
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">منصة الترويج الذكي</h1>
              <p className="text-sm text-gray-500">لرواد Pi Network</p>
            </div>
            {user && isClient && (
              <button onClick={signOut} className="flex items-center gap-2 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-colors">
                <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {user.username?.charAt(0).toUpperCase() || "U"}
                </span>
                <span className="text-sm font-medium text-gray-700">{user.username}</span>
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            )}
          </div>
        </header>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          {user ? (
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">مرحباً بك {user.username}!</h2>
              <p className="text-gray-600">لقد قمت بتسجيل الدخول بنجاح</p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left">
                <p className="text-sm text-gray-600"><span className="font-medium">المعرف:</span> {user.uid}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">اسم المستخدم:</span> {user.username}</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-8">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">تسجيل الدخول باستخدام Pi</h2>
                <p className="text-gray-600 mt-2">قم بتسجيل الدخول باستخدام حساب Pi Network الخاص بك</p>
              </div>
              <button
                onClick={signIn}
                disabled={!isPiBrowser}
                className={`w-full py-4 rounded-xl transition-all font-medium text-lg ${
                  isPiBrowser ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isPiBrowser ? '🚀 تسجيل الدخول بـ Pi' : '⚠️ غير متوفر في هذا المتصفح'}
              </button>
              {!isPiBrowser && (
                <p className="text-sm text-yellow-600 mt-4 bg-yellow-50 p-3 rounded-lg">💡 يرجى فتح هذا التطبيق في متصفح Pi Network</p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
