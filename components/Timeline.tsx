"use client";

import { useEffect, useRef } from "react";
import { ExampleBadge } from "@/components/ExampleBadge";
import { visitSteps } from "@/lib/config";

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      path.style.strokeDashoffset = "0";
      return;
    }
    path.style.strokeDashoffset = `${length}`;
    let revert = () => {};
    let cancelled = false;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
          gsap.from(step, {
            opacity: 0,
            x: 16,
            duration: 0.5,
            scrollTrigger: { trigger: step, start: "top 82%" },
          });
        });
      }, section);
      revert = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return (
    <section id="visita" ref={sectionRef} className="mx-auto max-w-6xl px-4 py-8">
      <ExampleBadge />
      <h2 className="mt-3 font-display text-4xl sm:text-5xl">Cómo es tu visita</h2>
      <p className="mt-2 max-w-2xl text-muted">Cuatro pasos de ejemplo, del mensaje de WhatsApp al control.</p>
      <div className="relative mt-8">
        <svg
          className="pointer-events-none absolute top-2 bottom-2 left-5 w-4 text-mint-deep"
          viewBox="0 0 4 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path ref={pathRef} d="M2 0 V 100" stroke="currentColor" strokeWidth="4" fill="none" />
        </svg>
        <ol className="space-y-4">
          {visitSteps.map((step, index) => (
            <li key={step.title} data-step className="relative pl-16">
              <span className="absolute left-0 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-mint-deep font-display text-lg text-cream">
                {index + 1}
              </span>
              <div className="glass rounded-[1.5rem] p-5">
                <h3 className="font-display text-2xl">{step.title}</h3>
                <p className="mt-1 text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
