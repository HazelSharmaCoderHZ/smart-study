"use client";

import { useEffect, useState } from "react";
import { MessageSquare, History as HistoryIcon, Clock } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { getChatHistory } from "@/services/chat";

interface ChatItem {
  question: string;
  answer: string;
  created_at: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const data = await getChatHistory(token);
        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <main className="shell">
      <Sidebar />

      <section className="content">
        <div className="hist-header rise-in">
          <span className="badge">
            <HistoryIcon size={12} /> ARCHIVE
          </span>
          <h1 className="font-display hist-title">Chat History</h1>
          <p className="hist-subtitle">Review your previous AI conversations</p>
        </div>

        {loading ? (
          <div className="hist-list">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass hist-item">
                <div className="skeleton" style={{ height: 20, width: "40%", marginBottom: 12 }} />
                <div className="skeleton" style={{ height: 14, width: "90%", marginBottom: 6 }} />
                <div className="skeleton" style={{ height: 14, width: "70%" }} />
              </div>
            ))}
          </div>
        ) : history.length === 0 ? (
          <div className="glass hist-empty rise-in">
            <MessageSquare size={32} color="var(--text-faint)" />
            <p className="font-display hist-empty-title">No chats found</p>
            <p className="hist-empty-sub">
              Start a conversation in AI Chat and it will show up here.
            </p>
          </div>
        ) : (
          <div className="hist-list">
            {history.map((chat, index) => (
              <div
                key={index}
                className="glass glass-interactive hist-item rise-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="hist-item-head">
                  <div className="hist-icon">
                    <MessageSquare size={18} />
                  </div>
                  <h2 className="font-display hist-question">{chat.question}</h2>
                </div>

                <p className="hist-answer line-clamp-3">{chat.answer}</p>

                <div className="hist-meta">
                  <Clock size={13} />
                  <span className="font-mono">
                    {new Date(chat.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        .hist-header {
          margin-bottom: 1.75rem;
        }

        .hist-title {
          font-size: clamp(1.7rem, 4vw, 2.5rem);
          font-weight: 700;
          margin: 0.6rem 0 0.3rem;
        }

        .hist-subtitle {
          color: var(--text-soft);
          margin: 0;
          font-size: 0.95rem;
        }

        .hist-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .hist-item {
          padding: 1.25rem;
        }

        .hist-item-head {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .hist-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--r-sm);
          background: var(--surface-strong);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .hist-question {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }

        .hist-answer {
          color: var(--text-soft);
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0 0 0.85rem;
        }

        .hist-meta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-faint);
          font-size: 0.75rem;
        }

        .hist-empty {
          padding: 3rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
        }

        .hist-empty-title {
          font-size: 1.15rem;
          font-weight: 600;
          margin: 0.5rem 0 0;
        }

        .hist-empty-sub {
          color: var(--text-soft);
          font-size: 0.9rem;
          margin: 0;
        }
      `}</style>
    </main>
  );
}