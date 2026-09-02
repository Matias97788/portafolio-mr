"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { BlogPostMeta, GeneratedBlogDraft } from "@/lib/blog/types";

type Notice =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

function siteOrigin() {
  if (typeof window !== "undefined") return window.location.origin;
  return "https://matiasrodriguez.dev";
}

async function shareOnLinkedIn(input: {
  text: string;
  url: string;
}) {
  const fullText = `${input.text.trim()}\n\n${input.url}`.trim();

  try {
    await navigator.clipboard.writeText(fullText);
  } catch {
    // Fallback for older browsers / denied clipboard
    const area = document.createElement("textarea");
    area.value = fullText;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
  }

  // Opens LinkedIn composer in a new tab (session of the logged-in user).
  // Text is also in clipboard so you can paste if LinkedIn ignores the query.
  const composeUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(fullText)}`;
  window.open(composeUrl, "_blank", "noopener,noreferrer");
}

export function AdminBlog({ initialPosts }: { initialPosts: BlogPostMeta[] }) {
  const [topic, setTopic] = React.useState("");
  const [draft, setDraft] = React.useState<GeneratedBlogDraft | null>(null);
  const [posts, setPosts] = React.useState(initialPosts);
  const [loading, setLoading] = React.useState<"generate" | "publish" | null>(
    null,
  );
  const [notice, setNotice] = React.useState<Notice>(null);
  const [lastPublishedUrl, setLastPublishedUrl] = React.useState<string | null>(
    null,
  );

  const generate = async () => {
    setLoading("generate");
    setNotice(null);
    const res = await fetch("/api/blog/generate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ topic: topic || undefined }),
    });
    const data = await res.json().catch(() => null);
    setLoading(null);

    if (!res.ok) {
      setNotice({
        type: "error",
        message: data?.error ?? "No se pudo generar el artículo",
      });
      return;
    }

    setDraft(data.draft as GeneratedBlogDraft);
    setLastPublishedUrl(null);
    setNotice({
      type: "success",
      message:
        "Borrador listo abajo. Revísalo y pulsa “Publicar en web” para que salga en el sitio.",
    });

    requestAnimationFrame(() => {
      document.getElementById("draft-review")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const publish = async () => {
    if (!draft) return;
    setLoading("publish");
    setNotice(null);
    const res = await fetch("/api/blog/publish", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...draft, status: "published" }),
    });
    const data = await res.json().catch(() => null);
    setLoading(null);

    if (!res.ok) {
      setNotice({
        type: "error",
        message:
          data?.error ??
          "No se pudo publicar. Revisa GITHUB_TOKEN en Vercel o vuelve a intentar.",
      });
      return;
    }

    const url =
      typeof data.url === "string"
        ? data.url.startsWith("http")
          ? data.url
          : `${siteOrigin()}${data.url}`
        : `${siteOrigin()}/blog/${data.post.slug}`;

    setPosts((current) => [
      {
        slug: data.post.slug,
        title: data.post.title,
        description: data.post.description,
        publishedAt: data.post.publishedAt,
        tags: data.post.tags,
        status: "published",
        linkedinText: data.post.linkedinText,
      },
      ...current.filter((p) => p.slug !== data.post.slug),
    ]);
    setLastPublishedUrl(url);

    setNotice({
      type: "success",
      message: `${data.note} URL: ${url}`,
    });
  };

  const openLinkedInForPost = async (post: BlogPostMeta) => {
    const url = `${siteOrigin()}/blog/${post.slug}`;
    const text =
      post.linkedinText?.trim() ||
      `${post.title}\n\n${post.description ?? ""}`.trim();

    await shareOnLinkedIn({ text, url });
    setNotice({
      type: "success",
      message:
        "Texto copiado. Se abrió LinkedIn: pega el post (Ctrl/Cmd+V) y publica.",
    });
  };

  const openLinkedInForDraft = async () => {
    if (!draft) return;
    const url =
      lastPublishedUrl ??
      `${siteOrigin()}/blog/${draft.slug || "borrador"}`;

    await shareOnLinkedIn({ text: draft.linkedinText, url });
    setNotice({
      type: "success",
      message:
        "Texto copiado. Se abrió LinkedIn: pega el post (Ctrl/Cmd+V) y publica.",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Blog automático</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Genera con IA, publica en la web y comparte en LinkedIn desde tu
          sesión (sin API de LinkedIn).
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
          <li>
            IA: <code>GROQ_API_KEY</code> en Vercel (gratis en console.groq.com).
          </li>
          <li>
            Publicar en web: requiere <code>GITHUB_TOKEN</code> (permiso{" "}
            <code>contents:write</code>) en Vercel.
          </li>
          <li>
            LinkedIn: el botón abre LinkedIn con el texto copiado; pegas y
            publicas.
          </li>
        </ul>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. Generar artículo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Tema (opcional)</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ej: Cómo mejorar conversiones en Shopify"
            />
          </div>
          <Button onClick={generate} disabled={loading === "generate"}>
            {loading === "generate"
              ? "Generando (puede tardar ~30s)..."
              : "Generar con IA"}
          </Button>
          {loading === "generate" ? (
            <p className="text-xs text-muted-foreground">
              Creando borrador… no cierra esta pestaña.
            </p>
          ) : null}
          {notice ? (
            <p
              className={
                notice.type === "success"
                  ? "text-sm text-green-400"
                  : "text-sm text-red-400"
              }
            >
              {notice.message}
            </p>
          ) : null}
        </CardContent>
      </Card>

      {draft ? (
        <Card id="draft-review">
          <CardHeader>
            <CardTitle>2. Revisar borrador (aún no publicado)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción SEO</Label>
              <Textarea
                id="description"
                value={draft.description}
                onChange={(e) =>
                  setDraft({ ...draft, description: e.target.value })
                }
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Contenido (Markdown)</Label>
              <Textarea
                id="content"
                value={draft.content}
                onChange={(e) => setDraft({ ...draft, content: e.target.value })}
                rows={14}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">Texto LinkedIn</Label>
              <Textarea
                id="linkedin"
                value={draft.linkedinText}
                onChange={(e) =>
                  setDraft({ ...draft, linkedinText: e.target.value })
                }
                rows={6}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={publish} disabled={loading === "publish"}>
                {loading === "publish" ? "Publicando..." : "Publicar en web"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={openLinkedInForDraft}
              >
                Abrir LinkedIn
              </Button>
            </div>
            {lastPublishedUrl ? (
              <p className="text-xs text-muted-foreground">
                Publicado en{" "}
                <a
                  className="underline underline-offset-4"
                  href={lastPublishedUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {lastPublishedUrl}
                </a>
                . Usa “Abrir LinkedIn” para pegar y publicar el post.
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Recomendado: publica primero en la web y luego abre LinkedIn.
              </p>
            )}
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Artículos publicados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aún no hay artículos.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.slug}
                className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="font-medium">{post.title}</div>
                  <div className="text-xs text-muted-foreground">
                    /blog/{post.slug}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => openLinkedInForPost(post)}
                  >
                    LinkedIn
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {notice ? (
        <p
          className={
            notice.type === "success"
              ? "text-sm text-green-400"
              : "text-sm text-red-400"
          }
        >
          {notice.message}
        </p>
      ) : null}
    </div>
  );
}
