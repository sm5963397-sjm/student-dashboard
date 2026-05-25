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
  message?: string;
  className?: string;
};

export function ErrorCard({ kind, message, className = "" }: ErrorCardProps) {
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
            ? "bg-gradient-to-r from-rose-300 via-amber-200 to-cyan-300"
            : "bg-gradient-to-r from-cyan-300 via-emerald-200 to-violet-300"
        }`}
      />

      <section className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
        <span
          className={`grid size-12 shrink-0 place-items-center rounded-lg border ${
            isError
              ? "border-rose-300/30 bg-rose-300/10 text-rose-100"
              : "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
          }`}
        >
          <Icon aria-hidden="true" className="size-5" />
        </span>

        <section>
          <p
            className={`text-sm font-medium uppercase tracking-[0.22em] ${
              isError ? "text-rose-200" : "text-cyan-200"
            }`}
          >
            {isError ? "Supabase offline" : "Empty table"}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {isError ? "Courses could not sync." : "No courses found yet."}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            {isError
              ? "Add your public Supabase URL and anon key to .env.local, then confirm the courses table exists and your read policy allows this query."
              : "Insert your first course rows in Supabase and this server-rendered Bento Grid will populate automatically on the next request."}
          </p>
          {isError && message ? (
            <p className="mt-4 rounded-md border border-white/10 bg-black/20 px-3 py-2 font-mono text-xs text-slate-400">
              {message}
            </p>
          ) : null}
        </section>
      </section>
    </motion.article>
  );
}
