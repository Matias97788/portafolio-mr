export type PortfolioCategory =
  | "innovax"
  | "shopify"
  | "nomanadas"
  | "personal";

export type PortfolioProject = {
  title: string;
  url: string;
  category: PortfolioCategory;
  stack: string;
  summary: string;
  featured?: boolean;
};

export const PORTFOLIO_CATEGORIES: {
  id: PortfolioCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "innovax",
    label: "Innovax · WordPress custom",
    description:
      "Sitios WordPress a medida desarrollados para clientes de Innovax.",
  },
  {
    id: "shopify",
    label: "Shopify",
    description: "Tiendas y experiencias ecommerce sobre Shopify.",
  },
  {
    id: "nomanadas",
    label: "Nomanadas",
    description: "Proyectos desarrollados en el contexto de Nomanadas.",
  },
  {
    id: "personal",
    label: "Proyectos personales / directos",
    description: "Trabajos independientes y encargos directos.",
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    title: "Koslan",
    url: "https://www.koslan.cl/",
    category: "innovax",
    stack: "WordPress custom",
    summary: "Sitio corporativo WordPress a medida.",
    featured: true,
  },
  {
    title: "Instituto Base",
    url: "https://institutobase.cl/",
    category: "innovax",
    stack: "WordPress custom",
    summary: "Presencia web institucional con estructura de contenidos clara.",
    featured: true,
  },
  {
    title: "Bienestar Finning",
    url: "https://bienestarfinning.cl/",
    category: "innovax",
    stack: "WordPress custom",
    summary: "Sitio de bienestar corporativo orientado a información y acceso.",
  },
  {
    title: "Nexsolar",
    url: "https://nexsolar.cl/",
    category: "innovax",
    stack: "WordPress custom",
    summary: "Web para empresa de energía solar.",
    featured: true,
  },
  {
    title: "SGSCM",
    url: "https://www.sgscm.cl/",
    category: "innovax",
    stack: "WordPress custom",
    summary: "Sitio corporativo WordPress personalizado.",
  },
  {
    title: "The Merch Studio",
    url: "https://themerchstudio.cl/",
    category: "innovax",
    stack: "WordPress custom",
    summary: "Presencia web para estudio de merchandising.",
  },
  {
    title: "Pet Beauty",
    url: "https://petbeauty.kinsta.cloud/",
    category: "innovax",
    stack: "WordPress · Kinsta",
    summary: "Sitio WordPress hospedado en Kinsta.",
  },
  {
    title: "Nano Negocios",
    url: "https://nanonegocios.kinsta.cloud/",
    category: "innovax",
    stack: "WordPress · Kinsta",
    summary: "Plataforma WordPress para nano negocios.",
  },
  {
    title: "Don Salo",
    url: "https://donsalo.cl/",
    category: "innovax",
    stack: "WordPress custom",
    summary: "Sitio WordPress a medida.",
  },
  {
    title: "New Science",
    url: "https://www.newscience.com.ar/",
    category: "shopify",
    stack: "Shopify",
    summary: "Tienda Shopify para marca de ciencia y productos.",
    featured: true,
  },
  {
    title: "Nomanadas",
    url: "https://nomanadas.com/",
    category: "nomanadas",
    stack: "Web",
    summary: "Sitio principal de Nomanadas.",
    featured: true,
  },
  {
    title: "Riaspa",
    url: "https://www.riaspa.cl/",
    category: "nomanadas",
    stack: "Web",
    summary: "Proyecto web desarrollado junto a Nomanadas.",
  },
  {
    title: "María José Sáez",
    url: "https://mariajosesaez.cl/",
    category: "personal",
    stack: "Web",
    summary: "Sitio personal / profesional.",
  },
  {
    title: "Alpaka Studio",
    url: "https://www.alpakastudio.cl/",
    category: "personal",
    stack: "Web",
    summary: "Presencia web para estudio creativo.",
    featured: true,
  },
  {
    title: "KYS Group",
    url: "https://kysgroup.cl/",
    category: "personal",
    stack: "Web",
    summary: "Sitio corporativo para grupo empresarial.",
  },
  {
    title: "Cúspide Digital",
    url: "https://cuspidedigital.cl/",
    category: "personal",
    stack: "Next.js",
    summary: "Agencia digital: sitio con foco en servicios y captación de leads.",
    featured: true,
  },
];

export function getFeaturedProjects(limit = 6) {
  const featured = PORTFOLIO_PROJECTS.filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return PORTFOLIO_PROJECTS.slice(0, limit);
}

export function getProjectsByCategory(category: PortfolioCategory) {
  return PORTFOLIO_PROJECTS.filter((p) => p.category === category);
}
