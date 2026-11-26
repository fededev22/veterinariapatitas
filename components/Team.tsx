"use client";

import { useState } from "react";
import { ExampleBadge } from "@/components/ExampleBadge";
import { team } from "@/lib/config";

const tints: Record<string, string> = {
  mint: "bg-[#7ed9c3]",
  butter: "bg-[#ffe08a]",
  turquoise: "bg-[#8fd6ea]",
};

export function Team() {
  return (
    <section id="equipo" className="mx-auto max-w-6xl px-4 py-16">
      <ExampleBadge />
      <h2 className="mt-3 font-display text-4xl sm:text-5xl">Un equipo de ejemplo</h2>
      <p className="mt-2 max-w-2xl text-muted">
        Tres veterinarios ficticios. Tocá una tarjeta para darla vuelta: del otro lado hay una frase inventada,
        no una bio real.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {team.map((person) => (
          <li key={person.name}>
            <FlipCard person={person} tint={tints[person.tint] ?? "bg-mint"} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function FlipCard({
  person,
  tint,
}: {
  person: (typeof team)[number];
  tint: string;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flip-scene">
      <button
        type="button"
        className="w-full text-left"
        aria-pressed={flipped}
        onClick={() => setFlipped((value) => !value)}
      >
        <span className="sr-only">{flipped ? "Mostrar el frente" : "Mostrar la frase"} de {person.name}</span>
        <span className={`flip-inner block ${flipped ? "is-flipped" : ""}`}>
          <span className="flip-face flex flex-col bg-[#fff6ea] p-5 text-[#16332f]">
            <span className={`flex h-16 w-16 items-center justify-center rounded-2xl font-display text-2xl text-[#16332f] ${tint}`}>
              {person.initials}
            </span>
            <span className="mt-4 font-display text-2xl">{person.name}</span>
            <span className="mt-1 text-[#3d5954]">{person.role}</span>
            <span className="mt-auto pt-6 text-sm font-extrabold text-[#0f7668]">Dar vuelta</span>
          </span>
          <span className="flip-face flip-back flex flex-col justify-between bg-[#16332f] p-5 text-[#fff8f1]">
            <span className="font-display text-2xl leading-snug">“{person.phrase}”</span>
            <span className="text-sm font-extrabold text-[#ffe08a]">{person.name} · ejemplo</span>
          </span>
        </span>
      </button>
    </div>
  );
}
