"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ExampleBadge } from "@/components/ExampleBadge";
import { burstConfetti } from "@/lib/confetti";
import { clinic } from "@/lib/config";

function useCount(active: boolean, target: number, digits = 0) {
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      if (reduce) {
        setValue(target);
        return;
      }
      const progress = Math.min(1, (now - start) / 1400);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Number((target * eased).toFixed(digits)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, digits, reduce, target]);

  return value;
}

export function TrustCounter() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const rating = useCount(inView, clinic.rating, 1);
  const reviews = useCount(inView, clinic.reviewCount, 0);
  const [filled, setFilled] = useState(0);
  const celebrated = useRef(false);

  useEffect(() => {
    if (!inView) return;
    let step = 0;
    const timer = window.setInterval(() => {
      step += 1;
      setFilled(step);
      if (step >= 5) window.clearInterval(timer);
    }, 220);
    return () => window.clearInterval(timer);
  }, [inView]);

  useEffect(() => {
    if (inView && reviews >= clinic.reviewCount && !celebrated.current) {
      celebrated.current = true;
      burstConfetti();
    }
  }, [inView, reviews]);

  return (
    <section id="confianza" ref={ref} className="mx-auto max-w-6xl px-4 py-16">
      <div className="glass grid gap-8 rounded-[2rem] p-6 sm:grid-cols-3 sm:p-10">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-wide text-mint-deep">Dato real de Google</p>
          <p className="mt-2 font-display text-7xl leading-none">{rating.toFixed(1)}</p>
          <div className="mt-3 flex gap-1" aria-label={`${clinic.rating} de 5 estrellas`}>
            {Array.from({ length: 5 }, (_, index) => {
              const amount = Math.max(0, Math.min(1, clinic.rating - index));
              const shown = filled > index ? amount : 0;
              return (
                <span key={index} className="relative h-8 w-8 text-3xl leading-none" aria-hidden>
                  <span className="absolute text-ink/15">★</span>
                  <span
                    className="absolute overflow-hidden text-coral"
                    style={{ width: `${shown * 100}%` }}
                  >
                    ★
                  </span>
                </span>
              );
            })}
          </div>
        </div>
        <div>
          <p className="text-sm font-extrabold uppercase tracking-wide text-mint-deep">Opiniones reales</p>
          <p className="mt-2 font-display text-7xl leading-none">{reviews}</p>
          <p className="mt-2 text-muted">familias que dejaron su reseña en Google.</p>
        </div>
        <div>
          <ExampleBadge />
          <p className="mt-3 font-display text-6xl leading-none">{clinic.yearsLabel}</p>
          <p className="mt-2 text-muted">de trayectoria, un número inventado para esta demo.</p>
        </div>
      </div>
    </section>
  );
}
