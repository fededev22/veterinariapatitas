"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-start justify-center gap-4 px-5">
      <p className="font-display text-4xl">Se nos escapó el gatito.</p>
      <p className="text-muted">La página no pudo terminar de cargar. Podés intentar de nuevo.</p>
      <button type="button" className="btn btn-coral" onClick={reset}>
        Intentar de nuevo
      </button>
    </main>
  );
}
