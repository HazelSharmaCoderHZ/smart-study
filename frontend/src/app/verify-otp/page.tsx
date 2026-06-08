"use client";

import { useState } from "react";
import { verifyOtp } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function VerifyOtpPage() {
    const [otp, setOtp] = useState("");

    const router = useRouter();
    const handleVerify = async () => {

  try {

    const email =
      localStorage.getItem(
        "pendingEmail"
      );

    if (!email) {
      alert("Email not found");
      return;
    }

    await verifyOtp(
      email,
      otp
    );

    alert(
      "Verification successful"
    );

    router.push("/login");

  } catch (error: any) {

    alert(
      error?.response?.data?.detail ||
      "Verification failed"
    );

  }
};
  return (
    <main className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-white
      text-black
      dark:bg-black
      dark:text-white
    ">
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          backdrop-blur-xl
          p-8
        "
      >
        <h1 className="text-3xl font-bold">
          Verify OTP
        </h1>

        <input
  value={otp}
  onChange={(e) =>
    setOtp(e.target.value)
  }
  placeholder="Enter OTP"
  className="
    mt-6
    w-full
    p-3
    rounded-xl
    border
  "
/>
        <button
  onClick={handleVerify}
  className="
    mt-4
    w-full
    p-3
    rounded-xl
    border
  "
>
  Verify
</button>

      </div>
    </main>
  );
}