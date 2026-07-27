export type ServiceId =
  | "desarrollo-web"
  | "ecommerce"
  | "apps-moviles"
  | "automatizacion"
  | "growth"
  | "gestion";

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  service: ServiceId;
  budget?: string;
  websiteUrl?: string;
  message: string;
  userAgent?: string;
  referrer?: string;
};

export type ServiceItem = {
  id: ServiceId;
  title: string;
  description: string;
  bullets: string[];
};

export type SiteConfig = {
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutBody: string;
  services: ServiceItem[];
  updatedAt: string;
};
