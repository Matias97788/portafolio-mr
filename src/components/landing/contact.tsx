"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail, MessageCircle } from "lucide-react";

import { LinkedInIcon } from "@/components/icons/linkedin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { leadSchema } from "@/lib/schemas";
import type { ServiceItem, ServiceId } from "@/lib/types";
import { cn } from "@/lib/utils";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  service: ServiceId;
  budget?: string;
  websiteUrl?: string;
  message: string;
};

export function Contact({
  services,
  titleAs = "h2",
}: {
  services: ServiceItem[];
  titleAs?: "h1" | "h2";
}) {
  const defaultService = services[0]?.id ?? "desarrollo-web";
  const [service, setService] = React.useState<ServiceId>(defaultService);
  const linkedInUrl = "https://www.linkedin.com/in/matias-rodriguez-sandoval-/";
  const email = "matiasrodriguezsandoval@outlook.com";
  const whatsappUrl = "https://wa.me/56979428207";
  const [notice, setNotice] = React.useState<
    | { type: "success"; message: string }
    | { type: "error"; message: string }
    | null
  >(null);

  const Title = titleAs;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { service: defaultService },
  });

  const onSubmit = handleSubmit(async (values) => {
    setNotice(null);
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = (await res.json().catch(() => null)) as
      | { ok: true; leadId: string; emailSent?: boolean; warning?: string }
      | { error: string };

    if (!res.ok) {
      setNotice({
        type: "error",
        message: data && "error" in data ? data.error : "No se pudo enviar",
      });
      return;
    }

    reset({
      name: "",
      email: "",
      phone: "",
      budget: "",
      websiteUrl: "",
      message: "",
      service: values.service,
    });
    setService(values.service);
    setNotice(
      data && "ok" in data && data.warning
        ? { type: "error", message: data.warning }
        : {
            type: "success",
            message: "Listo. Te responderé a la brevedad con los próximos pasos.",
          },
    );
  });

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-5">
        <Title
          className={
            titleAs === "h1"
              ? "text-3xl font-semibold tracking-tight sm:text-4xl"
              : "text-2xl font-semibold tracking-tight"
          }
        >
          Contacto
        </Title>
        <p className="mt-2 text-sm text-muted-foreground">
          Cuéntame qué necesitas y te devuelvo una propuesta clara (alcance,
          tiempos y costo).
        </p>

        <div className="mt-6 space-y-4 rounded-[var(--radius-lg)] border border-border bg-card/40 p-6">
          <div>
            <div className="text-sm font-semibold">Respuesta rápida</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Idealmente incluye: objetivo, links de referencia y deadline.
            </div>
          </div>
          <a
            className="inline-flex items-center gap-2 text-sm text-primary underline underline-offset-4"
            href={`mailto:${email}`}
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {email}
          </a>
          <a
            className="inline-flex items-center gap-2 text-sm text-primary underline underline-offset-4"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp: +56 9 7942 8207
          </a>
          <a
            className="inline-flex items-center gap-2 text-sm text-primary underline underline-offset-4"
            href={linkedInUrl}
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>

      <div className="lg:col-span-7">
        <Card>
          <CardHeader>
            <CardTitle>Formulario de contacto</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name?.message ? (
                    <p className="text-xs text-primary">{errors.name.message}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                  {errors.email?.message ? (
                    <p className="text-xs text-primary">{errors.email.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    inputMode="tel"
                    placeholder="Ej: +56 9 1234 5678"
                    {...register("phone")}
                  />
                  {errors.phone?.message ? (
                    <p className="text-xs text-primary">{errors.phone.message}</p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Sitio web (opcional)</Label>
                  <Input
                    id="websiteUrl"
                    inputMode="url"
                    placeholder="https://tusitio.cl"
                    {...register("websiteUrl")}
                  />
                  {errors.websiteUrl?.message ? (
                    <p className="text-xs text-primary">
                      {errors.websiteUrl.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="service">Servicio de interés</Label>
                  <Select
                    value={service}
                    onValueChange={(v) => {
                      setService(v as ServiceId);
                      setValue("service", v as ServiceId, {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <SelectTrigger id="service" aria-label="Servicio de interés">
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service?.message ? (
                    <p className="text-xs text-primary">
                      {errors.service.message}
                    </p>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Presupuesto (opcional)</Label>
                  <Input
                    id="budget"
                    placeholder="Ej: $400.000 CLP"
                    {...register("budget")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" {...register("message")} />
                {errors.message?.message ? (
                  <p className="text-xs text-primary">{errors.message.message}</p>
                ) : null}
              </div>

              {notice ? (
                <div
                  className={cn(
                    "rounded-[var(--radius-lg)] border border-border px-3 py-2 text-sm",
                    notice.type === "success"
                      ? "bg-primary/10 text-foreground"
                      : "bg-muted/40 text-muted-foreground",
                  )}
                  role="status"
                  aria-live="polite"
                >
                  {notice.message}
                </div>
              ) : null}

              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
