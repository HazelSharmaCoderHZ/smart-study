"use client";

import { useEffect, useState } from "react";
import {
  FileText, MessageSquare, NotebookPen, Brain,
  ClipboardCheck, History, FileStack, ListChecks,
  Trophy, AlertTriangle, BookOpen, CheckCircle2, Upload,
} from "lucide-react";

import ToolCard from "@/components/dashboard/ToolCard";
import StatCard from "@/components/dashboard/StatCard";
import ProgressRing from "@/components/dashboard/ProgressRing";
import MiniBarChart from "@/components/dashboard/MiniBarChart";
import Sidebar from "@/components/layout/Sidebar";
import { getAnalytics, getInsights } from "@/services/study";

interface Analytics {
  pdfs_uploaded: number;
  notes_generated: number;
  quizzes_generated: number;
  tests_taken: number;
  average_score: number;
}

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<Analytics>({
    pdfs_uploaded: 0, notes_generated: 0,
    quizzes_generated: 0, tests_taken: 0, average_score: 0,
  });
  const [insights, setInsights] = useState({ best_topic: null as any, weak_topic: null as any });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const [data, insightsData] = await Promise.all([getAnalytics(token), getInsights(token)]);
        setAnalytics(data);
        setInsights(insightsData);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const activityData = [
    { label: "PDFs",    value: analytics.pdfs_uploaded },
    { label: "Notes",   value: analytics.notes_generated },
    { label: "Quizzes", value: analytics.quizzes_generated },
    { label: "Tests",   value: analytics.tests_taken },
  ];

  return (
    <main className="shell">
      <Sidebar />

      <section className="content">
        {/* Header */}
        <div className="dash-header rise-in">
          <h1 className="font-display dash-title">Welcome back 👋</h1>
          <p className="dash-subtitle">Here&apos;s how your learning is tracking today.</p>
        </div>

        {/* Analytics */}
        <div className="dash-section">
          <h2 className="font-display dash-section-title">Analytics</h2>
          {loading ? (
            <div className="dash-grid-5">
              {[0,1,2,3,4].map(i => (
                <div key={i} className="glass dash-stat-skeleton">
                  <div className="skeleton" style={{ width: 38, height: 38, borderRadius: "var(--r-sm)" }} />
                  <div className="skeleton" style={{ width: "60%", height: 28, marginTop: "1rem" }} />
                  <div className="skeleton" style={{ width: "80%", height: 14, marginTop: "0.6rem" }} />
                </div>
              ))}
            </div>
          ) : (
            <div className="dash-grid-5">
              <StatCard label="PDFs Uploaded"     value={analytics.pdfs_uploaded}    icon={<FileText size={20}/>}     accent="var(--accent)"   delay={0} />
              <StatCard label="Notes Generated"   value={analytics.notes_generated}  icon={<NotebookPen size={20}/>}  accent="var(--accent-2)" delay={60} />
              <StatCard label="Quizzes Generated" value={analytics.quizzes_generated}icon={<Brain size={20}/>}        accent="var(--success)"  delay={120} />
              <StatCard label="Tests Taken"       value={analytics.tests_taken}      icon={<ClipboardCheck size={20}/>}accent="var(--warning)" delay={180} />
              <StatCard label="Avg Score"         value={analytics.average_score}    icon={<CheckCircle2 size={20}/>} accent="var(--danger)"   delay={240} suffix="%" />
            </div>
          )}
        </div>

        {/* Performance Insights */}
        <div className="dash-section">
          <h2 className="font-display dash-section-title">Performance Insights</h2>
          {loading ? (
            <div className="dash-grid-3">
              {[0,1,2].map(i => (
                <div key={i} className="glass insight-card">
                  <div className="skeleton" style={{ width: "50%", height: 20 }} />
                  <div className="skeleton" style={{ width: "100%", height: 90, marginTop: "0.75rem" }} />
                </div>
              ))}
            </div>
          ) : (
            <div className="dash-grid-3">
              <div className="glass glass-interactive insight-card rise-in" style={{ animationDelay: "100ms" }}>
                <h3 className="font-display insight-title"><BookOpen size={18} />Activity Breakdown</h3>
                <p className="insight-sub">Your content generated so far</p>
                <MiniBarChart data={activityData} />
              </div>
              <div className="glass glass-interactive insight-card rise-in" style={{ animationDelay: "180ms" }}>
                <h3 className="font-display insight-title"><Trophy size={18} color="var(--success)" />Best Topic</h3>
                {insights.best_topic ? (
                  <div className="insight-ring-row">
                    <ProgressRing value={insights.best_topic.score} color="var(--success)" />
                    <div>
                      <p className="insight-topic-name">{insights.best_topic.topic}</p>
                      <p className="insight-topic-sub">Strongest performance area</p>
                    </div>
                  </div>
                ) : <p className="insight-empty">No data yet — take a quiz to get started.</p>}
              </div>
              <div className="glass glass-interactive insight-card rise-in" style={{ animationDelay: "260ms" }}>
                <h3 className="font-display insight-title"><AlertTriangle size={18} color="var(--warning)" />Needs Improvement</h3>
                {insights.weak_topic ? (
                  <div className="insight-ring-row">
                    <ProgressRing value={insights.weak_topic.score} color="var(--warning)" />
                    <div>
                      <p className="insight-topic-name">{insights.weak_topic.topic}</p>
                      <p className="insight-topic-sub">Focus here for the biggest gains</p>
                    </div>
                  </div>
                ) : <p className="insight-empty">No data yet — take a quiz to get started.</p>}
              </div>
            </div>
          )}
        </div>

        {/* Study Tools */}
        <div className="dash-section">
          <h2 className="font-display dash-section-title">Study Tools</h2>
          <div className="dash-grid-3">
            <ToolCard title="My PDFs"        icon={<FileText size={24}/>}      description="View uploaded PDFs"         href="/my-pdfs" />
            <ToolCard title="Upload PDF"     icon={<Upload size={24}/>}        description="Add new study material"     href="/pdfs" />
            <ToolCard title="AI Chat"        icon={<MessageSquare size={24}/>} description="Chat with your documents"   href="/chat" />
            <ToolCard title="Notes"          icon={<NotebookPen size={24}/>}   description="Generate smart notes"       href="/notes" />
            <ToolCard title="Previous Notes" icon={<FileStack size={24}/>}     description="View saved notes"           href="/my-notes" />
            <ToolCard title="Quiz"           icon={<Brain size={24}/>}         description="Generate quizzes"           href="/quiz" />
            <ToolCard title="My Quizzes"     icon={<ListChecks size={24}/>}    description="View saved quizzes"         href="/my-quizzes" />
            <ToolCard title="Mock Test"      icon={<ClipboardCheck size={24}/>}description="Take AI-generated tests"    href="/mock-test" />
            <ToolCard title="My Results"     icon={<ClipboardCheck size={24}/>}description="View test performance"      href="/results" />
            <ToolCard title="History"        icon={<History size={24}/>}       description="View past chats"            href="/history" />
          </div>
        </div>
      </section>

      <style>{`
        .dash-header { margin-bottom: 2rem; }
        .dash-pulse {
          display: inline-block;
          width: 6px; height: 6px; border-radius: 999px;
          background: var(--success); box-shadow: 0 0 6px var(--success);
          animation: pulse-dot 1.6s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.7); }
        }
        .dash-title { font-size: clamp(1.8rem,4vw,2.75rem); font-weight:700; margin:0.6rem 0 0.35rem; }
        .dash-subtitle { color:var(--text-soft); margin:0; font-size:0.95rem; }
        .dash-section { margin-bottom: 2.5rem; }
        .dash-section-title { font-size:1.3rem; font-weight:600; margin:0 0 1.1rem; }
        .dash-grid-5 { display:grid; grid-template-columns:repeat(5,1fr); gap:1rem; }
        .dash-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:1.25rem; }
        .dash-stat-skeleton { padding:1.25rem; }
        .insight-card { padding:1.5rem; display:flex; flex-direction:column; gap:0.75rem; }
        .insight-title { display:flex; align-items:center; gap:0.5rem; font-size:1.05rem; font-weight:600; margin:0; }
        .insight-sub { font-size:0.8rem; color:var(--text-faint); margin:-0.4rem 0 0; }
        .insight-ring-row { display:flex; align-items:center; gap:1.25rem; margin-top:0.5rem; }
        .insight-topic-name { font-size:1.1rem; font-weight:600; margin:0 0 0.25rem; }
        .insight-topic-sub { font-size:0.8rem; color:var(--text-soft); margin:0; }
        .insight-empty { color:var(--text-faint); font-size:0.9rem; margin:0.5rem 0 0; }
        @media (max-width:1100px) {
          .dash-grid-5 { grid-template-columns:repeat(3,1fr); }
          .dash-grid-3 { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:768px) {
          .dash-grid-5 { grid-template-columns:repeat(2,1fr); }
          .dash-grid-3 { grid-template-columns:1fr; }
        }
      `}</style>
    </main>
  );
}