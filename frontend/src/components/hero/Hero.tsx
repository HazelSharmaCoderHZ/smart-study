"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-5xl"
      >
        <h1
          className="
            text-6xl
            md:text-8xl
            font-extrabold
            tracking-tight
          "
        >
          Smart Study
          <br />
          Companion
        </h1>

        <TypeAnimation
        sequence={[
            "Upload PDFs...",
            1500,
            "Ask Questions...",
            1500,
            "Generate Notes...",
            1500,
            "Study Smarter...",
            1500,
        ]}
        wrapper="span"
        repeat={Infinity}
        className="
            mt-8
            block
            text-xl
            md:text-3xl
            opacity-80
        "
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.8,
            duration: 0.8,
          }}
          className="
            mt-10
            flex
            justify-center
            gap-4
          "
        >
          <button className="
            px-8
            py-4
            rounded-2xl
            border
            transition-all
            duration-300
            hover:scale-105
            ">
            Get Started
          </button>

          <button className="
            px-8
            py-4
            rounded-2xl
            border
            transition-all
            duration-300
            hover:scale-105
            ">
            Learn More
          </button>
        </motion.div>

      </motion.div>

    </section>
  );
}