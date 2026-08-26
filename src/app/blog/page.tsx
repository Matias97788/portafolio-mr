import Link from "next/link";

import { listBlogPosts } from "@/lib/blog/posts";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Blog",
  description:
    "Artículos sobre desarrollo web, performance, ecommerce y automatización para pymes en Chile.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await listBlogPosts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="text-sm font-semibold">
            {SITE_NAME}
          </Link>
          <Link
            href="/#contacto"
            className="text-sm text-primary underline underline-offset-4"
          >
            Cotizar
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-14">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Blog</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Ideas prácticas sobre web, performance, ecommerce y automatización.
        </p>

        <div className="mt-10 grid gap-4">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-[var(--radius-lg)] border border-border bg-card/50 p-6 transition-colors hover:bg-card"
            >
              <p className="text-xs text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString("es-CL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h2 className="mt-2 text-xl font-semibold">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: `${SITE_NAME} Blog`,
            url: `${SITE_URL}/blog`,
          }),
        }}
      />
    </div>
  );
}
