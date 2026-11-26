"use client";

import { ExampleBadge } from "@/components/ExampleBadge";
import { clinic, emergencySteps, urgentWhatsapp } from "@/lib/config";

export function EmergencyBanner() {
  return (
    <section id="urgencias" className="mx-auto max-w-6xl px-4 py-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#a33a26] px-5 py-8 text-white sm:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="heartbeat inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-3xl" aria-hidden>
            ♥
          </span>
          <ExampleBadge>Dato de ejemplo</ExampleBadge>
        </div>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl">Si tu mascota no puede esperar</h2>
        <p className="mt-3 max-w-2xl text-lg text-white/95">
          {clinic.emergency24h}. El teléfono y la guardia de esta demo son inventados. Esto no reemplaza la
          indicación de un veterinario.
        </p>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2">
          {emergencySteps.map((step, index) => (
            <li key={step} className="rounded-2xl bg-white/10 p-4">
              <span className="font-display text-2xl">{index + 1}</span>
              <p className="mt-1">{step}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a className="btn bg-butter text-[#1c2414]" href={`tel:${clinic.phoneTel}`}>
            Llamar {clinic.phoneDisplay}
          </a>
          <a className="btn bg-white text-[#a33a26]" href={urgentWhatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp urgente
          </a>
        </div>
      </div>
    </section>
  );
}
