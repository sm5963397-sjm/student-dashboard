"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Database } from "lucide-react";
import { tileVariants } from "@/components/bento-grid";

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

type ErrorCardProps = {
  kind: "error" | "empty";
  className?: string;
};

export function ErrorCard({ kind, className = "" }: ErrorCardProps) {
  const isError = kind === "error";
  const Icon = isError ? AlertTriangle : Database;

  return (
    <motion.article
      variants={tileVariants}
      transition={spring}
      whileHover={{ scale: 1.01 }}
      className={`glass-panel glow-card relative overflow-hidden rounded-lg p-6 ${className}`}
    >
      <span className="glow-card__halo" />
      <span
        className={`absolute inset-x-0 top-0 h-1 ${
          isError
            ? "bg-gradient-to-r from-amber-200 via-cyan-300 to-violet-300"
            : "bg-gradient-to-r from-cyan-300 via-emerald-200 to-violet-300"
        }`}
      />

      <section className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
        <span
          className={`grid size-12 shrink-0 place-items-center rounded-lg border ${
            isError
              ? "border-amber-300/30 bg-amber-300/10 text-amber-100"
              : "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
          }`}
        >
          <Icon aria-hidden="true" className="size-5" />
        </span>

        <section>
          <p
            className={`text-sm font-medium uppercase tracking-[0.22em] ${
              isError ? "text-amber-200" : "text-cyan-200"
            }`}
          >
            {isError ? "Course refresh" : "Course library"}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {isError ? "Latest course updates are temporarily paused." : "No active courses yet."}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            {isError
              ? "We are showing your saved learning plan while the newest progress data refreshes."
              : "Your workspace is ready. New course enrollments will appear here as soon as they are available."}
          </p>
        </section>
      </section>
    </motion.article>
  );
}
