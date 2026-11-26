"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { clinic } from "@/lib/config";

function skippedLoader() {
  return document.documentElement.dataset.loader === "skip";
}

export function Loader() {
  const reduce = useReducedMotion();
  const skipped = useSyncExternalStore(() => () => {}, skippedLoader, () => false);
  const [dismissed, setDismissed] = useState(false);
  const show = !skipped && !dismissed;

  useEffect(() => {
    if (!show) return;
    const timeout = window.setTimeout(
      () => {
        sessionStorage.setItem("patitas-loader", "1");
        setDismissed(true);
      },
      reduce ? 350 : 1600,
    );
    return () => window.clearTimeout(timeout);
  }, [reduce, show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="loader fixed inset-0 z-[80] flex flex-col items-center justify-center gap-4 bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.45 } }}
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">Cargando {clinic.shortName}</span>
          <svg viewBox="0 0 64 64" className="h-20 w-20 text-coral" aria-hidden>
            <g className={reduce ? undefined : "origin-bottom animate-bounce"}>
              <ellipse cx="32" cy="40" rx="14" ry="12" fill="currentColor" />
              <ellipse cx="14" cy="26" rx="7" ry="8" fill="currentColor" />
              <ellipse cx="25" cy="16" rx="7" ry="8" fill="currentColor" />
              <ellipse cx="39" cy="16" rx="7" ry="8" fill="currentColor" />
              <ellipse cx="50" cy="26" rx="7" ry="8" fill="currentColor" />
            </g>
          </svg>
          <p className="font-display text-3xl">{clinic.shortName}</p>
          <button
            type="button"
            className="text-sm font-bold text-mint-deep underline-offset-4 hover:underline"
            onClick={() => {
              sessionStorage.setItem("patitas-loader", "1");
              setDismissed(true);
            }}
          >
            Entrar
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
