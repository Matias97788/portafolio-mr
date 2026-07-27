"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: true }
        | { error: string };
      if (!res.ok) {
        setError(
          data && "error" in data ? data.error : "No se pudo iniciar sesión",
        );
        return;
      }
      router.replace("/admin");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex min-h-screen w-full max-w-lg items-center px-4 py-16">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Acceso Admin</CardTitle>
            <CardDescription>
              Ingresa la contraseña configurada en{" "}
              <span className="font-medium">ADMIN_PASSWORD</span>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
              </div>
              {error ? (
                <div className="rounded-[var(--radius-lg)] border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                  {error}
                </div>
              ) : null}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Ingresando..." : "Entrar"}
              </Button>
              <div className="text-xs text-muted-foreground">
                Tip: crea un archivo <span className="font-medium">.env.local</span>{" "}
                con <span className="font-medium">ADMIN_PASSWORD=tu_clave</span>.
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
