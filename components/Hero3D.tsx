"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore, type PointerEvent } from "react";
import { BoneRain } from "@/components/BoneRain";
import { FlatPet } from "@/components/FlatPet";
import { usePet } from "@/components/PetProvider";
import { greetings, petThemes, type PetKind } from "@/lib/config";

const PetCanvas = dynamic(() => import("@/components/three/PetCanvas"), { ssr: false });

function canUse3d() {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = nav.connection?.saveData === true;
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2;
  const lowPhone = (navigator.hardwareConcurrency ?? 8) <= 4 && window.innerWidth < 768;
  return !reduce && !saveData && !lowMemory && !lowPhone;
}

function subscribeGraphics(onChange: () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  reduce.addEventListener("change", onChange);
  window.addEventListener("resize", onChange);
  return () => {
    reduce.removeEventListener("change", onChange);
    window.removeEventListener("resize", onChange);
  };
}

export function Hero3D() {
  const { pet } = usePet();
  const use3d = useSyncExternalStore(subscribeGraphics, canUse3d, () => false);
  const [ready, setReady] = useState(false);
  const [boop, setBoop] = useState(0);
  const [bubble, setBubble] = useState<string | null>(null);
  const [rain, setRain] = useState(false);

  useEffect(() => {
    if (!bubble) return;
    const timeout = window.setTimeout(() => setBubble(null), 2200);
    return () => window.clearTimeout(timeout);
  }, [bubble]);

  function greet() {
    const next = boop + 1;
    setBoop(next);
    const lines = greetings[pet];
    setBubble(lines[(next - 1) % lines.length]);
    if (next % 5 === 0) setRain(true);
  }

  function look(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--look-x", `${x * 10}px`);
    event.currentTarget.style.setProperty("--look-y", `${y * 8}px`);
  }

  return (
    <div className="relative">
      <div
        className="glass relative h-[380px] overflow-hidden rounded-[2rem] sm:h-[500px]"
        onPointerMove={look}
      >
        <div className="absolute inset-0">
          {!use3d || !ready ? (
            <button
              type="button"
              onClick={greet}
              className="flex h-full w-full items-center justify-center text-ink"
              aria-label={`Saludar a la mascota ${petThemes[pet].label}`}
            >
              <FlatPet pet={pet} className="h-[88%] w-[88%]" />
            </button>
          ) : null}
          {use3d ? (
            <div className={`absolute inset-0 ${ready ? "opacity-100" : "pointer-events-none opacity-0"}`}>
              <PetCanvas pet={pet} boop={boop} onGreet={greet} onReady={() => setReady(true)} />
            </div>
          ) : null}
        </div>
        {bubble ? (
          <p
            role="status"
            className="absolute left-4 top-4 max-w-[14rem] rounded-3xl rounded-bl-md bg-cream px-4 py-3 font-display text-lg shadow-lg"
          >
            {bubble}
          </p>
        ) : null}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <button type="button" className="btn btn-ghost" onClick={greet}>
          Saludá a {petThemes[pet].label.toLowerCase()}
        </button>
        <p className="text-sm text-muted">Tocá cinco veces: caen huesitos y pelotas.</p>
      </div>
      {rain ? <BoneRain onDone={() => setRain(false)} /> : null}
    </div>
  );
}

export type { PetKind };
