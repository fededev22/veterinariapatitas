"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { clinic, nav } from "@/lib/config";
import { PawMark } from "@/components/PawMark";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("patitas-theme", next ? "dark" : "light");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--stroke)] bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <a href="#inicio" className="flex items-center gap-2 font-display text-xl font-semibold">
          <PawMark className="h-9 w-9" />
          <span>
            {clinic.shortName}
            <span className="block text-[0.65rem] font-sans font-bold uppercase tracking-wide text-muted">
              {clinic.category}
            </span>
          </span>
        </a>
        <nav className="ml-auto hidden items-center gap-4 text-sm font-extrabold lg:flex" aria-label="Secciones">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-ink/80 hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--stroke)] bg-cream lg:ml-2"
          onClick={toggleTheme}
          aria-label="Cambiar entre modo claro y oscuro"
        >
          <span className="dark:hidden" aria-hidden>
            ☾
          </span>
          <span className="hidden dark:inline" aria-hidden>
            ☀
          </span>
        </button>
        <a href="#turnos" className="btn btn-coral hidden sm:inline-flex">
          Turno
        </a>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--stroke)] lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          <span aria-hidden className="text-xl">
            {open ? "×" : "☰"}
          </span>
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.nav
            id="menu-movil"
            aria-label="Secciones"
            className="absolute inset-x-0 top-full z-40 border-b border-[var(--stroke)] bg-bg px-4 py-3 shadow-lg lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <ul className="flex flex-col gap-1 pb-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block rounded-2xl px-3 py-3 font-extrabold hover:bg-cream"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
