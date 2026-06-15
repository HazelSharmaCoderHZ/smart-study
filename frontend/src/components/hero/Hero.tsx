import Link from "next/link";
import { ArrowRight, FileText, Brain, ClipboardCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <span className="badge hero-badge">
          <span className="hero-pulse" /> AI-POWERED LEARNING
        </span>

        <h1 className="font-display hero-title">
          Turn any PDF into your
          <br />
          <span className="hero-gradient-text">personal tutor</span>
        </h1>

        <p className="hero-subtitle">
          Upload documents, chat with an AI that knows the material, generate
          notes and quizzes, and track your mastery — all in one workspace.
        </p>

        <div className="hero-actions">
          <Link href="/signup" className="btn btn-primary hero-cta">
            Start learning free
            <ArrowRight size={16} />
          </Link>
          <Link href="/login" className="btn hero-cta-secondary">
            Log in
          </Link>
        </div>

        <div className="hero-preview glass">
          <div className="hero-preview-row">
            <div className="hero-preview-icon">
              <FileText size={18} />
            </div>
            <div className="hero-preview-bar" style={{ width: "70%" }} />
          </div>
          <div className="hero-preview-row">
            <div className="hero-preview-icon" style={{ color: "var(--accent-2)" }}>
              <Brain size={18} />
            </div>
            <div className="hero-preview-bar" style={{ width: "85%" }} />
          </div>
          <div className="hero-preview-row">
            <div className="hero-preview-icon" style={{ color: "var(--success)" }}>
              <ClipboardCheck size={18} />
            </div>
            <div className="hero-preview-bar" style={{ width: "55%" }} />
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          padding: 4rem 1.25rem 5rem;
          display: flex;
          justify-content: center;
        }

        .hero-inner {
          max-width: 760px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-badge {
          margin-bottom: 1.5rem;
        }

        .hero-pulse {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--success);
          box-shadow: 0 0 6px var(--success);
          animation: pulse-dot 1.6s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        .hero-title {
          font-size: clamp(2.4rem, 7vw, 4.2rem);
          font-weight: 700;
          line-height: 1.1;
          margin: 0;
        }

        .hero-gradient-text {
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-subtitle {
          color: var(--text-soft);
          font-size: 1.05rem;
          line-height: 1.7;
          max-width: 520px;
          margin: 1.5rem 0 0;
        }

        .hero-actions {
          display: flex;
          gap: 0.85rem;
          margin: 2.25rem 0;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero-cta {
          text-decoration: none;
          padding: 0.85rem 1.75rem;
        }

        .hero-cta-secondary {
          text-decoration: none;
          padding: 0.85rem 1.75rem;
        }

        .hero-preview {
          width: 100%;
          max-width: 480px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .hero-preview-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .hero-preview-icon {
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

        .hero-preview-bar {
          height: 10px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          opacity: 0.35;
        }
      `}</style>
    </section>
  );
}