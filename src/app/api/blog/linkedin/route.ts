import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { getBlogPost } from "@/lib/blog/posts";
import { SITE_URL } from "@/lib/site";
import { requireAdmin } from "@/lib/server/auth";
import { markLinkedInPublished } from "@/lib/server/blog-publish";
import { isLinkedInEnabled, publishToLinkedIn } from "@/lib/server/linkedin";

export const dynamic = "force-dynamic";

const bodySchema = z.object({
  slug: z.string().min(3),
});

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  if (!isLinkedInEnabled()) {
    return NextResponse.json(
      {
        error:
          "LinkedIn no configurado. Define LINKEDIN_ACCESS_TOKEN y LINKEDIN_AUTHOR_URN.",
      },
      { status: 400 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "slug requerido" }, { status: 400 });
  }

  const post = await getBlogPost(parsed.data.slug, { includeDrafts: true });
  if (!post) {
    return NextResponse.json({ error: "Post no encontrado" }, { status: 404 });
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const linkedin = await publishToLinkedIn({
    text: post.linkedinText ?? `${post.title}\n\n${url}`,
    url,
    title: post.title,
    description: post.description,
  });

  if (!linkedin.ok) {
    return NextResponse.json({ error: linkedin.error }, { status: 500 });
  }

  await markLinkedInPublished(post.slug, linkedin.id);

  return NextResponse.json({ ok: true, linkedinPostId: linkedin.id, url });
}
