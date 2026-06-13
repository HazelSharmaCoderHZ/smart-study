"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { getChatHistory } from "@/services/chat";

interface ChatItem {
  question: string;
  answer: string;
  created_at: string;
}

export default function HistoryPage() {
  const [history, setHistory] =
    useState<ChatItem[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) return;

        const data =
          await getChatHistory(token);

        setHistory(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <main className="min-h-screen p-8 dark:bg-black dark:text-white">

      <h1 className="text-4xl font-bold mb-2">
        Chat History
      </h1>

      <p className="opacity-70 mb-8">
        Review your previous AI conversations
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <div className="border rounded-xl p-6">
          No chats found.
        </div>
      ) : (
        <div className="space-y-5">

          {history.map((chat, index) => (
            <div
              key={index}
              className="
                border
                rounded-xl
                p-5
                hover:shadow-lg
                transition
              "
            >
              <div className="flex items-center gap-3 mb-3">

                <MessageSquare size={22} />

                <h2 className="font-semibold">
                  {chat.question}
                </h2>

              </div>

              <p className="opacity-80 line-clamp-3">
                {chat.answer}
              </p>

              <p className="text-sm opacity-50 mt-4">
                {new Date(
                  chat.created_at
                ).toLocaleString()}
              </p>

            </div>
          ))}

        </div>
      )}
    </main>
  );
}