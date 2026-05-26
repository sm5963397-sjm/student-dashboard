"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowUpRight, CalendarClock, Gauge, Sparkles, Trophy } from "lucide-react";

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

export const tileVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

type BentoGridProps = {
  children: ReactNode;
};

type SectionHeaderProps = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  className?: string;
};

type StatTileProps = {
  iconName: "sparkles" | "gauge" | "trophy" | "calendar";
  label: string;
  value: string;
  detail: string;
  tone: "cyan" | "emerald" | "violet" | "amber";
  className?: string;
};

const toneClass = {
  cyan: "text-cyan-200 bg-cyan-300/10 border-cyan-300/25",
  emerald: "text-emerald-200 bg-emerald-300/10 border-emerald-300/25",
  violet: "text-violet-200 bg-violet-300/10 border-violet-300/25",
  amber: "text-amber-200 bg-amber-300/10 border-amber-300/25",
};

const iconMap = {
  sparkles: Sparkles,
  gauge: Gauge,
  trophy: Trophy,
  calendar: CalendarClock,
};

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <motion.section
      aria-label="Student dashboard tiles"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {children}
    </motion.section>
  );
}

export function SectionHeader({
  id,
  kicker,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.article
      id={id}
      variants={tileVariants}
      transition={spring}
      className={`glass-panel glow-card relative scroll-mt-24 overflow-hidden rounded-lg p-5 md:p-6 ${className}`}
    >
      <span className="glow-card__halo" />
      <section className="relative grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <header className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-cyan-200">
            {kicker}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300 md:text-base">{description}</p>
        </header>
        <a
          href="#ai-coach"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-white/10 bg-white/7 px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:w-auto"
        >
          Study plan
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      </section>
    </motion.article>
  );
}

export function StatTile({ iconName, label, value, detail, tone, className = "" }: StatTileProps) {
  const Icon = iconMap[iconName];

  return (
    <motion.article
      variants={tileVariants}
      transition={spring}
      whileHover={{ scale: 1.015 }}
      className={`glass-panel glow-card relative overflow-hidden rounded-lg p-5 ${className}`}
    >
      <span className="glow-card__halo" />
      <header className="relative flex items-center justify-between gap-4">
        <p className="text-sm text-slate-400">{label}</p>
        <span className={`grid size-10 place-items-center rounded-md border ${toneClass[tone]}`}>
          <Icon aria-hidden="true" className="size-4" />
        </span>
      </header>
      <p className="relative mt-5 text-3xl font-semibold text-white">{value}</p>
      <p className="relative mt-2 text-sm leading-6 text-slate-400">{detail}</p>
    </motion.article>
  );
}
