"use client";

import { useState } from "react";
import { NotebookPen, Sparkles, ArrowRight } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { generateNotes } from "@/services/study";

export default function NotesPage() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) return;

      const data = await generateNotes(topic, token);

      setNotes(data.notes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="shell">
      <Sidebar />

      <section className="content">
        <div className="notesgen-header rise-in">
          <span className="badge">
            <NotebookPen size={12} /> NOTES GENERATOR
          </span>
          <h1 className="font-display notesgen-title">Notes Generator</h1>
          <p className="notesgen-subtitle">
            Give your AI tutor a topic and get a clear, structured summary.
          </p>
        </div>

        <div className="glass notesgen-card rise-in" style={{ animationDelay: "80ms" }}>
          <label className="notesgen-label font-mono">TOPIC</label>
          <input
            type="text"
            placeholder="e.g. Photosynthesis, French Revolution, Linked Lists..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="field"
          />

          <button
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="btn btn-primary notesgen-btn"
          >
            {loading ? "Generating..." : "Generate Notes"}
            {!loading && <Sparkles size={16} />}
          </button>

          {loading && (
            <div className="notesgen-loading-bar">
              <div className="notesgen-loading-fill" />
            </div>
          )}
        </div>

        {loading && (
          <div className="glass notesgen-result rise-in">
            <div className="skeleton" style={{ height: 18, width: "40%", marginBottom: 14 }} />
            <div className="skeleton" style={{ height: 14, width: "100%", marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 14, width: "92%", marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 14, width: "85%", marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 14, width: "70%" }} />
          </div>
        )}

        {notes && !loading && (
          <div className="glass notesgen-result rise-in">
            <div className="notesgen-result-head">
              <div className="notesgen-result-icon">
                <NotebookPen size={18} />
              </div>
              <h2 className="font-display notesgen-result-title">
                {topic || "Generated Notes"}
              </h2>
            </div>

            <div className="notesgen-result-body">{notes}</div>
          </div>
        )}
      </section>

      <style>{`
        .notesgen-header {
          margin-bottom: 1.75rem;
        }

        .notesgen-title {
          font-size: clamp(1.7rem, 4vw, 2.5rem);
          font-weight: 700;
          margin: 0.6rem 0 0.3rem;
        }

        .notesgen-subtitle {
          color: var(--text-soft);
          margin: 0;
          font-size: 0.95rem;
        }

        .notesgen-card {
          max-width: 600px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }

        .notesgen-label {
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: var(--text-faint);
        }

        .notesgen-btn {
          width: 100%;
        }

        .notesgen-loading-bar {
          height: 4px;
          width: 100%;
          background: var(--surface);
          border-radius: 999px;
          overflow: hidden;
        }

        .notesgen-loading-fill {
          height: 100%;
          width: 40%;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          border-radius: 999px;
          animation: loading-slide 1.2s ease-in-out infinite;
        }

        @keyframes loading-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }

        .notesgen-result {
          max-width: 760px;
          padding: 1.75rem;
        }

        .notesgen-result-head {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .notesgen-result-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--r-sm);
          background: var(--surface-strong);
          color: var(--accent-2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notesgen-result-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
          text-transform: capitalize;
        }

        .notesgen-result-body {
          white-space: pre-wrap;
          color: var(--text-soft);
          font-size: 0.92rem;
          line-height: 1.75;
          border-top: 1px solid var(--border);
          padding-top: 1rem;
        }
      `}</style>
    </main>
  );
}