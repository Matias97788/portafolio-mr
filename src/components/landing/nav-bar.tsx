"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/portafolio", label: "Portafolio", kind: "route" },
  { href: "/servicios", label: "Servicios", kind: "route" },
  { href: "/blog", label: "Blog", kind: "route" },
  { href: "/#quien-soy", label: "Quién Soy", kind: "hash" },
  { href: "/#herramientas", label: "Herramientas", kind: "hash" },
] as const;

function resolveHref(href: string, pathname: string) {
  if (href.startsWith("/#") && pathname === "/") {
    return href.slice(1);
  }
  return href;
}

export function NavBar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="group inline-flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-md border border-border bg-card text-sm font-semibold tracking-tight text-foreground">
            MR
          </div>
          <div className="hidden leading-tight sm:block">
            <div className="text-sm font-semibold tracking-tight">
              Matías Rodríguez
            </div>
            <div className="text-xs text-muted-foreground">
              Desarrollo web · Chile
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {links.map((l) => {
            const href = resolveHref(l.href, pathname);
            const active =
              l.kind === "route" &&
              (pathname === l.href || pathname.startsWith(`${l.href}/`));

            return (
              <Link
                key={l.href}
                href={href}
                className={cn(
                  "transition-colors hover:text-foreground",
                  active && "text-foreground",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href={resolveHref("/#contacto", pathname)}>Cotizar</Link>
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
            "fixed inset-0 z-40 bg-foreground/25 backdrop-blur-[2px] transition-opacity",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />

        <div
          id="mobile-nav"
          className={cn(
            "fixed left-3 right-3 top-[68px] z-50 overflow-hidden rounded-xl border border-border bg-card shadow-lg transition-all",
            open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
          )}
        >
          <div className="p-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={resolveHref(l.href, pathname)}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-sm text-foreground/90 hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                <span>{l.label}</span>
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-2">
              <Button asChild size="lg" className="w-full">
                <Link
                  href={resolveHref("/#contacto", pathname)}
                  onClick={() => setOpen(false)}
                >
                  Cotizar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
