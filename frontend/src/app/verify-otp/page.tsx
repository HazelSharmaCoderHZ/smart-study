"use client";

import { useState } from "react";
import { verifyOtp } from "@/services/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/theme/theme-toggle";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleVerify = async () => {
    try {
      setLoading(true);

      const email = localStorage.getItem("pendingEmail");

      if (!email) {
        alert("Email not found");
        return;
      }

      await verifyOtp(email, otp);

      alert("Verification successful");

      router.push("/login");
    } catch (error: any) {
      alert(error?.response?.data?.detail || "Verification failed");
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

        <div className="otp-icon">
          <ShieldCheck size={26} color="var(--accent)" />
        </div>

        <h1 className="font-display auth-title">Verify OTP</h1>
        <p className="auth-subtitle">
          Enter the verification code sent to your email.
        </p>

        <div className="auth-form">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="field otp-input font-mono"
            maxLength={6}
            inputMode="numeric"
          />

          <button
            onClick={handleVerify}
            disabled={loading || !otp.trim()}
            className="btn btn-primary auth-submit"
          >
            {loading ? "Verifying..." : "Verify"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </div>

        <p className="auth-footer">
          Wrong email?{" "}
          <Link href="/signup" className="auth-link">
            Go back
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
          text-align: center;
        }

        .auth-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 1.05rem;
          text-decoration: none;
          color: var(--text);
        }

        .otp-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--r-md);
          background: linear-gradient(135deg, rgba(124,92,255,0.18), rgba(34,211,238,0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1.5rem auto 0;
        }

        .auth-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 1rem 0 0.35rem;
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

        .otp-input {
          text-align: center;
          font-size: 1.4rem;
          letter-spacing: 0.5em;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }

        .auth-submit {
          width: 100%;
          justify-content: center;
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