"use client";

import { useState } from "react";
import { Sparkles, Send, Bot, User } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { askQuestion } from "@/services/chat";

export default function ChatPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);
      setLastQuestion(question);

      const token = localStorage.getItem("token");

      const res = await askQuestion(question, token!);

      setAnswer(res.answer);
      setQuestion("");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      ask();
    }
  };

  return (
    <main className="shell">
      <Sidebar />

      <section className="content">
        <div className="chat-header rise-in">
          <span className="badge">
            <Sparkles size={12} /> AI ASSISTANT
          </span>
          <h1 className="font-display chat-title">AI Chat</h1>
          <p className="chat-subtitle">
            Ask anything about your uploaded documents and get instant answers.
          </p>
        </div>

        <div className="chat-layout">
          {/* Conversation area */}
          <div className="glass chat-panel rise-in" style={{ animationDelay: "80ms" }}>
            {!lastQuestion && !loading && (
              <div className="chat-empty">
                <Bot size={36} color="var(--accent)" />
                <p className="font-display chat-empty-title">Ready when you are</p>
                <p className="chat-empty-sub">
                  Type a question below and your AI tutor will respond using context
                  from your uploaded PDFs.
                </p>
              </div>
            )}

            {lastQuestion && (
              <div className="chat-bubble chat-bubble-user rise-in">
                <div className="chat-avatar chat-avatar-user">
                  <User size={16} />
                </div>
                <div className="chat-bubble-text">{lastQuestion}</div>
              </div>
            )}

            {loading && (
              <div className="chat-bubble chat-bubble-ai rise-in">
                <div className="chat-avatar chat-avatar-ai">
                  <Bot size={16} />
                </div>
                <div className="chat-bubble-text chat-typing">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}

            {answer && !loading && (
              <div className="chat-bubble chat-bubble-ai rise-in">
                <div className="chat-avatar chat-avatar-ai">
                  <Bot size={16} />
                </div>
                <div className="chat-bubble-text">{answer}</div>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="glass chat-input-panel rise-in" style={{ animationDelay: "140ms" }}>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about your documents..."
              className="field chat-textarea"
              rows={3}
            />

            <div className="chat-input-row">
              <span className="chat-hint font-mono">⌘ / Ctrl + Enter to send</span>

              <button
                onClick={ask}
                disabled={loading || !question.trim()}
                className="btn btn-primary"
              >
                <Send size={16} />
                {loading ? "Thinking..." : "Ask"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .chat-header {
          margin-bottom: 1.75rem;
        }

        .chat-title {
          font-size: clamp(1.7rem, 4vw, 2.5rem);
          font-weight: 700;
          margin: 0.6rem 0 0.3rem;
        }

        .chat-subtitle {
          color: var(--text-soft);
          margin: 0;
          font-size: 0.95rem;
        }

        .chat-layout {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .chat-panel {
          min-height: 320px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .chat-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 0.5rem;
          padding: 2rem 1rem;
        }

        .chat-empty-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0.5rem 0 0;
        }

        .chat-empty-sub {
          color: var(--text-soft);
          font-size: 0.9rem;
          max-width: 380px;
          margin: 0;
        }

        .chat-bubble {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .chat-bubble-user {
          flex-direction: row-reverse;
        }

        .chat-avatar {
          width: 34px;
          height: 34px;
          border-radius: var(--r-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .chat-avatar-ai {
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          color: #fff;
        }

        .chat-avatar-user {
          background: var(--surface-strong);
          color: var(--text);
          border: 1px solid var(--border);
        }

        .chat-bubble-text {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--r-md);
          padding: 0.85rem 1.1rem;
          font-size: 0.92rem;
          line-height: 1.6;
          max-width: 680px;
          white-space: pre-wrap;
        }

        .chat-bubble-user .chat-bubble-text {
          background: linear-gradient(135deg, rgba(124,92,255,0.18), rgba(34,211,238,0.08));
          border-color: var(--border-strong);
        }

        .chat-typing {
          display: flex;
          gap: 0.3rem;
          align-items: center;
        }

        .dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: var(--accent);
          animation: typing-bounce 1.2s ease-in-out infinite;
        }

        .dot:nth-child(2) { animation-delay: 0.15s; }
        .dot:nth-child(3) { animation-delay: 0.3s; }

        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        .chat-input-panel {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .chat-textarea {
          resize: vertical;
          min-height: 80px;
          font-family: var(--font-body);
        }

        .chat-input-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .chat-hint {
          font-size: 0.75rem;
          color: var(--text-faint);
        }

        @media (max-width: 640px) {
          .chat-bubble-text {
            max-width: 100%;
          }
        }
      `}</style>
    </main>
  );
}