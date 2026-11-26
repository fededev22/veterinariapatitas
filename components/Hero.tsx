"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Hero3D } from "@/components/Hero3D";
import { MagneticButton } from "@/components/MagneticButton";
import { Typewriter } from "@/components/Typewriter";
import { clinic } from "@/lib/config";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);

  return (
    <section id="inicio" ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y: yBack }} className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="blob absolute -left-16 top-8 h-64 w-64 rounded-full bg-mint/50 blur-3xl" />
        <span className="blob absolute right-0 top-24 h-72 w-72 rounded-full bg-butter/70 blur-3xl [animation-delay:-4s]" />
        <span className="blob absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-turquoise/30 blur-3xl [animation-delay:-8s]" />
        {Array.from({ length: 5 }, (_, index) => (
          <svg
            key={index}
            viewBox="0 0 64 64"
            className="stroll absolute h-8 w-8 text-coral/70"
            style={{ top: `${18 + (index % 3) * 22}%`, animationDelay: `${index * 2.1}s` }}
          >
            <ellipse cx="32" cy="40" rx="14" ry="12" fill="currentColor" />
            <ellipse cx="14" cy="26" rx="6" ry="7" fill="currentColor" />
            <ellipse cx="26" cy="16" rx="6" ry="7" fill="currentColor" />
            <ellipse cx="40" cy="16" rx="6" ry="7" fill="currentColor" />
            <ellipse cx="50" cy="26" rx="6" ry="7" fill="currentColor" />
          </svg>
        ))}
      </motion.div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 md:grid-cols-[1.05fr_0.95fr] md:pt-16">
        <div>
          <p className="inline-flex flex-wrap items-center gap-2 rounded-full bg-cream px-3 py-1 text-sm font-extrabold text-mint-deep">
            <span aria-hidden>★</span>
            {clinic.rating} en Google · {clinic.reviewCount} opiniones
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] text-ink sm:text-6xl">
            <span className="mb-2 block text-lg font-extrabold tracking-normal text-mint-deep sm:text-2xl">
              {clinic.name}
            </span>
            <span className="block min-h-[2.3em] sm:min-h-[2.15em]">
              <Typewriter text="Cuidamos a quien te mueve la cola" />
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Clínica veterinaria para pedir un turno sin dar vueltas, y para saber qué hacer si no puede esperar.
            La calificación de Google es real: {clinic.rating} estrellas, {clinic.reviewCount} opiniones.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <MagneticButton>
              <a href="#turnos" className="btn btn-coral pulse-ring w-full sm:w-auto">
                Sacá tu turno por WhatsApp
              </a>
            </MagneticButton>
            <a href="#urgencias" className="btn btn-ghost w-full sm:w-auto">
              Es una urgencia
            </a>
          </div>
        </div>
        <motion.div style={{ y: yFront }}>
          <Hero3D />
        </motion.div>
      </div>
    </section>
  );
}
