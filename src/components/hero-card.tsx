"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Flame, Sparkles, TimerReset } from "lucide-react";
import { tileVariants } from "@/components/bento-grid";

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

type HeroCardProps = {
  streakDays: number;
  dataMode: "supabase" | "demo" | "empty" | "error";
  className?: string;
};

export function HeroCard({ streakDays, dataMode, className = "" }: HeroCardProps) {
  const description =
    dataMode === "supabase"
      ? "Your dashboard is synced from Supabase Server Components, with live course progress and a focused path for today."
      : "Supabase Server Components are wired in; polished demo courses stay visible until real environment values are configured.";

  return (
    <motion.article
      variants={tileVariants}
      transition={spring}
      whileHover={{ scale: 1.01 }}
      className={`glass-panel glow-card relative min-h-[360px] overflow-hidden rounded-lg p-6 md:p-8 ${className}`}
    >
      <span className="glow-card__halo" />
      <span className="grid-fade absolute inset-0 opacity-70" />
      <section className="relative flex h-full flex-col justify-between gap-10">
        <header className="max-w-3xl">
          <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-cyan-200">
            <Sparkles aria-hidden="true" className="size-4" />
            Adaptive learning hub
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-normal text-white md:text-6xl">
            Welcome back, Saurabh
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">{description}</p>
        </header>

        <footer className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <article className="rounded-lg border border-amber-200/20 bg-amber-200/10 p-4">
            <p className="flex items-center gap-2 text-sm font-medium text-amber-100">
              <Flame aria-hidden="true" className="size-4" />
              Daily learning streak
            </p>
            <p className="mt-2 text-4xl font-semibold text-white">{streakDays} days</p>
          </article>

          <a
            href="#courses"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-90"
          >
            Continue
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </footer>

        <span className="absolute right-6 top-6 hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 md:inline-flex md:items-center md:gap-2">
          <TimerReset aria-hidden="true" className="size-3.5 text-cyan-200" />
          42 min focus block
        </span>
      </section>
    </motion.article>
  );
}
