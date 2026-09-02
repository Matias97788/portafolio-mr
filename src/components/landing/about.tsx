"use client";

import Image from "next/image";
import { User } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";

export function About({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const profileImage = "/visuals/profile.svg";

  return (
    <section id="quien-soy" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <div className="flex items-start gap-5 lg:flex-col">
              <div className="relative h-20 w-20 overflow-hidden rounded-[calc(var(--radius-lg)+10px)] border border-border bg-card sm:h-28 sm:w-28 lg:h-40 lg:w-40">
                <Image
                  alt="Monograma MR"
                  src={profileImage}
                  fill
                  sizes="160px"
                  className="object-cover"
                  priority
                />
                <div className="pointer-events-none absolute bottom-2 right-2 rounded-full border border-border bg-background/50 p-1.5 backdrop-blur">
                  <User className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
                </div>
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="primary">Ingeniero en Informática</Badge>
                  <Badge>Full Stack</Badge>
                  <Badge>WordPress</Badge>
                  <Badge>Shopify</Badge>
                  <Badge>WooCommerce</Badge>
                  <Badge>Zapier</Badge>
                  <Badge>MongoDB</Badge>
                  <Badge>Klaviyo</Badge>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.08}>
            <div className="rounded-[calc(var(--radius-lg)+8px)] border border-border bg-card/40 p-6">
              <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground sm:text-base">
                {body}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[var(--radius-lg)] border border-border bg-background/40 p-4">
                  <div className="text-sm font-semibold">Performance</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Core Web Vitals y velocidad real.
                  </div>
                </div>
                <div className="rounded-[var(--radius-lg)] border border-border bg-background/40 p-4">
                  <div className="text-sm font-semibold">Conversión</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    UX y medición para mejorar resultados.
                  </div>
                </div>
                <div className="rounded-[var(--radius-lg)] border border-border bg-background/40 p-4">
                  <div className="text-sm font-semibold">Automatización</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Menos tareas manuales, más foco.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
