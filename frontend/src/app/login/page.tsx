"use client";

import { useState } from "react";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import ThemeToggle from "@/components/theme/theme-toggle";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(email, password);

      localStorage.setItem("token", response.access_token);

      router.push("/dashboard");
    } catch (error: any) {
      alert(error?.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-main">
      <div className="auth-toggle">
        <ThemeToggle />
      </div>

      <div className="glass auth-card rise-in">
        <Link href="/" className="font-display auth-brand">
          <Sparkles size={22} color="var(--accent)" />
          StudySmart
        </Link>

        <h1 className="font-display auth-title">Welcome back</h1>
        <p className="auth-subtitle">Log in to continue your learning streak.</p>

        <form onSubmit={handleLogin} className="auth-form">
          <label className="auth-field">
            <span className="auth-label font-mono">EMAIL</span>
            <div className="auth-input-wrap">
              <Mail size={16} className="auth-input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="field auth-input"
                required
              />
            </div>
          </label>

          <label className="auth-field">
            <span className="auth-label font-mono">PASSWORD</span>
            <div className="auth-input-wrap">
              <Lock size={16} className="auth-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="field auth-input"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="auth-input-toggle"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          <button type="submit" disabled={loading} className="btn btn-primary auth-submit">
            {loading ? "Logging in..." : "Login"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <p className="auth-footer">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="auth-link">
            Sign up
          </Link>
        </p>
      </div>

      <style>{`
        .auth-main {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          position: relative;
        }

        .auth-toggle {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          padding: 2.25rem;
        }

        .auth-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 1.05rem;
          text-decoration: none;
          color: var(--text);
        }

        .auth-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 1.5rem 0 0.35rem;
        }

        .auth-subtitle {
          color: var(--text-soft);
          margin: 0;
          font-size: 0.92rem;
        }

        .auth-form {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .auth-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .auth-label {
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: var(--text-faint);
        }

        .auth-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .auth-input-icon {
          position: absolute;
          left: 0.9rem;
          color: var(--text-faint);
          pointer-events: none;
        }

        .auth-input {
          padding-left: 2.6rem;
        }

        .auth-input-toggle {
          position: absolute;
          right: 0.85rem;
          background: none;
          border: none;
          color: var(--text-faint);
          cursor: pointer;
          display: flex;
          padding: 0;
        }

        .auth-input-toggle:hover {
          color: var(--text);
        }

        .auth-submit {
          margin-top: 0.5rem;
          width: 100%;
        }

        .auth-footer {
          text-align: center;
          margin: 1.75rem 0 0;
          font-size: 0.88rem;
          color: var(--text-soft);
        }

        .auth-link {
          color: var(--accent);
          font-weight: 600;
          text-decoration: none;
        }

        .auth-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </main>
  );
}