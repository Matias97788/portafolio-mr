import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  const heroImage = "/visuals/hero.svg";
  const avatarImage = "/visuals/avatar_1.png";

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden border-b border-border"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(800px 500px at 15% 10%, rgba(99,102,241,0.22), transparent 60%), radial-gradient(700px 500px at 85% 20%, rgba(59,130,246,0.14), transparent 60%), radial-gradient(900px 700px at 40% 110%, rgba(99,102,241,0.12), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(500px 260px at 50% 30%, black 40%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto hidden w-full max-w-5xl -z-10 overflow-hidden rounded-[calc(var(--radius-lg)+14px)] border border-border bg-card/20 opacity-70 md:block">
          <div className="relative aspect-[16/7] w-full">
            <Image
              alt=""
              aria-hidden="true"
              src={heroImage}
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/55 to-background" />
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="text-center md:col-span-7 md:text-left">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground md:mx-0">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Desarrollo + automatización + consultoría
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              {subtitle}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start">
              <Button asChild size="lg">
                <a href="#contacto">
                  Cotizar <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="#servicios">Ver servicios</a>
              </Button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md md:col-span-5 md:max-w-none">
            <div className="relative overflow-hidden rounded-[calc(var(--radius-lg)+14px)] border border-border bg-card/40 p-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[calc(var(--radius-lg)+10px)] border border-border bg-card">
                <Image
                  alt="Matías Rodríguez, ingeniero en informática"
                  src={avatarImage}
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-background/70 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-3 text-left sm:grid-cols-3">
          <div className="rounded-[var(--radius-lg)] border border-border bg-card/60 p-4">
            <div className="text-sm font-semibold">Velocidad</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Entregas iterativas con foco en impacto.
            </div>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-border bg-card/60 p-4">
            <div className="text-sm font-semibold">Performance</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Core Web Vitals y arquitectura limpia.
            </div>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-border bg-card/60 p-4">
            <div className="text-sm font-semibold">Datos</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Medición con GA4 y decisiones informadas.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
