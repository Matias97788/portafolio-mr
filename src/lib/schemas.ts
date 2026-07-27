import { z } from "zod";

export const serviceIdSchema = z.enum([
  "desarrollo-web",
  "ecommerce",
  "apps-moviles",
  "automatizacion",
  "growth",
  "gestion",
]);

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre"),
  email: z.string().trim().email("Email inválido"),
  phone: z
    .string()
    .trim()
    .min(8, "Ingresa tu número de teléfono")
    .refine(
      (value) => {
        const normalized = value.replace(/[()\s-]/g, "");
        const hasPlus = normalized.startsWith("+");
        const digits = (hasPlus ? normalized.slice(1) : normalized).replace(
          /\D/g,
          "",
        );
        const validLen = digits.length >= 8 && digits.length <= 15;
        const validStart = !hasPlus || /^\+[1-9]\d*$/.test(normalized);
        return validLen && validStart;
      },
      "Teléfono inválido. Usa formato internacional (+56...) o un número local válido.",
    ),
  service: serviceIdSchema,
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  websiteUrl: z
    .string()
    .trim()
    .url("URL inválida. Ej: https://tusitio.cl")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
  message: z.string().trim().min(10, "Cuéntame un poco más (mínimo 10 caracteres)"),
});

export const siteConfigSchema = z.object({
  heroTitle: z.string().trim().min(4),
  heroSubtitle: z.string().trim().min(10),
  aboutTitle: z.string().trim().min(2),
  aboutBody: z.string().trim().min(20),
  services: z
    .array(
      z.object({
        id: serviceIdSchema,
        title: z.string().trim().min(2),
        description: z.string().trim().min(4),
        bullets: z.array(z.string().trim().min(2)).min(1),
      }),
    )
    .min(1),
});
