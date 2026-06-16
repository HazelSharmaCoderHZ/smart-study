"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  NotebookPen,
  Brain,
  ClipboardCheck,
  History,
  FileStack,
  ListChecks,
  LogOut,
  Menu,
  X,
  Sparkles,
  Upload,
} from "lucide-react";
import ThemeToggle from "@/components/theme/theme-toggle";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My PDFs", href: "/my-pdfs", icon: FileText },
  { label: "Upload PDF", href: "/pdfs", icon: Upload },
  { label: "AI Chat", href: "/chat", icon: MessageSquare },
  { label: "Notes", href: "/notes", icon: NotebookPen },
  { label: "Previous Notes", href: "/my-notes", icon: FileStack },
  { label: "Quiz", href: "/quiz", icon: Brain },
  { label: "My Quizzes", href: "/my-quizzes", icon: ListChecks },
  { label: "Mock Test", href: "/mock-test", icon: ClipboardCheck },
  { label: "My Results", href: "/results", icon: ClipboardCheck },
  { label: "History", href: "/history", icon: History },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const NavContent = () => (
    <>
      {/* Brand */}
      <Link
        href="/dashboard"
        className="sidebar-brand"
        onClick={() => setMobileOpen(false)}
      >
        <Sparkles size={22} color="var(--accent)" />
        <span className="font-display">StudySmart</span>
      </Link>

      {/* Nav links */}
      <nav className="sidebar-nav" aria-label="Main navigation">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`sidebar-link ${active ? "sidebar-link-active" : ""}`}
            >
              <Icon size={17} />
              <span>{label}</span>
              {active && <span className="sidebar-dot" aria-hidden="true" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer: theme toggle + logout */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-row">
          <span className="sidebar-footer-label font-mono">APPEARANCE</span>
          <ThemeToggle />
        </div>

        <button onClick={handleLogout} className="sidebar-logout btn">
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────── */}
      <aside className="sidebar-desktop glass" aria-label="Site navigation">
        <NavContent />
      </aside>

      {/* ── Mobile: fixed top bar ────────────────────────── */}
      <div className="sidebar-topbar glass">
        <Link href="/dashboard" className="sidebar-brand sidebar-brand-mobile">
          <Sparkles size={18} color="var(--accent)" />
          <span className="font-display">StudySmart</span>
        </Link>

        <button
          className="btn sidebar-hamburger"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* ── Mobile: slide-in drawer ──────────────────────── */}
      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar-drawer glass ${mobileOpen ? "sidebar-drawer-open" : ""}`}
        aria-label="Mobile navigation"
      >
        <NavContent />
      </aside>

      <style>{`
        /* ── Shared inner layout ── */
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--text);
          text-decoration: none;
          padding: 0.25rem 0;
          flex-shrink: 0;
        }

        .sidebar-brand-mobile {
          font-size: 1rem;
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          overflow-y: auto;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.6rem 0.8rem;
          border-radius: var(--r-sm);
          color: var(--text-soft);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          position: relative;
          transition: background 0.18s var(--ease), color 0.18s var(--ease),
            transform 0.18s var(--ease);
          white-space: nowrap;
        }

        .sidebar-link:hover {
          background: var(--surface-strong);
          color: var(--text);
          transform: translateX(2px);
        }

        .sidebar-link-active {
          background: linear-gradient(
            135deg,
            rgba(124, 92, 255, 0.16),
            rgba(34, 211, 238, 0.07)
          );
          color: var(--text);
          border: 1px solid var(--border-strong);
        }

        .sidebar-dot {
          margin-left: auto;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent);
          flex-shrink: 0;
        }

        .sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }

        .sidebar-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sidebar-footer-label {
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          color: var(--text-faint);
        }

        .sidebar-logout {
          justify-content: flex-start;
          width: 100%;
          color: var(--danger);
          font-size: 0.875rem;
          padding: 0.55rem 0.8rem;
        }

        /* ── Desktop sidebar (always visible ≥ 1024px) ── */
        .sidebar-desktop {
          display: none;
          width: 250px;
          flex-shrink: 0;
          height: 100vh;
          position: sticky;
          top: 0;
          padding: 1.5rem 1.1rem;
          flex-direction: column;
          gap: 1.25rem;
          overflow-y: auto;
          border-radius: 0;
          border-top: none;
          border-bottom: none;
          border-left: none;
        }

        @media (min-width: 1024px) {
          .sidebar-desktop {
            display: flex;
          }
        }

        /* ── Mobile top bar (visible < 1024px) ── */
        .sidebar-topbar {
          display: none;
          align-items: center;
          justify-content: space-between;
          padding: 0.8rem 1.1rem;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 60;
          border-radius: 0;
          border-top: none;
          border-left: none;
          border-right: none;
        }

        @media (max-width: 1023px) {
          .sidebar-topbar {
            display: flex;
          }
        }

        .sidebar-hamburger {
          width: 38px;
          height: 38px;
          padding: 0;
          border-radius: 999px;
        }

        /* ── Mobile drawer ── */
        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          z-index: 70;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(2px);
        }

        .sidebar-drawer {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: min(78vw, 280px);
          z-index: 80;
          padding: 1.5rem 1.1rem;
          flex-direction: column;
          gap: 1.25rem;
          overflow-y: auto;
          border-radius: 0;
          border-top: none;
          border-bottom: none;
          border-left: none;
          transform: translateX(-110%);
          transition: transform 0.32s var(--ease);
        }

        .sidebar-drawer-open {
          transform: translateX(0);
        }

        @media (max-width: 1023px) {
          .sidebar-drawer {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}