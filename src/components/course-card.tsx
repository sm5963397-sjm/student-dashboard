"use client";

import { motion } from "framer-motion";
import {
  BookOpenCheck,
  BrainCircuit,
  Code2,
  Database,
  LineChart,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { tileVariants } from "@/components/bento-grid";
import type { Course } from "@/types/course";

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

const iconMap: Record<string, LucideIcon> = {
  brain: BrainCircuit,
  code: Code2,
  database: Database,
  analytics: LineChart,
  rocket: Rocket,
  sparkles: Sparkles,
  target: Target,
  book: BookOpenCheck,
};

const accentClasses = [
  "from-cyan-300 to-blue-400",
  "from-emerald-300 to-teal-400",
  "from-violet-300 to-fuchsia-400",
  "from-amber-200 to-orange-300",
];

type CourseCardProps = {
  course: Course;
  index: number;
  className?: string;
};

function formatCourseDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "New";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function CourseCard({ course, index, className = "" }: CourseCardProps) {
  const Icon = iconMap[course.icon_name] ?? BookOpenCheck;
  const progress = Math.min(100, Math.max(0, Math.round(course.progress)));
  const accent = accentClasses[index % accentClasses.length];
  const createdAt = formatCourseDate(course.created_at);

  return (
    <motion.article
      variants={tileVariants}
      transition={spring}
      whileHover={{ scale: 1.015 }}
      className={`glass-panel glow-card relative overflow-hidden rounded-lg p-5 ${className}`}
    >
      <span className="glow-card__halo" />
      <header className="relative flex items-start justify-between gap-4">
        <span className={`grid size-11 place-items-center rounded-md bg-gradient-to-br ${accent}`}>
          <Icon aria-hidden="true" className="size-5 text-slate-950" />
        </span>
        <time className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-slate-300">
          {createdAt}
        </time>
      </header>

      <h2 className="relative mt-5 text-lg font-semibold text-white">{course.title}</h2>
      <p className="relative mt-2 text-sm leading-6 text-slate-400">
        Live progress synced from your Supabase courses table.
      </p>

      <section aria-label={`${course.title} progress`} className="relative mt-5">
        <span className="block h-2 overflow-hidden rounded-md bg-white/10">
          <motion.span
            className={`block h-full origin-left rounded-md bg-gradient-to-r ${accent}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={spring}
          />
        </span>
        <footer className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-300">
          <span>{progress}% complete</span>
          <span className="font-mono text-xs uppercase text-slate-500">{course.icon_name}</span>
        </footer>
      </section>
    </motion.article>
  );
}
