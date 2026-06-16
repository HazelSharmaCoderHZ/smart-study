"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href?: string; // optional: override router.back() with a fixed destination
  label?: string;
}

export default function BackButton({ href, label = "Back" }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button onClick={handleClick} className="back-btn btn">
      <ArrowLeft size={15} />
      {label}

      <style>{`
        .back-btn {
          padding: 0.45rem 0.9rem;
          font-size: 0.84rem;
          color: var(--text-soft);
          margin-bottom: 1.25rem;
          border-radius: 999px;
        }

        .back-btn:hover {
          color: var(--text);
          border-color: var(--border-strong);
        }
      `}</style>
    </button>
  );
}