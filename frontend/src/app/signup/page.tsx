"use client";

import { useState } from "react";
import { signupUser } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const handleSignup = async (
        e: React.FormEvent
        ) => {
        e.preventDefault();

        try {
            setLoading(true);

            await signupUser({
            name,
            email,
            password,
            });

            localStorage.setItem(
            "pendingEmail",
            email
            );

            router.push("/verify-otp");

        } catch (error: any) {

            alert(
            error?.response?.data?.detail ||
            "Signup failed"
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
          Create Account
        </h1>

        <form
        onSubmit={handleSignup}
        className="mt-8 space-y-4"
        >

          <input
            value={name}
            onChange={(e) =>
                setName(e.target.value)
            }
            placeholder="Name"
            className="
                w-full
                p-3
                rounded-xl
                border
                bg-transparent
            "
            />

          <input
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
            {loading ? "Creating..." : "Sign Up"}
            </button>

        </form>
      </div>
    </main>
  );
}