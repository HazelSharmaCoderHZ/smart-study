"use client";

import { useEffect, useState } from "react";
import { Brain, ChevronDown, ChevronUp, Clock, ListChecks } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { getQuizzes } from "@/services/study";

interface Quiz {
  topic: string;
  quiz: string;
  created_at: string;
}

export default function MyQuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const data = await getQuizzes(token);
        setQuizzes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <main className="shell">
      <Sidebar />

      <section className="content">
        <div className="quizzes-header rise-in">
          <span className="badge">
            <ListChecks size={12} /> LIBRARY
          </span>
          <h1 className="font-display quizzes-title">My Quizzes</h1>
          <p className="quizzes-subtitle">Review previously generated quizzes</p>
        </div>

        {loading ? (
          <div className="quizzes-list">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass quizzes-item">
                <div className="skeleton" style={{ height: 22, width: "35%", marginBottom: 10 }} />
                <div className="skeleton" style={{ height: 14, width: "25%" }} />
              </div>
            ))}
          </div>
        ) : quizzes.length === 0 ? (
          <div className="glass quizzes-empty rise-in">
            <Brain size={32} color="var(--text-faint)" />
            <p className="font-display quizzes-empty-title">No quizzes found</p>
            <p className="quizzes-empty-sub">
              Generate a quiz and it will be saved here for later review.
            </p>
          </div>
        ) : (
          <div className="quizzes-list">
            {quizzes.map((quiz, index) => {
              const isOpen = expanded === index;

              return (
                <div
                  key={index}
                  className="glass glass-interactive quizzes-item rise-in"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <button
                    className="quizzes-item-head"
                    onClick={() => setExpanded(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <div className="quizzes-item-left">
                      <div className="quizzes-icon">
                        <Brain size={18} />
                      </div>
                      <div>
                        <h2 className="font-display quizzes-topic">{quiz.topic}</h2>
                        <div className="quizzes-meta">
                          <Clock size={13} />
                          <span className="font-mono">
                            {new Date(quiz.created_at).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="quizzes-chevron">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  <div className={`quizzes-body ${isOpen ? "quizzes-body-open" : ""}`}>
                    <div className="quizzes-body-inner">{quiz.quiz}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <style>{`
        .quizzes-header {
          margin-bottom: 1.75rem;
        }

        .quizzes-title {
          font-size: clamp(1.7rem, 4vw, 2.5rem);
          font-weight: 700;
          margin: 0.6rem 0 0.3rem;
        }

        .quizzes-subtitle {
          color: var(--text-soft);
          margin: 0;
          font-size: 0.95rem;
        }

        .quizzes-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .quizzes-item {
          padding: 0;
          overflow: hidden;
        }

        .quizzes-item-head {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: var(--text);
        }

        .quizzes-item-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .quizzes-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--r-sm);
          background: var(--surface-strong);
          color: var(--success);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .quizzes-topic {
          font-size: 1.05rem;
          font-weight: 600;
          margin: 0 0 0.25rem;
        }

        .quizzes-meta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-faint);
          font-size: 0.75rem;
        }

        .quizzes-chevron {
          color: var(--text-faint);
          flex-shrink: 0;
          transition: color 0.2s var(--ease), transform 0.25s var(--ease);
        }

        .quizzes-item-head:hover .quizzes-chevron {
          color: var(--accent);
        }

        .quizzes-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s var(--ease);
        }

        .quizzes-body-open {
          max-height: 1000px;
        }

        .quizzes-body-inner {
          padding: 0 1.5rem 1.5rem;
          border-top: 1px solid var(--border);
          margin-top: -1px;
          padding-top: 1.25rem;
          white-space: pre-wrap;
          color: var(--text-soft);
          font-size: 0.9rem;
          line-height: 1.75;
        }

        .quizzes-empty {
          padding: 3rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
        }

        .quizzes-empty-title {
          font-size: 1.15rem;
          font-weight: 600;
          margin: 0.5rem 0 0;
        }

        .quizzes-empty-sub {
          color: var(--text-soft);
          font-size: 0.9rem;
          margin: 0;
          max-width: 380px;
        }
      `}</style>
    </main>
  );
}