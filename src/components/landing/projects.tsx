import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ProjectCard } from "@/components/portfolio/project-card";
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
              <ProjectCard project={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
