// app/page.tsx (معدل مع Dashboard)
"use client";

import { usePi } from "@/components/PiProvider";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointerClick, 
  PlusCircle, 
  Calendar,
  ArrowUpRight,
  Clock,
  CheckCircle,
  BarChart3,
  Sparkles
} from "lucide-react";

export default function Home() {
  const { user, loading, error, isPiBrowser, signIn, signOut } = usePi();
  const [isClient, setIsClient] = useState(false);

  // بيانات وهمية للـ Dashboard
  const stats = {
    totalCampaigns: 4,
    activeCampaigns: 1,
    completedCampaigns: 2,
    scheduledCampaigns: 1,
    totalReach: "127.6K",
    totalClicks: "6K",
    totalEngagement: "3.6K",
    totalSpent: "1,216 π",
  };

  const recentCampaigns = [
    { id: 1, name: "حملة صيف 2026", status: "نشطة", platform: "X (تويتر)", budget: "500 π", date: "2026-07-14" },
    { id: 2, name: "إطلاق منتج جديد", status: "مجدولة", platform: "فيسبوك", budget: "300 π", date: "2026-07-20" },
    { id: 3, name: "عرض خاص للعملاء", status: "منتهية", platform: "إنستغرام", budget: "200 π", date: "2026-07-10" },
    { id: 4, name: "توعية بالعلامة التجارية", status: "منتهية", platform: "يوتيوب", budget: "216 π", date: "2026-07-05" },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 text-lg">جاري تجهيز المصادقة...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">خطأ في المصادقة</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={signIn} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            محاولة مرة أخرى
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {user ? `مرحباً بك ${user.username}!` : "لوحة التحكم"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">نظرة عامة على أداء حملاتك</p>
        </div>
        <Link
          href="/campaigns/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl font-medium"
        >
          <PlusCircle className="w-5 h-5" />
          <span>إنشاء حملة جديدة</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">إجمالي الحملات</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalCampaigns}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex gap-2 mt-2 text-xs">
            <span className="text-green-600">● {stats.activeCampaigns} نشطة</span>
            <span className="text-yellow-600">● {stats.scheduledCampaigns} مجدولة</span>
            <span className="text-gray-400">● {stats.completedCampaigns} منتهية</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">إجمالي الوصول</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalReach}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">↑ 12% عن الشهر الماضي</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">إجمالي النقرات</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalClicks}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <MousePointerClick className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">↑ 8% عن الشهر الماضي</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">إجمالي الإنفاق</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalSpent}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">ROI: 2.4x</p>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-gray-800">آخر الحملات</h2>
          </div>
          <Link href="/campaigns" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
            عرض الكل
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {recentCampaigns.map((campaign) => (
            <div key={campaign.id} className="px-6 py-3 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                  {campaign.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{campaign.name}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{campaign.platform}</span>
                    <span>•</span>
                    <span>{campaign.budget}</span>
                    <span>•</span>
                    <span>{campaign.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  campaign.status === "نشطة" ? "bg-green-100 text-green-700" :
                  campaign.status === "مجدولة" ? "bg-yellow-100 text-yellow-700" :
                  "bg-gray-100 text-gray-600"
                }`}>
                  {campaign.status === "نشطة" && <CheckCircle className="w-3 h-3 inline ml-1" />}
                  {campaign.status === "مجدولة" && <Clock className="w-3 h-3 inline ml-1" />}
                  {campaign.status}
                </span>
                <Link
                  href={`/campaigns/${campaign.id}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  عرض النتائج
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/campaigns/create" className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <PlusCircle className="w-8 h-8" />
            <div>
              <p className="font-semibold">إنشاء حملة جديدة</p>
              <p className="text-sm text-blue-100">ابدأ حملتك الإعلانية الآن</p>
            </div>
          </div>
        </Link>
        <Link href="/analytics" className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8" />
            <div>
              <p className="font-semibold">عرض الإحصائيات</p>
              <p className="text-sm text-purple-100">تحليل أداء حملاتك</p>
            </div>
          </div>
        </Link>
        <Link href="/templates" className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8" />
            <div>
              <p className="font-semibold">قوالب النصوص</p>
              <p className="text-sm text-green-100">استخدم قوالب جاهزة</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
