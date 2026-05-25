"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Database, Sparkles } from "lucide-react";
import { tileVariants } from "@/components/bento-grid";

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

type ErrorCardProps = {
  kind: "error" | "empty" | "demo";
  message?: string;
  className?: string;
};

export function ErrorCard({ kind, message, className = "" }: ErrorCardProps) {
  const isError = kind === "error";
  const isDemo = kind === "demo";
  const Icon = isError ? AlertTriangle : isDemo ? Sparkles : Database;

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
            : isDemo
              ? "bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300"
              : "bg-gradient-to-r from-cyan-300 via-emerald-200 to-violet-300"
        }`}
      />

      <section className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
        <span
          className={`grid size-12 shrink-0 place-items-center rounded-lg border ${
            isError
              ? "border-rose-300/30 bg-rose-300/10 text-rose-100"
              : isDemo
                ? "border-violet-300/30 bg-violet-300/10 text-violet-100"
              : "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
          }`}
        >
          <Icon aria-hidden="true" className="size-5" />
        </span>

        <section>
          <p
            className={`text-sm font-medium uppercase tracking-[0.22em] ${
              isError ? "text-rose-200" : isDemo ? "text-violet-200" : "text-cyan-200"
            }`}
          >
            {isError ? "Supabase needs attention" : isDemo ? "Demo data active" : "Empty table"}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {isError
              ? "Courses could not sync."
              : isDemo
                ? "Showing mock course tiles."
                : "No courses found yet."}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            {isError
              ? "Confirm the Supabase URL, anon key, courses table, and read policy. The app will use the real Server Component query as soon as the connection is valid."
              : isDemo
                ? "The dashboard is still using the real Server Component fetch first. Add real Supabase variables in Vercel to swap these demo rows for live courses."
                : "Insert your first course rows in Supabase and this server-rendered Bento Grid will populate automatically on the next request."}
          </p>
          {message ? (
            <p className="mt-4 rounded-md border border-white/10 bg-black/20 px-3 py-2 font-mono text-xs text-slate-400">
              {message}
            </p>
          ) : null}
        </section>
      </section>
    </motion.article>
  );
}
