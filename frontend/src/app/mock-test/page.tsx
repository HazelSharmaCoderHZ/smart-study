"use client";

import { useState, useEffect } from "react";
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import ProgressRing from "@/components/dashboard/ProgressRing";
import { generateMockTest, saveTestResult } from "@/services/study";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export default function MockTestPage() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [revealAnswer, setRevealAnswer] = useState(false);

  const startTest = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) return;

      const data = await generateMockTest(topic, token);

      setQuestions(data?.questions || []);
      setCurrent(0);
      setScore(0);
      setSelected("");
      setFinished(false);
      setRevealAnswer(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!selected || !questions?.[current]) return;

    const isCorrect = selected === questions[current].answer;
    const newScore = isCorrect ? score + 1 : score;
    const totalQuestions = questions?.length ?? 0;

    if (current === totalQuestions - 1) {
      setScore(newScore);
      setFinished(true);
      return;
    }

    setScore(newScore);
    setCurrent((prev) => prev + 1);
    setSelected("");
    setRevealAnswer(false);
  };

  const restartFlow = () => {
    setQuestions([]);
    setTopic("");
    setCurrent(0);
    setScore(0);
    setSelected("");
    setFinished(false);
    setRevealAnswer(false);
  };

  useEffect(() => {
    const saveResult = async () => {
      const totalQuestions = questions?.length ?? 0;
      if (!finished || totalQuestions === 0) {
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) return;

      const percentage = Math.round((score / totalQuestions) * 100);

      try {
        await saveTestResult(
          {
            topic,
            score,
            total: totalQuestions,
            percentage,
          },
          token
        );
        console.log("Test result saved successfully");
      } catch (error) {
        console.error("Failed to save result:", error);
      }
    };

    saveResult();
  }, [finished, score, topic, questions?.length ?? 0]);

  const totalQuestions = questions?.length ?? 0;

  if (finished) {
    const percentage =
      totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    const verdict =
      percentage >= 80
        ? { label: "Excellent work!", color: "var(--success)" }
        : percentage >= 50
        ? { label: "Good effort — keep practicing", color: "var(--warning)" }
        : { label: "More review recommended", color: "var(--danger)" };

    return (
      <main className="shell">
        <Sidebar />

        <section className="content">
          <div className="result-wrap rise-in">
            <div className="glass result-card">
              <div className="result-trophy">
                <Trophy size={28} color={verdict.color} />
              </div>

              <h1 className="font-display result-title">Test Completed</h1>
              <p className="result-topic">{topic || "General"}</p>

              <div className="result-ring-wrap">
                <ProgressRing value={percentage} size={140} stroke={10} color={verdict.color} />
              </div>

              <p className="result-verdict" style={{ color: verdict.color }}>
                {verdict.label}
              </p>

              <div className="result-stats">
                <div className="result-stat">
                  <span className="font-display result-stat-value">{score}</span>
                  <span className="result-stat-label">Correct</span>
                </div>
                <div className="result-stat-divider" />
                <div className="result-stat">
                  <span className="font-display result-stat-value">
                    {totalQuestions - score}
                  </span>
                  <span className="result-stat-label">Incorrect</span>
                </div>
                <div className="result-stat-divider" />
                <div className="result-stat">
                  <span className="font-display result-stat-value">{totalQuestions}</span>
                  <span className="result-stat-label">Total</span>
                </div>
              </div>

              <button onClick={restartFlow} className="btn btn-primary result-restart">
                <RotateCcw size={16} />
                Take Another Test
              </button>
            </div>
          </div>

          <style>{`
            .result-wrap {
              display: flex;
              justify-content: center;
              padding-top: 1.5rem;
            }

            .result-card {
              width: 100%;
              max-width: 460px;
              padding: 2.5rem 2rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              gap: 0.5rem;
            }

            .result-trophy {
              width: 60px;
              height: 60px;
              border-radius: 999px;
              background: var(--surface-strong);
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .result-title {
              font-size: 1.8rem;
              font-weight: 700;
              margin: 1rem 0 0;
            }

            .result-topic {
              color: var(--text-soft);
              margin: 0;
              text-transform: capitalize;
            }

            .result-ring-wrap {
              margin: 1.75rem 0 0.75rem;
            }

            .result-verdict {
              font-weight: 600;
              margin: 0;
            }

            .result-stats {
              display: flex;
              align-items: center;
              gap: 1.5rem;
              margin: 1.75rem 0;
              width: 100%;
              justify-content: center;
            }

            .result-stat {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 0.2rem;
            }

            .result-stat-value {
              font-size: 1.6rem;
              font-weight: 700;
            }

            .result-stat-label {
              font-size: 0.78rem;
              color: var(--text-faint);
            }

            .result-stat-divider {
              width: 1px;
              height: 32px;
              background: var(--border);
            }

            .result-restart {
              width: 100%;
            }
          `}</style>
        </section>
      </main>
    );
  }

  return (
    <main className="shell">
      <Sidebar />

      <section className="content">
        <div className="test-header rise-in">
          <span className="badge">
            <ClipboardCheck size={12} /> ASSESSMENT
          </span>
          <h1 className="font-display test-title">Mock Test</h1>
          <p className="test-subtitle">
            Generate an AI-powered test and track your accuracy as you go.
          </p>
        </div>

        {totalQuestions === 0 ? (
          <div className="glass test-start-card rise-in" style={{ animationDelay: "80ms" }}>
            <label className="test-label font-mono">TOPIC</label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Cell Biology, World War II, Calculus..."
              className="field"
            />

            <button
              onClick={startTest}
              disabled={loading || !topic.trim()}
              className="btn btn-primary test-start-btn"
            >
              {loading ? "Generating questions..." : "Start Test"}
              {!loading && <ArrowRight size={16} />}
            </button>

            {loading && (
              <div className="test-loading-bar">
                <div className="test-loading-fill" />
              </div>
            )}
          </div>
        ) : (
          <div className="test-active rise-in" style={{ animationDelay: "80ms" }}>
            {/* Progress bar */}
            <div className="test-progress-wrap">
              <div className="test-progress-meta">
                <span className="font-mono">
                  Question {current + 1} / {totalQuestions}
                </span>
                <span className="font-mono">
                  Score: {score}/{current}
                </span>
              </div>
              <div className="test-progress-track">
                <div
                  className="test-progress-fill"
                  style={{ width: `${(current / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            <div className="glass test-question-card">
              {questions[current] && (
                <>
                  <h3 className="font-display test-question-text">
                    {questions[current].question}
                  </h3>

                  <div className="test-options">
                    {questions[current].options.map((option: string, idx: number) => {
                      const isSelected = selected === option;

                      return (
                        <label
                          key={idx}
                          className={`test-option ${isSelected ? "test-option-selected" : ""}`}
                        >
                          <input
                            type="radio"
                            name="option"
                            value={option}
                            checked={isSelected}
                            onChange={() => setSelected(option)}
                            className="test-option-radio"
                          />
                          <span className="test-option-marker">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="test-option-text">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                </>
              )}

              <button
                onClick={handleNext}
                disabled={!selected}
                className="btn btn-primary test-next-btn"
              >
                {current === totalQuestions - 1 ? "Finish Test" : "Next Question"}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </section>

      <style>{`
        .test-header {
          margin-bottom: 1.75rem;
        }

        .test-title {
          font-size: clamp(1.7rem, 4vw, 2.5rem);
          font-weight: 700;
          margin: 0.6rem 0 0.3rem;
        }

        .test-subtitle {
          color: var(--text-soft);
          margin: 0;
          font-size: 0.95rem;
        }

        .test-start-card {
          max-width: 540px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .test-label {
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: var(--text-faint);
        }

        .test-start-btn {
          width: 100%;
        }

        .test-loading-bar {
          height: 4px;
          width: 100%;
          background: var(--surface);
          border-radius: 999px;
          overflow: hidden;
        }

        .test-loading-fill {
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

        .test-active {
          max-width: 720px;
        }

        .test-progress-wrap {
          margin-bottom: 1.25rem;
        }

        .test-progress-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          color: var(--text-faint);
          margin-bottom: 0.5rem;
        }

        .test-progress-track {
          height: 6px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 999px;
          overflow: hidden;
        }

        .test-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          border-radius: 999px;
          transition: width 0.5s var(--ease);
        }

        .test-question-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .test-question-text {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
          line-height: 1.5;
        }

        .test-options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .test-option {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem 1rem;
          border: 1px solid var(--border);
          border-radius: var(--r-sm);
          cursor: pointer;
          transition: border-color 0.2s var(--ease), background 0.2s var(--ease), transform 0.2s var(--ease);
          background: var(--surface);
        }

        .test-option:hover {
          border-color: var(--border-strong);
          transform: translateX(2px);
        }

        .test-option-selected {
          border-color: var(--accent);
          background: linear-gradient(135deg, rgba(124,92,255,0.14), rgba(34,211,238,0.06));
        }

        .test-option-radio {
          width: 16px;
          height: 16px;
          accent-color: var(--accent);
          flex-shrink: 0;
        }

        .test-option-marker {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          width: 24px;
          height: 24px;
          border-radius: 999px;
          background: var(--surface-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--text-soft);
        }

        .test-option-selected .test-option-marker {
          background: var(--accent);
          color: #fff;
        }

        .test-option-text {
          font-size: 0.95rem;
        }

        .test-next-btn {
          align-self: flex-end;
        }

        @media (max-width: 640px) {
          .test-next-btn {
            align-self: stretch;
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}