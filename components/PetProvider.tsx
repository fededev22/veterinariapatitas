"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { PetKind } from "@/lib/config";

type PetContextValue = {
  pet: PetKind;
  setPet: (pet: PetKind) => void;
};

const PetContext = createContext<PetContextValue | null>(null);

export function PetProvider({ children }: { children: ReactNode }) {
  const [pet, setPet] = useState<PetKind>("perro");

  useEffect(() => {
    document.documentElement.dataset.pet = pet;
  }, [pet]);

  const value = useMemo(() => ({ pet, setPet }), [pet]);
  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
}

export function usePet() {
  const value = useContext(PetContext);
  if (!value) throw new Error("usePet tiene que usarse dentro de PetProvider");
  return value;
}
