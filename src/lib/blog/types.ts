export type BlogPostStatus = "draft" | "published";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  status: BlogPostStatus;
  cover?: string;
  coverAlt?: string;
  linkedinText?: string;
  linkedinPostId?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

export type GeneratedBlogDraft = {
  slug: string;
  title: string;
  description: string;
  content: string;
  linkedinText: string;
  tags: string[];
};

/** Default cover path by slug when frontmatter omits cover. */
export function defaultCoverForSlug(slug: string) {
  return `/blog/${slug}.webp`;
}
