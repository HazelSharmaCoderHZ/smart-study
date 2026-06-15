"use client";

import { useEffect, useState } from "react";
import { getTestResults } from "@/services/study";

interface Result {
  topic: string;
  score: number;
  total: number;
  percentage: number;
  created_at: string;
}

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) return;

        const data =
          await getTestResults(token);

        setResults(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-2">
        My Results
      </h1>

      <p className="opacity-70 mb-8">
        View your mock test performance
      </p>

      {loading ? (
        <p>Loading results...</p>
      ) : results.length === 0 ? (
        <div className="border rounded-xl p-6">
          No test results found.
        </div>
      ) : (
        <div className="space-y-4">
          {results.map(
            (result, index) => (
              <div
                key={index}
                className="border rounded-xl p-5"
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {result.topic}
                    </h2>

                    <p className="text-sm opacity-60 mt-1">
                      {new Date(
                        result.created_at
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      {result.score}/
                      {result.total}
                    </p>

                    <p className="text-lg">
                      {result.percentage}%
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </main>
  );
}