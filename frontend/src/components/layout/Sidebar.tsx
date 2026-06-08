"use client";

import Link from "next/link";
import {
  Upload,
  MessageSquare,
  History,
  User,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside
      className="
        w-72
        h-screen
        border-r
        border-white/10
        backdrop-blur-xl
        p-6
      "
    >
      <h1 className="text-2xl font-bold mb-10">
        Smart Study
      </h1>

      <nav className="space-y-4">

        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <Upload size={20} />
          Upload PDF
        </Link>

        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <MessageSquare size={20} />
          Chat
        </Link>

        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <History size={20} />
          History
        </Link>

        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <User size={20} />
          Profile
        </Link>

      </nav>
    </aside>
  );
}