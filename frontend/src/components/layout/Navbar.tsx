"use client";

import Link from "next/link";
import ThemeToggle from "../theme/theme-toggle";

export default function Navbar() {
  return (
    <nav
    className="
        fixed
        top-0
        left-0
        right-0
        z-50
        backdrop-blur-xl
        bg-white/5
        border-b
        border-white/10
    "
    >
      <div className="
        max-w-7xl
        mx-auto
        px-8
        py-5
        flex
        justify-between
        items-center
        ">
        <h1 className="font-bold text-2xl">
        Smart Study Companion
        </h1>

        <div className="hidden md:flex items-center gap-12 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/">Features</Link>
          <Link href="/">About</Link>
        </div>

        <div className="flex items-center gap-4">

    

    <ThemeToggle />

    <Link
        href="/login"
        className="
        px-4
        py-2
        rounded-xl
        border
        "
    >
        Login
    </Link>

    </div>

        
      </div>
    </nav>
  );
}