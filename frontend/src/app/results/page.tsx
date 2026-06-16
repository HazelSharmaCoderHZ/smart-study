"use client";

import { useEffect, useState } from "react";
import { ClipboardCheck, Clock, Trophy } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { getTestResults } from "@/services/study";

interface Result {
  topic: string;
  score: number;
  total: number;
  percentage: number;
  created_at: string;
}

function ScoreBar({ percentage }: { percentage: number }) {
  const color =
    percentage >= 80 ? "var(--success)"
    : percentage >= 50 ? "var(--warning)"
    : "var(--danger)";

  return (
    <div className="score-bar-wrap">
      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{ width: `${percentage}%`, background: color, transition: "width 0.8s var(--ease)" }}
        />
      </div>
      <span className="font-mono score-bar-label" style={{ color }}>{percentage}%</span>
    </div>
  );
}

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const data = await getTestResults(token);
        setResults(data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchResults();
  }, []);

  const best = results.length
    ? results.reduce((a, b) => a.percentage > b.percentage ? a : b)
    : null;

  return (
    <main className="shell">
      <Sidebar />
      <section className="content">

        <div className="rise-in" style={{ marginBottom: "1.75rem" }}>
          <span className="badge"><ClipboardCheck size={12} /> RECORDS</span>
          <h1 className="font-display" style={{ fontSize: "clamp(1.7rem,4vw,2.5rem)", fontWeight: 700, margin: "0.6rem 0 0.3rem" }}>My Results</h1>
          <p style={{ color: "var(--text-soft)", margin: 0, fontSize: "0.95rem" }}>View your mock test performance over time.</p>
        </div>

        {!loading && best && (
          <div className="glass rise-in" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.1rem 1.5rem", marginBottom: "1.5rem", borderColor: "rgba(52,211,153,0.25)", background: "rgba(52,211,153,0.06)", flexWrap: "wrap", animationDelay: "60ms" }}>
            <Trophy size={22} color="var(--success)" style={{ flexShrink: 0 }} />
            <div>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-faint)" }}>BEST PERFORMANCE</p>
              <p className="font-display" style={{ margin: 0, fontWeight: 600 }}>
                {best.topic} — <span style={{ color: "var(--success)" }}>{best.percentage}%</span>
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[0,1,2].map(i => (
              <div key={i} className="glass" style={{ padding: "1.25rem" }}>
                <div className="skeleton" style={{ height: 20, width: "35%", marginBottom: 12 }} />
                <div className="skeleton" style={{ height: 10, width: "100%", marginBottom: 8, borderRadius: 999 }} />
              </div>
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="glass" style={{ padding: "3rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.5rem" }}>
            <ClipboardCheck size={32} color="var(--text-faint)" />
            <p className="font-display" style={{ fontSize: "1.15rem", fontWeight: 600, margin: "0.5rem 0 0" }}>No test results found</p>
            <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", margin: 0 }}>Take a mock test and your score will appear here.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {results.map((result, index) => (
              <div key={index} className="glass glass-interactive rise-in" style={{ padding: "1.25rem 1.5rem", animationDelay: `${index * 50}ms` }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "0.85rem", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "var(--r-sm)", background: "var(--surface-strong)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <ClipboardCheck size={18} />
                    </div>
                    <div>
                      <h2 className="font-display" style={{ fontSize: "1.05rem", fontWeight: 600, margin: "0 0 0.2rem" }}>{result.topic}</h2>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-faint)", fontSize: "0.75rem" }}>
                        <Clock size={13} />
                        <span className="font-mono">{new Date(result.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-mono" style={{ fontSize: "0.85rem", color: "var(--text-soft)", flexShrink: 0 }}>
                    {result.score}/{result.total} correct
                  </span>
                </div>
                <ScoreBar percentage={result.percentage} />
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        .score-bar-wrap { display:flex; align-items:center; gap:0.85rem; }
        .score-bar-track {
          flex:1; height:8px; background:var(--surface); border:1px solid var(--border);
          border-radius:999px; overflow:hidden;
        }
        .score-bar-fill { height:100%; border-radius:999px; }
        .score-bar-label { font-size:0.78rem; min-width:38px; text-align:right; }
      `}</style>
    </main>
  );
}