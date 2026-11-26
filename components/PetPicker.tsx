"use client";

import { AnimatePresence, motion } from "motion/react";
import { ExampleBadge } from "@/components/ExampleBadge";
import { usePet } from "@/components/PetProvider";
import { petOrder, petThemes, services } from "@/lib/config";

export function PetPicker() {
  const { pet, setPet } = usePet();
  const theme = petThemes[pet];
  const recommended = services.filter((service) => theme.services.includes(service.id));

  return (
    <section id="mascota" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <ExampleBadge />
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Elegí a quién traés</h2>
          <p className="mt-2 max-w-xl text-muted">
            Es el juego de la página: cambia la mascota, cambian los colores y aparece una guía de servicios de
            ejemplo para esa especie.
          </p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4" role="group" aria-label="Tipo de mascota">
        {petOrder.map((id) => {
          const item = petThemes[id];
          const selected = pet === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={selected}
              onClick={() => setPet(id)}
              className={`relative overflow-hidden rounded-[1.6rem] border px-3 py-5 text-left transition ${
                selected ? "border-transparent bg-cream shadow-lg" : "border-[var(--stroke)] bg-card"
              }`}
            >
              {selected ? (
                <motion.span
                  layoutId="pet-ring"
                  className="absolute inset-0 rounded-[1.6rem] border-4 border-coral"
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                />
              ) : null}
              <span className="relative block text-4xl" aria-hidden>
                {item.emoji}
              </span>
              <span className="relative mt-2 block font-display text-2xl">{item.label}</span>
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={pet}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="glass mt-6 rounded-[1.8rem] p-5 sm:p-7"
        >
          <p className="font-display text-2xl">{theme.tagline}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {recommended.map((service) => (
              <li key={service.id} className="rounded-2xl bg-cream/80 px-4 py-3">
                <p className="font-extrabold">{service.title}</p>
                <p className="text-sm text-muted">{service.summary}</p>
              </li>
            ))}
          </ul>
          <a href="#servicios" className="mt-4 inline-flex font-extrabold text-mint-deep">
            Ver todos los servicios
          </a>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
