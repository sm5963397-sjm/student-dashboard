"use client";

import { motion } from "framer-motion";
import { BarChart3, BookOpenCheck, Clock3, GraduationCap, Trophy } from "lucide-react";
import { tileVariants } from "@/components/bento-grid";

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

const weeklyProgress = [
  { day: "Mon", value: 54 },
  { day: "Tue", value: 68 },
  { day: "Wed", value: 62 },
  { day: "Thu", value: 81 },
  { day: "Fri", value: 74 },
  { day: "Sat", value: 88 },
  { day: "Sun", value: 72 },
];

type AnalyticsCardProps = {
  id?: string;
  activeCourses: number;
  averageProgress: number;
  className?: string;
};

export function AnalyticsCard({
  id,
  activeCourses,
  averageProgress,
  className = "",
}: AnalyticsCardProps) {
  const metrics = [
    {
      label: "Completed lessons",
      value: "28",
      detail: "+6 this week",
      icon: BookOpenCheck,
      tone: "text-cyan-100 bg-cyan-300/10 border-cyan-300/25",
    },
    {
      label: "Active courses",
      value: String(activeCourses),
      detail: "In current sprint",
      icon: GraduationCap,
      tone: "text-emerald-100 bg-emerald-300/10 border-emerald-300/25",
    },
    {
      label: "Total hours",
      value: "42.5",
      detail: "Focused learning",
      icon: Clock3,
      tone: "text-violet-100 bg-violet-300/10 border-violet-300/25",
    },
    {
      label: "Quiz score",
      value: "92%",
      detail: "Latest average",
      icon: Trophy,
      tone: "text-amber-100 bg-amber-300/10 border-amber-300/25",
    },
  ];

  return (
    <motion.article
      id={id}
      variants={tileVariants}
      transition={spring}
      whileHover={{ scale: 1.01 }}
      className={`glass-panel glow-card relative scroll-mt-24 overflow-hidden rounded-lg p-5 md:p-6 ${className}`}
    >
      <span className="glow-card__halo" />

      <header className="relative grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
        <section>
          <p className="flex items-center gap-2 text-sm font-medium text-cyan-200">
            <BarChart3 aria-hidden="true" className="size-4" />
            Analytics
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Weekly learning stats</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            A compact view of consistency, practice volume, and course momentum for the current
            week.
          </p>
        </section>
        <section className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-slate-400">Average progress</p>
          <p className="mt-1 text-3xl font-semibold text-white">{averageProgress}%</p>
        </section>
      </header>

      <section className="relative mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <article className="rounded-lg border border-white/10 bg-black/15 p-4">
          <header className="flex items-center justify-between gap-3">
            <h3 className="font-medium text-white">Progress trend</h3>
            <span className="text-xs uppercase tracking-[0.16em] text-slate-500">7 days</span>
          </header>
          <ol className="mt-5 grid h-48 grid-cols-7 items-end gap-2">
            {weeklyProgress.map((item) => (
              <li key={item.day} className="flex h-full min-w-0 flex-col justify-end gap-2">
                <span className="relative flex h-full items-end overflow-hidden rounded-md bg-white/5">
                  <motion.span
                    className="block w-full origin-bottom rounded-md bg-gradient-to-t from-cyan-300 to-emerald-200"
                    style={{ height: `${item.value}%` }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={spring}
                  />
                </span>
                <span className="truncate text-center text-xs text-slate-500">{item.day}</span>
              </li>
            ))}
          </ol>
        </article>

        <section className="grid gap-3 sm:grid-cols-2">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <article
                key={metric.label}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-4"
              >
                <span className={`grid size-10 place-items-center rounded-md border ${metric.tone}`}>
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <p className="mt-4 text-sm text-slate-400">{metric.label}</p>
                <p className="mt-1 text-2xl font-semibold text-white">{metric.value}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{metric.detail}</p>
              </article>
            );
          })}
        </section>
      </section>
    </motion.article>
  );
}
