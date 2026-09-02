import Link from "next/link";

import { ProjectCard } from "@/components/portfolio/project-card";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_PROJECTS,
  getProjectsByCategory,
} from "@/lib/portfolio/projects";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Portafolio",
  description:
    "Portafolio de Matías Rodríguez: sitios WordPress custom, Shopify y proyectos web para marcas en Chile y la región.",
  alternates: { canonical: "/portafolio" },
  openGraph: {
    title: "Portafolio | Matías Rodríguez",
    description:
      "WordPress custom, Shopify y sitios a medida. Trabajos para Innovax, Nomanadas y proyectos personales.",
    url: `${SITE_URL}/portafolio`,
  },
};

export default function PortafolioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Portafolio — ${SITE_NAME}`,
    url: `${SITE_URL}/portafolio`,
    about: PORTFOLIO_PROJECTS.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      url: p.url,
    })),
  };

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 py-14">
        <p className="text-sm text-muted-foreground">
          {PORTFOLIO_PROJECTS.length} proyectos seleccionados
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Portafolio
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Sitios y tiendas que he construido o implementado: WordPress a medida
          (Innovax), Shopify, proyectos con Nomanadas y encargos directos.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="rounded-[var(--radius-lg)] border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {cat.label}
            </a>
          ))}
        </div>

        <div className="mt-14 space-y-16">
          {PORTFOLIO_CATEGORIES.map((cat) => {
            const projects = getProjectsByCategory(cat.id);
            if (!projects.length) return null;

            return (
              <section key={cat.id} id={cat.id} className="scroll-mt-28">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {cat.label}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {cat.description}
                </p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {projects.map((p) => (
                    <li key={p.url}>
                      <ProjectCard project={p} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <section className="mt-16 rounded-[var(--radius-lg)] border border-border bg-card/40 p-6">
          <h2 className="text-xl font-semibold">¿Quieres un proyecto similar?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Cuéntame el objetivo y te propongo alcance, tiempos y costo estimado.
          </p>
          <Link
            href="/contacto"
            className="mt-4 inline-flex text-sm text-primary underline underline-offset-4"
          >
            Ir a contacto
          </Link>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
