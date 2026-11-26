import { ExampleBadge } from "@/components/ExampleBadge";
import { PawMark } from "@/components/PawMark";
import { clinic } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-[var(--stroke)] bg-cream/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex items-center gap-3">
            <PawMark />
            <div>
              <p className="font-display text-2xl">{clinic.name}</p>
              <p className="text-sm font-extrabold text-muted">{clinic.category}</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-muted">
            {clinic.rating} estrellas y {clinic.reviewCount} opiniones en Google. Todavía no tiene web propia: esta
            página es una demo.
          </p>
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Redes de ejemplo">
            {["Instagram", "Facebook"].map((name) => (
              <span key={name} className="rounded-full border border-[var(--stroke)] px-3 py-2 text-sm font-extrabold">
                {name} · ejemplo
              </span>
            ))}
          </div>
          <details className="mt-6 max-w-md text-sm">
            <summary className="cursor-pointer font-extrabold">Qué datos de esta demo son de ejemplo</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
              <li>Reales: el nombre Veterinary Clinic Patitas, el rubro, 4.8 estrellas y 261 opiniones.</li>
              <li>Inventados: zona, teléfono, horarios, urgencias 24 hs, servicios, especies, equipo, “+8 años” y las tres reseñas.</li>
            </ul>
          </details>
        </div>
        <div className="glass overflow-hidden rounded-[1.8rem]">
          <div className="flex items-center justify-between px-4 pt-4">
            <p className="font-extrabold">{clinic.locationLabel}</p>
            <ExampleBadge />
          </div>
          <svg viewBox="0 0 360 200" className="mt-2 h-48 w-full" role="img" aria-label="Mapa ilustrado de ejemplo, sin una dirección real">
            <rect width="360" height="200" fill="#e7f6f1" />
            <path d="M0 40 H360 M0 100 H360 M0 160 H360 M70 0 V200 M160 0 V200 M250 0 V200" stroke="#b7ddd2" strokeWidth="10" />
            <path d="M20 120 C 80 40, 140 180, 220 80 S 320 40, 360 90" fill="none" stroke="#7ed9c3" strokeWidth="8" />
            <circle cx="188" cy="96" r="16" fill="#c4452d" />
            <circle cx="188" cy="90" r="6" fill="#fff6ea" />
            <text x="20" y="188" fill="#3d5954" fontSize="14" fontFamily="Nunito, sans-serif">
              Mapa ilustrado · no es una ubicación real
            </text>
          </svg>
          <ul className="space-y-1 px-4 pb-4 text-sm">
            {clinic.hours.map((row) => (
              <li key={row.days} className="flex justify-between gap-4">
                <span>{row.days}</span>
                <span className="font-extrabold">{row.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="px-4 pb-24 text-center text-xs text-muted">
        Demo de {clinic.name}. Los datos marcados como ejemplo no deben tomarse como información de la clínica.
      </p>
    </footer>
  );
}
