"use client";

import { useEffect } from "react";
import { usePi } from "@/components/PiProvider";

export default function Page() {
  const { user, signIn, loading } = usePi();

  // Auto trigger authentication on load
  useEffect(() => {
    signIn();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>Pi Authentication</h1>

      {loading && <p>Loading Pi SDK...</p>}

      {!user && (
        <button onClick={signIn} style={{ padding: 10, marginTop: 10 }}>
          Sign in with Pi
        </button>
      )}

      {user && (
        <div>
          <h3>Welcome</h3>
          <p>User: {user.username}</p>
        </div>
      )}
    </main>
  );
}