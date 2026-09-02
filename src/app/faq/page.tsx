import { FaqList } from "@/components/landing/faq-list";
import { faqs } from "@/lib/content/faqs";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Preguntas frecuentes",
  description:
    "FAQ sobre desarrollo web, ecommerce, automatización y cotización de proyectos en Chile.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
    url: `${SITE_URL}/faq`,
  };

  return (
    <>
      <main className="mx-auto w-full max-w-3xl px-4 py-14">
        <FaqList titleAs="h1" />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
