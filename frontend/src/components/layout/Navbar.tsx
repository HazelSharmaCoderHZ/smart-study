"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import ThemeToggle from "@/components/theme/theme-toggle";

export default function Navbar() {
  return (
    <header className="navbar-wrap">
      <nav className="glass navbar">
        <Link href="/" className="font-display navbar-brand">
          <Sparkles size={20} color="var(--accent)" />
          StudyOS
        </Link>

        <div className="navbar-actions">
          <ThemeToggle />
          <Link href="/login" className="btn navbar-login">
            Log in
          </Link>
          <Link href="/signup" className="btn btn-primary navbar-signup">
            Get Started
          </Link>
        </div>
      </nav>

      <style>{`
        .navbar-wrap {
          position: sticky;
          top: 0;
          z-index: 50;
          padding: 1rem 1.25rem;
        }

        .navbar {
          max-width: 1140px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.25rem;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 1.1rem;
          text-decoration: none;
          color: var(--text);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .navbar-login {
          text-decoration: none;
        }

        .navbar-signup {
          text-decoration: none;
        }

        @media (max-width: 480px) {
          .navbar-login {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}