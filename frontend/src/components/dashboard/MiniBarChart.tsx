"use client";

interface BarChartProps {
  data: { label: string; value: number }[];
  maxHeight?: number;
  color?: string;
}

export default function MiniBarChart({
  data,
  maxHeight = 120,
  color = "var(--accent)",
}: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="mini-bar-chart">
      {data.map((d, i) => (
        <div key={d.label} className="mini-bar-col">
          <div className="mini-bar-track" style={{ height: maxHeight }}>
            <div
              className="bar-fill"
              style={{
                height: `${(d.value / max) * 100}%`,
                background: `linear-gradient(180deg, ${color}, var(--accent-2))`,
                transitionDelay: `${i * 60}ms`,
              }}
            />
          </div>
          <span className="mini-bar-value font-mono">{d.value}</span>
          <span className="mini-bar-label">{d.label}</span>
        </div>
      ))}

      <style>{`
        .mini-bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 0.9rem;
          padding-top: 0.5rem;
        }

        .mini-bar-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          flex: 1;
        }

        .mini-bar-track {
          width: 100%;
          max-width: 36px;
          display: flex;
          align-items: flex-end;
          background: var(--surface);
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid var(--border);
        }

        .bar-fill {
          width: 100%;
          height: 0%;
        }

        .mini-bar-value {
          font-size: 0.75rem;
          color: var(--text-soft);
        }

        .mini-bar-label {
          font-size: 0.7rem;
          color: var(--text-faint);
          text-align: center;
        }
      `}</style>
    </div>
  );
}