import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostContent } from "@/components/blog/post-content";
import { getBlogPost, listBlogPosts } from "@/lib/blog/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await listBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            ← Blog
          </Link>
          <Link href="/#contacto" className="text-sm text-primary underline underline-offset-4">
            Cotizar
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-12">
        <p className="text-xs text-muted-foreground">
          {new Date(post.publishedAt).toLocaleDateString("es-CL", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-muted-foreground">{post.description}</p>
        <div className="mt-8">
          <PostContent content={post.content} />
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
