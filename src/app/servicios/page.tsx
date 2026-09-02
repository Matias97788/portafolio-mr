import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SERVICE_SEO } from "@/lib/services/seo-content";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Servicios de desarrollo web, ecommerce y automatización en Chile",
  description:
    "Servicios digitales en Santiago y Chile: desarrollo web Next.js, Shopify/WooCommerce, apps, automatización, SEO técnico y consultoría para pymes.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios | Matías Rodríguez",
    description:
      "Desarrollo web, ecommerce, apps, automatización y growth para pymes en Chile.",
    url: `${SITE_URL}/servicios`,
  },
};

export default function ServiciosPage() {
  const services = Object.values(SERVICE_SEO);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios digitales",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/servicios/${s.id}`,
      name: s.title,
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="text-sm font-semibold">
            {SITE_NAME}
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/blog" className="text-muted-foreground hover:text-foreground">
              Blog
            </Link>
            <Link
              href="/#contacto"
              className="text-primary underline underline-offset-4"
            >
              Cotizar
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-14">
        <p className="text-sm text-muted-foreground">Santiago · Chile</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Servicios digitales para pymes en Chile
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Desarrollo web, ecommerce, apps, automatización y growth con foco en
          conversión, velocidad y operación. Elige un servicio para ver alcance,
          proceso y preguntas frecuentes.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.id}
              className="flex h-full flex-col rounded-[var(--radius-lg)] border border-border bg-card/50 p-6"
            >
              <h2 className="text-xl font-semibold">
                <Link
                  href={`/servicios/${s.id}`}
                  className="hover:text-primary"
                >
                  {s.shortTitle}
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {s.metaDescription}
              </p>
              <Button asChild variant="secondary" className="mt-5 w-fit">
                <Link href={`/servicios/${s.id}`}>Ver detalle</Link>
              </Button>
            </article>
          ))}
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
