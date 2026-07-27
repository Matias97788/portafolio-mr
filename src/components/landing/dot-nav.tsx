"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type DotNavItem = { id: string; label: string };

const items: DotNavItem[] = [
  { id: "top", label: "Inicio" },
  { id: "herramientas", label: "Herramientas" },
  { id: "servicios", label: "Servicios" },
  { id: "proyectos", label: "Proyectos" },
  { id: "quien-soy", label: "Quién soy" },
  { id: "contacto", label: "Contacto" },
];

export function DotNav({ className }: { className?: string }) {
  const [activeId, setActiveId] = React.useState(items[0]?.id ?? "top");

  React.useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const first = visible[0]?.target as HTMLElement | undefined;
        if (first?.id) setActiveId(first.id);
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.65, 0.8] },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Navegación por secciones"
      className={cn(
        "fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:block",
        className,
      )}
    >
      <div className="rounded-full border border-border bg-card/70 p-2 shadow-sm backdrop-blur">
        <ul className="grid gap-2">
          {items.map((i) => {
            const active = i.id === activeId;
            return (
              <li key={i.id} className="grid place-items-center">
                <a
                  href={`#${i.id}`}
                  aria-label={i.label}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "group grid h-3 w-3 place-items-center rounded-full border border-border transition-all",
                    active
                      ? "bg-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.18)]"
                      : "bg-muted/40 hover:bg-muted/70",
                  )}
                >
                  <span className="sr-only">{i.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

