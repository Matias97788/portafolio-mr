const faqs = [
  {
    question: "¿Trabajas con empresas en Santiago y el resto de Chile?",
    answer:
      "Sí. Atiendo pymes y equipos en Santiago y a nivel nacional de forma remota, con reuniones por videollamada y entregas por etapas.",
  },
  {
    question: "¿Qué tipo de proyectos tomas?",
    answer:
      "Desarrollo web (Next.js), ecommerce (Shopify/WooCommerce), apps con React Native, automatización de leads/procesos, SEO técnico y consultoría de roadmap digital.",
  },
  {
    question: "¿Cómo es el proceso de cotización?",
    answer:
      "Me cuentas el objetivo, deadline y referencias. Te respondo con alcance, tiempos y costo estimado. Si calza, partimos por un entregable claro.",
  },
  {
    question: "¿Puedes mejorar un sitio o tienda que ya está online?",
    answer:
      "Sí. Muchos proyectos son de optimización: velocidad, conversión, tracking GA4, SEO técnico e integraciones.",
  },
];

export function HomeFaq() {
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
  };

  return (
    <section id="faq" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <h2 className="font-display text-3xl tracking-tight">
          Preguntas frecuentes
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Respuestas directas si estás evaluando desarrollo web, ecommerce o
          automatización en Chile.
        </p>
        <div className="mt-8 grid gap-3">
          {faqs.map((f) => (
            <details
              key={f.question}
              className="rounded-[var(--radius-lg)] border border-border bg-card/50 p-4"
            >
              <summary className="cursor-pointer font-medium">{f.question}</summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
