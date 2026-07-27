import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const cookieName = "mr_admin";
const secret =
  process.env.ADMIN_SESSION_SECRET ?? crypto.randomBytes(32).toString("hex");

function sign(value: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export function createAdminSession(hours = 12) {
  const expiresAt = Date.now() + hours * 60 * 60 * 1000;
  const payload = String(expiresAt);
  const token = `${payload}.${sign(payload)}`;
  return { token, expiresAt };
}

export function isValidAdminToken(token: string | undefined) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!crypto.timingSafeEqual(a, b)) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt)) return false;
  return Date.now() < expiresAt;
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  if (!isValidAdminToken(token)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
}

export async function setAdminCookie(token: string, expiresAt: number) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}
