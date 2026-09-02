import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  const avatarImage = "/visuals/avatar_1.webp";

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden border-b border-border"
    >
      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="text-center md:col-span-7 md:text-left">
            <p className="text-sm font-medium tracking-wide text-primary">
              Santiago · Chile
            </p>

            <h1 className="font-display mt-4 text-balance text-4xl leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg md:mx-0 mx-auto">
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
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-border bg-card">
              <Image
                alt="Matías Rodríguez, ingeniero en informática"
                src={avatarImage}
                fill
                sizes="(max-width: 768px) 90vw, (min-width: 1024px) 420px, 50vw"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-border pt-8 text-left sm:grid-cols-3">
          <div>
            <div className="font-display text-lg">Velocidad</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Entregas iterativas con foco en impacto.
            </div>
          </div>
          <div>
            <div className="font-display text-lg">Performance</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Core Web Vitals y arquitectura limpia.
            </div>
          </div>
          <div>
            <div className="font-display text-lg">Datos</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Medición con GA4 y decisiones informadas.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
