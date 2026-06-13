"use client";

import { useEffect, useState } from "react";
import { FileText, Trash2, RefreshCw } from "lucide-react";
import { getMyPdfs, deletePdf } from "@/services/pdf";

interface PdfFile {
  filename: string;
}

export default function MyPdfsPage() {
  const [pdfs, setPdfs] = useState<PdfFile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPdfs = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const data = await getMyPdfs(token);
      setPdfs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      await deletePdf(filename, token);

      setPdfs((prev) =>
        prev.filter((pdf) => pdf.filename !== filename)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  return (
    <main className="min-h-screen p-8 dark:bg-black dark:text-white">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            My PDFs
          </h1>

          <p className="opacity-70 mt-2">
            Manage your uploaded study materials
          </p>
        </div>

        <button
          onClick={fetchPdfs}
          className="border px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Refresh
        </button>

      </div>

      {loading ? (
        <p>Loading PDFs...</p>
      ) : pdfs.length === 0 ? (
        <div className="border rounded-xl p-8 text-center">
          <p>No PDFs uploaded yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {pdfs.map((pdf) => (
            <div
              key={pdf.filename}
              className="
                border
                rounded-xl
                p-5
                hover:shadow-lg
                transition
              "
            >
              <div className="flex items-center gap-3 mb-4">
                <FileText size={28} />
                <span className="font-medium">
                  {pdf.filename}
                </span>
              </div>

              <div className="flex gap-3">

                <button
                  className="
                    flex-1
                    border
                    rounded-lg
                    py-2
                  "
                >
                  View
                </button>

                <button
                  onClick={() =>
                    handleDelete(pdf.filename)
                  }
                  className="
                    flex items-center
                    justify-center
                    px-4
                    border
                    rounded-lg
                  "
                >
                  <Trash2 size={18} />
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

    </main>
  );
}