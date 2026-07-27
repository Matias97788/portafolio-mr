import { NextResponse, type NextRequest } from "next/server";

import { siteConfigSchema } from "@/lib/schemas";
import { requireAdmin } from "@/lib/server/auth";
import { getSiteConfig, updateSiteConfig } from "@/lib/server/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = await getSiteConfig();
  return NextResponse.json({ config });
}

export async function PUT(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await req.json().catch(() => null);
  const parsed = siteConfigSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validación fallida", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const next = await updateSiteConfig(parsed.data);
  return NextResponse.json({ ok: true, config: next });
}
