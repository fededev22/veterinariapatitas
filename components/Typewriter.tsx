"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function Typewriter({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce || count >= text.length) return;
    const timeout = window.setTimeout(() => setCount((value) => value + 1), 38);
    return () => window.clearTimeout(timeout);
  }, [count, reduce, text]);

  const shown = reduce ? text : text.slice(0, count);

  return (
    <span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {shown}
        <span className="ml-0.5 inline-block w-[0.55ch] text-coral">{!reduce && count < text.length ? "|" : ""}</span>
      </span>
    </span>
  );
}
