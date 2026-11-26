"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";

const pieces = ["🦴", "🎾", "🐾", "🟡"];

export function BoneRain({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(onDone, reduce ? 900 : 3400);
    return () => window.clearTimeout(timeout);
  }, [onDone, reduce]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      <p className="sr-only">Llueven huesitos y pelotas</p>
      {pieces.concat(pieces, pieces, pieces, pieces).map((piece, index) => (
        <motion.span
          key={`${piece}-${index}`}
          className="absolute top-0 text-3xl"
          style={{ left: `${(index * 17) % 100}%` }}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={
            reduce
              ? { opacity: 1, y: 80 }
              : { y: "105vh", opacity: [0, 1, 1, 0], rotate: 220 + index * 15 }
          }
          transition={{ duration: reduce ? 0.2 : 2.6, delay: (index % 8) * 0.06, ease: "easeIn" }}
        >
          {piece}
        </motion.span>
      ))}
    </div>
  );
}
