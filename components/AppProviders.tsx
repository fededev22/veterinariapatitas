"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { Loader } from "@/components/Loader";
import { PawCursor } from "@/components/PawCursor";
import { PetProvider } from "@/components/PetProvider";
import { SmoothScroll } from "@/components/SmoothScroll";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <PetProvider>
        <SmoothScroll>
          <Loader />
          <PawCursor />
          {children}
        </SmoothScroll>
      </PetProvider>
    </MotionConfig>
  );
}
