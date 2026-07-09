"use client";

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#0f0e17',
      color: '#fffffe',
      padding: '20px'
    }}>
      <h1 style={{ color: '#6c5ce7' }}>🚀 منصة الترويج الذكي</h1>
      <p style={{ color: '#a7a9be', marginBottom: '30px' }}>لرواد Pi Network</p>
      <button 
        onClick={() => alert('سيتم تفعيل المصادقة قريباً')}
        style={{
          padding: '14px 32px',
          fontSize: '18px',
          background: '#6c5ce7',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer'
        }}
      >
        🔑 تسجيل الدخول باستخدام Pi
      </button>
      <p style={{ color: '#a7a9be', marginTop: '20px', fontSize: '14px' }}>
        ⏳ جاري تجهيز المصادقة...
      </p>
    </div>
  );
}
