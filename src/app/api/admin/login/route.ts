import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { createAdminSession, setAdminCookie } from "@/lib/server/auth";

const schema = z.object({
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD no está configurada" },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  if (parsed.data.password !== adminPassword) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const { token, expiresAt } = createAdminSession(12);
  await setAdminCookie(token, expiresAt);
  return NextResponse.json({ ok: true });
}
