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
} from "lucide-react";
import ThemeToggle from "@/components/theme/theme-toggle";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My PDFs", href: "/my-pdfs", icon: FileText },
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
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="glass"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.9rem 1.25rem",
          borderRadius: 0,
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <Link
          href="/dashboard"
          className="font-display"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "var(--text)",
            textDecoration: "none",
          }}
        >
          <Sparkles size={20} color="var(--accent)" />
          StudyOS
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ThemeToggle />
          <button
            className="btn"
            style={{ width: 42, height: 42, padding: 0, borderRadius: "999px" }}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div className="sidebar-mobile-spacer" />

      <aside
        className={`sidebar-panel ${open ? "sidebar-open" : ""}`}
        aria-label="Main navigation"
      >
        <div className="sidebar-inner glass">
          <Link
            href="/dashboard"
            className="font-display sidebar-brand"
            onClick={() => setOpen(false)}
          >
            <Sparkles size={22} color="var(--accent)" />
            <span>StudyOS</span>
          </Link>

          <nav className="sidebar-nav">
            {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`sidebar-link ${active ? "sidebar-link-active" : ""}`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                  {active && <span className="sidebar-active-dot" />}
                </Link>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <div className="sidebar-toggle-row">
              <span className="font-mono" style={{ fontSize: "0.72rem", color: "var(--text-faint)" }}>
                APPEARANCE
              </span>
              <ThemeToggle />
            </div>

            <button
              onClick={handleLogout}
              className="btn sidebar-logout"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </div>
      </aside>

      <style>{`
        .sidebar-mobile-spacer {
          display: none;
        }

        .sidebar-panel {
          width: 260px;
          flex-shrink: 0;
          padding: 1.25rem;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }

        .sidebar-inner {
          height: 100%;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--text);
          text-decoration: none;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.8rem;
          border-radius: var(--r-sm);
          color: var(--text-soft);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          position: relative;
          transition: background 0.2s var(--ease), color 0.2s var(--ease), transform 0.2s var(--ease);
        }

        .sidebar-link:hover {
          background: var(--surface-strong);
          color: var(--text);
          transform: translateX(2px);
        }

        .sidebar-link-active {
          background: linear-gradient(135deg, rgba(124,92,255,0.16), rgba(34,211,238,0.08));
          color: var(--text);
          border: 1px solid var(--border-strong);
        }

        .sidebar-active-dot {
          margin-left: auto;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent);
        }

        .sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }

        .sidebar-toggle-row {
          display: none;
          align-items: center;
          justify-content: space-between;
        }

        .sidebar-logout {
          justify-content: flex-start;
          width: 100%;
          color: var(--danger);
        }

        @media (max-width: 1023px) {
          .sidebar-mobile-spacer {
            display: block;
          }

          .sidebar-panel {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: min(82vw, 300px);
            transform: translateX(-105%);
            transition: transform 0.35s var(--ease);
            z-index: 50;
            padding-top: 4.5rem;
          }

          .sidebar-open {
            transform: translateX(0);
          }

          .sidebar-toggle-row {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}