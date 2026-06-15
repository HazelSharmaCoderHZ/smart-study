import { FileText, MessageSquare, NotebookPen, Brain, ClipboardCheck, BarChart3 } from "lucide-react";

const FEATURES = [
  {
    icon: FileText,
    title: "Upload your PDFs",
    description: "Drop in textbooks, lecture notes, or papers — your AI tutor reads everything.",
    color: "var(--accent)",
  },
  {
    icon: MessageSquare,
    title: "Ask anything",
    description: "Chat with your documents and get answers grounded in your own material.",
    color: "var(--accent-2)",
  },
  {
    icon: NotebookPen,
    title: "Generate smart notes",
    description: "Turn dense chapters into clear, structured summaries in seconds.",
    color: "var(--success)",
  },
  {
    icon: Brain,
    title: "Quiz yourself",
    description: "Auto-generated quizzes test your understanding as you go.",
    color: "var(--warning)",
  },
  {
    icon: ClipboardCheck,
    title: "Take mock tests",
    description: "Simulate exam conditions with AI-generated tests on any topic.",
    color: "var(--danger)",
  },
  {
    icon: BarChart3,
    title: "Track your progress",
    description: "See your strengths, weak spots, and study activity in one dashboard.",
    color: "var(--accent)",
  },
];

export default function Features() {
  return (
    <section className="features">
      <div className="features-inner">
        <h2 className="font-display features-title">Everything you need to study smarter</h2>

        <div className="features-grid">
          {FEATURES.map(({ icon: Icon, title, description, color }, i) => (
            <div
              key={title}
              className="glass glass-interactive feature-card rise-in"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="feature-icon" style={{ color }}>
                <Icon size={22} />
              </div>
              <h3 className="font-display feature-title">{title}</h3>
              <p className="feature-desc">{description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .features {
          padding: 1rem 1.25rem 6rem;
          display: flex;
          justify-content: center;
        }

        .features-inner {
          max-width: 1100px;
          width: 100%;
        }

        .features-title {
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-weight: 700;
          text-align: center;
          margin: 0 0 2.5rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .feature-card {
          padding: 1.5rem;
        }

        .feature-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--r-sm);
          background: var(--surface-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .feature-title {
          font-size: 1.05rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
        }

        .feature-desc {
          font-size: 0.88rem;
          color: var(--text-soft);
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 900px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}