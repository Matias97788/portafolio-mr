import { NextResponse } from "next/server";

import { generateBlogDraft } from "@/lib/server/ai-blog";
import { publishBlogDraft } from "@/lib/server/blog-publish";
import { isGitHubPublishEnabled } from "@/lib/server/github";
import { isLinkedInEnabled, publishToLinkedIn } from "@/lib/server/linkedin";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "OPENAI_API_KEY no configurada" }, { status: 400 });
  }

  if (!isGitHubPublishEnabled()) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN no configurado para publicación automática" },
      { status: 400 },
    );
  }

  try {
    const draft = await generateBlogDraft();
    const published = await publishBlogDraft(draft, { status: "published" });
    if (!published.ok) {
      return NextResponse.json({ error: published.error }, { status: 500 });
    }

    let linkedinPostId: string | null = null;
    if (isLinkedInEnabled()) {
      const linkedin = await publishToLinkedIn({
        text: draft.linkedinText,
        url: published.url,
        title: draft.title,
        description: draft.description,
      });
      if (linkedin.ok) linkedinPostId = linkedin.id;
    }

    return NextResponse.json({
      ok: true,
      slug: published.post.slug,
      url: `${SITE_URL}/blog/${published.post.slug}`,
      linkedinPostId,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error en cron";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
