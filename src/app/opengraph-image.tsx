import { ImageResponse } from "next/og";

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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #070A0F 0%, #0B1020 40%, #070A0F 100%)",
          color: "white",
          fontFamily: "system-ui",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -200,
            background:
              "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.40), transparent 40%), radial-gradient(circle at 80% 35%, rgba(59,130,246,0.22), transparent 45%), radial-gradient(circle at 50% 120%, rgba(99,102,241,0.18), transparent 50%)",
          }}
        />
        <div
          style={{
            position: "relative",
            width: 980,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 28, opacity: 0.9 }}>Matías Rodríguez</div>
          <div style={{ marginTop: 18, fontSize: 72, fontWeight: 650, lineHeight: 1.05 }}>
            Ingeniería que escala negocios
          </div>
          <div style={{ marginTop: 18, fontSize: 28, opacity: 0.85 }}>
            Web · Mobile · E-commerce · Automatización · Consultoría
          </div>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              padding: "14px 18px",
              borderRadius: 999,
              background: "rgba(99,102,241,0.16)",
              border: "1px solid rgba(99,102,241,0.35)",
              fontSize: 18,
              letterSpacing: 0.2,
            }}
          >
            matiasrodriguez.dev
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
