import { quickWhatsapp } from "@/lib/config";

export function FloatingWhatsApp() {
  return (
    <a
      href={quickWhatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="pulse-ring fixed bottom-4 right-4 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-[#1f8f4e] px-4 font-extrabold text-white shadow-lg"
      aria-label="Escribir por WhatsApp. El número es de ejemplo."
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path
          fill="currentColor"
          d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.16h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 14.04c-.24.68-1.4 1.3-1.94 1.38-.5.07-1.12.1-1.81-.11-.42-.13-.95-.3-1.64-.59-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.26-.28.57-.35.76-.35h.55c.17 0 .41-.07.64.49.24.58.82 2 .89 2.15.07.14.12.32.02.51-.1.19-.14.32-.28.49-.14.17-.3.38-.42.51-.14.14-.28.29-.12.56.16.27.7 1.16 1.51 1.88 1.04.92 1.91 1.21 2.18 1.35.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.54.73 1.8.86.26.13.44.2.5.31.06.11.06.64-.18 1.32Z"
        />
      </svg>
      WhatsApp
    </a>
  );
}
