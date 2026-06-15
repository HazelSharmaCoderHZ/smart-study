"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

interface ToolCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  href: string;
}

export default function ToolCard({ title, icon, description, href }: ToolCardProps) {
  return (
    <Link href={href} className="tool-card glass glass-interactive rise-in">
      <div className="tool-card-icon">{icon}</div>

      <div className="tool-card-body">
        <h3 className="font-display tool-card-title">{title}</h3>
        <p className="tool-card-desc">{description}</p>
      </div>

      <ArrowUpRight size={18} className="tool-card-arrow" />

      <style>{`
        .tool-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.25rem;
          text-decoration: none;
          color: var(--text);
          position: relative;
        }

        .tool-card-icon {
          flex-shrink: 0;
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--r-sm);
          background: linear-gradient(135deg, rgba(124,92,255,0.18), rgba(34,211,238,0.1));
          color: var(--accent);
        }

        .tool-card-body {
          flex: 1;
          min-width: 0;
        }

        .tool-card-title {
          font-size: 1.05rem;
          font-weight: 600;
          margin: 0 0 0.3rem;
        }

        .tool-card-desc {
          font-size: 0.85rem;
          color: var(--text-soft);
          margin: 0;
          line-height: 1.4;
        }

        .tool-card-arrow {
          color: var(--text-faint);
          transition: transform 0.25s var(--ease), color 0.25s var(--ease);
          flex-shrink: 0;
        }

        .tool-card:hover .tool-card-arrow {
          transform: translate(3px, -3px);
          color: var(--accent);
        }

        .tool-card:hover .tool-card-icon {
          color: var(--accent-2);
        }
      `}</style>
    </Link>
  );
}