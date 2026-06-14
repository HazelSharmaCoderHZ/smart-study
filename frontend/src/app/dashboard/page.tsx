"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  NotebookPen,
  Brain,
  ClipboardCheck,
  History,
  User,
} from "lucide-react";

import ToolCard from "@/components/dashboard/ToolCard";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardPage() {
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

          

          <div className="mt-10">
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
                description="View PDFs notes"
                href="/my-notes"
              />
              <ToolCard
                title="My Quizzes"
                description="View saved quizzes"
                icon={<Brain size={28} />}
                href="/my-quizzes"
              />
              <ToolCard
                title="Mock Test"
                description="Take AI-generated tests"
                icon={<ClipboardCheck size={28} />}
                href="/mock-test"
              />

            </div>
          </div>

        </section>

      </div>
    </main>
  );
}