import { ImageResponse } from "next/og";

import { getBlogPost } from "@/lib/blog/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogOpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  const title = post?.title ?? "Artículo del blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(135deg, #070A0F 0%, #0B1020 40%, #070A0F 100%)",
          color: "white",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.85 }}>Matías Rodríguez · Blog</div>
        <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>
          {title}
        </div>
        <div style={{ fontSize: 24, opacity: 0.8 }}>matiasrodriguez.dev</div>
      </div>
    ),
    { ...size },
  );
}
