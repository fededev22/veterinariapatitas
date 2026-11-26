"use client";

import type { PetKind } from "@/lib/config";

const eye = "fill-ink";

export function FlatPet({ pet, className = "" }: { pet: PetKind; className?: string }) {
  if (pet === "gato") {
    return (
      <svg viewBox="0 0 320 280" className={className} role="img" aria-label="Gato ilustrado">
        <ellipse cx="160" cy="250" rx="90" ry="16" fill="currentColor" opacity="0.12" />
        <path d="M70 150 L90 70 L140 120 Z" fill="#f7f1ea" stroke="#e7b7c8" strokeWidth="4" />
        <path d="M250 150 L230 70 L180 120 Z" fill="#f7f1ea" stroke="#e7b7c8" strokeWidth="4" />
        <ellipse cx="160" cy="168" rx="78" ry="68" fill="#f7f1ea" />
        <ellipse cx="160" cy="188" rx="40" ry="28" fill="#fff" />
        <g className="wag" style={{ transformOrigin: "230px 200px" }}>
          <path d="M220 190 Q280 160 250 230" fill="none" stroke="#f7f1ea" strokeWidth="18" strokeLinecap="round" />
        </g>
        <circle cx="132" cy="158" r="10" className={eye} style={{ transform: "translate(var(--look-x, 0px), var(--look-y, 0px))" }} />
        <circle cx="188" cy="158" r="10" className={eye} style={{ transform: "translate(var(--look-x, 0px), var(--look-y, 0px))" }} />
        <path d="M150 176 Q160 184 170 176" fill="none" stroke="#e36a8a" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (pet === "ave") {
    return (
      <svg viewBox="0 0 320 280" className={className} role="img" aria-label="Ave ilustrada">
        <ellipse cx="160" cy="250" rx="80" ry="14" fill="currentColor" opacity="0.12" />
        <g className="flap">
          <ellipse cx="78" cy="168" rx="48" ry="22" fill="#7ed0ea" />
        </g>
        <g className="flap" style={{ transformOrigin: "240px 168px" }}>
          <ellipse cx="242" cy="168" rx="48" ry="22" fill="#7ed0ea" />
        </g>
        <ellipse cx="160" cy="176" rx="70" ry="62" fill="#3ec6c6" />
        <ellipse cx="160" cy="190" rx="36" ry="34" fill="#ffe08a" />
        <circle cx="160" cy="112" r="48" fill="#5fd0d4" />
        <path d="M150 124 L160 146 L172 124 Z" fill="#ff8a6a" />
        <circle cx="144" cy="104" r="8" className={eye} style={{ transform: "translate(var(--look-x, 0px), var(--look-y, 0px))" }} />
        <circle cx="178" cy="104" r="8" className={eye} style={{ transform: "translate(var(--look-x, 0px), var(--look-y, 0px))" }} />
      </svg>
    );
  }

  if (pet === "exotico") {
    return (
      <svg viewBox="0 0 320 280" className={className} role="img" aria-label="Camaleón ilustrado">
        <ellipse cx="160" cy="250" rx="90" ry="14" fill="currentColor" opacity="0.12" />
        <path className="wag" d="M230 170 Q270 140 250 200 Q280 210 240 220" fill="none" stroke="#7dcf7a" strokeWidth="16" strokeLinecap="round" />
        <ellipse cx="150" cy="176" rx="86" ry="48" fill="#8ed47a" />
        <ellipse cx="150" cy="188" rx="48" ry="22" fill="#e7f58a" />
        <circle cx="78" cy="150" r="28" fill="#b6e38a" />
        <circle cx="70" cy="146" r="10" className={eye} style={{ transform: "translate(var(--look-x, 0px), var(--look-y, 0px))" }} />
        <circle cx="108" cy="138" r="8" fill="#16332f" />
        <path d="M120 150 Q150 120 180 148" fill="none" stroke="#3f7a22" strokeWidth="8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 280" className={className} role="img" aria-label="Perro ilustrado">
      <ellipse cx="160" cy="252" rx="96" ry="16" fill="currentColor" opacity="0.12" />
      <ellipse cx="118" cy="214" rx="22" ry="16" fill="#f3d2a4" />
      <ellipse cx="202" cy="214" rx="22" ry="16" fill="#f3d2a4" />
      <ellipse cx="160" cy="176" rx="78" ry="58" fill="#f6d7a8" />
      <ellipse cx="160" cy="190" rx="42" ry="32" fill="#fff6ea" />
      <g className="wag" style={{ transformOrigin: "230px 160px" }}>
        <ellipse cx="248" cy="150" rx="16" ry="36" fill="#e7b07a" transform="rotate(30 248 150)" />
      </g>
      <circle cx="160" cy="112" r="52" fill="#f6d7a8" />
      <ellipse cx="108" cy="108" rx="22" ry="32" fill="#e7b07a" />
      <ellipse cx="212" cy="108" rx="22" ry="32" fill="#e7b07a" />
      <ellipse cx="160" cy="128" rx="26" ry="18" fill="#fff6ea" />
      <circle cx="160" cy="126" r="7" fill="#3d2c29" />
      <circle cx="140" cy="104" r="8" className={eye} style={{ transform: "translate(var(--look-x, 0px), var(--look-y, 0px))" }} />
      <circle cx="182" cy="104" r="8" className={eye} style={{ transform: "translate(var(--look-x, 0px), var(--look-y, 0px))" }} />
      <path d="M148 140 Q160 150 172 140" fill="none" stroke="#c4452d" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
