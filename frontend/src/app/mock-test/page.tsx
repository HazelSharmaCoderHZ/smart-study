"use client";

import { useState, useEffect } from "react";
import { generateMockTest, saveTestResult } from "@/services/study";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export default function MockTestPage() {
  const [topic, setTopic] = useState("");
  // Added safe fallback array initialization
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  const startTest = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) return;

      const data = await generateMockTest(topic, token);

      // Added array runtime validation to prevent empty states
      setQuestions(data?.questions || []);
      setCurrent(0);
      setScore(0);
      setSelected("");
      setFinished(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!selected || !questions?.[current]) return;

    const isCorrect = selected === questions[current].answer;
    const newScore = isCorrect ? score + 1 : score;
    const totalQuestions = questions?.length ?? 0;

    if (current === totalQuestions - 1) {
      setScore(newScore);
      setFinished(true);
      return;
    }

    setScore(newScore);
    setCurrent((prev) => prev + 1);
    setSelected("");
  };

  useEffect(() => {
    const saveResult = async () => {
      const totalQuestions = questions?.length ?? 0;
      if (!finished || totalQuestions === 0) {
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) return;

      const percentage = Math.round((score / totalQuestions) * 100);

      try {
        await saveTestResult(
          {
            topic,
            score,
            total: totalQuestions,
            percentage,
          },
          token
        );
        console.log("Test result saved successfully");
      } catch (error) {
        console.error("Failed to save result:", error);
      }
    };

    saveResult();
    // Fixed Line 87 here with optional chaining and a fallback value
  }, [finished, score, topic, questions?.length ?? 0]);

  const totalQuestions = questions?.length ?? 0;

  if (finished) {
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    return (
      <main className="p-8">
        <h1 className="text-4xl font-bold mb-6">Test Completed 🎉</h1>

        <div className="border rounded-xl p-6">
          <h2 className="text-2xl font-semibold">
            Score: {score} / {totalQuestions}
          </h2>
          <p className="mt-3">Accuracy: {percentage}%</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-8">
      {totalQuestions === 0 ? (
        <>
          <h1 className="text-4xl font-bold mb-6">Mock Test</h1>

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic..."
            className="border rounded-lg p-3 w-full"
          />

          <button
            onClick={startTest}
            className="mt-4 px-6 py-3 border rounded-lg"
          >
            {loading ? "Generating..." : "Start Test"}
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl mb-6">
            Question {current + 1} / {totalQuestions}
          </h2>

          <div className="border rounded-xl p-6">
            {questions[current] && (
              <>
                <h3 className="text-lg font-medium mb-6">
                  {questions[current].question}
                </h3>

                <div className="space-y-3">
                  {questions[current].options.map((option: string, idx: number) => (
                    <label key={idx} className="flex gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="option"
                        value={option}
                        checked={selected === option}
                        onChange={() => setSelected(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </>
            )}

            <button
              onClick={handleNext}
              className="mt-6 border px-5 py-2 rounded-lg"
            >
              {current === totalQuestions - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
