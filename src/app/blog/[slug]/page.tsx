import type { Metadata } from "next";
import Image from "next/image";
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
  const imageUrl = post.cover
    ? post.cover.startsWith("http")
      ? post.cover
      : `${SITE_URL}${post.cover}`
    : undefined;

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
      images: imageUrl
        ? [{ url: imageUrl, width: 1536, height: 1024, alt: post.coverAlt }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const imageUrl = post.cover
    ? post.cover.startsWith("http")
      ? post.cover
      : `${SITE_URL}${post.cover}`
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <>
      <main className="mx-auto w-full max-w-3xl px-4 py-12">
        <p className="text-sm text-muted-foreground">
          <Link href="/blog" className="hover:text-foreground">
            ← Blog
          </Link>
        </p>
        <p className="mt-6 text-xs text-muted-foreground">
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

        {post.cover ? (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border">
            <Image
              src={post.cover}
              alt={post.coverAlt ?? post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="mt-8">
          <PostContent content={post.content} />
        </div>

        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-semibold">¿Quieres aplicar esto en tu negocio?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Revisa los{" "}
            <Link href="/servicios" className="text-primary underline underline-offset-4">
              servicios
            </Link>{" "}
            o{" "}
            <Link href="/#contacto" className="text-primary underline underline-offset-4">
              cotiza
            </Link>{" "}
            con alcance y tiempos claros.
          </p>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
