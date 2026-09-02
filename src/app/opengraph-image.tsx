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
              "radial-gradient(circle at 18% 20%, rgba(59,102,241,0.28), transparent 42%), radial-gradient(circle at 82% 30%, rgba(59,130,246,0.14), transparent 45%)",
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
          <div
            style={{
              marginTop: 18,
              fontSize: 68,
              fontWeight: 650,
              lineHeight: 1.05,
            }}
          >
            Desarrollo web y automatización en Chile
          </div>
          <div style={{ marginTop: 18, fontSize: 28, opacity: 0.85 }}>
            Next.js · Shopify · WordPress · Apps
          </div>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              padding: "12px 16px",
              borderRadius: 10,
              background: "rgba(59,102,241,0.18)",
              border: "1px solid rgba(59,102,241,0.35)",
              fontSize: 18,
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
