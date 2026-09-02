import type { ServiceId } from "@/lib/types";

export type ServiceFaq = { question: string; answer: string };

export type ServiceSeoContent = {
  id: ServiceId;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  keywords: string[];
  outcomes: string[];
  process: { title: string; body: string }[];
  faqs: ServiceFaq[];
  relatedBlogSlugs: string[];
};

export const SERVICE_SEO: Record<ServiceId, ServiceSeoContent> = {
  "desarrollo-web": {
    id: "desarrollo-web",
    title: "Desarrollo web en Chile",
    shortTitle: "Desarrollo Web",
    metaTitle: "Desarrollo web Chile | Next.js, landings y sitios que convierten",
    metaDescription:
      "Desarrollo web en Santiago y Chile con Next.js: landings, sitios corporativos y performance. Foco en conversión, SEO técnico y Core Web Vitals.",
    h1: "Desarrollo web para pymes en Chile",
    intro:
      "Diseño y desarrollo sitios rápidos, claros y pensados para generar cotizaciones. Trabajo con Next.js y arquitectura limpia para que tu web no solo se vea bien: también rankee, cargue rápido en móvil y convierta visitas en conversaciones comerciales.",
    keywords: [
      "desarrollo web Chile",
      "desarrollo web Santiago",
      "agencia Next.js Chile",
      "landing page Chile",
      "sitio web pyme",
    ],
    outcomes: [
      "Landing o sitio corporativo listo para capturar leads",
      "Performance medible (LCP/INP/CLS) en móvil",
      "Base técnica lista para SEO y campañas",
      "Formularios, WhatsApp y tracking conectados",
    ],
    process: [
      {
        title: "Diagnóstico y objetivo",
        body: "Definimos qué debe lograr la web (cotizaciones, demos, ventas) y qué páginas priorizar.",
      },
      {
        title: "Diseño orientado a conversión",
        body: "Estructura de mensaje, CTAs y recorrido del usuario sin relleno visual.",
      },
      {
        title: "Desarrollo y deploy",
        body: "Implementación en Next.js, SEO técnico, formularios y puesta en producción.",
      },
      {
        title: "Medición e iteración",
        body: "Revisamos velocidad, eventos y formularios para mejorar la tasa de contacto.",
      },
    ],
    faqs: [
      {
        question: "¿Cuánto demora un sitio o landing?",
        answer:
          "Una landing enfocada suele tomar 1–3 semanas. Un sitio corporativo con varias secciones, 3–6 semanas según alcance e integraciones.",
      },
      {
        question: "¿Trabajas remoto desde Chile?",
        answer:
          "Sí. Atiendo pymes y equipos en Santiago y el resto de Chile de forma remota, con llamadas claras y entregas por etapas.",
      },
      {
        question: "¿Incluye SEO técnico?",
        answer:
          "Sí: URLs limpias, metadata, sitemap, schema básico, Core Web Vitals y estructura lista para contenido.",
      },
    ],
    relatedBlogSlugs: [
      "core-web-vitals-chile",
      "cuando-migrar-wordpress-a-nextjs",
    ],
  },
  ecommerce: {
    id: "ecommerce",
    title: "E-commerce Shopify y WooCommerce en Chile",
    shortTitle: "E-commerce",
    metaTitle: "Tienda online Chile | Shopify y WooCommerce que venden",
    metaDescription:
      "Implementación y optimización de e-commerce en Chile con Shopify o WooCommerce: checkout, pagos, stock, tracking y conversión.",
    h1: "E-commerce en Chile: Shopify y WooCommerce",
    intro:
      "Armo y optimizo tiendas online para vender con menos fricción: catálogo claro, checkout usable, integraciones de pago/despacho y medición real de conversiones. Ideal si ya tienes demanda y necesitas que la tienda no pierda ventas por UX o técnica.",
    keywords: [
      "tienda Shopify Chile",
      "WooCommerce Chile",
      "e-commerce Santiago",
      "agencia Shopify Chile",
      "optimizar checkout",
    ],
    outcomes: [
      "Tienda lista para vender con flujo de compra claro",
      "Integraciones de pago, envío y stock",
      "Eventos de compra y embudos medibles",
      "Mejoras de conversión en catálogo y checkout",
    ],
    process: [
      {
        title: "Auditoría de tienda o brief",
        body: "Revisamos fricción actual (o requisitos si partimos de cero) y priorizamos impacto en ventas.",
      },
      {
        title: "Implementación / optimización",
        body: "Shopify o WooCommerce según tu operación, temas, apps e integraciones necesarias.",
      },
      {
        title: "Tracking y QA",
        body: "Eventos de producto, carrito y compra; pruebas de pago y mobile.",
      },
      {
        title: "Iteración comercial",
        body: "Ajustes de UX y velocidad basados en datos de conversión.",
      },
    ],
    faqs: [
      {
        question: "¿Shopify o WooCommerce?",
        answer:
          "Shopify suele ser más rápido de operar y escalar. WooCommerce conviene si ya estás en WordPress y quieres control total. Te ayudo a elegir según margen, catálogo y equipo.",
      },
      {
        question: "¿Puedes integrar Transbank u otros pagos?",
        answer:
          "Sí. Integro pasarelas y flujos de pago compatibles con operación en Chile, según plataforma.",
      },
      {
        question: "¿También optimizas tiendas ya publicadas?",
        answer:
          "Sí. Muchos proyectos son de mejora: velocidad, checkout, tracking y sincronización de stock.",
      },
    ],
    relatedBlogSlugs: [
      "shopify-vs-woocommerce-chile",
      "checklist-performance-ecommerce",
    ],
  },
  "apps-moviles": {
    id: "apps-moviles",
    title: "Apps móviles React Native",
    shortTitle: "Apps Móviles",
    metaTitle: "Apps móviles Chile | React Native iOS y Android",
    metaDescription:
      "Desarrollo de apps móviles con React Native en Chile: producto, APIs, publicación en stores y mantenimiento.",
    h1: "Apps móviles con React Native en Chile",
    intro:
      "Construyo apps iOS/Android con React Native cuando el producto necesita presencia móvil real: onboarding, autenticación, notificaciones e integración con APIs. Enfoque de producto, no solo pantallas.",
    keywords: [
      "app móvil Chile",
      "React Native Chile",
      "desarrollo apps Santiago",
      "app iOS Android",
    ],
    outcomes: [
      "App multiplataforma con arquitectura mantenible",
      "Integración con backend/APIs existentes",
      "Preparación para App Store y Google Play",
      "Plan de releases y soporte",
    ],
    process: [
      {
        title: "Alcance de producto",
        body: "Definimos MVP, flujos críticos y métricas de éxito.",
      },
      {
        title: "UX y arquitectura",
        body: "Pantallas, estados, auth y estructura de código reutilizable.",
      },
      {
        title: "Desarrollo e integraciones",
        body: "Features, APIs, notificaciones y QA en dispositivos reales.",
      },
      {
        title: "Publicación",
        body: "Builds, revisión de stores y proceso de actualización.",
      },
    ],
    faqs: [
      {
        question: "¿App nativa o React Native?",
        answer:
          "Para la mayoría de productos B2B/B2C en Chile, React Native ofrece buen equilibrio costo/velocidad. Si hay requisitos muy nativos, lo evaluamos caso a caso.",
      },
      {
        question: "¿Incluye backend?",
        answer:
          "Puedo integrar tu API existente o coordinar el backend. El alcance se define en la propuesta.",
      },
    ],
    relatedBlogSlugs: ["automatizacion-leads-pymes"],
  },
  automatizacion: {
    id: "automatizacion",
    title: "Automatización de procesos y leads",
    shortTitle: "Automatización",
    metaTitle: "Automatización de procesos Chile | leads, CRM y Zapier",
    metaDescription:
      "Automatización para pymes en Chile: formularios, CRM, alertas, Zapier/Make e integraciones para responder más rápido y no perder leads.",
    h1: "Automatización de procesos para pymes en Chile",
    intro:
      "Si los leads llegan tarde o se pierden entre mails y planillas, automatizo el flujo: captura, alerta, enrutamiento y seguimiento. Menos trabajo manual, más velocidad comercial.",
    keywords: [
      "automatización pymes Chile",
      "Zapier Chile",
      "integración CRM",
      "automatizar leads",
    ],
    outcomes: [
      "Leads centralizados con alerta inmediata",
      "Conexión a CRM, Sheets, Notion o email",
      "Reglas por servicio o prioridad",
      "Menos tareas repetitivas del equipo",
    ],
    process: [
      {
        title: "Mapa del proceso actual",
        body: "Identificamos dónde se pierde tiempo o información.",
      },
      {
        title: "Diseño del flujo mínimo",
        body: "Priorizamos un pipeline simple que el equipo sí use.",
      },
      {
        title: "Integraciones",
        body: "Formularios, WhatsApp, CRM, alertas y logs.",
      },
      {
        title: "Monitoreo",
        body: "Validamos fallos, tiempos de respuesta y mejora continua.",
      },
    ],
    faqs: [
      {
        question: "¿Necesito Zapier sí o sí?",
        answer:
          "No. A veces basta una API propia. Usamos Zapier/Make cuando acelera sin sobreingeniería.",
      },
      {
        question: "¿Sirve para equipos chicos?",
        answer:
          "Especialmente. El objetivo es responder en minutos, no montar un ERP.",
      },
    ],
    relatedBlogSlugs: [
      "automatizacion-leads-pymes",
      "errores-seo-tecnico-nextjs",
    ],
  },
  growth: {
    id: "growth",
    title: "SEO técnico, GA4 y growth",
    shortTitle: "Growth",
    metaTitle: "SEO técnico y GA4 Chile | crecimiento medible",
    metaDescription:
      "SEO técnico, Core Web Vitals, GA4 y analítica para sitios en Chile. Decisiones con datos para atraer tráfico orgánico y medir conversiones.",
    h1: "Growth: SEO técnico y analítica en Chile",
    intro:
      "Ayudo a que tu sitio sea encontrable y medible: SEO técnico, velocidad, eventos de conversión y embudos claros. Ideal si ya inviertes en contenido o ads y necesitas base sólida.",
    keywords: [
      "SEO técnico Chile",
      "GA4 Chile",
      "Core Web Vitals",
      "consultor SEO Santiago",
    ],
    outcomes: [
      "Auditoría técnica accionable",
      "Setup GA4 con eventos de negocio",
      "Mejoras de indexación y performance",
      "Priorización por impacto comercial",
    ],
    process: [
      {
        title: "Auditoría",
        body: "Crawlabilidad, indexación, CWV, schema y tracking.",
      },
      {
        title: "Plan priorizado",
        body: "Quick wins vs proyectos estructurales.",
      },
      {
        title: "Implementación",
        body: "Cambios técnicos, medición y validación en Search Console/GA4.",
      },
      {
        title: "Seguimiento",
        body: "Revisión de posiciones, tráfico y conversiones.",
      },
    ],
    faqs: [
      {
        question: "¿Haces SEO de contenidos?",
        answer:
          "Sí, en conjunto con SEO técnico: estructura, keywords y páginas de servicio/blog orientadas a intención de búsqueda.",
      },
      {
        question: "¿Cuándo veo resultados orgánicos?",
        answer:
          "Depende de competencia y autoridad. Mejoras técnicas suelen ayudar en semanas; posiciones nuevas para keywords competitivas toman meses. Por eso medimos y priorizamos.",
      },
    ],
    relatedBlogSlugs: [
      "core-web-vitals-chile",
      "errores-seo-tecnico-nextjs",
    ],
  },
  gestion: {
    id: "gestion",
    title: "Consultoría y gestión digital",
    shortTitle: "Consultoría",
    metaTitle: "Consultoría digital Chile | roadmap técnico y priorización",
    metaDescription:
      "Consultoría digital y gestión de proyectos en Chile: auditoría técnica, roadmap, priorización y decisiones claras para equipos no técnicos.",
    h1: "Consultoría digital y gestión de proyectos",
    intro:
      "Si tienes varias iniciativas digitales y poco orden, ayudo a priorizar: qué construir, qué automatizar y qué medir. Claridad para dueños y equipos sin jerga innecesaria.",
    keywords: [
      "consultoría digital Chile",
      "auditoría técnica web",
      "roadmap digital pyme",
      "project management tech",
    ],
    outcomes: [
      "Roadmap priorizado por impacto",
      "Auditoría técnica entendible",
      "Criterios de decisión para vendors/stack",
      "Acompañamiento por etapas",
    ],
    process: [
      {
        title: "Diagnóstico",
        body: "Negocio, stack, riesgos y oportunidades.",
      },
      {
        title: "Priorización",
        body: "Qué hacer primero para ganar tracción o reducir costo operativo.",
      },
      {
        title: "Ejecución guiada",
        body: "Puedo implementar o coordinar con tu equipo.",
      },
      {
        title: "Control",
        body: "Hitos, métricas y ajustes.",
      },
    ],
    faqs: [
      {
        question: "¿Es solo asesoría o también implementas?",
        answer:
          "Ambos. Puedo quedarme en consultoría o ejecutar desarrollo/automatización según lo que necesites.",
      },
    ],
    relatedBlogSlugs: ["automatizacion-leads-pymes"],
  },
};

export const SERVICE_IDS = Object.keys(SERVICE_SEO) as ServiceId[];

export function getServiceSeo(id: string): ServiceSeoContent | null {
  if (id in SERVICE_SEO) return SERVICE_SEO[id as ServiceId];
  return null;
}
