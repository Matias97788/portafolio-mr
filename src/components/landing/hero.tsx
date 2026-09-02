import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  const avatarImage = "/visuals/avatar_1.webp";

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden border-b border-border"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 420px at 12% 0%, hsl(224 76% 56% / 0.16), transparent 55%), radial-gradient(560px 380px at 90% 10%, hsl(224 76% 56% / 0.08), transparent 50%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="text-center md:col-span-7 md:text-left">
            <p
              className="animate-fade-up text-sm text-muted-foreground"
              style={{ animationDelay: "40ms" }}
            >
              Ingeniero en Informática · Santiago, Chile
            </p>

            <h1
              className="animate-fade-up mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-[3.25rem] md:leading-[1.1]"
              style={{ animationDelay: "120ms" }}
            >
              {title}
            </h1>
            <p
              className="animate-fade-up mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg md:mx-0"
              style={{ animationDelay: "200ms" }}
            >
              {subtitle}
            </p>

            <div
              className="animate-fade-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start"
              style={{ animationDelay: "280ms" }}
            >
              <Button asChild size="lg">
                <Link href="/contacto">
                  Cotizar proyecto <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/portafolio">Ver portafolio</Link>
              </Button>
            </div>
          </div>

          <div
            className="animate-fade-up mx-auto w-full max-w-sm md:col-span-5 md:max-w-none"
            style={{ animationDelay: "180ms" }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card transition-transform duration-500 hover:scale-[1.01]">
              <Image
                alt="Matías Rodríguez, ingeniero en informática"
                src={avatarImage}
                fill
                sizes="(max-width: 768px) 90vw, (min-width: 1024px) 400px, 45vw"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
