"use client";

import { useState } from "react";
import { loginUser } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async (
    e: React.FormEvent
    ) => {
    e.preventDefault();

    try {
        setLoading(true);

        const response = await loginUser(
        email,
        password
        );

        localStorage.setItem(
        "token",
        response.access_token
        );

        router.push("/dashboard");

    } catch (error: any) {

        alert(
        error?.response?.data?.detail ||
        "Login failed"
        );

    } finally {
        setLoading(false);
    }
    };
  return (
    <main className="
      min-h-screen
      flex
      items-center
      justify-center
      px-6
      bg-white
      text-black
      dark:bg-black
      dark:text-white
    ">
      <div
        className="
          w-full
          max-w-md
          backdrop-blur-xl
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-8
        "
      >
        <h1 className="text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="opacity-70 mt-2">
          Login to continue
        </p>

        <form
        onSubmit={handleLogin}
        className="mt-8 space-y-4"
        >

          <input
            type="email"
            value={email}
            onChange={(e) =>
                setEmail(e.target.value)
            }
            placeholder="Email"
            className="
                w-full
                p-3
                rounded-xl
                border
                bg-transparent
            "
            />

          <input
        type="password"
        value={password}
        onChange={(e) =>
            setPassword(e.target.value)
        }
        placeholder="Password"
        className="
            w-full
            p-3
            rounded-xl
            border
            bg-transparent
        "
        />
          <button
        type="submit"
        disabled={loading}
        className="
            w-full
            p-3
            rounded-xl
            border
        "
        >
        {loading ? "Logging in..." : "Login"}
        </button>

        </form>
      </div>
    </main>
  );
}