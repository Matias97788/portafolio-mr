"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

import type { PortfolioProject } from "@/lib/portfolio/projects";

export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full gap-4 rounded-[var(--radius-lg)] border border-border bg-card/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card sm:p-5"
    >
      <div className="relative h-14 w-14 flex-none overflow-hidden rounded-xl border border-border bg-background">
        <Image
          src={project.logo}
          alt={`Logo de ${project.title}`}
          fill
          sizes="56px"
          className="object-contain p-1.5"
          unoptimized
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
          <ExternalLink className="mt-1 h-4 w-4 flex-none text-muted-foreground transition-colors group-hover:text-primary" />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{project.summary}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span>{project.stack}</span>
          <span className="truncate opacity-70">
            {project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        </div>
      </div>
    </a>
  );
}
