"use client";

import { useState } from "react";
import { generateNotes } from "@/services/study";

export default function NotesPage() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      if (!token) return;

      const data =
        await generateNotes(
          topic,
          token
        );

      setNotes(data.notes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 min-h-screen">

      <h1 className="text-4xl font-bold mb-6">
        Notes Generator
      </h1>

      <input
        type="text"
        placeholder="Enter topic..."
        value={topic}
        onChange={(e) =>
          setTopic(e.target.value)
        }
        className="
          border
          p-3
          rounded-lg
          w-full
        "
      />

      <button
        onClick={handleGenerate}
        className="
          mt-4
          px-6
          py-3
          rounded-lg
          border
        "
      >
        {loading
          ? "Generating..."
          : "Generate Notes"}
      </button>

      {notes && (
        <div
          className="
            mt-8
            border
            rounded-xl
            p-6
            whitespace-pre-wrap
          "
        >
          {notes}
        </div>
      )}

    </main>
  );
}