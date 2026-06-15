"use client";

import { useEffect, useState } from "react";
import { FileStack, NotebookPen, Clock } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { getNotes } from "@/services/study";

export default function MyNotesPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="shell">
      <Sidebar />

      <section className="content">
        <div className="notes-header rise-in">
          <span className="badge">
            <FileStack size={12} /> LIBRARY
          </span>
          <h1 className="font-display notes-title">My Notes</h1>
          <p className="notes-subtitle">
            Every smart note your AI tutor has generated for you.
          </p>
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
            {notes.map((note: any, index) => (
              <div
                key={index}
                className="glass glass-interactive notes-item rise-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="notes-item-head">
                  <div className="notes-icon">
                    <NotebookPen size={18} />
                  </div>
                  <h2 className="font-display notes-topic">{note.topic}</h2>
                </div>

                <div className="notes-meta">
                  <Clock size={13} />
                  <span className="font-mono">
                    {new Date(note.created_at).toLocaleString()}
                  </span>
                </div>

                <div className="notes-content">{note.notes}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        .notes-header {
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

        .notes-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .notes-item {
          padding: 1.25rem 1.5rem;
        }

        .notes-item-head {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .notes-icon {
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

        .notes-topic {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
        }

        .notes-meta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-faint);
          font-size: 0.75rem;
          margin-bottom: 0.85rem;
        }

        .notes-content {
          white-space: pre-wrap;
          color: var(--text-soft);
          font-size: 0.9rem;
          line-height: 1.7;
          border-top: 1px solid var(--border);
          padding-top: 0.85rem;
        }

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