import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { requireAdmin } from "@/lib/server/auth";
import { publishBlogDraft } from "@/lib/server/blog-publish";

export const dynamic = "force-dynamic";

const draftSchema = z.object({
  slug: z.string().min(3),
  title: z.string().min(8),
  description: z.string().min(20).max(180),
  content: z.string().min(200),
  linkedinText: z.string().min(40),
  tags: z.array(z.string()).min(1).max(8),
  status: z.enum(["draft", "published"]).optional(),
});

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await req.json().catch(() => null);
  const parsed = draftSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validación fallida", issues: parsed.error.flatten() },
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
}
