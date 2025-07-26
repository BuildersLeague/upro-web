"use client";

import { useEffect, useState } from "react";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-[#1a4f3a] via-[#2d6a4f] to-[#40916c] min-h-screen flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div id="main-content"
          className="relative z-10 text-center px-4 py-8 max-w-3xl">
        <h1
          className={`text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-[#95d5b2] via-[#74c69d] to-[#52b788] text-transparent bg-clip-text drop-shadow-lg transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Train Like a Pro. <br />
          Play Like a Gamer.
        </h1>

        <p
          className={`mt-6 text-lg md:text-xl text-white/85 transition-all duration-1000 ease-out delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          U-Pro Soccer turns your living room into a smart training ground —
          powered by AI, fueled by fun, and designed to keep kids moving and
          improving.
        </p>

        <div
          className={`mt-10 flex flex-col sm:flex-row justify-center items-center gap-6 transition-all duration-1000 ease-out delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <a
            href="#"
            className="px-6 py-3 text-lg font-bold rounded-full bg-gradient-to-r from-[#4BA744] to-[#0d9447] shadow-lg hover:scale-105 transition-transform"
          >
            Start Free
          </a>
          <a
            href="#"
            className="px-6 py-3 text-lg font-bold rounded-full border-2 border-white/30 text-white hover:border-[#74c69d] hover:bg-white/10 hover:scale-105 transition-transform"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
