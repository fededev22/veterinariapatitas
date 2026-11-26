"use client";

import "lenis/dist/lenis.css";
import { useEffect, type ReactNode } from "react";

/**
 * Scroll suave con Lenis. En reduced-motion, Lenis mismo deja el scroll 1:1.
 * El ticker de GSAP mantiene sincronizado a ScrollTrigger.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const [{ default: Lenis }, gsapModule, scrollModule] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      const gsap = gsapModule.default;
      const { ScrollTrigger } = scrollModule;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        autoRaf: false,
        duration: 1.05,
        anchors: { offset: -80 },
        stopInertiaOnNavigate: true,
      });

      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);
      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return children;
}
