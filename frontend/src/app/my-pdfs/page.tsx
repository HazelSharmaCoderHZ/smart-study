"use client";

import { useEffect, useState } from "react";
import { FileText, Trash2, RefreshCw, Eye, ExternalLink } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { getMyPdfs, deletePdf } from "@/services/pdf";

interface PdfFile {
  filename: string;
}

export default function MyPdfsPage() {
  const [pdfs, setPdfs] = useState<PdfFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPdfs = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      const token = localStorage.getItem("token");
      if (!token) return;
      const data = await getMyPdfs(token);
      setPdfs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDelete = async (filename: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await deletePdf(filename, token);
      setPdfs((prev) => prev.filter((pdf) => pdf.filename !== filename));
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = (filename: string) => {
    const token = localStorage.getItem("token");
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    // Opens the PDF served by FastAPI — adjust the path if your endpoint differs
    const url = `${baseUrl}/pdf/view/${encodeURIComponent(filename)}?token=${token}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  return (
    <main className="shell">
      <Sidebar />

      <section className="content">

        <div className="pdfs-header rise-in">
          <div>
            <span className="badge">
              <FileText size={12} /> DOCUMENTS
            </span>
            <h1 className="font-display pdfs-title">My PDFs</h1>
            <p className="pdfs-subtitle">Manage your uploaded study materials</p>
          </div>

          <button
            onClick={() => fetchPdfs(true)}
            className="btn"
            disabled={refreshing}
          >
            <RefreshCw size={16} className={refreshing ? "spin" : ""} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="pdfs-grid">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass pdfs-item">
                <div className="skeleton" style={{ height: 46, width: 46, borderRadius: 10, marginBottom: 14 }} />
                <div className="skeleton" style={{ height: 16, width: "70%", marginBottom: 18 }} />
                <div className="skeleton" style={{ height: 38, width: "100%" }} />
              </div>
            ))}
          </div>
        ) : pdfs.length === 0 ? (
          <div className="glass pdfs-empty rise-in">
            <FileText size={32} color="var(--text-faint)" />
            <p className="font-display pdfs-empty-title">No PDFs uploaded yet</p>
            <p className="pdfs-empty-sub">
              Upload a document to start chatting, summarizing, and quizzing yourself.
            </p>
          </div>
        ) : (
          <div className="pdfs-grid">
            {pdfs.map((pdf, index) => (
              <div
                key={pdf.filename}
                className="glass glass-interactive pdfs-item rise-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="pdfs-icon">
                  <FileText size={26} />
                </div>

                <span className="pdfs-filename">{pdf.filename}</span>

                <div className="pdfs-actions">
                  <button
                    onClick={() => handleView(pdf.filename)}
                    className="btn pdfs-view-btn"
                    title="Open PDF in new tab"
                  >
                    <Eye size={15} />
                    View
                    <ExternalLink size={12} className="pdfs-ext-icon" />
                  </button>

                  <button
                    onClick={() => handleDelete(pdf.filename)}
                    className="btn pdfs-delete-btn"
                    aria-label={`Delete ${pdf.filename}`}
                    title="Delete PDF"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        .pdfs-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.75rem;
        }

        .pdfs-title {
          font-size: clamp(1.7rem, 4vw, 2.5rem);
          font-weight: 700;
          margin: 0.6rem 0 0.3rem;
        }

        .pdfs-subtitle {
          color: var(--text-soft);
          margin: 0;
          font-size: 0.95rem;
        }

        .spin { animation: spin 1s linear infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .pdfs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .pdfs-item {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .pdfs-icon {
          width: 50px;
          height: 50px;
          border-radius: var(--r-sm);
          background: linear-gradient(135deg, rgba(124,92,255,0.18), rgba(34,211,238,0.1));
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pdfs-filename {
          font-weight: 600;
          font-size: 0.92rem;
          word-break: break-word;
          line-height: 1.4;
          flex: 1;
        }

        .pdfs-actions {
          display: flex;
          gap: 0.6rem;
          margin-top: auto;
        }

        .pdfs-view-btn {
          flex: 1;
          gap: 0.4rem;
        }

        .pdfs-ext-icon {
          opacity: 0.55;
          margin-left: auto;
        }

        .pdfs-delete-btn {
          color: var(--danger);
          padding: 0.7rem;
        }

        .pdfs-delete-btn:hover {
          border-color: var(--danger);
          background: rgba(251,113,133,0.08);
        }

        .pdfs-empty {
          padding: 3rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
        }

        .pdfs-empty-title {
          font-size: 1.15rem;
          font-weight: 600;
          margin: 0.5rem 0 0;
        }

        .pdfs-empty-sub {
          color: var(--text-soft);
          font-size: 0.9rem;
          margin: 0;
          max-width: 380px;
        }

        @media (max-width: 1100px) {
          .pdfs-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .pdfs-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}