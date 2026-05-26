"use client";

import { motion } from "framer-motion";
import { Bell, Moon, Settings, ShieldCheck } from "lucide-react";
import { tileVariants } from "@/components/bento-grid";

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

type SettingsCardProps = {
  id?: string;
  className?: string;
};

const preferences = [
  { label: "Dark interface", value: "Always on", icon: Moon },
  { label: "Focus reminders", value: "Weekdays", icon: Bell },
  { label: "Privacy mode", value: "Enabled", icon: ShieldCheck },
];

export function SettingsCard({ id, className = "" }: SettingsCardProps) {
  return (
    <motion.article
      id={id}
      variants={tileVariants}
      transition={spring}
      whileHover={{ scale: 1.01 }}
      className={`glass-panel glow-card relative scroll-mt-24 overflow-hidden rounded-lg p-5 md:p-6 ${className}`}
    >
      <span className="glow-card__halo" />

      <header className="relative flex items-center justify-between gap-4">
        <section>
          <p className="text-sm font-medium text-emerald-200">Settings</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">Study preferences</h2>
        </section>
        <span className="grid size-10 place-items-center rounded-md border border-emerald-300/25 bg-emerald-300/10 text-emerald-100">
          <Settings aria-hidden="true" className="size-4" />
        </span>
      </header>

      <ol className="relative mt-6 grid gap-3">
        {preferences.map((preference) => {
          const Icon = preference.icon;

          return (
            <li
              key={preference.label}
              className="grid gap-3 rounded-md border border-white/10 bg-white/[0.04] px-3 py-3"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-md bg-white/7 text-cyan-100">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span className="min-w-0 truncate text-sm text-slate-300">{preference.label}</span>
              </span>
              <span className="w-full rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-center text-xs text-slate-300">
                {preference.value}
              </span>
            </li>
          );
        })}
      </ol>
    </motion.article>
  );
}
