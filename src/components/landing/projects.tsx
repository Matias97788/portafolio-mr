import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/lib/portfolio/projects";

export function Projects() {
  const projects = getFeaturedProjects(6);

  return (
    <section id="proyectos" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight">
                Trabajos recientes
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                WordPress custom, Shopify y sitios a medida para marcas en Chile
                y la región.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="w-fit">
              <Link href="/portafolio">
                Ver portafolio completo <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>

        <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <StaggerItem key={p.url} className="h-full">
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-border bg-card/40 p-5 transition-colors hover:bg-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <ExternalLink className="mt-1 h-4 w-4 flex-none text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {p.summary}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">{p.stack}</p>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
