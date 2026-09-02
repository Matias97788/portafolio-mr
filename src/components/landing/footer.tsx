import Link from "next/link";
import { Link2 } from "lucide-react";

export function Footer() {
  const linkedInUrl = "https://www.linkedin.com/in/matias-rodriguez-sandoval-/";

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <div className="font-display text-xl tracking-tight">
              Matías Rodríguez
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Desarrollo web, ecommerce y automatización · Santiago, Chile
            </div>
            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              <div>
                <a className="hover:text-foreground" href="tel:+56979428207">
                  +56 9 7942 8207
                </a>
              </div>
              <div>
                <a
                  className="hover:text-foreground"
                  href="mailto:matiasrodriguezsandoval@outlook.com"
                >
                  matiasrodriguezsandoval@outlook.com
                </a>
              </div>
            </div>
            <a
              className="mt-4 inline-flex items-center gap-2 text-sm text-primary underline underline-offset-4"
              href={linkedInUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Link2 className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </a>
          </div>
          <div className="sm:justify-self-end">
            <div className="text-sm font-semibold">Menú</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link className="hover:text-foreground" href="/servicios">
                  Servicios
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/#proyectos">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/#quien-soy">
                  Quién Soy
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/#faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="hover:text-foreground" href="/#contacto">
                  Cotizar
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Matías Rodríguez</div>
          <div>Desarrollo web · Chile</div>
        </div>
      </div>
    </footer>
  );
}
