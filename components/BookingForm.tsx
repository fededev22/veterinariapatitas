"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ExampleBadge } from "@/components/ExampleBadge";
import { usePet } from "@/components/PetProvider";
import { bookingTimes, clinic, petOrder, petThemes, whatsappHref } from "@/lib/config";

const schema = z.object({
  tutor: z.string().trim().min(2, "Contanos tu nombre"),
  petName: z.string().trim().min(1, "¿Cómo se llama tu mascota?"),
  petType: z.enum(["perro", "gato", "ave", "exotico"]),
  reason: z.string().trim().min(4, "Contanos el motivo, aunque sea en una frase"),
  date: z.string().min(1, "Elegí un día"),
  time: z.string().min(1, "Elegí un horario"),
});

type FormValues = z.infer<typeof schema>;

const weekdays = ["L", "M", "X", "J", "V", "S", "D"];
const monthNames = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

function isoDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function monthIndex(date: Date) {
  return date.getFullYear() * 12 + date.getMonth();
}

export function BookingForm() {
  const { pet } = usePet();
  const [clock, setClock] = useState<Date | null>(null);
  const [cursor, setCursor] = useState<Date | null>(null);
  const [sent, setSent] = useState(false);
  const [fallbackHref, setFallbackHref] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      tutor: "",
      petName: "",
      petType: "perro",
      reason: "",
      date: "",
      time: "",
    },
  });

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      setClock(now);
      setCursor(new Date(now.getFullYear(), now.getMonth(), 1));
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const days = useMemo(() => {
    if (!cursor) return null;
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const pad = (first.getDay() + 6) % 7;
    const count = new Date(year, month + 1, 0).getDate();
    return { pad, count, year, month };
  }, [cursor]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [petType, setPetType] = useState<FormValues["petType"]>("perro");
  const horizon = clock ? new Date(clock.getFullYear(), clock.getMonth() + 3, clock.getDate()) : null;

  function submit(values: FormValues) {
    const [year, month, day] = values.date.split("-");
    const message = [
      `Hola, ${clinic.name}. Quiero un turno.`,
      `Tutor: ${values.tutor}`,
      `Mascota: ${values.petName} (${petThemes[form.formState.dirtyFields.petType ? values.petType : pet].label})`,
      `Motivo: ${values.reason}`,
      `Día: ${day}/${month}/${year}`,
      `Horario: ${values.time}`,
      "Pedido armado desde la demo. Los horarios son de ejemplo.",
    ].join("\n");
    const href = whatsappHref(message);
    const opened = window.open(href, "_blank", "noopener,noreferrer");
    if (!opened) setFallbackHref(href);
    setSent(true);
  }

  return (
    <section id="turnos" className="mx-auto max-w-6xl px-4 py-16">
      <ExampleBadge />
      <h2 className="mt-3 font-display text-4xl sm:text-5xl">Sacá el turno</h2>
      <p className="mt-2 max-w-2xl text-muted">
        El formulario no guarda nada. Arma el mensaje y abre WhatsApp al {clinic.phoneDisplay}, un número de
        ejemplo.
      </p>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="glass mt-8 grid gap-6 rounded-[2rem] p-5 sm:p-8 lg:grid-cols-[1fr_0.9fr]"
        noValidate
      >
        <div className="grid gap-4">
          <label className="grid gap-1 font-extrabold" htmlFor="tutor">
            Tu nombre
            <input id="tutor" className="field font-medium" autoComplete="name" {...form.register("tutor")} aria-invalid={Boolean(form.formState.errors.tutor)} />
            {form.formState.errors.tutor ? <span className="text-sm font-semibold text-coral-deep">{form.formState.errors.tutor.message}</span> : null}
          </label>
          <label className="grid gap-1 font-extrabold" htmlFor="petName">
            Nombre de la mascota
            <input id="petName" className="field font-medium" {...form.register("petName")} aria-invalid={Boolean(form.formState.errors.petName)} />
            {form.formState.errors.petName ? <span className="text-sm font-semibold text-coral-deep">{form.formState.errors.petName.message}</span> : null}
          </label>
          <fieldset>
            <legend className="font-extrabold">Tipo</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {petOrder.map((id) => {
                const selected = (form.formState.dirtyFields.petType ? petType : pet) === id;
                return (
                <label key={id} className={`cursor-pointer rounded-full px-3 py-2 font-extrabold ${selected ? "bg-mint-deep text-cream" : "bg-cream"}`}>
                  <input
                    type="radio"
                    className="sr-only"
                    value={id}
                    checked={selected}
                    onChange={() => {
                      setPetType(id);
                      form.setValue("petType", id, { shouldDirty: true, shouldValidate: true });
                    }}
                  />
                  {petThemes[id].emoji} {petThemes[id].label}
                </label>
                );
              })}
            </div>
          </fieldset>
          <label className="grid gap-1 font-extrabold" htmlFor="reason">
            Motivo
            <textarea id="reason" rows={3} className="field font-medium" {...form.register("reason")} aria-invalid={Boolean(form.formState.errors.reason)} />
            {form.formState.errors.reason ? <span className="text-sm font-semibold text-coral-deep">{form.formState.errors.reason.message}</span> : null}
          </label>
        </div>

        <div>
          <input type="hidden" {...form.register("date")} />
          <input type="hidden" {...form.register("time")} />
          {days && cursor && clock && horizon ? (
            <>
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              className="btn btn-ghost h-10 px-3"
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
              disabled={monthIndex(cursor) <= monthIndex(clock)}
            >
              Mes anterior
            </button>
            <p className="font-display text-xl capitalize">
              {monthNames[days.month]} {days.year}
            </p>
            <button
              type="button"
              className="btn btn-ghost h-10 px-3"
              onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
              disabled={monthIndex(cursor) >= monthIndex(horizon)}
            >
              Mes siguiente
            </button>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-extrabold text-muted">
            {weekdays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1" role="grid" aria-label="Elegí el día">
            {Array.from({ length: days.pad }, (_, index) => (
              <span key={`pad-${index}`} />
            ))}
            {Array.from({ length: days.count }, (_, index) => {
              const dayDate = new Date(days.year, days.month, index + 1);
              const value = isoDate(dayDate);
              const sunday = dayDate.getDay() === 0;
              const disabled = dayDate < clock || dayDate > horizon || sunday;
              const selected = date === value;
              return (
                <button
                  key={value}
                  type="button"
                  disabled={disabled}
                  aria-pressed={selected}
                  title={sunday ? "Domingo: solo urgencias (ejemplo)" : undefined}
                  onClick={() => {
                    setDate(value);
                    form.setValue("date", value, { shouldValidate: true });
                  }}
                  className={`h-10 rounded-xl text-sm font-extrabold ${
                    selected ? "bg-coral-deep text-[var(--on-coral)]" : "bg-cream"
                  } disabled:cursor-not-allowed disabled:opacity-35`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
            </>
          ) : (
            <p className="text-muted">Cargando el calendario…</p>
          )}
          {form.formState.errors.date ? (
            <p className="mt-2 text-sm font-semibold text-coral-deep">{form.formState.errors.date.message}</p>
          ) : (
            <p className="mt-2 text-sm text-muted">Domingos bloqueados: en el ejemplo, solo urgencias.</p>
          )}
          <p className="mt-4 font-extrabold">Horario</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {bookingTimes.map((slot) => (
              <button
                key={slot}
                type="button"
                aria-pressed={time === slot}
                onClick={() => {
                  setTime(slot);
                  form.setValue("time", slot, { shouldValidate: true });
                }}
                className={`rounded-full px-3 py-2 text-sm font-extrabold ${
                  time === slot ? "bg-mint-deep text-cream" : "bg-cream"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          {form.formState.errors.time ? (
            <p className="mt-2 text-sm font-semibold text-coral-deep">{form.formState.errors.time.message}</p>
          ) : null}
          <button type="submit" className="btn btn-coral mt-6 w-full">
            Mandar pedido por WhatsApp
          </button>
          {sent ? (
            <p role="status" className="mt-3 text-sm font-semibold">
              Abrimos WhatsApp con el texto listo.
              {fallbackHref ? (
                <>
                  {" "}
                  Si no se abrió,{" "}
                  <a className="underline" href={fallbackHref} target="_blank" rel="noopener noreferrer">
                    tocá este enlace
                  </a>
                  .
                </>
              ) : null}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
