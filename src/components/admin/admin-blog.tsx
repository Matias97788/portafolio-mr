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

export function AdminBlog({ initialPosts }: { initialPosts: BlogPostMeta[] }) {
  const [topic, setTopic] = React.useState("");
  const [draft, setDraft] = React.useState<GeneratedBlogDraft | null>(null);
  const [posts, setPosts] = React.useState(initialPosts);
  const [loading, setLoading] = React.useState<"generate" | "publish" | "linkedin" | null>(
    null,
  );
  const [notice, setNotice] = React.useState<Notice>(null);

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
    setNotice({ type: "success", message: "Borrador generado. Revisa y publica." });
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
        message: data?.error ?? "No se pudo publicar",
      });
      return;
    }

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

    setNotice({
      type: "success",
      message: `${data.note} URL: ${data.url}`,
    });
  };

  const publishLinkedIn = async (slug: string) => {
    setLoading("linkedin");
    setNotice(null);
    const res = await fetch("/api/blog/linkedin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    const data = await res.json().catch(() => null);
    setLoading(null);

    if (!res.ok) {
      setNotice({
        type: "error",
        message: data?.error ?? "No se pudo publicar en LinkedIn",
      });
      return;
    }

    setNotice({
      type: "success",
      message: `Publicado en LinkedIn. Post ID: ${data.linkedinPostId}`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Blog automático</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Genera artículos con IA (Groq/Gemini gratis), publícalos en la web y
          compártelos en LinkedIn.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
          <li>
            IA: configura <code>GROQ_API_KEY</code> en Vercel (gratis en{" "}
            console.groq.com) o <code>GEMINI_API_KEY</code>.
          </li>
          <li>
            LinkedIn: <code>LINKEDIN_ACCESS_TOKEN</code> +{" "}
            <code>LINKEDIN_AUTHOR_URN</code> (app en linkedin.com/developers).
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
            {loading === "generate" ? "Generando..." : "Generar con IA"}
          </Button>
        </CardContent>
      </Card>

      {draft ? (
        <Card>
          <CardHeader>
            <CardTitle>2. Revisar borrador</CardTitle>
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
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
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
                onChange={(e) => setDraft({ ...draft, linkedinText: e.target.value })}
                rows={6}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={publish} disabled={loading === "publish"}>
                {loading === "publish" ? "Publicando..." : "Publicar en web"}
              </Button>
            </div>
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
                  <div className="text-xs text-muted-foreground">/blog/{post.slug}</div>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">
                      Ver
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => publishLinkedIn(post.slug)}
                    disabled={loading === "linkedin"}
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
            notice.type === "success" ? "text-sm text-green-400" : "text-sm text-red-400"
          }
        >
          {notice.message}
        </p>
      ) : null}
    </div>
  );
}
