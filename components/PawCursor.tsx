"use client";

import { motion, useMotionValue, useSpring, type MotionValue } from "motion/react";
import { useEffect, useSyncExternalStore } from "react";

function usePawCursor() {
  return useSyncExternalStore(
    (onChange) => {
      const fine = window.matchMedia("(pointer: fine)");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
      fine.addEventListener("change", onChange);
      reduce.addEventListener("change", onChange);
      return () => {
        fine.removeEventListener("change", onChange);
        reduce.removeEventListener("change", onChange);
      };
    },
    () =>
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function TrailDot({
  x,
  y,
  mass,
  size,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  mass: number;
  size: number;
}) {
  const sx = useSpring(x, { stiffness: 180, damping: 24, mass });
  const sy = useSpring(y, { stiffness: 180, damping: 24, mass });
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] text-coral"
      style={{ x: sx, y: sy, width: size, height: size, translateX: "-50%", translateY: "-50%" }}
    >
      <svg viewBox="0 0 64 64" className="h-full w-full opacity-70">
        <ellipse cx="32" cy="40" rx="14" ry="12" fill="currentColor" />
        <ellipse cx="16" cy="24" rx="6" ry="7" fill="currentColor" />
        <ellipse cx="28" cy="16" rx="6" ry="7" fill="currentColor" />
        <ellipse cx="40" cy="16" rx="6" ry="7" fill="currentColor" />
        <ellipse cx="50" cy="26" rx="6" ry="7" fill="currentColor" />
      </svg>
    </motion.span>
  );
}

export function PawCursor() {
  const on = usePawCursor();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  useEffect(() => {
    if (!on) return;
    const move = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const typing = target?.closest("input, textarea, select, label");
      if (typing) {
        x.set(-200);
        y.set(-200);
        document.documentElement.classList.remove("paw-cursor");
        return;
      }
      document.documentElement.classList.add("paw-cursor");
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => {
      document.documentElement.classList.remove("paw-cursor");
      window.removeEventListener("pointermove", move);
    };
  }, [on, x, y]);

  if (!on) return null;

  return (
    <>
      <TrailDot x={x} y={y} mass={0.35} size={28} />
      <TrailDot x={x} y={y} mass={0.7} size={18} />
      <TrailDot x={x} y={y} mass={1.05} size={12} />
    </>
  );
}
