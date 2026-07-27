"use client";

import * as React from "react";
import {
  BarChart3,
  Bot,
  Boxes,
  Check,
  Gauge,
  Globe,
  Layers3,
  Megaphone,
  PlugZap,
  RefreshCw,
  Send,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Store,
  Workflow,
} from "lucide-react";
import Image from "next/image";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LordIcon } from "@/components/ui/lord-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ServiceItem } from "@/lib/types";

export function ServicesGrid({ services }: { services: ServiceItem[] }) {
  const servicesImage = "/visuals/services.svg";
  const serviceLordicons = React.useMemo(
    () => ({
      "desarrollo-web": "https://cdn.lordicon.com/lbjtvqiv.json",
      ecommerce: "https://cdn.lordicon.com/auvicynv.json",
      "apps-moviles": "https://cdn.lordicon.com/uvextprq.json",
      automatizacion: "https://cdn.lordicon.com/sihdhmit.json",
      growth: "https://cdn.lordicon.com/rahcoaeu.json",
      gestion: "https://cdn.lordicon.com/wloilxuq.json",
    }),
    [],
  );
  const projectTabs = React.useMemo(
    () => [
      {
        value: "web",
        label: "Web",
        projects: [
          {
            title: "Landing SaaS de alta conversión",
            description:
              "Diseño y desarrollo de landing con estructura persuasiva, performance y medición de eventos.",
            tags: ["Next.js", "SEO", "Core Web Vitals"],
            Icon: Globe,
          },
          {
            title: "Sitio corporativo escalable",
            description:
              "Arquitectura modular, páginas por anclas y contenido editable para equipos no técnicos.",
            tags: ["App Router", "Shadcn/UI", "Accesibilidad"],
            Icon: Layers3,
          },
          {
            title: "Portal con autenticación y roles",
            description:
              "Acceso seguro para áreas internas con permisos, navegación clara y manejo de sesiones.",
            tags: ["Auth", "RBAC", "Seguridad"],
            Icon: ShieldCheck,
          },
          {
            title: "Optimización de performance",
            description:
              "Mejoras enfocadas en carga inicial, imágenes, caching y métricas de Core Web Vitals.",
            tags: ["CWV", "Imágenes", "Caching"],
            Icon: Gauge,
          },
        ],
      },
      {
        value: "ecommerce",
        label: "E-commerce",
        projects: [
          {
            title: "Checkout optimizado en Shopify",
            description:
              "Ajustes de UX y eventos para reducir fricción y mejorar tasa de compra.",
            tags: ["Shopify", "UX", "Tracking"],
            Icon: Store,
          },
          {
            title: "Catálogo y filtros a medida",
            description:
              "Experiencia de navegación rápida con filtros, búsqueda y estructura de categorías.",
            tags: ["Búsqueda", "UX", "Performance"],
            Icon: ShoppingCart,
          },
          {
            title: "Integración de pagos y despacho",
            description:
              "Conexión con pasarelas de pago, reglas de envío y validaciones de compra.",
            tags: ["Pagos", "Logística", "Integraciones"],
            Icon: PlugZap,
          },
          {
            title: "Sincronización de stock (Cruz ↔ Shopify)",
            description:
              "Automatización para mantener inventario consistente entre base de datos y tienda Shopify.",
            tags: ["Stock", "Sync", "Shopify"],
            Icon: RefreshCw,
          },
        ],
      },
      {
        value: "automatizacion",
        label: "Automatización",
        projects: [
          {
            title: "Control de stock automatizado",
            description:
              "Sincronización programada y por eventos entre sistemas, con alertas y logs.",
            tags: ["ETL", "Webhooks", "Monitoreo"],
            Icon: Boxes,
          },
          {
            title: "Reportería operativa (Notion/Sheets)",
            description:
              "Consolidación de datos y generación de reportes listos para decisiones.",
            tags: ["Notion", "Sheets", "Dashboards"],
            Icon: BarChart3,
          },
          {
            title: "Alertas y notificaciones inteligentes",
            description:
              "Notificaciones por email/WhatsApp/Slack según reglas de negocio y umbrales.",
            tags: ["Alertas", "Workflows", "Reglas"],
            Icon: Workflow,
          },
          {
            title: "Automatización de leads y CRM",
            description:
              "Enrutamiento de formularios, scoring básico y asignación automática a equipos.",
            tags: ["CRM", "Leads", "Routing"],
            Icon: Send,
          },
        ],
      },
      {
        value: "plataformas",
        label: "Plataformas",
        projects: [
          {
            title: "Gestor de conexiones para ISMED",
            description:
              "Módulo para administrar integraciones, credenciales y estados de conexión de forma centralizada.",
            tags: ["Integraciones", "Gestión", "Observabilidad"],
            Icon: PlugZap,
          },
          {
            title: "API Gateway y normalización",
            description:
              "Capa intermedia para estandarizar datos, versionar endpoints y controlar acceso.",
            tags: ["API", "Versionado", "Seguridad"],
            Icon: ShieldCheck,
          },
          {
            title: "Panel de administración de operaciones",
            description:
              "Dashboard para visualizar métricas clave, estado de servicios y acciones rápidas.",
            tags: ["Admin", "Dashboards", "UX"],
            Icon: Layers3,
          },
          {
            title: "Integración de sistemas internos",
            description:
              "Conectores entre módulos para reducir tareas manuales y mejorar consistencia.",
            tags: ["Sync", "Webhooks", "Procesos"],
            Icon: RefreshCw,
          },
        ],
      },
      {
        value: "mobile-ai",
        label: "Mobile + IA",
        projects: [
          {
            title: "App móvil de medicina con IA (tipo ChatGPT)",
            description:
              "Aplicación con chat asistido por IA, historial, contexto y flujos para consultas clínicas.",
            tags: ["React Native", "IA", "UX"],
            Icon: Bot,
          },
          {
            title: "App de seguimiento de pacientes",
            description:
              "Registro de síntomas, recordatorios y reportes exportables para continuidad de cuidado.",
            tags: ["iOS/Android", "Notificaciones", "Offline"],
            Icon: Smartphone,
          },
          {
            title: "Integración de APIs médicas",
            description:
              "Conexión con servicios externos para fichas, validaciones y sincronización segura.",
            tags: ["APIs", "Seguridad", "Sync"],
            Icon: ShieldCheck,
          },
          {
            title: "Publicación y mantenimiento",
            description:
              "Pipeline de builds, revisiones, monitoreo de crashes y releases controlados.",
            tags: ["CI/CD", "Release", "Observabilidad"],
            Icon: Workflow,
          },
        ],
      },
      {
        value: "marketing",
        label: "Marketing",
        projects: [
          {
            title: "Brevo API + Meta Ads",
            description:
              "Integración para sincronizar audiencias/eventos y mejorar atribución de campañas.",
            tags: ["Brevo", "Meta Ads", "Eventos"],
            Icon: Megaphone,
          },
          {
            title: "Tracking avanzado (GA4 + eventos)",
            description:
              "Definición de eventos, embudos y conversiones para decisiones basadas en datos.",
            tags: ["GA4", "Eventos", "Analítica"],
            Icon: BarChart3,
          },
          {
            title: "Automatización de email marketing",
            description:
              "Flujos de onboarding, recuperación y segmentación basada en comportamiento.",
            tags: ["Email", "Segmentación", "Automations"],
            Icon: Send,
          },
          {
            title: "Integraciones de formularios a campañas",
            description:
              "Conexión entre leads, CRM y plataformas de ads para respuesta rápida y remarketing.",
            tags: ["Leads", "CRM", "Ads"],
            Icon: PlugZap,
          },
        ],
      },
    ],
    [],
  );

  return (
    <section id="servicios" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <Reveal>
          <header className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="max-w-2xl lg:col-span-7">
              <h2 className="text-2xl font-semibold tracking-tight">Servicios</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Entregables concretos, comunicación clara y foco en resultados.
              </p>
            </div>
            <div className="relative hidden h-20 w-32 overflow-hidden rounded-[calc(var(--radius-lg)+10px)] border border-border bg-card sm:block lg:col-span-5 lg:h-24 lg:w-full">
              <Image
                alt=""
                aria-hidden="true"
                src={servicesImage}
                fill
                sizes="(min-width: 1024px) 420px, 160px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-background/20 to-transparent">
                <div className="pointer-events-none absolute right-2 top-2 rounded-full border border-border bg-background/50 p-1.5 text-foreground/90 backdrop-blur">
                  <Layers3 className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
                </div>
              </div>
            </div>
          </header>
        </Reveal>

        <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.id} className="h-full">
              <article className="h-full">
                <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:opacity-95 hover:shadow-[0_22px_60px_-30px_rgba(0,0,0,0.85)]">
                  <CardHeader>
                    <div className="mb-2 grid place-items-start">
                      {serviceLordicons[s.id] ? (
                        <LordIcon
                          src={serviceLordicons[s.id]}
                          className="opacity-90 transition-opacity group-hover:opacity-100"
                          size={46}
                          trigger="loop-on-hover"
                        />
                      ) : null}
                    </div>
                    <CardTitle>{s.title}</CardTitle>
                    <CardDescription>{s.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {s.bullets.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 flex-none text-primary" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-14">
          <Reveal>
            <header className="max-w-2xl">
              <h3 className="text-xl font-semibold tracking-tight">Proyectos</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Ejemplos de entregables típicos según el tipo de servicio.
              </p>
            </header>
          </Reveal>

          <Tabs defaultValue={projectTabs[0]?.value ?? "web"} className="mt-6">
            <TabsList className="h-auto w-full flex-wrap justify-start">
              {projectTabs.map((t) => (
                <TabsTrigger key={t.value} value={t.value}>
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {projectTabs.map((t) => (
              <TabsContent key={t.value} value={t.value}>
                <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {t.projects.slice(0, 3).map((p) => (
                    <StaggerItem key={p.title} className="h-full">
                      <article className="h-full">
                        <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:opacity-95 hover:shadow-[0_22px_60px_-30px_rgba(0,0,0,0.85)]">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <span className="grid h-9 w-9 place-items-center rounded-[var(--radius-lg)] border border-border bg-muted/60 text-primary">
                                <p.Icon className="h-4 w-4" aria-hidden="true" />
                              </span>
                              <span>{p.title}</span>
                            </CardTitle>
                            <CardDescription>{p.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {p.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-foreground/90"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </article>
                    </StaggerItem>
                  ))}
                </Stagger>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
