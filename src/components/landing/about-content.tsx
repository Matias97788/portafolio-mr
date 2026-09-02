import Image from "next/image";

import { Badge } from "@/components/ui/badge";

export function AboutContent({
  title,
  body,
  titleAs = "h2",
}: {
  title: string;
  body: string;
  titleAs?: "h1" | "h2";
}) {
  const Title = titleAs;
  const profileImage = "/visuals/avatar_1.webp";

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-5">
        <div className="flex items-start gap-5 lg:flex-col">
          <div className="relative h-28 w-28 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card sm:h-36 sm:w-36 lg:h-44 lg:w-44">
            <Image
              alt="Matías Rodríguez"
              src={profileImage}
              fill
              sizes="176px"
              className="object-cover"
              priority={titleAs === "h1"}
              unoptimized
            />
          </div>
          <div className="min-w-0">
            <Title
              className={
                titleAs === "h1"
                  ? "text-3xl font-semibold tracking-tight sm:text-4xl"
                  : "text-2xl font-semibold tracking-tight"
              }
            >
              {title}
            </Title>
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
      </div>

      <div className="lg:col-span-7">
        <div className="rounded-[var(--radius-lg)] border border-border bg-card/40 p-6">
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
      </div>
    </div>
  );
}
