import { NextResponse, type NextRequest } from "next/server";

import { leadSchema } from "@/lib/schemas";
import { requireAdmin } from "@/lib/server/auth";
import { sendLeadEmail } from "@/lib/server/email";
import { createLead, listLeads } from "@/lib/server/store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validación fallida", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const headers = req.headers;
  const payload = {
    ...parsed.data,
    budget: parsed.data.budget ? parsed.data.budget : undefined,
    websiteUrl: parsed.data.websiteUrl ? parsed.data.websiteUrl : undefined,
    userAgent: headers.get("user-agent") ?? undefined,
    referrer: headers.get("referer") ?? undefined,
  };

  let lead:
    | (Awaited<ReturnType<typeof createLead>> & { stored: true })
    | (typeof payload & { id: string; createdAt: string; stored: false });

  try {
    const stored = await createLead(payload);
    lead = { ...stored, stored: true };
  } catch {
    lead = {
      ...payload,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      stored: false,
    };
  }

  try {
    await sendLeadEmail(lead);
  } catch {
    return NextResponse.json(
      {
        ok: true,
        leadId: lead.id,
        emailSent: false,
        stored: lead.stored,
        warning:
          lead.stored
            ? "Lead guardado, pero no se pudo enviar el correo. Configura SMTP_* (recomendado) o Brevo para envío automático."
            : "No se pudo guardar el lead en el storage del servidor, pero el envío de correo también falló. Configura SMTP_* (recomendado) para que al menos lleguen las cotizaciones a tu correo.",
      },
      { status: 201 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      leadId: lead.id,
      emailSent: true,
      stored: lead.stored,
      warning: lead.stored
        ? undefined
        : "Correo enviado, pero no se pudo guardar el lead en el storage del servidor (entorno serverless).",
    },
    { status: 201 },
  );
}

export async function GET(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const items = await listLeads().catch(() => []);
  const service = req.nextUrl.searchParams.get("service");
  const filtered = service
    ? items.filter((x) => x.service === service)
    : items;
  return NextResponse.json({ items: filtered });
}
