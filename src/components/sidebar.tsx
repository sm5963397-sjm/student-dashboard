"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  BarChart3,
  BookOpenCheck,
  GraduationCap,
  Home,
  Menu,
  Settings,
  Sparkles,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: Home },
  { label: "Courses", icon: BookOpenCheck },
  { label: "Analytics", icon: BarChart3 },
  { label: "AI Coach", icon: Sparkles },
  { label: "Settings", icon: Settings },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Overview");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <aside
        className={`glass-panel sticky top-4 hidden h-[calc(100vh-32px)] shrink-0 flex-col gap-6 rounded-lg p-3 md:flex md:w-20 lg:p-4 ${
          collapsed ? "lg:w-20" : "lg:w-64"
        }`}
      >
        <header className="flex items-center justify-between gap-3">
          <section className="flex min-w-0 items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-cyan-200">
              <GraduationCap aria-hidden="true" className="size-5" />
            </span>
            <section className={collapsed ? "hidden" : "hidden min-w-0 lg:block"}>
              <p className="truncate text-sm font-semibold text-white">NGL Dashboard</p>
              <p className="truncate text-xs text-slate-400">Frontend challenge</p>
            </section>
          </section>

          <button
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setCollapsed((value) => !value)}
            className="hidden size-9 shrink-0 place-items-center rounded-md border border-white/10 bg-white/5 text-slate-300 transition-opacity hover:opacity-80 lg:grid"
          >
            <Menu aria-hidden="true" className="size-4" />
          </button>
        </header>

        <nav aria-label="Main navigation" className="mt-2">
          <ul className="grid gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeItem === item.label;

              return (
                <li key={item.label}>
                  <button
                    type="button"
                    aria-label={item.label}
                    onClick={() => setActiveItem(item.label)}
                    className="relative flex h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm text-slate-400 transition-opacity hover:opacity-90"
                  >
                    {active ? (
                      <motion.span
                        layoutId="sidebar-active-item"
                        className="absolute inset-0 rounded-md border border-cyan-300/30 bg-cyan-300/10"
                      />
                    ) : null}
                    <Icon
                      aria-hidden="true"
                      className={`relative size-4 shrink-0 ${active ? "text-cyan-100" : ""}`}
                    />
                    <span
                      className={`relative truncate ${active ? "text-cyan-100" : ""} ${
                        collapsed ? "hidden" : "hidden lg:inline"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <article
          className={`mt-auto rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 ${
            collapsed ? "hidden lg:block" : "hidden lg:block"
          }`}
        >
          <p className="text-sm font-medium text-emerald-100">{collapsed ? "Flow" : "Learning velocity"}</p>
          <p className="mt-2 text-3xl font-semibold text-white">+24%</p>
          <p className={collapsed ? "sr-only" : "mt-1 text-xs leading-5 text-emerald-100/70"}>
            Compared with last week
          </p>
        </article>
      </aside>

      <nav
        aria-label="Mobile navigation"
        className="glass-panel fixed inset-x-3 bottom-3 z-40 rounded-lg p-2 md:hidden"
      >
        <ul className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeItem === item.label;

            return (
              <li key={item.label}>
                <button
                  type="button"
                  aria-label={item.label}
                  onClick={() => setActiveItem(item.label)}
                  className="relative flex h-12 w-full items-center justify-center rounded-md text-slate-400"
                >
                  {active ? (
                    <motion.span
                      layoutId="mobile-active-item"
                      className="absolute inset-0 rounded-md border border-cyan-300/30 bg-cyan-300/10"
                    />
                  ) : null}
                  <Icon
                    aria-hidden="true"
                    className={`relative size-5 ${active ? "text-cyan-100" : ""}`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
