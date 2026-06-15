"use client";

import { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon: ReactNode;
  accent?: string;
  delay?: number;
}

export default function StatCard({
  label,
  value,
  suffix = "",
  icon,
  accent = "var(--accent)",
  delay = 0,
}: StatCardProps) {
  const [display, setDisplay] = useState(0);
  const frame = useRef<number>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 800;
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * value));

        if (progress < 1) {
          frame.current = requestAnimationFrame(tick);
        }
      };

      frame.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [value, delay]);

  return (
    <div className="stat-card glass glass-interactive rise-in" style={{ animationDelay: `${delay}ms` }}>
      <div className="stat-card-top">
        <span className="stat-card-icon" style={{ color: accent }}>
          {icon}
        </span>
        <span className="badge">LIVE</span>
      </div>

      <h3 className="font-display stat-card-value">
        {display}
        {suffix}
      </h3>

      <p className="stat-card-label">{label}</p>

      <style>{`
        .stat-card {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .stat-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .stat-card-icon {
          display: inline-flex;
          width: 38px;
          height: 38px;
          align-items: center;
          justify-content: center;
          border-radius: var(--r-sm);
          background: var(--surface-strong);
        }

        .stat-card-value {
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }

        .stat-card-label {
          font-size: 0.82rem;
          color: var(--text-soft);
          margin: 0;
        }
      `}</style>
    </div>
  );
}