"use client";

import { useState } from "react";
import { generateQuiz } from "@/services/study";

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    setLoading(true);

    try {
      const data = await generateQuiz(
        topic,
        token
      );

      setQuiz(data.quiz);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-6">
        Quiz Generator
      </h1>

      <input
        value={topic}
        onChange={(e) =>
          setTopic(e.target.value)
        }
        placeholder="Enter topic..."
        className="border p-3 rounded-lg w-full"
      />

      <button
        onClick={handleGenerate}
        className="mt-4 border px-5 py-3 rounded-lg"
      >
        {loading
          ? "Generating..."
          : "Generate Quiz"}
      </button>

      {quiz && (
        <div className="mt-8 whitespace-pre-wrap border rounded-xl p-6">
          {quiz}
        </div>
      )}
    </main>
  );
}