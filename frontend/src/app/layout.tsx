import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import AuroraBackground from "@/components/layout/AuroraBackground";

import "./globals.css";

export const metadata: Metadata = {
  title: "StudyOS — Your AI Study Companion",
  description:
    "Upload, chat, summarize, quiz, and track your learning — all in one intelligent workspace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuroraBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}