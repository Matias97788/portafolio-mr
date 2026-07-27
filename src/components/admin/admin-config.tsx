"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SiteConfig } from "@/lib/types";

type State =
  | { status: "loading" }
  | { status: "ready"; config: SiteConfig; saving: boolean; notice?: string }
  | { status: "error"; message: string };

export function AdminConfig({ initialConfig }: { initialConfig: SiteConfig }) {
  const [state, setState] = React.useState<State>({
    status: "ready",
    config: initialConfig,
    saving: false,
  });

  const load = React.useCallback(async () => {
    setState({ status: "loading" });
    const res = await fetch("/api/config", { cache: "no-store" });
    const data = (await res.json().catch(() => null)) as
      | { config: SiteConfig }
      | { error: string };
    if (!res.ok || !data || !("config" in data)) {
      setState({
        status: "error",
        message: data && "error" in data ? data.error : "No se pudo cargar",
      });
      return;
    }
    setState({ status: "ready", config: data.config, saving: false });
  }, []);

  if (state.status === "loading") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Configuración
          </h1>
          <p className="text-sm text-muted-foreground">
            Edita los textos principales y el detalle de servicios.
          </p>
        </div>
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-5 w-1/2 rounded bg-muted" />
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded bg-muted" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Configuración
          </h1>
          <p className="text-sm text-muted-foreground">{state.message}</p>
        </div>
        <Button onClick={load} variant="secondary">
          Reintentar
        </Button>
      </div>
    );
  }

  const { config, saving, notice } = state;

  async function save() {
    setState((s) =>
      s.status === "ready" ? { ...s, saving: true, notice: undefined } : s,
    );
    try {
      const res = await fetch("/api/config", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: true; config: SiteConfig }
        | { error: string };
      if (!res.ok || !data) {
        setState((s) =>
          s.status === "ready"
            ? {
                ...s,
                saving: false,
                notice:
                  data && "error" in data ? data.error : "No se pudo guardar",
              }
            : s,
        );
        return;
      }
      setState((s) =>
        s.status === "ready"
          ? {
              ...s,
              config: "config" in data ? data.config : s.config,
              saving: false,
              notice: "Guardado",
            }
          : s,
      );
    } catch {
      setState((s) =>
        s.status === "ready"
          ? { ...s, saving: false, notice: "No se pudo guardar" }
          : s,
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Configuración
          </h1>
          <p className="text-sm text-muted-foreground">
            Cambios aplican a la landing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={load} disabled={saving}>
            Recargar
          </Button>
          <Button onClick={save} disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>

      {notice ? (
        <div className="rounded-[var(--radius-lg)] border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
          {notice}
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="heroTitle">Título</Label>
            <Input
              id="heroTitle"
              value={config.heroTitle}
              onChange={(e) =>
                setState((s) =>
                  s.status === "ready"
                    ? { ...s, config: { ...s.config, heroTitle: e.target.value } }
                    : s,
                )
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroSubtitle">Subtítulo</Label>
            <Textarea
              id="heroSubtitle"
              value={config.heroSubtitle}
              onChange={(e) =>
                setState((s) =>
                  s.status === "ready"
                    ? {
                        ...s,
                        config: { ...s.config, heroSubtitle: e.target.value },
                      }
                    : s,
                )
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quién Soy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aboutTitle">Título</Label>
            <Input
              id="aboutTitle"
              value={config.aboutTitle}
              onChange={(e) =>
                setState((s) =>
                  s.status === "ready"
                    ? { ...s, config: { ...s.config, aboutTitle: e.target.value } }
                    : s,
                )
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aboutBody">Texto</Label>
            <Textarea
              id="aboutBody"
              value={config.aboutBody}
              onChange={(e) =>
                setState((s) =>
                  s.status === "ready"
                    ? { ...s, config: { ...s.config, aboutBody: e.target.value } }
                    : s,
                )
              }
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3">
        {config.services.map((svc, idx) => (
          <Card key={svc.id}>
            <CardHeader>
              <CardTitle>Servicio: {svc.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input
                  value={svc.title}
                  onChange={(e) =>
                    setState((s) => {
                      if (s.status !== "ready") return s;
                      const services = [...s.config.services];
                      services[idx] = { ...services[idx], title: e.target.value };
                      return { ...s, config: { ...s.config, services } };
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea
                  value={svc.description}
                  onChange={(e) =>
                    setState((s) => {
                      if (s.status !== "ready") return s;
                      const services = [...s.config.services];
                      services[idx] = {
                        ...services[idx],
                        description: e.target.value,
                      };
                      return { ...s, config: { ...s.config, services } };
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Bullets (una por línea)</Label>
                <Textarea
                  value={svc.bullets.join("\n")}
                  onChange={(e) =>
                    setState((s) => {
                      if (s.status !== "ready") return s;
                      const services = [...s.config.services];
                      const bullets = e.target.value
                        .split("\n")
                        .map((x) => x.trim())
                        .filter(Boolean);
                      services[idx] = { ...services[idx], bullets };
                      return { ...s, config: { ...s.config, services } };
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
