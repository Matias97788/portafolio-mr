import dynamic from "next/dynamic";
import Link from "next/link";

import { Hero } from "@/components/landing/hero";
import { NavBar } from "@/components/landing/nav-bar";
import { LazySection } from "@/components/motion/lazy-section";
import { PageEnter } from "@/components/motion/page-enter";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/site";
import { getSiteConfig } from "@/lib/server/store";

const DotNav = dynamic(() =>
  import("@/components/landing/dot-nav").then((m) => m.DotNav),
);

const Footer = dynamic(() =>
  import("@/components/landing/footer").then((m) => m.Footer),
);

const ToolsCarousel = dynamic(() =>
  import("@/components/landing/tools-carousel").then((m) => m.ToolsCarousel),
);

const Projects = dynamic(() =>
  import("@/components/landing/projects").then((m) => m.Projects),
);

const ServicesGrid = dynamic(() =>
  import("@/components/landing/services-grid").then((m) => m.ServicesGrid),
);

const WhatsAppFab = dynamic(() =>
  import("@/components/landing/whatsapp-fab").then((m) => m.WhatsAppFab),
);

export default async function Home() {
  const config = await getSiteConfig();
  const linkedInUrl = "https://www.linkedin.com/in/matias-rodriguez-sandoval-/";
  const phone = "+56979428207";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Matías Rodríguez",
        description:
          "Desarrollo web, ecommerce, apps y automatización para pymes en Santiago y Chile.",
        inLanguage: "es-CL",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Matías Rodríguez",
        jobTitle: "Ingeniero en Informática",
        url: SITE_URL,
        email: "mailto:matiasrodriguezsandoval@outlook.com",
        telephone: phone,
        image: `${SITE_URL}/visuals/avatar_1.webp`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Santiago",
          addressRegion: "Región Metropolitana",
          addressCountry: "CL",
        },
        sameAs: [linkedInUrl],
        knowsAbout: [
          "Next.js",
          "Shopify",
          "WordPress",
          "React Native",
          "SEO técnico",
          "Automatización",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: "Matías Rodríguez — Desarrollo & Consultoría Digital",
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        priceRange: "$$",
        telephone: phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Santiago",
          addressRegion: "Región Metropolitana",
          addressCountry: "CL",
        },
        areaServed: [
          { "@type": "City", name: "Santiago" },
          { "@type": "Country", name: "Chile" },
        ],
        founder: { "@id": `${SITE_URL}/#person` },
        sameAs: [linkedInUrl],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios",
          itemListElement: config.services.map((s, index) => ({
            "@type": "Offer",
            position: index + 1,
            url: `${SITE_URL}/servicios/${s.id}`,
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.description,
              url: `${SITE_URL}/servicios/${s.id}`,
            },
          })),
        },
      },
    ],
  };

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-lg)] focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:text-foreground focus:shadow"
      >
        Saltar al contenido
      </a>

      <div id="top" className="h-px" />
      <NavBar />

      <PageEnter className="flex-1">
        <main id="contenido">
          <Hero title={config.heroTitle} subtitle={config.heroSubtitle} />
          <LazySection minHeight={320}>
            <ToolsCarousel />
          </LazySection>
          <LazySection minHeight={420}>
            <Projects />
          </LazySection>
          <LazySection minHeight={520}>
            <ServicesGrid services={config.services} />
          </LazySection>

          <section className="border-b border-border">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  ¿Hablamos de tu proyecto?
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Cotiza, revisa quién soy o lee las preguntas frecuentes.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild>
                  <Link href="/contacto">Ir a contacto</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/quien-soy">Quién soy</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/faq">FAQ</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
      </PageEnter>

      <LazySection minHeight={160}>
        <Footer />
      </LazySection>
      <DotNav />
      <LazySection minHeight={0}>
        <WhatsAppFab />
      </LazySection>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
