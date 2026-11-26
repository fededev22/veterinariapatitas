"use client";

import { ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { PetModel } from "@/components/three/Pets";
import type { PetKind } from "@/lib/config";

const grounds: Record<PetKind, string> = {
  perro: "#ffe08a",
  gato: "#f8d5e4",
  ave: "#c8f1ea",
  exotico: "#e4f6b8",
};

export default function PetCanvas({
  pet,
  boop,
  onGreet,
  onReady,
}: {
  pet: PetKind;
  boop: number;
  onGreet: () => void;
  onReady: () => void;
}) {
  const narrow = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Canvas
      dpr={narrow ? [1, 1.15] : [1, 1.6]}
      camera={{ position: [0, 0.55, 5.1], fov: 32 }}
      gl={{ antialias: !narrow, alpha: true, powerPreference: "high-performance" }}
      onCreated={onReady}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[3.2, 4.4, 3]} intensity={1.7} color="#fff8f1" />
      <directionalLight position={[-2.6, 1.4, -1.2]} intensity={0.55} color="#b7f3e4" />
      <PetModel pet={pet} boop={boop} onGreet={onGreet} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]}>
        <circleGeometry args={[1.25, 40]} />
        <meshStandardMaterial color={grounds[pet]} roughness={0.95} />
      </mesh>
      <ContactShadows position={[0, -1.04, 0]} opacity={0.28} scale={4.2} blur={2.2} far={2} color="#16332f" />
    </Canvas>
  );
}
