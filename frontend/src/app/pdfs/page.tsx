"use client";

import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2, XCircle } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { uploadPdf } from "@/services/pdf";

export default function PDFsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setMessage("");
      setSuccess(null);

      const token = localStorage.getItem("token");

      const res = await uploadPdf(file, token!);

      setMessage(res.message);
      setSuccess(true);
      setFile(null);
    } catch (error: any) {
      setMessage(error?.response?.data?.detail || "Upload failed");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);

    const dropped = e.dataTransfer.files?.[0];
    if (dropped && dropped.type === "application/pdf") {
      setFile(dropped);
    }
  };

  return (
    <main className="shell">
      <Sidebar />

      <section className="content">
        <div className="upload-header rise-in">
          <span className="badge">
            <Upload size={12} /> INGEST
          </span>
          <h1 className="font-display upload-title">Upload PDF</h1>
          <p className="upload-subtitle">Upload study material to chat with AI.</p>
        </div>

        <div className="glass upload-card rise-in" style={{ animationDelay: "80ms" }}>
          <label
            className={`upload-dropzone ${dragOver ? "upload-dropzone-active" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <div className="upload-icon-wrap">
              <Upload size={32} />
            </div>

            <span className="upload-dropzone-title font-display">
              Click to select a PDF
            </span>
            <span className="upload-dropzone-sub">or drag and drop it here</span>

            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              className="upload-hidden-input"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          {file && (
            <div className="upload-file-preview rise-in">
              <div className="upload-file-icon">
                <FileText size={20} />
              </div>

              <div className="upload-file-info">
                <p className="upload-file-name">{file.name}</p>
                <p className="upload-file-size font-mono">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="btn btn-primary upload-btn"
          >
            {loading ? "Uploading..." : "Upload PDF"}
          </button>

          {loading && (
            <div className="upload-loading-bar">
              <div className="upload-loading-fill" />
            </div>
          )}

          {message && (
            <div className={`upload-message ${success ? "upload-message-success" : "upload-message-error"}`}>
              {success ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              {message}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .upload-header {
          margin-bottom: 1.75rem;
        }

        .upload-title {
          font-size: clamp(1.7rem, 4vw, 2.5rem);
          font-weight: 700;
          margin: 0.6rem 0 0.3rem;
        }

        .upload-subtitle {
          color: var(--text-soft);
          margin: 0;
          font-size: 0.95rem;
        }

        .upload-card {
          max-width: 600px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .upload-dropzone {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 2.75rem 1.5rem;
          border: 2px dashed var(--border-strong);
          border-radius: var(--r-md);
          cursor: pointer;
          text-align: center;
          transition: border-color 0.2s var(--ease), background 0.2s var(--ease), transform 0.2s var(--ease);
          color: var(--text-soft);
        }

        .upload-dropzone:hover {
          border-color: var(--accent);
          background: var(--surface);
        }

        .upload-dropzone-active {
          border-color: var(--accent);
          background: var(--surface-strong);
          transform: scale(1.01);
        }

        .upload-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(124,92,255,0.18), rgba(34,211,238,0.1));
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        .upload-dropzone-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text);
        }

        .upload-dropzone-sub {
          font-size: 0.85rem;
          color: var(--text-faint);
        }

        .upload-hidden-input {
          display: none;
        }

        .upload-file-preview {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 1rem;
          border: 1px solid var(--border);
          border-radius: var(--r-sm);
          background: var(--surface);
        }

        .upload-file-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--r-sm);
          background: var(--surface-strong);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .upload-file-name {
          font-weight: 600;
          font-size: 0.92rem;
          margin: 0;
          word-break: break-word;
        }

        .upload-file-size {
          font-size: 0.78rem;
          color: var(--text-faint);
          margin: 0.15rem 0 0;
        }

        .upload-btn {
          width: 100%;
        }

        .upload-loading-bar {
          height: 4px;
          width: 100%;
          background: var(--surface);
          border-radius: 999px;
          overflow: hidden;
        }

        .upload-loading-fill {
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

        .upload-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: var(--r-sm);
          font-size: 0.88rem;
          border: 1px solid var(--border);
        }

        .upload-message-success {
          color: var(--success);
          border-color: rgba(52, 211, 153, 0.3);
          background: rgba(52, 211, 153, 0.08);
        }

        .upload-message-error {
          color: var(--danger);
          border-color: rgba(251, 113, 133, 0.3);
          background: rgba(251, 113, 133, 0.08);
        }
      `}</style>
    </main>
  );
}