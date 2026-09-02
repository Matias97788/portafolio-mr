import { AboutContent } from "@/components/landing/about-content";
import { getSiteConfig } from "@/lib/server/store";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Quién soy",
  description:
    "Matías Rodríguez, Ingeniero en Informática en Santiago, Chile. Desarrollo web, ecommerce y automatización para pymes.",
  alternates: { canonical: "/quien-soy" },
};

export default async function QuienSoyPage() {
  const config = await getSiteConfig();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    jobTitle: "Ingeniero en Informática",
    url: SITE_URL,
    image: `${SITE_URL}/visuals/avatar_1.webp`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Santiago",
      addressCountry: "CL",
    },
    sameAs: ["https://www.linkedin.com/in/matias-rodriguez-sandoval-/"],
  };

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 py-14">
        <AboutContent
          title={config.aboutTitle}
          body={config.aboutBody}
          titleAs="h1"
        />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
