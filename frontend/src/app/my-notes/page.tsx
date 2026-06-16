"use client";

import { useEffect, useState } from "react";
import { FileStack, NotebookPen, Clock, ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { getNotes } from "@/services/study";

export default function MyNotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // Track which note indices are expanded
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggleNote = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  const expandAll = () => setExpanded(new Set(notes.map((_, i) => i)));
  const collapseAll = () => setExpanded(new Set());

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const data = await getNotes(token);
        setNotes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const allExpanded = notes.length > 0 && expanded.size === notes.length;

  return (
    <main className="shell">
      <Sidebar />

      <section className="content">

        <div className="notes-header rise-in">
          <div>
            <span className="badge">
              <FileStack size={12} /> LIBRARY
            </span>
            <h1 className="font-display notes-title">My Notes</h1>
            <p className="notes-subtitle">
              Every smart note your AI tutor has generated for you.
            </p>
          </div>

          {/* Expand / Collapse all — only show when notes exist */}
          {!loading && notes.length > 0 && (
            <button
              className="btn notes-toggle-all"
              onClick={allExpanded ? collapseAll : expandAll}
            >
              {allExpanded ? <EyeOff size={15} /> : <Eye size={15} />}
              {allExpanded ? "Collapse all" : "Expand all"}
            </button>
          )}
        </div>

        {loading ? (
          <div className="notes-list">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass notes-item">
                <div className="skeleton" style={{ height: 22, width: "30%", marginBottom: 14 }} />
                <div className="skeleton" style={{ height: 14, width: "100%", marginBottom: 6 }} />
                <div className="skeleton" style={{ height: 14, width: "85%" }} />
              </div>
            ))}
          </div>
        ) : notes.length === 0 ? (
          <div className="glass notes-empty rise-in">
            <NotebookPen size={32} color="var(--text-faint)" />
            <p className="font-display notes-empty-title">No notes yet</p>
            <p className="notes-empty-sub">
              Generate notes from your PDFs and they&apos;ll appear here.
            </p>
          </div>
        ) : (
          <div className="notes-list">
            {notes.map((note: any, index) => {
              const isOpen = expanded.has(index);
              return (
                <div
                  key={index}
                  className="glass notes-item rise-in"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {/* Always-visible header row — click anywhere to toggle */}
                  <button
                    className="notes-item-head"
                    onClick={() => toggleNote(index)}
                    aria-expanded={isOpen}
                  >
                    <div className="notes-item-left">
                      <div className="notes-icon">
                        <NotebookPen size={18} />
                      </div>

                      <div className="notes-item-info">
                        <h2 className="font-display notes-topic">{note.topic}</h2>
                        <div className="notes-meta">
                          <Clock size={12} />
                          <span className="font-mono">
                            {new Date(note.created_at).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="notes-toggle-btn">
                      <span className="notes-toggle-label font-mono">
                        {isOpen ? "Hide" : "Show"} notes
                      </span>
                      {isOpen
                        ? <ChevronUp size={16} />
                        : <ChevronDown size={16} />
                      }
                    </div>
                  </button>

                  {/* Animated collapsible body */}
                  <div
                    className="notes-body"
                    style={{ maxHeight: isOpen ? "2000px" : "0" }}
                    aria-hidden={!isOpen}
                  >
                    <div className="notes-content">{note.notes}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <style>{`
        .notes-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.75rem;
        }

        .notes-title {
          font-size: clamp(1.7rem, 4vw, 2.5rem);
          font-weight: 700;
          margin: 0.6rem 0 0.3rem;
        }

        .notes-subtitle {
          color: var(--text-soft);
          margin: 0;
          font-size: 0.95rem;
        }

        .notes-toggle-all {
          flex-shrink: 0;
          margin-top: 0.5rem;
          font-size: 0.85rem;
        }

        /* ── List ── */
        .notes-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .notes-item {
          overflow: hidden;
          padding: 0;
        }

        /* ── Always-visible header ── */
        .notes-item-head {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.1rem 1.35rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: var(--text);
          transition: background 0.18s var(--ease);
        }

        .notes-item-head:hover {
          background: var(--surface);
        }

        .notes-item-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          min-width: 0;
        }

        .notes-icon {
          width: 38px;
          height: 38px;
          border-radius: var(--r-sm);
          background: var(--surface-strong);
          color: var(--accent-2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notes-item-info {
          min-width: 0;
        }

        .notes-topic {
          font-size: 1.05rem;
          font-weight: 600;
          margin: 0 0 0.2rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .notes-meta {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-faint);
          font-size: 0.73rem;
        }

        /* ── Show/Hide button area ── */
        .notes-toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-shrink: 0;
          color: var(--text-soft);
          transition: color 0.18s var(--ease);
        }

        .notes-item-head:hover .notes-toggle-btn {
          color: var(--accent);
        }

        .notes-toggle-label {
          font-size: 0.72rem;
          letter-spacing: 0.04em;
        }

        @media (max-width: 480px) {
          .notes-toggle-label { display: none; }
        }

        /* ── Collapsible body ── */
        .notes-body {
          overflow: hidden;
          transition: max-height 0.4s var(--ease);
        }

        .notes-content {
          white-space: pre-wrap;
          color: var(--text-soft);
          font-size: 0.9rem;
          line-height: 1.75;
          border-top: 1px solid var(--border);
          padding: 1rem 1.35rem 1.35rem;
        }

        /* ── Empty state ── */
        .notes-empty {
          padding: 3rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
        }

        .notes-empty-title {
          font-size: 1.15rem;
          font-weight: 600;
          margin: 0.5rem 0 0;
        }

        .notes-empty-sub {
          color: var(--text-soft);
          font-size: 0.9rem;
          margin: 0;
        }
      `}</style>
    </main>
  );
}