"use client";

import { useEffect, useState } from "react";
import { Brain, ChevronDown, ChevronUp } from "lucide-react";
import { getQuizzes } from "@/services/study";

interface Quiz {
  topic: string;
  quiz: string;
  created_at: string;
}

export default function MyQuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const data = await getQuizzes(token);
        setQuizzes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <main className="min-h-screen p-8 dark:bg-black dark:text-white">
      <h1 className="text-4xl font-bold mb-2">
        My Quizzes
      </h1>

      <p className="opacity-70 mb-8">
        Review previously generated quizzes
      </p>

      {loading ? (
        <p>Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <div className="border rounded-xl p-6">
          No quizzes found.
        </div>
      ) : (
        <div className="space-y-5">
          {quizzes.map((quiz, index) => (
            <div
              key={index}
              className="border rounded-xl p-5"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <Brain size={22} />
                    <h2 className="font-semibold text-xl">
                      {quiz.topic}
                    </h2>
                  </div>

                  <p className="opacity-60 mt-2 text-sm">
                    {new Date(
                      quiz.created_at
                    ).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setExpanded(
                      expanded === index
                        ? null
                        : index
                    )
                  }
                  className="border px-3 py-2 rounded-lg"
                >
                  {expanded === index ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
              </div>

              {expanded === index && (
                <div className="mt-6 border-t pt-4 whitespace-pre-wrap">
                  {quiz.quiz}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}