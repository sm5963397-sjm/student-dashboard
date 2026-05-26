"use client";

import { AnimatePresence, motion } from "framer-motion";
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
  { label: "Overview", icon: Home, href: "#overview" },
  { label: "Courses", icon: BookOpenCheck, href: "#courses" },
  { label: "Analytics", icon: BarChart3, href: "#analytics" },
  { label: "AI Coach", icon: Sparkles, href: "#ai-coach" },
  { label: "Settings", icon: Settings, href: "#settings" },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Overview");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
              <p className="truncate text-xs text-slate-400">Learning workspace</p>
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
                  <a
                    href={item.href}
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
                  </a>
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

      <header className="fixed inset-x-3 top-3 z-50 md:hidden">
        <section className="glass-panel flex items-center justify-between rounded-lg p-2">
          <a
            href="#overview"
            className="flex min-w-0 items-center gap-3 px-2"
            onClick={() => {
              setActiveItem("Overview");
              setMobileOpen(false);
            }}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-cyan-200">
              <GraduationCap aria-hidden="true" className="size-5" />
            </span>
            <section className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">NGL Dashboard</p>
              <p className="truncate text-xs text-slate-400">Learning workspace</p>
            </section>
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            className="grid size-10 shrink-0 place-items-center rounded-md border border-white/10 bg-white/5 text-slate-200 transition-opacity hover:opacity-85"
          >
            <Menu aria-hidden="true" className="size-5" />
          </button>
        </section>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.nav
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass-panel mt-2 rounded-lg p-2"
            >
              <ul className="grid gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = activeItem === item.label;

                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        aria-label={item.label}
                        onClick={() => {
                          setActiveItem(item.label);
                          setMobileOpen(false);
                        }}
                        className="relative flex h-11 items-center gap-3 rounded-md px-3 text-sm text-slate-300"
                      >
                        {active ? (
                          <motion.span
                            layoutId="mobile-active-item"
                            className="absolute inset-0 rounded-md border border-cyan-300/30 bg-cyan-300/10"
                          />
                        ) : null}
                        <Icon
                          aria-hidden="true"
                          className={`relative size-4 shrink-0 ${active ? "text-cyan-100" : ""}`}
                        />
                        <span className={`relative ${active ? "text-cyan-100" : ""}`}>
                          {item.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
