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

export async function generateBlogDraft(
  input: GenerateInput = {},
): Promise<GeneratedBlogDraft> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY no configurada");
  }

  const topic = input.topic?.trim() || pickAutoTopic();

  const prompt = `Eres un consultor digital chileno llamado Matías Rodríguez (desarrollo web, Next.js, Shopify, automatización).

Escribe un artículo de blog en español (Chile), útil y concreto, sobre: "${topic}".

Requisitos:
- Tono profesional, claro, sin relleno.
- 700 a 950 palabras en markdown.
- Incluye H2 y H3.
- Incluye una lista con viñetas y un bloque de conclusión con CTA suave hacia cotizar en matiasrodriguez.dev.
- No inventes métricas ni clientes falsos.
- Enfócate en valor práctico para dueños de negocio y equipos de marketing.

Devuelve SOLO JSON válido con esta forma:
{
  "title": "...",
  "description": "meta description SEO de máximo 155 caracteres",
  "content": "markdown del artículo",
  "linkedinText": "texto para LinkedIn de máximo 1200 caracteres con 3-5 hashtags al final",
  "tags": ["tag1", "tag2", "tag3"]
}`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
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
    throw new Error(`OpenAI error: ${await res.text()}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI no devolvió contenido");

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
