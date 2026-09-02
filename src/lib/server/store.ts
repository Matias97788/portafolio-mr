import { promises as fs } from "fs";
import os from "os";
import path from "path";

import type { Lead, SiteConfig } from "@/lib/types";

const appDataDir = path.join(process.cwd(), "data");
const dataDir = process.env.VERCEL ? path.join(os.tmpdir(), "portafolio-matias") : appDataDir;
const configPath = path.join(dataDir, "config.json");
const leadsPath = path.join(dataDir, "leads.json");

const defaultConfig: SiteConfig = {
  heroTitle: "Desarrollo web y automatización para pymes en Chile",
  heroSubtitle:
    "Next.js, Shopify, apps y procesos digitales con foco en conversión, velocidad y leads. Trabajo remoto desde Santiago para equipos en todo Chile.",
  aboutTitle: "Quién soy",
  aboutBody:
    "Soy Matías Rodríguez, Ingeniero en Informática en Santiago, Chile. Diseño y construyo productos digitales con mentalidad de ingeniería: arquitectura clara, código mantenible y decisiones guiadas por datos. Ayudo a pymes a tener web, ecommerce y automatización que realmente generan contactos y ventas.",
  services: [
    {
      id: "desarrollo-web",
      title: "Desarrollo Web",
      description: "Landing, corporativa o a medida. De la idea al deploy.",
      bullets: [
        "Next.js y arquitectura escalable",
        "UX orientado a conversión",
        "Performance (Core Web Vitals)",
      ],
    },
    {
      id: "ecommerce",
      title: "E-commerce",
      description: "Shopify o WooCommerce para vender sin fricción.",
      bullets: ["Implementación y optimización", "Integraciones y pagos", "Mejora de conversión"],
    },
    {
      id: "apps-moviles",
      title: "Apps Móviles",
      description: "React Native para iOS/Android con enfoque producto.",
      bullets: ["Arquitectura y componentes", "Integración APIs", "Publicación y soporte"],
    },
    {
      id: "automatizacion",
      title: "Automatización y Procesos",
      description: "Zapier e integraciones para operar con menos esfuerzo.",
      bullets: ["Workflows y triggers", "Conectores a CRM/Sheets/Notion", "Alertas y reportes"],
    },
    {
      id: "growth",
      title: "Growth",
      description: "SEO, analítica (GA4) y comunicación para crecer.",
      bullets: ["Setup GA4 y eventos", "SEO técnico", "Email marketing e iteración"],
    },
    {
      id: "gestion",
      title: "Gestión y Consultoría",
      description: "Planificación, roadmaps y decisiones digitales con claridad.",
      bullets: ["Project management", "Auditoría técnica", "Estrategia y priorización"],
    },
  ],
  updatedAt: new Date().toISOString(),
};

let writeQueue: Promise<void> = Promise.resolve();

async function seedFile<T>(
  targetPath: string,
  sourcePath: string,
  fallback: T,
) {
  try {
    await fs.access(targetPath);
    return;
  } catch {}

  try {
    const raw = await fs.readFile(sourcePath, "utf8");
    await fs.writeFile(targetPath, raw, "utf8");
    return;
  } catch {}

  await fs.writeFile(targetPath, JSON.stringify(fallback, null, 2), "utf8");
}

async function ensureDataFiles() {
  await fs.mkdir(dataDir, { recursive: true });

  await seedFile(configPath, path.join(appDataDir, "config.json"), defaultConfig);
  await seedFile(leadsPath, path.join(appDataDir, "leads.json"), []);
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  await ensureDataFiles();
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(filePath: string, value: T) {
  await ensureDataFiles();
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

function enqueueWrite<T>(fn: () => Promise<T>): Promise<T> {
  const next = writeQueue.then(fn, fn);
  writeQueue = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
}

export async function getSiteConfig(): Promise<SiteConfig> {
  return readJson(configPath, defaultConfig);
}

export async function updateSiteConfig(
  partial: Partial<Omit<SiteConfig, "updatedAt">>,
): Promise<SiteConfig> {
  return enqueueWrite(async () => {
    const current = await getSiteConfig();
    const next: SiteConfig = {
      ...current,
      ...partial,
      services: partial.services ?? current.services,
      updatedAt: new Date().toISOString(),
    };
    await writeJson(configPath, next);
    return next;
  });
}

export async function createLead(
  lead: Omit<Lead, "id" | "createdAt">,
): Promise<Lead> {
  return enqueueWrite(async () => {
    const items = await readJson<Lead[]>(leadsPath, []);
    const nextLead: Lead = {
      ...lead,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    items.unshift(nextLead);
    await writeJson(leadsPath, items);
    return nextLead;
  });
}

export async function listLeads(): Promise<Lead[]> {
  return readJson(leadsPath, []);
}
