import { ImageResponse } from "next/og";

export const alt = "Veterinary Clinic Patitas, clínica veterinaria. 4.8 estrellas y 261 opiniones en Google.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fff8f1",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 24,
              background: "#0f7668",
              color: "#fff6ea",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
            }}
          >
            P
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#0f7668", fontWeight: 700 }}>
            Clínica veterinaria
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, color: "#16332f", lineHeight: 1.05 }}>
            Veterinary Clinic Patitas
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#3d5954" }}>
            4.8 estrellas · 261 opiniones en Google
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: "#c4452d",
            color: "white",
            borderRadius: 999,
            padding: "16px 28px",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          Turnos por WhatsApp
        </div>
      </div>
    ),
    { ...size },
  );
}
