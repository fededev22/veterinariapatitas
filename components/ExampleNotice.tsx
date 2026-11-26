"use client";

import { useState } from "react";

export function ExampleNotice() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="relative z-30 bg-butter text-[#1c2414]">
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-2 text-sm">
        <p>
          <strong>Contenido de ejemplo.</strong> El nombre, las 4.8 estrellas y las 261 opiniones son reales.
          Ubicación, teléfono, horarios, servicios, equipo y reseñas están inventados para esta demo.
        </p>
        <button type="button" className="shrink-0 font-extrabold underline" onClick={() => setOpen(false)}>
          Ocultar
        </button>
      </div>
    </div>
  );
}
