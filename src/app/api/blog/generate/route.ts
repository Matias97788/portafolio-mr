import { NextResponse, type NextRequest } from "next/server";

import { requireAdmin } from "@/lib/server/auth";
import { generateBlogDraft } from "@/lib/server/ai-blog";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = (await req.json().catch(() => null)) as { topic?: string } | null;
  try {
    const draft = await generateBlogDraft({ topic: body?.topic });
    return NextResponse.json({ ok: true, draft });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo generar";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
