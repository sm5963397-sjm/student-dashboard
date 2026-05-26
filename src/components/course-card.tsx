"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  Code2,
  Database,
  Eye,
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

const courseMeta: Record<string, { category: string; difficulty: string }> = {
  brain: { category: "Product AI", difficulty: "Intermediate" },
  code: { category: "Frontend", difficulty: "Advanced" },
  database: { category: "Data Systems", difficulty: "Intermediate" },
  analytics: { category: "Analytics", difficulty: "Foundational" },
  rocket: { category: "Launch", difficulty: "Advanced" },
  sparkles: { category: "Strategy", difficulty: "Foundational" },
  target: { category: "Practice", difficulty: "Intermediate" },
  book: { category: "Core Skills", difficulty: "Foundational" },
};

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

function getCourseAnchor(id: string) {
  return `course-${id.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

export function CourseCard({ course, index, className = "" }: CourseCardProps) {
  const Icon = iconMap[course.icon_name] ?? BookOpenCheck;
  const progress = Math.min(100, Math.max(0, Math.round(course.progress)));
  const accent = accentClasses[index % accentClasses.length];
  const createdAt = formatCourseDate(course.created_at);
  const meta = courseMeta[course.icon_name] ?? courseMeta.book;
  const anchorId = getCourseAnchor(course.id);

  return (
    <motion.article
      id={anchorId}
      variants={tileVariants}
      transition={spring}
      whileHover={{ scale: 1.015 }}
      className={`glass-panel glow-card relative flex min-w-0 scroll-mt-24 flex-col overflow-hidden rounded-lg p-5 ${className}`}
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

      <section className="relative mt-5 flex flex-wrap gap-2">
        <span className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs font-medium text-cyan-100">
          {meta.category}
        </span>
        <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300">
          {meta.difficulty}
        </span>
      </section>

      <h2 className="relative mt-4 text-xl font-semibold leading-tight text-white">{course.title}</h2>
      <p className="relative mt-2 text-sm leading-6 text-slate-400">
        Guided modules, practice checkpoints, and a clear next lesson for your current sprint.
      </p>

      <section aria-label={`${course.title} progress`} className="relative mt-5">
        <span className="block h-2 overflow-hidden rounded-md bg-white/10">
          <motion.span
            role="progressbar"
            aria-label={`${course.title} progress`}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className={`block h-full origin-left rounded-md bg-gradient-to-r ${accent}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={spring}
          />
        </span>
        <footer className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-300">
          <span>{progress}% complete</span>
          <span className="text-xs uppercase tracking-[0.16em] text-slate-500">
            {progress >= 75 ? "On pace" : progress >= 45 ? "In motion" : "Next up"}
          </span>
        </footer>
      </section>

      <footer className="relative mt-6 grid gap-2">
        <a
          href="#ai-coach"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-cyan-300 px-3 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-90"
        >
          Continue Course
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
        <a
          href={`#${anchorId}`}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/7 px-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          View Details
          <Eye aria-hidden="true" className="size-4" />
        </a>
      </footer>
    </motion.article>
  );
}
