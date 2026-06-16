"use client";

import { useState } from "react";
import { Brain, Sparkles } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { generateQuiz } from "@/services/study";

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);

    try {
      const data = await generateQuiz(topic, token);
      setQuiz(data.quiz);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="shell">
      <Sidebar />

      <section className="content">
        <div className="quizgen-header rise-in">
          <span className="badge">
            <Brain size={12} /> QUIZ GENERATOR
          </span>
          <h1 className="font-display quizgen-title">Quiz Generator</h1>
          <p className="quizgen-subtitle">
            Create a quick quiz on any topic to test your understanding.
          </p>
        </div>

        <div className="glass quizgen-card rise-in" style={{ animationDelay: "80ms" }}>
          <label className="quizgen-label font-mono">TOPIC</label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Type the name of your uploaded pdf or any topic given in the pdfs"
            className="field"
          />

          <button
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="btn btn-primary quizgen-btn"
          >
            {loading ? "Generating..." : "Generate Quiz"}
            {!loading && <Sparkles size={16} />}
          </button>

          {loading && (
            <div className="quizgen-loading-bar">
              <div className="quizgen-loading-fill" />
            </div>
          )}
        </div>

        {loading && (
          <div className="glass quizgen-result rise-in">
            <div className="skeleton" style={{ height: 18, width: "40%", marginBottom: 14 }} />
            <div className="skeleton" style={{ height: 14, width: "100%", marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 14, width: "90%", marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 14, width: "80%" }} />
          </div>
        )}

        {quiz && !loading && (
          <div className="glass quizgen-result rise-in">
            <div className="quizgen-result-head">
              <div className="quizgen-result-icon">
                <Brain size={18} />
              </div>
              <h2 className="font-display quizgen-result-title">
                {topic || "Generated Quiz"}
              </h2>
            </div>

            <div className="quizgen-result-body">{quiz}</div>
          </div>
        )}
      </section>

      <style>{`
        .quizgen-header {
          margin-bottom: 1.75rem;
        }

        .quizgen-title {
          font-size: clamp(1.7rem, 4vw, 2.5rem);
          font-weight: 700;
          margin: 0.6rem 0 0.3rem;
        }

        .quizgen-subtitle {
          color: var(--text-soft);
          margin: 0;
          font-size: 0.95rem;
        }

        .quizgen-card {
          max-width: 600px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }

        .quizgen-label {
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: var(--text-faint);
        }

        .quizgen-btn {
          width: 100%;
        }

        .quizgen-loading-bar {
          height: 4px;
          width: 100%;
          background: var(--surface);
          border-radius: 999px;
          overflow: hidden;
        }

        .quizgen-loading-fill {
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

        .quizgen-result {
          max-width: 760px;
          padding: 1.75rem;
        }

        .quizgen-result-head {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .quizgen-result-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--r-sm);
          background: var(--surface-strong);
          color: var(--success);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .quizgen-result-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
          text-transform: capitalize;
        }

        .quizgen-result-body {
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