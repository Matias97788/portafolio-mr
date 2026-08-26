export type BlogPostStatus = "draft" | "published";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  status: BlogPostStatus;
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
