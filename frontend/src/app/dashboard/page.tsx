"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  MessageSquare,
  NotebookPen,
  Brain,
  ClipboardCheck,
  History,
} from "lucide-react";

import ToolCard from "@/components/dashboard/ToolCard";
import Sidebar from "@/components/layout/Sidebar";
import { getAnalytics } from "@/services/study";
import {
  getInsights
} from "@/services/study";

interface Analytics {
  pdfs_uploaded: number;
  notes_generated: number;
  quizzes_generated: number;
  tests_taken: number;
  average_score: number;
}

export default function DashboardPage() {
  const [analytics, setAnalytics] =
    useState<Analytics>({
      pdfs_uploaded: 0,
      notes_generated: 0,
      quizzes_generated: 0,
      tests_taken: 0,
      average_score: 0,
    });
    const [insights, setInsights] = useState({
      best_topic: null as any,
      weak_topic: null as any,
    });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) return;

        const data =
          await getAnalytics(token);
          const insightsData =
          await getInsights(token);

        setInsights(insightsData);

        setAnalytics(data);
      } catch (error) {
        console.error(error);
      }
    };
    

    fetchAnalytics();
  }, []);

  return (
    <main className="min-h-screen dark:bg-black dark:text-white">
      <div className="flex">
        <Sidebar />

        <section className="flex-1 p-10">
          <h1 className="text-5xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="mt-3 opacity-70">
            Ready to learn something new today?
          </p>

          {/* Analytics Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-6">
              Analytics
            </h2>

            <div className="grid md:grid-cols-5 gap-4">
              <div className="border rounded-xl p-5">
                <p className="text-sm opacity-70">
                  PDFs Uploaded
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {analytics.pdfs_uploaded}
                </h3>
              </div>

              <div className="border rounded-xl p-5">
                <p className="text-sm opacity-70">
                  Notes Generated
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {analytics.notes_generated}
                </h3>
              </div>

              <div className="border rounded-xl p-5">
                <p className="text-sm opacity-70">
                  Quizzes Generated
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {analytics.quizzes_generated}
                </h3>
              </div>

              <div className="border rounded-xl p-5">
                <p className="text-sm opacity-70">
                  Tests Taken
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {analytics.tests_taken}
                </h3>
              </div>

              <div className="border rounded-xl p-5">
                <p className="text-sm opacity-70">
                  Avg Score
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {analytics.average_score}%
                </h3>
              </div>
            </div>
          </div>

            <div className="mt-10">
  <h2 className="text-2xl font-semibold mb-6">
    Performance Insights
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div className="border rounded-xl p-6">
      <h3 className="text-lg font-semibold">
        🏆 Best Topic
      </h3>

      {insights.best_topic ? (
        <>
          <p className="mt-3 text-xl">
            {
              insights.best_topic
                .topic
            }
          </p>

          <p className="text-3xl font-bold mt-2">
            {
              insights.best_topic
                .score
            }%
          </p>
        </>
      ) : (
        <p className="mt-3 opacity-70">
          No data yet
        </p>
      )}
    </div>

    <div className="border rounded-xl p-6">
      <h3 className="text-lg font-semibold">
        ⚠ Needs Improvement
      </h3>

      {insights.weak_topic ? (
        <>
          <p className="mt-3 text-xl">
            {
              insights.weak_topic
                .topic
            }
          </p>

          <p className="text-3xl font-bold mt-2">
            {
              insights.weak_topic
                .score
            }%
          </p>
        </>
      ) : (
        <p className="mt-3 opacity-70">
          No data yet
        </p>
      )}
    </div>

  </div>
</div>

          {/* Study Tools */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">
              Study Tools
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <ToolCard
                title="My PDFs"
                icon={<FileText size={28} />}
                description="View uploaded PDFs"
                href="/my-pdfs"
              />

              <ToolCard
                title="AI Chat"
                icon={<MessageSquare size={28} />}
                description="Chat with your documents"
                href="/chat"
              />

              <ToolCard
                title="Notes"
                icon={<NotebookPen size={28} />}
                description="Generate smart notes"
                href="/notes"
              />

              <ToolCard
                title="Quiz"
                icon={<Brain size={28} />}
                description="Generate quizzes"
                href="/quiz"
              />

              <ToolCard
                title="History"
                icon={<History size={28} />}
                description="View past chats"
                href="/history"
              />

              <ToolCard
                title="Previous Notes"
                icon={<FileText size={28} />}
                description="View saved notes"
                href="/my-notes"
              />

              <ToolCard
                title="My Quizzes"
                icon={<Brain size={28} />}
                description="View saved quizzes"
                href="/my-quizzes"
              />

              <ToolCard
                title="Mock Test"
                icon={<ClipboardCheck size={28} />}
                description="Take AI-generated tests"
                href="/mock-test"
              />

              <ToolCard
                title="My Results"
                icon={<ClipboardCheck size={28} />}
                description="View test performance"
                href="/results"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}