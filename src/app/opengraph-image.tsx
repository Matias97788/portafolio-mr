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
          background: "linear-gradient(160deg, #F3F6F4 0%, #E8EFEC 45%, #F7F4EE 100%)",
          color: "#15201C",
          fontFamily: "Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 12% 18%, rgba(20, 110, 95, 0.12), transparent 42%), radial-gradient(circle at 88% 20%, rgba(196, 168, 110, 0.16), transparent 40%)",
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
          <div style={{ fontSize: 26, color: "#1F6B5C", fontWeight: 600 }}>
            Matías Rodríguez
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 68,
              fontWeight: 500,
              lineHeight: 1.08,
            }}
          >
            Desarrollo web y automatización en Chile
          </div>
          <div style={{ marginTop: 18, fontSize: 26, color: "#4A5A54" }}>
            Next.js · Shopify · SEO · Apps · Procesos
          </div>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              padding: "12px 16px",
              borderRadius: 8,
              background: "#146E5F",
              color: "#F7FBFA",
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
