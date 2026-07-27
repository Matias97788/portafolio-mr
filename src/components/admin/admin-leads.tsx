"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Lead, ServiceId } from "@/lib/types";

const serviceLabels: Record<ServiceId, string> = {
  "desarrollo-web": "Desarrollo Web",
  ecommerce: "E-commerce",
  "apps-moviles": "Apps Móviles",
  automatizacion: "Automatización",
  growth: "Growth",
  gestion: "Gestión",
};

export function AdminLeads({ initialItems }: { initialItems: Lead[] }) {
  const [items, setItems] = React.useState<Lead[]>(initialItems);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [service, setService] = React.useState<ServiceId | "all">("all");

  const filteredItems =
    service === "all" ? items : items.filter((x) => x.service === service);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", { cache: "no-store" });
      const data = (await res.json().catch(() => null)) as
        | { items: Lead[] }
        | { error: string };
      if (!res.ok || !data || !("items" in data)) {
        setError(data && "error" in data ? data.error : "No se pudo cargar");
        return;
      }
      setItems(data.items);
    } catch {
      setError("No se pudo cargar");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Bandeja de entrada
          </h1>
          <p className="text-sm text-muted-foreground">
            Correos/mensajes recibidos desde el formulario de contacto.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[220px]">
            <Select
              value={service}
              onValueChange={(v) => setService(v as ServiceId | "all")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por servicio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {Object.entries(serviceLabels).map(([id, label]) => (
                  <SelectItem key={id} value={id}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="secondary" onClick={load}>
            Actualizar
          </Button>
        </div>
      </div>

      {loading && !items.length ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-5 w-2/3 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
              </CardHeader>
              <CardContent>
                <div className="h-16 rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      {error ? (
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {error}
          </CardContent>
        </Card>
      ) : null}

      {filteredItems.length ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {filteredItems.map((lead) => (
            <Card key={lead.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle className="truncate">{lead.name}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {lead.email}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {lead.phone ? lead.phone : "—"}
                      {lead.websiteUrl ? ` · ${lead.websiteUrl}` : ""}
                    </div>
                  </div>
                  <Badge variant="primary">{serviceLabels[lead.service]}</Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(lead.createdAt).toLocaleString("es-CL")}
                  {lead.budget ? ` · ${lead.budget}` : ""}
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm text-foreground/90">
                  {lead.message}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Sin leads</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Cuando alguien envíe el formulario, aparecerá aquí.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
