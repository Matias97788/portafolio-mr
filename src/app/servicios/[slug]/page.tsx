import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { AnimatedBlock } from "@/components/motion/animated";
import {
  getServiceSeo,
  SERVICE_IDS,
} from "@/lib/services/seo-content";
import { getBlogPost } from "@/lib/blog/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_IDS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceSeo(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `/servicios/${slug}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/servicios/${slug}`,
      title: service.metaTitle,
      description: service.metaDescription,
      siteName: SITE_NAME,
      locale: "es_CL",
    },
  };
}

export default async function ServicioPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceSeo(slug);
  if (!service) notFound();

  const relatedPosts = (
    await Promise.all(
      service.relatedBlogSlugs.map(async (postSlug) => {
        const post = await getBlogPost(postSlug);
        return post
          ? { slug: post.slug, title: post.title, description: post.description }
          : null;
      }),
    )
  ).filter(Boolean) as { slug: string; title: string; description: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.metaDescription,
        url: `${SITE_URL}/servicios/${slug}`,
        provider: {
          "@type": "Person",
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: {
          "@type": "Country",
          name: "Chile",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Servicios",
            item: `${SITE_URL}/servicios`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.shortTitle,
            item: `${SITE_URL}/servicios/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <main className="mx-auto w-full max-w-3xl px-4 py-12">
        <AnimatedBlock>
        <p className="text-sm text-muted-foreground">
          <Link href="/servicios" className="hover:text-foreground">
            ← Servicios
          </Link>
        </p>
        <p className="mt-6 text-sm font-medium text-primary">
          Servicio · Santiago, Chile
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {service.h1}
        </h1>
        <p className="mt-5 leading-7 text-muted-foreground">{service.intro}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="/contacto">Cotizar este servicio</a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a
              href="https://wa.me/56979428207"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </Button>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Qué entregas</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {service.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Cómo trabajamos</h2>
          <ol className="mt-6 space-y-6">
            {service.process.map((step, i) => (
              <li key={step.title} className="border-t border-border pt-5">
                <div className="text-xs text-muted-foreground">Paso {i + 1}</div>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">
            Preguntas frecuentes
          </h2>
          <div className="mt-6 space-y-3">
            {service.faqs.map((f) => (
              <details
                key={f.question}
                className="border-t border-border pt-4"
              >
                <summary className="cursor-pointer font-medium">
                  {f.question}
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {relatedPosts.length > 0 ? (
          <section className="mt-14">
            <h2 className="text-2xl font-semibold tracking-tight">
              Artículos relacionados
            </h2>
            <div className="mt-4 grid gap-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="border-t border-border pt-4 hover:text-primary"
                >
                  <div className="font-medium">{post.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {post.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-14 border-t border-border pt-8">
          <h2 className="text-xl font-semibold">¿Hablamos de tu proyecto?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Cuéntame objetivo, plazo y links de referencia. Te respondo con
            alcance, tiempos y costo estimado.
          </p>
          <Button asChild className="mt-5">
            <a href="/contacto">Ir al formulario</a>
          </Button>
        </section>
        </AnimatedBlock>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
