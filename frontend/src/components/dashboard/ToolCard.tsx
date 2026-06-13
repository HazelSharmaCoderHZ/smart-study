"use client";

import { useRouter } from "next/navigation";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export default function ToolCard({
  title,
  description,
  icon,
  href,
}: ToolCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="
        cursor-pointer
        rounded-xl
        border
        p-6
        transition-all
        hover:scale-105
        hover:shadow-lg
      "
    >
      <div className="mb-4">
        {icon}
      </div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-2 opacity-70">
        {description}
      </p>
    </div>
  );
}