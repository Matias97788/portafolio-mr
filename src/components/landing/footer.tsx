import Image from "next/image";
import Link from "next/link";
import { Link2, Sparkles } from "lucide-react";

export function Footer() {
  const linkedInUrl = "https://www.linkedin.com/in/matias-rodriguez-sandoval-/";
  const footerImage = "/visuals/footer.svg";

  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="relative mb-8 hidden overflow-hidden rounded-[calc(var(--radius-lg)+10px)] border border-border bg-card sm:block">
          <div className="relative h-28 w-full">
            <Image
              alt=""
              aria-hidden="true"
              src={footerImage}
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/30 to-background/85">
              <div className="pointer-events-none absolute right-3 top-3 rounded-full border border-border bg-background/50 p-2 text-foreground/90 backdrop-blur">
                <Sparkles className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <div className="text-sm font-semibold">Matías Rodríguez</div>
            <div className="mt-2 text-sm text-muted-foreground">
              Ingeniería en Informática · Desarrollo & Consultoría Digital
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
                <Link className="hover:text-foreground" href="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <a className="hover:text-foreground" href="#proyectos">
                  Proyectos
                </a>
              </li>
              <li>
                <a className="hover:text-foreground" href="#servicios">
                  Servicios
                </a>
              </li>
              <li>
                <a className="hover:text-foreground" href="#quien-soy">
                  Quién Soy
                </a>
              </li>
              <li>
                <a className="hover:text-foreground" href="#herramientas">
                  Herramientas
                </a>
              </li>
              <li>
                <a className="hover:text-foreground" href="#contacto">
                  Cotizar
                </a>
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
