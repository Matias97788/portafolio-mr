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
  logo: string;
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
    logo: "/portfolio/logos/koslan-cl.png",
    featured: true,
  },
  {
    title: "Instituto Base",
    url: "https://institutobase.cl/",
    category: "innovax",
    stack: "WordPress custom",
    summary: "Presencia web institucional con estructura de contenidos clara.",
    logo: "/portfolio/logos/institutobase-cl.png",
    featured: true,
  },
  {
    title: "Bienestar Finning",
    url: "https://bienestarfinning.cl/",
    category: "innovax",
    stack: "WordPress custom",
    summary: "Sitio de bienestar corporativo orientado a información y acceso.",
    logo: "/portfolio/logos/bienestarfinning-cl.png",
  },
  {
    title: "Nexsolar",
    url: "https://nexsolar.cl/",
    category: "innovax",
    stack: "WordPress custom",
    summary: "Web para empresa de energía solar.",
    logo: "/portfolio/logos/nexsolar-cl.png",
    featured: true,
  },
  {
    title: "SGSCM",
    url: "https://www.sgscm.cl/",
    category: "innovax",
    stack: "WordPress custom",
    summary: "Sitio corporativo WordPress personalizado.",
    logo: "/portfolio/logos/sgscm-cl.png",
  },
  {
    title: "The Merch Studio",
    url: "https://themerchstudio.cl/",
    category: "innovax",
    stack: "WordPress custom",
    summary: "Presencia web para estudio de merchandising.",
    logo: "/portfolio/logos/themerchstudio-cl.png",
  },
  {
    title: "Pet Beauty",
    url: "https://petbeauty.kinsta.cloud/",
    category: "innovax",
    stack: "WordPress · Kinsta",
    summary: "Sitio WordPress hospedado en Kinsta.",
    logo: "/portfolio/logos/petbeauty-kinsta-cloud.svg",
  },
  {
    title: "Nano Negocios",
    url: "https://nanonegocios.kinsta.cloud/",
    category: "innovax",
    stack: "WordPress · Kinsta",
    summary: "Plataforma WordPress para nano negocios.",
    logo: "/portfolio/logos/nanonegocios-kinsta-cloud.png",
  },
  {
    title: "Don Salo",
    url: "https://donsalo.cl/",
    category: "innovax",
    stack: "WordPress custom",
    summary: "Sitio WordPress a medida.",
    logo: "/portfolio/logos/donsalo-cl.png",
  },
  {
    title: "New Science",
    url: "https://www.newscience.com.ar/",
    category: "shopify",
    stack: "Shopify",
    summary: "Tienda Shopify para marca de ciencia y productos.",
    logo: "/portfolio/logos/newscience-com-ar.png",
    featured: true,
  },
  {
    title: "Nomanadas",
    url: "https://nomanadas.com/",
    category: "nomanadas",
    stack: "Web",
    summary: "Sitio principal de Nomanadas.",
    logo: "/portfolio/logos/nomanadas-com.png",
    featured: true,
  },
  {
    title: "Riaspa",
    url: "https://www.riaspa.cl/",
    category: "nomanadas",
    stack: "Web",
    summary: "Proyecto web desarrollado junto a Nomanadas.",
    logo: "/portfolio/logos/riaspa-cl.svg",
  },
  {
    title: "María José Sáez",
    url: "https://mariajosesaez.cl/",
    category: "personal",
    stack: "Web",
    summary: "Sitio personal / profesional.",
    logo: "/portfolio/logos/mariajosesaez-cl.png",
  },
  {
    title: "Alpaka Studio",
    url: "https://www.alpakastudio.cl/",
    category: "personal",
    stack: "Web",
    summary: "Presencia web para estudio creativo.",
    logo: "/portfolio/logos/alpakastudio-cl.png",
    featured: true,
  },
  {
    title: "KYS Group",
    url: "https://kysgroup.cl/",
    category: "personal",
    stack: "Web",
    summary: "Sitio corporativo para grupo empresarial.",
    logo: "/portfolio/logos/kysgroup-cl.png",
  },
  {
    title: "Cúspide Digital",
    url: "https://cuspidedigital.cl/",
    category: "personal",
    stack: "Next.js",
    summary: "Agencia digital: sitio con foco en servicios y captación de leads.",
    logo: "/portfolio/logos/cuspidedigital-cl.png",
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
