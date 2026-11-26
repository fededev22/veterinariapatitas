"use client";

import dynamic from "next/dynamic";
import type { PointerEvent } from "react";
import type { LottieName } from "@/lib/lottie";

const LottieIcon = dynamic(() => import("@/components/LottieIcon"), {
  ssr: false,
  loading: () => <span className="block h-16 w-16 rounded-full bg-butter/80" aria-hidden />,
});

export function ServiceCard({
  title,
  summary,
  lottie,
  featured,
}: {
  title: string;
  summary: string;
  lottie: LottieName;
  featured: boolean;
}) {
  function tilt(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.transform = `rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg)`;
  }

  return (
    <article
      data-service
      onPointerMove={tilt}
      onPointerLeave={(event) => {
        event.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
      }}
      className="glass flex h-full flex-col rounded-[1.7rem] p-5 transition-transform duration-200 [transform-style:preserve-3d]"
    >
      <div className="flex items-start justify-between gap-3">
        <LottieIcon name={lottie} />
        {featured ? <span className="example-badge">Para tu elección</span> : null}
      </div>
      <h3 className="mt-2 font-display text-2xl">{title}</h3>
      <p className="mt-2 text-muted">{summary}</p>
    </article>
  );
}
