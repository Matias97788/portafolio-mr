import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { requireAdmin } from "@/lib/server/auth";
import { publishBlogDraft } from "@/lib/server/blog-publish";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const draftSchema = z.object({
  slug: z.string().min(3),
  title: z.string().min(8),
  description: z.string().min(10).max(220),
  content: z.string().min(120),
  linkedinText: z.string().min(20),
  tags: z.array(z.string()).min(1).max(8),
  status: z.enum(["draft", "published"]).optional(),
});

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const body = await req.json().catch(() => null);
    const parsed = draftSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const details = Object.entries(fieldErrors)
        .map(([key, msgs]) => `${key}: ${(msgs ?? []).join(", ")}`)
        .join(" · ");
      return NextResponse.json(
        {
          error: details
            ? `Validación fallida (${details})`
            : "Validación fallida",
          issues: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const result = await publishBlogDraft(parsed.data, {
      status: parsed.data.status ?? "published",
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      post: result.post,
      url: result.url,
      mode: result.mode,
      note:
        result.mode === "github"
          ? "Publicado en GitHub. Vercel redeployará en 1-2 minutos."
          : "Publicado localmente. Haz commit y deploy para producción.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo publicar";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
