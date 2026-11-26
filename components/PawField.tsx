"use client";

import dynamic from "next/dynamic";

const PawParticles = dynamic(() => import("@/components/PawParticles"), { ssr: false });

export function PawField() {
  return <PawParticles />;
}
