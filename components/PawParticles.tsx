"use client";

import { Particles, ParticlesProvider, useParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useEffect, useState, useSyncExternalStore } from "react";
import { onConfetti } from "@/lib/confetti";

const ambient: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 30,
  pauseOnBlur: true,
  particles: {
    number: { value: 14 },
    shape: {
      type: ["image", "emoji"],
      options: {
        image: {
          src: "/paw.svg",
          width: 32,
          height: 32,
          replaceColor: false,
        },
        emoji: { value: ["🐾"] },
      },
    },
    opacity: { value: { min: 0.15, max: 0.5 } },
    size: { value: { min: 8, max: 18 } },
    rotate: { animation: { enable: true, speed: 6 } },
    move: { enable: true, speed: 0.4, direction: "none", outModes: { default: "out" } },
  },
  detectRetina: true,
};

const burst: ISourceOptions = {
  fullScreen: { enable: true, zIndex: 55 },
  fpsLimit: 40,
  particles: {
    number: { value: 28 },
    life: { duration: { sync: false, value: 2.4 }, count: 1 },
    shape: {
      type: ["emoji", "image"],
      options: {
        emoji: { value: ["🐾", "🦴", "🎾"] },
        image: { src: "/paw.svg", width: 32, height: 32, replaceColor: false },
      },
    },
    opacity: { value: 1 },
    size: { value: { min: 12, max: 24 } },
    rotate: { animation: { enable: true, speed: 18 } },
    move: {
      enable: true,
      speed: 12,
      direction: "top",
      decay: 0.07,
      gravity: { enable: true, acceleration: 14 },
      outModes: { default: "destroy" },
    },
  },
  detectRetina: true,
};

function Layer() {
  const { loaded } = useParticlesProvider();
  const [shots, setShots] = useState(0);

  useEffect(() => onConfetti(() => setShots((value) => value + 1)), []);

  useEffect(() => {
    if (!shots) return;
    const timeout = window.setTimeout(() => setShots(0), 2800);
    return () => window.clearTimeout(timeout);
  }, [shots]);

  if (!loaded) return null;

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <Particles id="patitas-ambient" options={ambient} className="h-full w-full" />
      </div>
      {shots > 0 ? (
        <div aria-hidden className="pointer-events-none">
          <Particles id={`patitas-burst-${shots}`} options={burst} />
        </div>
      ) : null}
    </>
  );
}

function particlesAllowed() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData =
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  return !reduce && !saveData;
}

function subscribeParticles(onChange: () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  reduce.addEventListener("change", onChange);
  return () => reduce.removeEventListener("change", onChange);
}

export default function PawParticles() {
  const allowed = useSyncExternalStore(subscribeParticles, particlesAllowed, () => false);

  if (!allowed) return null;

  return (
    <ParticlesProvider
      init={async (engine) => {
        await loadSlim(engine);
      }}
    >
      <Layer />
    </ParticlesProvider>
  );
}
