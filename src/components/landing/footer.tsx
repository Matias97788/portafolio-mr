import Link from "next/link";

import { LinkedInIcon } from "@/components/icons/linkedin";

const menu = [
  { href: "/portafolio", label: "Portafolio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/blog", label: "Blog" },
  { href: "/quien-soy", label: "Quién Soy" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacto", label: "Contacto" },
] as const;

export function Footer() {
  const linkedInUrl = "https://www.linkedin.com/in/matias-rodriguez-sandoval-/";

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <div className="text-sm font-semibold tracking-tight">
              Matías Rodríguez
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Desarrollo web, ecommerce y automatización · Santiago, Chile
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <a className="hover:text-foreground" href="tel:+56979428207">
                +56 9 7942 8207
              </a>
              <a
                className="hover:text-foreground"
                href="mailto:matiasrodriguezsandoval@outlook.com"
              >
                matiasrodriguezsandoval@outlook.com
              </a>
            </div>
            <a
              className="mt-5 inline-flex items-center gap-2 rounded-[var(--radius-lg)] border border-border bg-card px-3 py-2 text-sm text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
              href={linkedInUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn de Matías Rodríguez"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </div>

          <nav aria-label="Menú del pie" className="lg:pt-0.5">
            <div className="text-sm font-semibold">Menú</div>
            <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {menu.map((item) => (
                <li key={item.href}>
                  <Link
                    className="transition-colors hover:text-foreground"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Matías Rodríguez</div>
          <a
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            href={linkedInUrl}
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon className="h-3.5 w-3.5" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
