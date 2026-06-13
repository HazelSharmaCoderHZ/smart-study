"use client";

import { useState } from "react";
import { askQuestion } from "@/services/chat";

export default function ChatPage() {
  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const ask = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      const res = await askQuestion(
        question,
        token!
      );

      setAnswer(res.answer);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        AI Chat
      </h1>

      <textarea
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        className="w-full border p-3 mt-4"
      />

      <button
        onClick={ask}
        className="mt-4 px-4 py-2 bg-blue-500 rounded"
      >
        Ask
      </button>

      {loading && (
        <p className="mt-4">Thinking...</p>
      )}

      {answer && (
        <div className="mt-6 border p-4 rounded">
          {answer}
        </div>
      )}
    </main>
  );
}