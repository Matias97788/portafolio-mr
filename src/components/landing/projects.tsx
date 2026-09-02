"use client";

import Image from "next/image";
import { ArrowUpRight, Check, ExternalLink, FolderKanban } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const projects = [
  {
    title: "Cúspide Digital",
    description:
      "Agencia digital chilena: sitio corporativo con foco en conversión, servicios y captación de leads.",
    tags: ["Next.js", "SEO", "Conversión"],
    results: [
      "Arquitectura de servicios clara",
      "CTAs orientados a cotización",
      "Base escalable para campañas",
    ],
    url: "https://cuspidedigital.cl/",
    role: "Desarrollo web",
  },
  {
    title: "Ultramin",
    description:
      "Sitio corporativo B2B para empresa minera: catálogo, contacto y presencia multi-sucursal.",
    tags: ["WordPress", "Performance", "B2B"],
    results: [
      "Secciones de productos y servicios",
      "Información de contacto por región",
      "Carga optimizada en mobile",
    ],
    url: "https://ultramin.cl/",
    role: "Desarrollo e implementación",
  },
  {
    title: "La Fusta Taller",
    description:
      "Sitio para taller artesanal: presentación de servicios, portafolio visual y contacto directo.",
    tags: ["WordPress", "UX", "Branding"],
    results: [
      "Diseño consistente con la marca",
      "Navegación simple y directa",
      "Contenido enfocado en conversión",
    ],
    role: "Diseño y desarrollo",
  },
  {
    title: "ISMED",
    description:
      "Plataforma web con módulos de integración, gestión de conexiones y panel administrativo.",
    tags: ["Web", "Integraciones", "Admin"],
    results: [
      "Jerarquía clara por módulos",
      "Flujos de gestión ordenados",
      "Experiencia accesible",
    ],
    role: "Desarrollo full stack",
  },
  {
    title: "Centro de Terapia",
    description:
      "Sitio institucional de salud: servicios, equipo profesional y formulario de contacto.",
    tags: ["Web", "Contenido", "SEO local"],
    results: [
      "Información estructurada por especialidad",
      "CTA de contacto visible",
      "Experiencia simple para pacientes",
    ],
    role: "Desarrollo web",
  },
];

export function Projects() {
  const projectsImage = "/visuals/projects.svg";

  return (
    <section id="proyectos" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <Reveal>
          <header className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="max-w-2xl lg:col-span-7">
              <h2 className="sr-only">Proyectos</h2>
              <p className="font-display text-3xl tracking-tight">
                Proyectos destacados
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Casos reales con foco en performance, conversión y claridad
                operativa.
              </p>
              <p className="mt-1 text-sm text-muted-foreground/80">
                Desde sitios corporativos hasta plataformas con integraciones y
                automatización.
              </p>
            </div>
            <div className="relative h-40 overflow-hidden rounded-[calc(var(--radius-lg)+10px)] border border-border bg-card lg:col-span-5 lg:h-44">
              <Image
                alt="Vista previa de proyectos"
                src={projectsImage}
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-background/10 to-transparent">
                <div className="pointer-events-none absolute right-3 top-3 rounded-full border border-border bg-background/50 p-2 text-foreground/90 backdrop-blur">
                  <FolderKanban className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                </div>
              </div>
            </div>
          </header>
        </Reveal>

        <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <StaggerItem key={p.title} className="h-full">
              <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:opacity-95 hover:shadow-[0_22px_60px_-30px_rgba(0,0,0,0.85)]">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between gap-2">
                    <span>{p.title}</span>
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground transition-colors hover:text-primary"
                        aria-label={`Ver sitio de ${p.title}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : null}
                  </CardTitle>
                  <CardDescription>{p.description}</CardDescription>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Rol: {p.role}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-semibold">Resultados</div>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {p.results.map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-primary" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {p.url ? (
                      <Button asChild variant="outline" size="sm">
                        <a href={p.url} target="_blank" rel="noreferrer">
                          Ver sitio <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : null}
                    <Button asChild variant="secondary" size="sm">
                      <a href="#contacto">
                        Cotizar algo similar{" "}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
