"use client";

import { Lottie } from "lottie-react";
import { useReducedMotion } from "motion/react";
import { lotties, type LottieName } from "@/lib/lottie";

export default function LottieIcon({ name }: { name: LottieName }) {
  const reduce = useReducedMotion();
  return (
    <Lottie
      src={lotties[name]}
      loop={reduce ? 0 : 3}
      autoplay={!reduce}
      aria-hidden
      className="h-16 w-16"
    />
  );
}
