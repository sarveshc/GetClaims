"use client";
import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

// Inner component — uses useSearchParams so must be inside <Suspense>
function LoginForm() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const router       = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl  = searchParams.get("callbackUrl") || "/admin/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email, password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      padding: "40px",
      width: "100%",
      maxWidth: "400px",
      boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
    }}>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ margin: "0 0 4px", color: "#1a1a2e", fontSize: "24px", fontWeight: 800 }}>
          GetClaims
        </h1>
        <p style={{ margin: 0, color: "#6b7280", fontSize: "13px" }}>
          Admin Panel — Sign In
        </p>
      </div>

      {error && (
        <div style={{
          background: "#fef2f2", border: "1px solid #fecaca",
          borderRadius: "8px", padding: "12px 14px", marginBottom: "20px",
        }}>
          <p style={{ margin: 0, color: "#dc2626", fontSize: "13px" }}>⚠ {error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@getclaims.in"
            required
            style={{
              width: "100%", height: "46px", padding: "0 14px",
              borderRadius: "8px", border: "1px solid #d1d5db",
              fontSize: "14px", color: "#111827",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{
              width: "100%", height: "46px", padding: "0 14px",
              borderRadius: "8px", border: "1px solid #d1d5db",
              fontSize: "14px", color: "#111827",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%", height: "46px",
            background: loading ? "#93c5fd" : "#0d6efd",
            color: "#fff", border: "none", borderRadius: "8px",
            fontSize: "15px", fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "11px", color: "#9ca3af" }}>
        🔒 Restricted access — Authorised personnel only
      </p>
    </div>
  );
}

// Outer page — wraps LoginForm in Suspense (required by Next.js 14 for useSearchParams)
export default function AdminLoginPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      marginLeft: 0,
    }}>
      <Suspense fallback={
        <div style={{ color: "#fff", fontSize: "14px" }}>Loading…</div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
