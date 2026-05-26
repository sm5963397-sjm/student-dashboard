"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BrainCircuit, Sparkles, Target } from "lucide-react";
import { tileVariants } from "@/components/bento-grid";

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

type CoachCardProps = {
  id?: string;
  className?: string;
};

export function CoachCard({ id, className = "" }: CoachCardProps) {
  return (
    <motion.article
      id={id}
      variants={tileVariants}
      transition={spring}
      whileHover={{ scale: 1.01 }}
      className={`glass-panel glow-card relative scroll-mt-24 overflow-hidden rounded-lg p-5 md:p-6 ${className}`}
    >
      <span className="glow-card__halo" />
      <header className="relative flex items-start justify-between gap-4">
        <section>
          <p className="flex items-center gap-2 text-sm font-medium text-violet-200">
            <Sparkles aria-hidden="true" className="size-4" />
            AI Coach
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Next best study move</h2>
        </section>
        <span className="grid size-11 place-items-center rounded-md border border-violet-300/25 bg-violet-300/10 text-violet-100">
          <BrainCircuit aria-hidden="true" className="size-5" />
        </span>
      </header>

      <section className="relative mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <p className="flex items-center gap-2 text-sm font-medium text-white">
          <Target aria-hidden="true" className="size-4 text-cyan-200" />
          42 minute focus block
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Review component composition, complete one progress-state exercise, then ship a short
          reflection on what improved in the dashboard.
        </p>
      </section>

      <ol className="relative mt-5 grid gap-3 text-sm text-slate-300">
        <li className="rounded-md border border-white/10 bg-black/15 px-3 py-2">
          1. Warm up with the Frontend Systems Sprint checklist.
        </li>
        <li className="rounded-md border border-white/10 bg-black/15 px-3 py-2">
          2. Finish the course card interaction review.
        </li>
        <li className="rounded-md border border-white/10 bg-black/15 px-3 py-2">
          3. Compare weekly progress against your target score.
        </li>
      </ol>

      <a
        href="#courses"
        className="relative mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-violet-300 px-4 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-90 sm:w-auto"
      >
        Start focus block
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </a>
    </motion.article>
  );
}
