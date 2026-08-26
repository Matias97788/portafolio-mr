import { promises as fs } from "fs";
import path from "path";

import matter from "gray-matter";

import type { BlogPost, BlogPostMeta } from "@/lib/blog/types";

const blogDir = path.join(process.cwd(), "content", "blog");

function toMeta(slug: string, data: Record<string, unknown>): BlogPostMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    publishedAt: String(data.publishedAt ?? new Date().toISOString()),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    status: data.status === "draft" ? "draft" : "published",
    linkedinText:
      typeof data.linkedinText === "string" ? data.linkedinText : undefined,
    linkedinPostId:
      typeof data.linkedinPostId === "string" ? data.linkedinPostId : undefined,
  };
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function listBlogPosts(options?: {
  includeDrafts?: boolean;
}): Promise<BlogPostMeta[]> {
  try {
    const files = await fs.readdir(blogDir);
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".md"))
        .map(async (file) => {
          const slug = file.replace(/\.md$/, "");
          const raw = await fs.readFile(path.join(blogDir, file), "utf8");
          const { data } = matter(raw);
          return toMeta(slug, data);
        }),
    );

    return posts
      .filter((post) => options?.includeDrafts || post.status === "published")
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
  } catch {
    return [];
  }
}

export async function getBlogPost(
  slug: string,
  options?: { includeDrafts?: boolean },
): Promise<BlogPost | null> {
  try {
    const filePath = path.join(blogDir, `${slug}.md`);
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    const meta = toMeta(slug, data);
    if (!options?.includeDrafts && meta.status !== "published") return null;
    return { ...meta, content: content.trim() };
  } catch {
    return null;
  }
}

export function serializeBlogPost(post: BlogPost) {
  const frontmatter = {
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    tags: post.tags,
    status: post.status,
    ...(post.linkedinText ? { linkedinText: post.linkedinText } : {}),
    ...(post.linkedinPostId ? { linkedinPostId: post.linkedinPostId } : {}),
  };

  return matter.stringify(`\n${post.content.trim()}\n`, frontmatter);
}
