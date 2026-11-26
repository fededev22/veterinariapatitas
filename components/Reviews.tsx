"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ExampleBadge } from "@/components/ExampleBadge";
import { reviews, clinic } from "@/lib/config";

export function Reviews() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % reviews.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused, reduce]);

  function shift(direction: number) {
    setIndex((value) => (value + direction + reviews.length) % reviews.length);
  }

  return (
    <section id="opiniones" className="mx-auto max-w-6xl px-4 pt-16 pb-28">
      <ExampleBadge />
      <h2 className="mt-3 font-display text-4xl sm:text-5xl">Historias de ejemplo</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Las {reviews.length} reseñas de acá son ficticias. Las {clinic.reviewCount} de Google, no: esa cifra está
            en el contador de arriba.
          </p>
      <div
        className="relative mt-6 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="mb-3 flex items-center justify-center gap-3">
          <button type="button" className="btn btn-ghost h-11 px-4" onClick={() => shift(-1)}>
            Anterior
          </button>
          <p className="text-sm font-extrabold">
            {index + 1} / {reviews.length}
          </p>
          <button type="button" className="btn btn-ghost h-11 px-4" onClick={() => shift(1)}>
            Siguiente
          </button>
        </div>
        <div
          className="relative mx-auto h-[26rem] max-w-3xl overflow-hidden [perspective:1200px] sm:h-[22rem]"
          tabIndex={0}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Reseñas de ejemplo"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") shift(1);
            if (event.key === "ArrowLeft") shift(-1);
          }}
        >
          {reviews.map((review, reviewIndex) => {
            const offset = reviewIndex - index;
            const wrapped = offset > 1 ? offset - reviews.length : offset < -1 ? offset + reviews.length : offset;
            const active = wrapped === 0;
            return (
              <motion.article
                key={review.pet}
                className="absolute inset-x-8 top-0 sm:inset-x-14"
                animate={{
                  x: wrapped * 28,
                  rotateY: wrapped * -22,
                  scale: active ? 1 : 0.92,
                  opacity: active ? 1 : 0,
                  zIndex: active ? 2 : 0,
                }}
                transition={{ duration: reduce ? 0 : 0.45 }}
                aria-hidden={!active}
              >
                <div className="glass grid gap-4 rounded-[1.8rem] p-4 sm:grid-cols-[180px_1fr] sm:p-6">
                  <Image
                    src={review.image}
                    alt={review.alt}
                    width={1024}
                    height={1024}
                    sizes="180px"
                    className="h-44 w-full rounded-[1.3rem] object-cover sm:h-full"
                  />
                  <div>
                    <p className="font-display text-3xl">{review.pet}</p>
                    <p className="text-sm font-extrabold text-muted">{review.kind}</p>
                    <p className="mt-3 text-lg">“{review.text}”</p>
                    <p className="mt-4 font-extrabold">
                      {review.author} · {"★".repeat(review.stars)}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
