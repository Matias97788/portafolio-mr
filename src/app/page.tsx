import { About } from "@/components/landing/about";
import { Contact } from "@/components/landing/contact";
import { DotNav } from "@/components/landing/dot-nav";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { NavBar } from "@/components/landing/nav-bar";
import { Projects } from "@/components/landing/projects";
import { ServicesGrid } from "@/components/landing/services-grid";
import { ToolsCarousel } from "@/components/landing/tools-carousel";
import { WhatsAppFab } from "@/components/landing/whatsapp-fab";
import { SITE_URL } from "@/lib/site";
import { getSiteConfig } from "@/lib/server/store";

export default async function Home() {
  const config = await getSiteConfig();
  const linkedInUrl = "https://www.linkedin.com/in/matias-rodriguez-sandoval-/";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Matías Rodríguez",
        jobTitle: "Ingeniero en Informática",
        url: SITE_URL,
        email: "mailto:matiasrodriguezsandoval@outlook.com",
        address: {
          "@type": "PostalAddress",
          addressCountry: "CL",
        },
        sameAs: [linkedInUrl],
      },
      {
        "@type": "OfferCatalog",
        name: "Servicios",
        itemListElement: config.services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.description,
          },
        })),
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
      <DotNav />

      <main id="contenido" className="flex-1">
        <Hero title={config.heroTitle} subtitle={config.heroSubtitle} />
        <ToolsCarousel />
        <Projects />
        <ServicesGrid services={config.services} />
        <About title={config.aboutTitle} body={config.aboutBody} />
        <Contact services={config.services} />
      </main>

      <Footer />
      <WhatsAppFab />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
