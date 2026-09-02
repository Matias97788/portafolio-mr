import { slugify } from "@/lib/blog/posts";
import type { GeneratedBlogDraft } from "@/lib/blog/types";

const blogTopics = [
  "Core Web Vitals para pymes en Chile",
  "Cómo elegir entre Shopify y WooCommerce",
  "Automatización de leads con formularios y CRM",
  "Errores comunes de SEO técnico en sitios Next.js",
  "Checklist de performance para ecommerce",
  "Cuándo conviene migrar de WordPress a Next.js",
] as const;

type GenerateInput = {
  topic?: string;
};

type AiProviderConfig = {
  apiKey: string;
  baseUrl: string;
  model: string;
  provider: "groq" | "gemini" | "openai" | "custom";
};

function extractJson(raw: string) {
  const fenced = raw.match(/```json\s*([\s\S]*?)```/i);
  const candidate = fenced?.[1]?.trim() ?? raw.trim();
  return JSON.parse(candidate) as {
    title: string;
    description: string;
    content: string;
    linkedinText: string;
    tags: string[];
  };
}

export function pickAutoTopic() {
  const index = new Date().getUTCDay() % blogTopics.length;
  return blogTopics[index];
}

/** Prefer free Groq / Gemini keys over paid OpenAI. */
export function getAiProviderConfig(): AiProviderConfig | null {
  const groqKey = process.env.GROQ_API_KEY?.trim();
  if (groqKey) {
    return {
      provider: "groq",
      apiKey: groqKey,
      baseUrl: "https://api.groq.com/openai/v1",
      model: process.env.AI_MODEL?.trim() || "llama-3.3-70b-versatile",
    };
  }

  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  if (geminiKey) {
    return {
      provider: "gemini",
      apiKey: geminiKey,
      baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai",
      model: process.env.AI_MODEL?.trim() || "gemini-2.0-flash",
    };
  }

  const openAiKey =
    process.env.AI_API_KEY?.trim() || process.env.OPENAI_API_KEY?.trim();
  if (openAiKey) {
    const baseUrl =
      process.env.AI_BASE_URL?.trim() || "https://api.openai.com/v1";
    const provider =
      baseUrl.includes("groq.com")
        ? "groq"
        : baseUrl.includes("googleapis.com")
          ? "gemini"
          : baseUrl.includes("openai.com")
            ? "openai"
            : "custom";

    return {
      provider,
      apiKey: openAiKey,
      baseUrl: baseUrl.replace(/\/$/, ""),
      model:
        process.env.AI_MODEL?.trim() ||
        process.env.OPENAI_MODEL?.trim() ||
        (provider === "groq" ? "llama-3.3-70b-versatile" : "gpt-4o-mini"),
    };
  }

  return null;
}

export function isAiConfigured() {
  return Boolean(getAiProviderConfig());
}

export async function generateBlogDraft(
  input: GenerateInput = {},
): Promise<GeneratedBlogDraft> {
  const config = getAiProviderConfig();
  if (!config) {
    throw new Error(
      "IA no configurada. Agrega GROQ_API_KEY (gratis en console.groq.com) o GEMINI_API_KEY (gratis en aistudio.google.com).",
    );
  }

  const topic = input.topic?.trim() || pickAutoTopic();

  const prompt = `Eres un consultor digital chileno llamado Matías Rodríguez (desarrollo web, Next.js, Shopify, automatización).

Escribe un artículo de blog en español (Chile), útil y concreto, sobre: "${topic}".

Requisitos:
- Tono profesional, claro, sin relleno.
- 700 a 950 palabras en markdown.
- Incluye H2 y H3.
- Incluye una lista con viñetas y un bloque de conclusión con CTA suave hacia cotizar.
- Incluye 1–2 enlaces markdown internos a páginas relevantes como /servicios/desarrollo-web, /servicios/ecommerce, /servicios/automatizacion, /servicios/growth o /blog.
- No inventes métricas ni clientes falsos.
- Enfócate en valor práctico para dueños de negocio y equipos de marketing en Chile.

Devuelve SOLO JSON válido con esta forma:
{
  "title": "...",
  "description": "meta description SEO de máximo 155 caracteres",
  "content": "markdown del artículo",
  "linkedinText": "texto para LinkedIn de máximo 1200 caracteres con 3-5 hashtags al final",
  "tags": ["tag1", "tag2", "tag3"]
}`;

  const res = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "Respondes únicamente JSON válido. Eres experto en SEO técnico y desarrollo web.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`${config.provider} error: ${await res.text()}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("La IA no devolvió contenido");

  const parsed = extractJson(content);
  const slug = slugify(parsed.title);

  return {
    slug,
    title: parsed.title,
    description: parsed.description,
    content: parsed.content,
    linkedinText: parsed.linkedinText,
    tags: parsed.tags,
  };
}
