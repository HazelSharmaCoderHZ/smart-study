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


import Sidebar from "@/components/layout/Sidebar";
import QuickActions from "@/components/dashboard/QuickActions";

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
            What would you like to do today?
          </p>

          <QuickActions />

        </section>

      </div>
    </main>
  );
}