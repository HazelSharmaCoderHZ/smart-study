"use client";

import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { uploadPdf } from "@/services/pdf";

export default function PDFsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");

      const res = await uploadPdf(
        file,
        token!
      );

      setMessage(res.message);
      setFile(null);

    } catch (error: any) {
      setMessage(
        error?.response?.data?.detail ||
        "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-10 dark:bg-black dark:text-white">
      
      <h1 className="text-4xl font-bold">
        Upload PDF
      </h1>

      <p className="mt-2 opacity-70">
        Upload study material to chat with AI.
      </p>

      <div
        className="
          mt-8
          max-w-2xl
          border
          rounded-2xl
          p-8
        "
      >
        <label
          className="
            flex
            flex-col
            items-center
            justify-center
            border-2
            border-dashed
            rounded-xl
            p-10
            cursor-pointer
          "
        >
          <Upload size={40} />

          <span className="mt-4">
            Click to select a PDF
          </span>

          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] || null
              )
            }
          />
        </label>

        {file && (
          <div
            className="
              mt-6
              flex
              items-center
              gap-3
              border
              rounded-lg
              p-4
            "
          >
            <FileText size={20} />

            <div>
              <p className="font-medium">
                {file.name}
              </p>

              <p className="text-sm opacity-70">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="
            mt-6
            w-full
            bg-blue-600
            text-white
            py-3
            rounded-xl
            disabled:opacity-50
          "
        >
          {loading
            ? "Uploading..."
            : "Upload PDF"}
        </button>

        {message && (
          <div
            className="
              mt-4
              border
              rounded-lg
              p-3
            "
          >
            {message}
          </div>
        )}
      </div>

    </main>
  );
}