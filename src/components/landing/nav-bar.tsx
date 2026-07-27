"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#servicios", label: "Servicios" },
  { href: "#quien-soy", label: "Quién Soy" },
  { href: "#herramientas", label: "Herramientas" },
] as const;

export function NavBar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="#top" className="group inline-flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-[var(--radius-lg)] border border-border bg-card text-sm font-semibold">
            MR
          </div>
          <div className="hidden leading-tight sm:block">
            <div className="text-sm font-semibold tracking-tight">
              Matías Rodríguez
            </div>
            <div className="text-xs text-muted-foreground">
              Ingeniería en Informática
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#contacto">Cotizar</a>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="sr-only">Abrir menú</span>
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />

        <div
          id="mobile-nav"
          className={cn(
            "fixed left-3 right-3 top-[68px] z-50 overflow-hidden rounded-[calc(var(--radius-lg)+10px)] border border-border bg-card/95 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.85)] transition-all",
            open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
          )}
        >
          <div className="p-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="flex items-center justify-between rounded-[var(--radius-lg)] px-3 py-3 text-sm text-foreground/90 hover:bg-muted/60"
                onClick={() => setOpen(false)}
              >
                <span>{l.label}</span>
              </a>
            ))}
            <div className="mt-2 border-t border-border pt-2">
              <Button asChild size="lg" className="w-full">
                <a href="#contacto" onClick={() => setOpen(false)}>
                  Cotizar
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
