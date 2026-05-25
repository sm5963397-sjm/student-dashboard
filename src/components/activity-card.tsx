"use client";

import { motion } from "framer-motion";
import { Bell, CheckCircle2, Info, Zap } from "lucide-react";
import { tileVariants } from "@/components/bento-grid";
import type { ActivityItem } from "@/types/course";

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

const contribution = [
  1, 2, 3, 1, 4, 2, 0,
  3, 4, 2, 1, 3, 2, 4,
  0, 1, 2, 4, 3, 1, 2,
  2, 3, 4, 2, 0, 1, 3,
  4, 2, 3, 1, 2, 4, 3,
];

const toneIcon = {
  success: CheckCircle2,
  info: Info,
  warning: Zap,
} satisfies Record<ActivityItem["tone"], typeof Bell>;

const cellTone = [
  "bg-white/[0.04]",
  "bg-cyan-300/20",
  "bg-cyan-300/35",
  "bg-emerald-300/45",
  "bg-emerald-200/70",
];

type ActivityCardProps = {
  items: ActivityItem[];
  className?: string;
};

export function ActivityCard({ items, className = "" }: ActivityCardProps) {
  return (
    <motion.article
      variants={tileVariants}
      transition={spring}
      whileHover={{ scale: 1.01 }}
      className={`glass-panel glow-card relative overflow-hidden rounded-lg p-5 ${className}`}
    >
      <span className="glow-card__halo" />
      <header className="relative flex items-center justify-between gap-4">
        <section>
          <p className="text-sm font-medium text-violet-200">Live activity</p>
          <h2 className="text-xl font-semibold text-white">Learner pulse</h2>
        </section>
        <span className="grid size-10 place-items-center rounded-md border border-violet-300/25 bg-violet-300/10 text-violet-100">
          <Bell aria-hidden="true" className="size-4" />
        </span>
      </header>

      <section aria-label="Contribution graph" className="relative mt-6">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">35 day focus map</p>
        <ol className="mt-3 grid grid-cols-7 gap-1.5">
          {contribution.map((level, index) => (
            <li key={`${level}-${index}`}>
              <span
                className={`block aspect-square rounded-[4px] border border-white/5 ${cellTone[level]}`}
              />
            </li>
          ))}
        </ol>
      </section>

      <ol className="relative mt-6 grid gap-4">
        {items.map((item) => {
          const Icon = toneIcon[item.tone];

          return (
            <li key={item.id} className="flex gap-3 border-b border-white/10 pb-4 last:border-b-0">
              <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-md bg-white/7 text-cyan-100">
                <Icon aria-hidden="true" className="size-4" />
              </span>
              <section className="min-w-0">
                <header className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <time className="text-xs text-slate-500">{item.timestamp}</time>
                </header>
                <p className="mt-1 text-sm leading-6 text-slate-400">{item.description}</p>
              </section>
            </li>
          );
        })}
      </ol>
    </motion.article>
  );
}
