"use client";

import { useEffect, useRef } from "react";
import { ExampleBadge } from "@/components/ExampleBadge";
import { ServiceCard } from "@/components/ServiceCard";
import { usePet } from "@/components/PetProvider";
import { petThemes, services } from "@/lib/config";

export function Services() {
  const root = useRef<HTMLElement>(null);
  const { pet } = usePet();
  const featured = new Set(petThemes[pet].services);
  const ordered = [...services].sort((a, b) => Number(featured.has(b.id)) - Number(featured.has(a.id)));

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let revert = () => {};
    let cancelled = false;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.from("[data-service]", {
          y: 36,
          opacity: 0,
          stagger: 0.06,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
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
    <section id="servicios" ref={root} className="mx-auto max-w-6xl px-4 py-8">
      <ExampleBadge />
      <h2 className="mt-3 font-display text-4xl sm:text-5xl">Servicios de ejemplo</h2>
      <p className="mt-2 max-w-2xl text-muted">
        Una clínica real publicaría acá lo que sí hace. Esta lista es inventada para mostrar la página: consulta,
        vacunas, cirugía, laboratorio, peluquería y planes.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [perspective:1000px]">
        {ordered.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            summary={service.summary}
            lottie={service.lottie}
            featured={featured.has(service.id)}
          />
        ))}
      </div>
    </section>
  );
}
