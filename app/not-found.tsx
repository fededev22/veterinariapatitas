import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-start justify-center gap-4 px-5">
      <p className="font-display text-4xl">Esta huellita no lleva a ningún lado.</p>
      <p className="text-muted">La página que buscás no está en la clínica.</p>
      <Link href="/" className="btn btn-coral">
        Volver al inicio
      </Link>
    </main>
  );
}
