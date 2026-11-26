# Veterinary Clinic Patitas

Landing de una página para **Veterinary Clinic Patitas**, una clínica veterinaria. Está hecha para mostrar: mascota 3D, selector de especie, turno por WhatsApp y un camino claro si es una urgencia.

## Cómo correrla

```bash
npm install
npm run dev
```

El servidor de desarrollo usa el puerto **3456**. Para producción:

```bash
npm run build
npm run start
```

El proyecto es Next.js (App Router) y se puede desplegar en Vercel sin configuración extra.

Las microinteracciones usan [Motion](https://motion.dev) (`motion/react`), el paquete actual de Framer Motion. El scroll largo usa GSAP ScrollTrigger y Lenis.

## Datos reales

- Nombre: Veterinary Clinic Patitas
- Rubro: clínica veterinaria
- Google: 4.8 estrellas, 261 opiniones
- No tiene web propia

## Datos de ejemplo (hay que reemplazarlos)

Todo esto es inventado. En la página dice **Contenido de ejemplo**. En el código vive en `lib/config.ts`, marcado con `example` o con el comentario `@placeholder`.

| Dato | Valor de la demo |
| --- | --- |
| Ubicación | Zona Centro de la ciudad |
| Teléfono / WhatsApp | +54 9 11 0000-0000 |
| Horarios | Lunes a sábado 9 a 20 hs. Domingos solo urgencias |
| Urgencias | Atención 24 hs, y los pasos de qué hacer |
| Servicios | Consulta, vacunas, desparasitación, cirugías, castraciones, laboratorio, ecografías, peluquería, tienda y planes |
| Especies | Perros, gatos, aves y exóticos |
| Equipo | Dra. Luna Pereyra, Dr. Tomás Ibáñez, Dra. Nina Costa |
| Experiencia | +8 años |
| Reseñas | Carla y Lola, Joaquín y Mishi, Vera y Pico |
| Redes | Instagram y Facebook, sin enlace real |
| JSON-LD | El teléfono, la dirección y el horario del schema también son placeholder. La nota y `aggregateRating` sí usan los datos reales |

También hay que cambiar las fotos de `public/pets/` si se quieren reseñas reales, y revisar `app/opengraph-image.tsx`.
