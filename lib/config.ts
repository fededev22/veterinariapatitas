/**
 * ÚNICA fuente de textos y datos de la landing.
 *
 * Reales (confirmados): nombre, rubro, 4.8 estrellas y 261 opiniones de Google.
 * Todo lo demás está marcado con `example: true` y es PLACEHOLDER inventado.
 * Reemplazalo antes de publicar la clínica de verdad.
 */

export type PetKind = "perro" | "gato" | "ave" | "exotico";

export const clinic = {
  name: "Veterinary Clinic Patitas",
  shortName: "Patitas",
  category: "Clínica veterinaria",
  /** Dato real de Google. */
  rating: 4.8,
  /** Dato real de Google. */
  reviewCount: 261,
  hasOwnWebsite: false,

  /**
   * PLACEHOLDER. Ubicación inventada: no hay dirección confirmada.
   * @placeholder
   */
  example: true as const,
  locationLabel: "Zona Centro de la ciudad",
  /** @placeholder teléfono inventado */
  phoneDisplay: "+54 9 11 0000-0000",
  /** @placeholder */
  phoneTel: "+5491100000000",
  /** @placeholder número para wa.me, sin signos */
  whatsapp: "5491100000000",
  /** @placeholder */
  hours: [
    { days: "Lunes a sábado", hours: "9 a 20 hs" },
    { days: "Domingos", hours: "Solo urgencias" },
  ],
  /** @placeholder */
  emergency24h: "Atención de urgencias 24 hs",
  /** @placeholder */
  yearsLabel: "+8 años",
} as const;

export const petThemes: Record<
  PetKind,
  { label: string; emoji: string; tagline: string; services: string[] }
> = {
  perro: {
    label: "Perro",
    emoji: "🐶",
    tagline: "Cola en movimiento, consulta sin apuro.",
    services: ["consulta", "vacunas", "peluqueria", "planes"],
  },
  gato: {
    label: "Gato",
    emoji: "🐱",
    tagline: "Paciencia felina y manos suaves.",
    services: ["consulta", "vacunas", "castraciones", "eco"],
  },
  ave: {
    label: "Ave",
    emoji: "🦜",
    tagline: "Pío, pico y una revisión tranquila.",
    services: ["consulta", "desparasitacion", "laboratorio", "tienda"],
  },
  exotico: {
    label: "Exótico",
    emoji: "🦎",
    tagline: "Para los que no entran en una caja común.",
    services: ["consulta", "laboratorio", "cirugias", "tienda"],
  },
};

/** @placeholder especies de ejemplo */
export const petOrder: PetKind[] = ["perro", "gato", "ave", "exotico"];

export const greetings: Record<PetKind, string[]> = {
  perro: ["¡Guau!", "¡Hola, humano!", "¿Me rascás la oreja?", "¡Quiero mi turno!"],
  gato: ["¡Miau!", "Te estoy evaluando.", "Ronroneo… un poquito.", "¿Eso es atún?"],
  ave: ["¡Pío!", "Hola, hola, hola.", "¿Semillitas?", "Estoy divino."],
  exotico: ["¡Hola!", "Despacio, que miro.", "Cambio de color.", "¿Es mi turno?"],
};

/** @placeholder listado de servicios inventado */
export const services = [
  {
    id: "consulta",
    title: "Consulta clínica general",
    summary: "Revisión, diagnóstico y un plan que se entiende a la primera.",
    lottie: "heart" as const,
    pets: ["perro", "gato", "ave", "exotico"] as PetKind[],
  },
  {
    id: "vacunas",
    title: "Vacunación",
    summary: "Calendario al día, con carnet y recordatorio para la próxima.",
    lottie: "spark" as const,
    pets: ["perro", "gato"] as PetKind[],
  },
  {
    id: "desparasitacion",
    title: "Desparasitación",
    summary: "Interna y externa, según la especie y la vida que lleva.",
    lottie: "drop" as const,
    pets: ["perro", "gato", "ave", "exotico"] as PetKind[],
  },
  {
    id: "cirugias",
    title: "Cirugías",
    summary: "Procedimientos con preparación clara y seguimiento después.",
    lottie: "heart" as const,
    pets: ["perro", "gato", "exotico"] as PetKind[],
  },
  {
    id: "castraciones",
    title: "Castraciones",
    summary: "Cirugía de rutina, cuidados en casa y control postoperatorio.",
    lottie: "paw" as const,
    pets: ["perro", "gato"] as PetKind[],
  },
  {
    id: "laboratorio",
    title: "Análisis de laboratorio",
    summary: "Sangre, orina y otros estudios para no adivinar.",
    lottie: "spark" as const,
    pets: ["perro", "gato", "ave", "exotico"] as PetKind[],
  },
  {
    id: "eco",
    title: "Ecografías",
    summary: "Imágenes en el momento, explicadas sin letra chica.",
    lottie: "drop" as const,
    pets: ["perro", "gato"] as PetKind[],
  },
  {
    id: "peluqueria",
    title: "Peluquería y baño",
    summary: "Baño, corte y nudos, con paciencia para los nerviosos.",
    lottie: "paw" as const,
    pets: ["perro", "gato"] as PetKind[],
  },
  {
    id: "tienda",
    title: "Alimentos y accesorios",
    summary: "Comida, correas y juguetes para seguir el cuidado en casa.",
    lottie: "spark" as const,
    pets: ["perro", "gato", "ave", "exotico"] as PetKind[],
  },
  {
    id: "planes",
    title: "Planes de salud",
    summary: "Controles y prevención agrupados, para no correr a último momento.",
    lottie: "heart" as const,
    pets: ["perro", "gato", "ave", "exotico"] as PetKind[],
  },
];

/** @placeholder equipo ficticio */
export const team = [
  {
    name: "Dra. Luna Pereyra",
    role: "Clínica de pequeños animales",
    phrase: "Si mueve la cola, yo también. Si no, buscamos por qué.",
    initials: "LP",
    tint: "mint",
  },
  {
    name: "Dr. Tomás Ibáñez",
    role: "Cirugía y medicina felina",
    phrase: "Los gatos no me eligen. Me toleran. Es un honor.",
    initials: "TI",
    tint: "butter",
  },
  {
    name: "Dra. Nina Costa",
    role: "Aves y animales exóticos",
    phrase: "Traduzco piídos, siseos y silencios raros.",
    initials: "NC",
    tint: "turquoise",
  },
];

/** @placeholder pasos de una visita, texto de ejemplo */
export const visitSteps = [
  {
    title: "Pedís el turno",
    text: "Completás el formulario y se abre WhatsApp con el mensaje listo: tutor, mascota, motivo, día y hora.",
  },
  {
    title: "Llegás",
    text: "Te reciben por el nombre de tu mascota. Si está nerviosa, hay un ratito para que huela el lugar.",
  },
  {
    title: "La consulta",
    text: "Revisión, preguntas y un plan dicho en voz alta. Te llevás por escrito qué hacer en casa.",
  },
  {
    title: "El seguimiento",
    text: "Si hace falta control, queda anotado. Ante una duda, el mismo WhatsApp sigue abierto.",
  },
];

/** @placeholder qué hacer en una emergencia: texto de ejemplo, no es indicación médica real */
export const emergencySteps = [
  "Escribí o llamá y contá qué pasó, desde cuándo y si está consciente.",
  "Mantenela en un lugar quieto, abrigada, sin darle de comer ni medicarla por tu cuenta.",
  "Si hay sangrado, presioná con una tela limpia y no saques objetos clavados.",
  "Vení enseguida. En esta demo, las urgencias figuran las 24 hs: es un dato de ejemplo.",
];

export const bookingTimes = [
  "09:00",
  "10:00",
  "11:30",
  "13:00",
  "15:00",
  "16:30",
  "18:00",
  "19:00",
];

/** @placeholder reseñas ficticias */
export const reviews = [
  {
    author: "Carla M.",
    pet: "Lola",
    kind: "Perrita de ejemplo",
    text: "Llegamos asustadas y nos fuimos con Lola dormida en el regazo. Nos explicaron cada cosa sin mirar el reloj.",
    stars: 5,
    image: "/pets/lola.svg",
    alt: "Ilustración de ejemplo de Lola, una perrita",
  },
  {
    author: "Joaquín R.",
    pet: "Mishi",
    kind: "Gato de ejemplo",
    text: "Mishi no saluda a nadie y acá se dejó revisar. Salimos con un plan claro y el transportín todavía entero.",
    stars: 5,
    image: "/pets/mishi.svg",
    alt: "Ilustración de ejemplo de Mishi, un gato",
  },
  {
    author: "Vera L.",
    pet: "Pico",
    kind: "Ave de ejemplo",
    text: "Pensé que una clínica chica no vería aves. Pico salió más tranquilo que yo, y yo salí entendiendo el tratamiento.",
    stars: 5,
    image: "/pets/pico.svg",
    alt: "Ilustración de ejemplo de Pico, un loro",
  },
];

export const nav = [
  { href: "#inicio", label: "Inicio" },
  { href: "#mascota", label: "Mascota" },
  { href: "#servicios", label: "Servicios" },
  { href: "#urgencias", label: "Urgencias" },
  { href: "#equipo", label: "Equipo" },
  { href: "#turnos", label: "Turnos" },
  { href: "#opiniones", label: "Opiniones" },
];

export function whatsappHref(text: string) {
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const quickWhatsapp = whatsappHref(
  `Hola, ${clinic.name}. Quiero hacer una consulta para mi mascota.`,
);

export const urgentWhatsapp = whatsappHref(
  `URGENCIA. Hola, ${clinic.name}. Necesito ayuda ahora para mi mascota.`,
);

/**
 * JSON-LD de ejemplo. El nombre, el rubro y aggregateRating son reales.
 * Teléfono, dirección y horarios son PLACEHOLDER.
 */
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  name: clinic.name,
  description:
    "Clínica veterinaria Veterinary Clinic Patitas. Calificación 4.8 en Google, con 261 opiniones.",
  telephone: clinic.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.locationLabel,
    addressCountry: "AR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(clinic.rating),
    reviewCount: String(clinic.reviewCount),
    bestRating: "5",
    worstRating: "1",
  },
};
