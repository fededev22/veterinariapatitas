import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { AppProviders } from "@/components/AppProviders";
import { clinic, jsonLd } from "@/lib/config";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3456"),
  title: {
    default: `${clinic.name} | Clínica veterinaria`,
    template: `%s | ${clinic.shortName}`,
  },
  description:
    "Veterinary Clinic Patitas es una clínica veterinaria con 4.8 estrellas y 261 opiniones en Google. Pedí un turno o consultá si es una urgencia.",
  applicationName: clinic.name,
  keywords: [
    "veterinaria",
    "clínica veterinaria",
    "Veterinary Clinic Patitas",
    "turno veterinario",
    "urgencias veterinarias",
  ],
  openGraph: {
    title: `${clinic.name} | Clínica veterinaria`,
    description:
      "Clínica veterinaria con 4.8 estrellas y 261 opiniones en Google. Turnos y contacto de urgencia.",
    locale: "es_AR",
    type: "website",
    siteName: clinic.name,
  },
  twitter: {
    card: "summary_large_image",
    title: clinic.name,
    description: "Clínica veterinaria · 4.8 estrellas · 261 opiniones en Google.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f7668",
  width: "device-width",
  initialScale: 1,
};

const beforePaint = `(function(){try{var t=localStorage.getItem("patitas-theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark");if(sessionStorage.getItem("patitas-loader"))document.documentElement.setAttribute("data-loader","skip");}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-pet="perro"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <script dangerouslySetInnerHTML={{ __html: beforePaint }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
