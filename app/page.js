"use client";

import { usePi } from "@/components/PiProvider";

export default function Home() {
  const { user, loading, signIn, signOut } = usePi();

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>⏳ جاري الاتصال بـ Pi Network...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.center}>
        <h1 style={{ color: "#6c5ce7" }}>🚀 منصة الترويج الذكي</h1>
        <p style={{ color: "#a7a9be", marginBottom: 30 }}>لرواد Pi Network</p>
        <button onClick={signIn} style={styles.button}>
          🔑 تسجيل الدخول باستخدام Pi
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{ color: "#6c5ce7" }}>🚀 منصة الترويج الذكي</h1>
        <div style={styles.userInfo}>
          <span>👤 {user.username}</span>
          <button onClick={signOut} style={styles.logoutButton}>
            🚪 تسجيل الخروج
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <h2>📊 لوحة التحكم</h2>
        <p>مرحباً بك في منصة الترويج الذكي!</p>
        <p>UID: {user.uid}</p>
        {/* هنا يمكنك إضافة باقي محتوى لوحة التحكم */}
      </div>
    </div>
  );
}

// ==================== الأنماط ====================
const styles = {
  center: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#0f0e17",
    color: "#fffffe",
    padding: "20px",
  },
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    background: "#0f0e17",
    color: "#fffffe",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  button: {
    padding: "14px 32px",
    fontSize: "18px",
    background: "#6c5ce7",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(108, 92, 231, 0.4)",
  },
  logoutButton: {
    padding: "8px 16px",
    background: "#ff6b6b",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  content: {
    background: "#1a1a2e",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #2d1b69",
  },
};
