import { promises as fs } from "fs";
import path from "path";

import {
  getBlogPost,
  serializeBlogPost,
  slugify,
} from "@/lib/blog/posts";
import type { BlogPost, GeneratedBlogDraft } from "@/lib/blog/types";
import { SITE_URL } from "@/lib/site";

import { commitFilesToGitHub, isGitHubPublishEnabled } from "./github";

const blogDir = path.join(process.cwd(), "content", "blog");

export async function saveBlogPostLocally(post: BlogPost) {
  await fs.mkdir(blogDir, { recursive: true });
  const filePath = path.join(blogDir, `${post.slug}.md`);
  await fs.writeFile(filePath, serializeBlogPost(post), "utf8");
}

export async function publishBlogDraft(
  draft: GeneratedBlogDraft,
  options?: { status?: "draft" | "published" },
) {
  const slug = slugify(draft.slug || draft.title);
  const post: BlogPost = {
    slug,
    title: draft.title,
    description: draft.description,
    content: draft.content,
    linkedinText: draft.linkedinText,
    tags: draft.tags,
    publishedAt: new Date().toISOString(),
    status: options?.status ?? "published",
  };

  const markdown = serializeBlogPost(post);
  const relativePath = `content/blog/${slug}.md`;

  if (isGitHubPublishEnabled()) {
    const result = await commitFilesToGitHub([
      {
        path: relativePath,
        content: markdown,
        message: `blog: publicar ${post.title}`,
      },
    ]);
    if (!result.ok) {
      return { ok: false as const, error: result.error, post };
    }
    return {
      ok: true as const,
      post,
      url: `${SITE_URL}/blog/${slug}`,
      mode: "github" as const,
    };
  }

  await saveBlogPostLocally(post);
  return {
    ok: true as const,
    post,
    url: `${SITE_URL}/blog/${slug}`,
    mode: "local" as const,
  };
}

export async function markLinkedInPublished(slug: string, linkedinPostId: string) {
  const post = await getBlogPost(slug, { includeDrafts: true });
  if (!post) return { ok: false as const, error: "Post no encontrado" };

  const next: BlogPost = { ...post, linkedinPostId };
  const markdown = serializeBlogPost(next);
  const relativePath = `content/blog/${slug}.md`;

  if (isGitHubPublishEnabled()) {
    const result = await commitFilesToGitHub([
      {
        path: relativePath,
        content: markdown,
        message: `blog: marcar LinkedIn publicado (${slug})`,
      },
    ]);
    if (!result.ok) return { ok: false as const, error: result.error };
    return { ok: true as const };
  }

  await saveBlogPostLocally(next);
  return { ok: true as const };
}
